const { getIdFromToken } = require('../../util/auth.util');
const { retrieveReimbursementAmount, retrieveCutOffDetails, retrieveTotalReimbursementAmount, generateFile } = require('../helpers/file-reimbursement.helper');
const { getReimbursementDetails, getReimbursementByEmployee, createReimbursementDetails, deleteReimbursementDetails, getReimbursementDetailsByCategory, submitReimbursementDetails, getReimbursementDetailsById } = require('../repositories/reimbursement-details.repo');
const { updateReimbursement, submitReimbursement, createReimbursement, deleteReimbursement, getReimbursement, getReimbursementById, getReimbursementItems, getCategories } = require('../repositories/reimbursement.repo');
const { formatResponse, formatError } = require('../../util/api.util');
const { methodIn, methodOut } = require('../../util/log.util');
const { getAuthAccount } = require('../repositories/authentication.repo');

const PROCESS_ADD_FILE_REIMBURSEMENT = async (body, authorizer) => {
    methodIn('PROCESS_ADD_FILE_REIMBURSEMENT');
    let result = null, error = null;
    try {
        const { result: employee, error: tokenError } = await getIdFromToken(authorizer);
        const cutOffDetails = await retrieveCutOffDetails(body);
        console.log('CUT OFF DETAILS: ', cutOffDetails);
        let flex_cutoff_id = cutOffDetails.SK;
        console.log('FLEX CUTOFF SK: ', flex_cutoff_id);
        flex_cutoff_id = flex_cutoff_id.split("#")[3];
        console.log('FLEX CUTOFF ID: ', flex_cutoff_id);
        const reimbursement = await getReimbursementByEmployee(employee, flex_cutoff_id);
        const reimburseAmount = reimbursement != null ? reimbursement.total_reimbursement_amount + body.amount : body.amount;
        console.log('REIMBURSEMENT AMOUNT: ', reimburseAmount);
        if ((cutOffDetails.cut_off_cap_amount - reimburseAmount) < 0) {
            console.log('Amount exceeds cut-off cap amount.');
            error = formatError(400, 'Insufficient reimbursible amount.');
        }
        else {
            let insertId = 0;
            if (reimbursement) {
                const updateReimbursementBody = {
                    total_reimbursement_amount: reimburseAmount
                };
                insertId = reimbursement.SK;
                insertId = insertId.split("#")[2];
                await updateReimbursement(updateReimbursementBody, insertId, employee);
            }
            else {
                const insertReimbursementBody = {
                    employee_id: employee,
                    flex_cutoff_id: body.flex_cutoff_id != null ? body.flex_cutoff_id : flex_cutoff_id, 
                    total_reimbursement_amount: reimburseAmount
                };
                console.log('INSERT REIMBURSEMENT BODY: ', insertReimbursementBody);
                const userResponse = await getAuthAccount(employee);
                const user = userResponse.result;
                const insertReimbursementResponse = await createReimbursement(insertReimbursementBody, employee, user);
                insertId = insertReimbursementResponse.SK;
                insertId = insertId.split("#")[2];
                console.log("REIMBURSEMENT ID: ", insertId);
                reimbursement = await getReimbursementById(insertId);
            }

            const request = body;
            const date = new Date(request.or_date);
            const requestDate = date.getTime();
            const reimbursementDetailsBody = {
                "flex_reimbursement_id": insertId,
                "or_date": requestDate,
                "or_number": request.or_number,
                "name_of_establishment": request.name_of_establishment,
                "tin_of_establishment": request.tin_of_establishment,
                "amount": request.amount,
                "category_code": request.category_code,
                // "date_created": requestDate
            };
            console.log('REIMBURSEMENT DETAILS BODY: ', reimbursementDetailsBody);
            console.log('EMPLOYEE: ', employee);
            const reimbursementItemDetail = await createReimbursementDetails(employee, reimbursementDetailsBody);
            console.log('REIMBURSEMENT ITEM DETAIL: ', reimbursementItemDetail);
            const reimbursementItem = await getReimbursementById(insertId, employee);
            console.log('REIMBURSEMENT ITEM: ', reimbursementItem);
            // const reimbursementItem = await getReimbursementDetails(employee, reimbursementItemId);
            const dataSend = {
                reimbursement: reimbursementItem,
                item: reimbursementItemDetail
            }
            console.log('DATA SEND: ', dataSend);
            result = formatResponse('Reimbursement created successfully.', dataSend);
        }
    }
    catch (err) {
        error = err;
    }
    
    methodOut('PROCESS_ADD_FILE_REIMBURSEMENT');
    return {result, error}
}

const PROCESS_DELETE_FILE_REIMBURSEMENT = async (body, authorizer) => {
    methodIn('PROCESS_DELETE_FILE_REIMBURSEMENT');
    let result = null, error = null;
    try {
        const { result: user, error: tokenError } = await getIdFromToken(authorizer);
        const id = body.id;
        const detailId = body.detailID;
        console.log('ID: ', id, 'DETAIL ID: ', detailId);
        const reimbursement = await getReimbursementDetailsById(user, id,  detailId);
        if (reimbursement) {
            let employee = reimbursement.PK;
            employee = employee.split("#")[2];
            if (reimbursement.status === 'DRAFT' &&  employee == user) {
                await deleteReimbursementDetails(user, id, detailId);
                // let reimbursementId = reimbursement.SK;
                const reimburseAmount = await retrieveTotalReimbursementAmount(id, -1*(reimbursement.amount));
                const updateReimbursementBody = {
                    total_reimbursement_amount: reimburseAmount
                };
                if (reimburseAmount == 0){
                    await deleteReimbursement(id);
                }
                else{
                    console.log('UPDATE REIMBURSMENT BODY: ', updateReimbursementBody);
                    await updateReimbursement(updateReimbursementBody, id);
                }
                const dataSend = reimbursement;
                result = formatResponse('Reimbursement deleted successfully.',dataSend);
            }
            else {
                result = formatResponse('No records available at the moment.', []);
            }
        }
        else {
            result = formatResponse('No records available at the moment.', []);
        }
    }
    catch (err) {
        error = err;
    }
    
    methodOut('PROCESS_DELETE_FILE_REIMBURSEMENT');
    return {result, error}
}

const PROCESS_GENERATE_FILE_REIMBURSEMENT = async (body, authorizer) => {
    methodOut('PROCESS_GENERATE_FILE_REIMBURSEMENT');
    let result = null, error = null;
    const { result: email, error: tokenError } = await getIdFromToken(authorizer);
    const id = body.id;
    const reimbursement = await getReimbursementById(id, email);
    let employee_email = reimbursement.PK;
    employee_email = employee_email.split("#")[2];
    if (employee_email == email){
        const categories = await getCategories();
        const categoriesWithReimbursements = await Promise.all(categories.map(async category => {
            const reimbursementDetails = await getReimbursementDetailsByCategory(id, category.category_code);
            category.reimbursement_details = await reimbursementDetails;
            return category;
        }))
        const details = {
            reimbursementDetails: reimbursement,
            categories: categoriesWithReimbursements
        }
        const fileRes = await generateFile(details);
        console.log(fileRes);
        const dataSend = { filePath: fileRes.Location, ...details }
        result = formatResponse('Reimbursement generated successfully.',dataSend);
    }
    else{
        result = formatResponse('No records available at the moment.', []);
    }
    methodOut('PROCESS_GENERATE_FILE_REIMBURSEMENT');
    return {result, error}
}

const PROCESS_SUBMIT_FILE_REIMBURSEMENT = async (body, authorizer) => {
    methodIn('PROCESS_SUBMIT_FILE_REIMBURSEMENT');
    let result = null, error = null;
    try {
        const { result: employee, error: tokenError } = await getIdFromToken(authorizer);
        const id = body.id;
        console.log('EMPLOYEE: ', employee, ' AND REIMBURSEMENT ID: ', id);
        const reimbursement = await getReimbursementById(id, employee);
        console.log('REIMBURSEMENT: ', reimbursement);
        const userResponse = await getAuthAccount(employee);
        const user = userResponse.result;
        console.log('USER: ', user);
        if (reimbursement) {
            let employee_email = reimbursement.PK;
            employee_email = employee_email.split("#")[2];
            console.log('EMPLOYEE EMAIL: ', employee_email);
            if (reimbursement.status === 'DRAFT' && employee == employee_email) {
                const dateSubmitted = new Date();
                const companyCode = user.company_code;
                const cutOffId = reimbursement.flex_cut_off_id;
                const formattedDateSubmitted = dateSubmitted.getFullYear() + String(dateSubmitted.getMonth() + 1).padStart(2, '0') + "" + String(dateSubmitted.getDate()).padStart(2, '0');
                const transaction_number = companyCode + '-' + cutOffId + '-'+formattedDateSubmitted+'-'+id;
                console.log('TRANSACTION NUMBER: ', transaction_number);
                await submitReimbursement(id, transaction_number, employee);
                await submitReimbursementDetails(employee, id);           
                const newReimbursement = await getReimbursementById(id, employee);
                const reimbursementItems = await getReimbursementDetails(employee, id);
                const dataSend = {
                    reimbursement: newReimbursement,
                    items: reimbursementItems
                }
                result = formatResponse('Reimbursement submitted successfully.',dataSend);
            }
            else {
                result = formatResponse('No records available at the moment.', null);
            }
        }
        else {
            result = formatResponse('No records available at the moment.', null);
        }
    }
    catch (err) {
        error = err;
    }
    
    methodOut('PROCESS_SUBMIT_FILE_REIMBURSEMENT');
    return {result, error}
}


module.exports = {
    PROCESS_ADD_FILE_REIMBURSEMENT,
    PROCESS_DELETE_FILE_REIMBURSEMENT,
    PROCESS_GENERATE_FILE_REIMBURSEMENT,
    PROCESS_SUBMIT_FILE_REIMBURSEMENT
}

