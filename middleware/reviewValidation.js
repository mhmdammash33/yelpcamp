const joi = require("joi");

const validateReview = (req, res, next) => {
  const reviewSchema = joi.object({
    review: joi
      .object({
        rating: joi.number().required(),
        body: joi.string().required(),
      })
      .required(),
  });
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports = validateReview;
