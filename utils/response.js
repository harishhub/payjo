const CustomError = require('./error');

function Response() {

}

/**
 * @param response
 * @param data
 * @param key
 * @returns {*}
 */
Response.prototype.sendSuccess = function(response, data, key) {
    let builderData = {
        status: "success",
        code: 200
    };
    builderData.message = {};
    builderData.message[key] = data;
    return response.json(builderData);
};

/**
 *
 * @param response
 * @param error
 * @param message
 * @returns {*}
 */
Response.prototype.sendError = function(response, error, message) {
    let err;
    if (error instanceof Error) {
        err = error;
        if (!err.code) {
            err.code = 500;
        }
    } else {
        err = CustomError.throwError(error.code, message);
    }
    const builderData = {
        status: "failure",
        code: err.code,
        message: {
            error: err.message
        }
    };
    response.status(400).json(builderData);
};


module.exports = new Response();