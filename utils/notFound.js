import error from "./error.js";

const notFound = (req, res, next) => {
    next(new error(`No Route Match ${req.originalUrl}`, 400));
};
export default notFound