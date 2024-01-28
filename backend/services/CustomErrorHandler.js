class CustomErrorHandler extends Error{
    constructor(status, message){
        super();
        this.status = status;
        this.message = message;
    }

    static alreadyExist(message='User Already Exist'){
        return new CustomErrorHandler(409, message);
    }

    static serverError(message = 'Internal Server Error'){
        return new CustomErrorHandler(500, message)
    }
    static notFound(message = 'User not Found'){
        return new CustomErrorHandler(404, message);
    }

    static wrongCredentials(message = 'email or password is wrong'){
        return new CustomErrorHandler(409, message);
    }

}

export default CustomErrorHandler;