var errors = {
    //General Errors
    201: "Product Already Exists",
    404: "Product Not Found",
    500: "Internal Server Error"
};

var error = {
    _findError: function(code) {
        return errors[code];
    },
    throwError: function(code, message) {
        if (!code || this._findError(code) === "undefined") {
            code = 500;
        }
        var errorMessage = this._findError(code);
        var err = new Error();
        err.code = code;
        
        if (message) {
            err.message = message;
        } else if (errorMessage) {
            err.message = errorMessage;
        } else {
            err.message = "Internal Server Error";
        }
        
        return err;
    }
};

module.exports = error;