export default class ResponseBuilder {
    constructor({
        message = '',
        data = Object,
        error = Object,
    }) {
        this.status = status;
        this.statusText = statusText;
        this.message = message;
        this.data = data;
        this.error = error;
        this.response = {}
    }
    get OK() {
        this.response = {
            status: 200,
            statusText: 'OK',
            message: this.message,
            data: this.data
        }
    }
    get Created() {
        this.response = {
            status: 201
        }
    }
    buildResponse(statusCode) {
        this.response
    }

}
const statusMessages = {
	'200': 'OK',
	'201': 'Created',
	'202': 'Accepted',
	'204': 'No Content',
 	'400': 'Bad Request',
	'401': 'Unauthorized',
	'402': 'Payment Required',
	'403': 'Forbidden',
	'404': 'Not Found',
	'405': 'Method Not Allowed',
	'408': 'Request Timeout',
	'500': 'Internal Server Error',
	'501': 'Not Implemented',
	'502': 'Bad Gateway',
	'503': 'Service Unavailable',
}