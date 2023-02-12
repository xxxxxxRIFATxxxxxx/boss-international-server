// dependencies
const createError = require('http-errors');

// function Definition
const notFoundHandler = (req, res, next) => {
    next(createError(404, 'Your requested content was not found!'));
};

// export
module.exports = notFoundHandler;