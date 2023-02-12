// dependencies

// function Definition
const checkAdminHandler = (req, res, next) => {
    const {authorization} = req.headers;

    try {
        const token = authorization.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const {userId, firstName, lastName, email, phone, role} = decode;

        req.userId = userId;
        req.firstName = firstName;
        req.lastName = lastName;
        req.email = email;
        req.phone = phone;
        req.role = role;

        if (role === "admin") {
            next();
        } else {
            next("Unauthorized!");
        };
        
    } catch (error) {
        next("Unauthorized!");
    };
};

// export
module.exports = checkAdminHandler;