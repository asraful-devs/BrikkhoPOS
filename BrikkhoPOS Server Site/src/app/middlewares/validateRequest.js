const validateRequest = (schema) => async (req, res, next) => {
    try {
        const result = await schema.parseAsync(req.body);
        req.body = result;
        next();
    }
    catch (error) {
        next(error);
    }
};
export default validateRequest;
