import { body, validationResult } from "express-validator";

const loginDTO = [
  // email
  body("email")
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  // password
  body("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Password is required"),

  // handle validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
      });
    }
    next();
  },
];

const registerDTO = [
  // name
  body("username")
    .trim()
    .escape()
    .isLength({ min: 2, max: 50 })
    .withMessage("Username must be between 2 and 50 characters"),

  // email
  body("email")
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  // password
  body("password")
    .trim()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(
      "Password must be at least 8 characters and include uppercase, lowercase, and number",
    ),

  // confirm password
  body("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  // handle validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
      });
    }
    next();
  },
];

export { loginDTO, registerDTO };
