const Joi = require('@hapi/joi');

module.exports = {
  validateBody(...args) {
    const [type, schema] = args.length > 1 ? args : args.unshift(null) && args;

    return (req, res, next) => {
      if (!req.is('application/json')) {
        return res.status(400).json({ msg: 'Invalid Header Type' });
      }

      // if the user is signing in, we don't want the schemas errors to show
      // since it displays password specifications
      if (type !== 'signup') return next();

      const result = Joi.validate(req.body, schema);

      if (result.error) {
        return res.status(400).json(result.error);
      }

      if (!req.value) req.value = {};

      req.value.body = result.value;
      next();
    };
  },
  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(5)
        .required(),
    }),
  },
};
