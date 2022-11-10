const AdminController = {
    checkAdminCredentials : async (req, res, next) => {
        console.log('Enter: Checking admin credentials')
        console.log(`Role: ${req.user.role}`)
        console.log('Exit: Done checking admin credentials')
        if (req.user.role === 'hr') next()
        else res.status(403).json({
            status: 403,
            statusText: 'Forbidden',
            message: 'You are not allowed to access the admin services',
            error: {
                code: 'FORBIDDEN',
                message: 'You are not allowed to access the admin services',
            }
        })
    },
    // US009: As an HR, I can view all reimbursements submitted in a cut-off
    getReimbursementsByCutOff : async (req, res, next) => {
        // console.log('Enter: getReimbursements')
        // let cutOffId = req.params.cutOffId;
        // await reimbursementRepo.getReimbursementsByCutOffId(cutOffId)
        //     .then(reimbursements => {
        //         console.log(`Reimbursements: ${JSON.stringify(reimbursements)}`);
        //     })
        //     .catch(err => next(err));
        // res.send("Retrived all reimbursements within cut-off " + cutOffId);
        // console.log('Exit: getReimbursements')
    },
    viewReimbursementById : async (req, res, next) => {
        /*
            GET Reimbursement List given id in dynamodb
        */
        
    },
    searchReimbursements : async (req, res, next) => {
        /* 
            SCAN REIMBURSEMENT INDEX 
            Detail contains NO#{employeeNumber} 
            AND Detail contains LAST#{employeeLastName}
            AND Detail contains FIRST#{employeeFirstName}
        */
        res.send("Search reimbursements");
    },
    approveReimbursement : async (req, res, next) => {
        /* 
            UPDATE reimbursement LIST by id using attribute 'Status'
        */
        res.send("Approve reimbursement!")
    },
    rejectReimbursement : async (req, res, next) => {
        /* 
            UPDATE reimbursement LIST by id using attribute 'Status'
        */
        res.send("Reject reimbursement!")
    }
}

export default AdminController