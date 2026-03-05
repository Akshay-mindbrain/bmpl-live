import Joi from "joi";

// Project and Task schemas have been removed.
//Users
export const userCreateSchema = Joi.object({
  firstName: Joi.string().max(50).required(),
  lastName: Joi.string().max(50).required(),

  mobile: Joi.string()
    .pattern(/^[6-9][0-9]{9}$/)
    .required()
    .messages({
      "string.empty": "Mobile number is required.",
      "string.pattern.base":
        "Mobile number must be a valid 10-digit Indian number starting with 6, 7, 8, or 9.",
    }),

  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(), //to uncomment in future if require

  sponsorId: Joi.number().integer().positive().optional().allow(null),
  parentId: Joi.number().integer().positive().optional().allow(null),

  legPosition: Joi.string().valid("LEFT", "RIGHT").optional().allow(null),

  //   leftChildId: Joi.number().integer().positive().optional().allow(null),
  //   rightChildId: Joi.number().integer().positive().optional().allow(null),
  //   lastLeftId: Joi.number().integer().positive().optional().allow(null),
  //   lastRightId: Joi.number().integer().positive().optional().allow(null),

  //   lineagePath: Joi.string().max(255).optional(),
  useShare: Joi.boolean().optional().default(false),
  directCount: Joi.number().integer().min(0).default(0),

  status: Joi.string().valid("ACTIVE", "INACTIVE").default("ACTIVE"),

  createdBy: Joi.string().optional().allow(null),
  updatedBy: Joi.string().optional().allow(null),
});

export const userUpdateSchema = Joi.object({
  firstName: Joi.string().max(50).optional(),
  lastName: Joi.string().max(50).optional(),

  email: Joi.string().email().optional(),

  //status: Joi.string().valid("ACTIVE", "INACTIVE").default("ACTIVE"),

  updatedBy: Joi.string().optional().allow(null),
});

//user - auth

export const userLoginSchema = Joi.object({
  mobile: Joi.string()
    .max(10)
    .pattern(/^[0-9]+$/)
    .required(),

  // email: Joi.string().email().required(),   //uncomment it in future if required
  password: Joi.string()

    .required()
    .messages({
      "string.empty": "Password is required.",
    }),
});

//setup
export const userSetupSchema = Joi.object({
  config: Joi.object({
    autoMemId: Joi.string().valid("STATIC", "DYNAMIC").required(),
    userRegistrationNo: Joi.number().integer().min(0).optional().default(0),
    prefixMemId: Joi.string().trim().max(30).required(),
    minLength: Joi.number().integer().min(1).max(12).required(),
    planConfigKey: Joi.string().trim().max(100).optional(),
    planConfigValue: Joi.string().valid("AUTO", "MANUALADMIN").optional(),
    incomeCommission: Joi.number().min(0).optional().default(0),
    royaltyCommission: Joi.number().min(0).optional().default(0),
    tds: Joi.number().min(0).optional().default(0),
    admincharges: Joi.number().min(0).optional().default(0),
  }).required(),

  rootUser: Joi.object({
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    mobile: Joi.string()
      .pattern(/^[6-9][0-9]{9}$/)
      .required()
      .messages({
        "string.empty": "Root user mobile is required.",
        "string.pattern.base":
          "Root user mobile must be a valid 10-digit number.",
      }),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).required(),

  defaultAdmin: Joi.object({
    firstName: Joi.string().max(50).optional().allow(null),
    lastName: Joi.string().max(50).optional().allow(null),
    mobile: Joi.string()
      .pattern(/^[6-9][0-9]{9}$/)
      .required()
      .messages({
        "string.empty": "Default admin mobile is required.",
        "string.pattern.base":
          "Default admin mobile must be a valid 10-digit number.",
      }),
    email: Joi.string().email().optional().allow(null),
    username: Joi.string().max(50).optional().allow(null),
    password: Joi.string().min(6).required(),
    adminType: Joi.string().valid("SUPERADMIN", "ADMIN", "MANAGER").optional(),
  }).required(),
});

//Kyc
export const kycCreateSchema = Joi.object({
  aadharNo: Joi.string()
    .length(12)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.base": "Aadhar number must be a string",
      "string.length": "Aadhar number must be exactly 12 digits",
      "string.pattern.base": "Aadhar number must contain only numbers",
      "any.required": "Aadhar number is required",
    }),

  aadharImgUrl: Joi.string().uri().required().messages({
    "string.uri": "Aadhar image must be a valid URL",
    "any.required": "Aadhar image is required",
  }),

  panNo: Joi.string()
    .length(10)
    .pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    .required()
    .messages({
      "string.length": "PAN number must be exactly 10 characters",
      "string.pattern.base": "PAN number format must be like ABCDE1234F",
      "any.required": "PAN number is required",
    }),

  panImageUrl: Joi.string().uri().required().messages({
    "string.uri": "PAN image must be a valid URL",
    "any.required": "PAN image is required",
  }),

  bankName: Joi.string().max(150).required().messages({
    "string.max": "Bank name cannot exceed 150 characters",
    "any.required": "Bank name is required",
  }),

  accountNo: Joi.string().max(30).required().messages({
    "string.max": "Account number cannot exceed 30 characters",
    "any.required": "Account number is required",
  }),

  ifscCode: Joi.string().max(15).required().messages({
    "string.max": "IFSC code cannot exceed 15 characters",
    "any.required": "IFSC code is required",
  }),

  branchName: Joi.string().max(150).required().messages({
    "string.max": "Branch name cannot exceed 150 characters",
    "any.required": "Branch name is required",
  }),

  bankProofImgUrl: Joi.string().uri().required().messages({
    "string.uri": "Bank proof image must be a valid URL",
    "any.required": "Bank proof image is required",
  }),

  status: Joi.string()
    .valid("PENDING", "APPROVED", "REJECT")
    .default("PENDING")
    .messages({
      "any.only": "Status must be PENDING, APPROVED, or REJECT",
    }),

  rejectReason: Joi.string().allow(null),

  createdBy: Joi.string().allow(null),
  updatedBy: Joi.string().allow(null),

  createdByAdminId: Joi.number().integer().positive().allow(null),
  updatedByAdminId: Joi.number().integer().positive().allow(null),
  approvedByAdminId: Joi.number().integer().positive().allow(null),
});

export const kycUpdateSchema = Joi.object({
  aadharNo: Joi.string()
    .length(12)
    .pattern(/^[0-9]+$/)
    .messages({
      "string.length": "Aadhar number must be exactly 12 digits",
      "string.pattern.base": "Aadhar number must contain only numbers",
    }),

  aadharImgUrl: Joi.string().uri().messages({
    "string.uri": "Aadhar image must be a valid URL",
  }),

  panNo: Joi.string()
    .length(10)
    .pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    .messages({
      "string.length": "PAN number must be exactly 10 characters",
      "string.pattern.base": "PAN number format must be like ABCDE1234F",
    }),

  panImageUrl: Joi.string().uri().messages({
    "string.uri": "PAN image must be a valid URL",
  }),

  bankName: Joi.string().max(150),
  accountNo: Joi.string().max(30),
  ifscCode: Joi.string().max(15),
  branchName: Joi.string().max(150),
  bankProofImgUrl: Joi.string().uri(),

  status: Joi.string().valid("PENDING", "APPROVED", "REJECT").messages({
    "any.only": "Status must be PENDING, APPROVED, or REJECT",
  }),

  rejectReason: Joi.string().allow(null),
  updatedBy: Joi.string().allow(null),
  updatedByAdminId: Joi.number().integer().positive().allow(null),
  approvedByAdminId: Joi.number().integer().positive().allow(null),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update",
  });

//PlanMaster
export const planCreateSchema = Joi.object({
  planName: Joi.string().max(150).required(),
  Description: Joi.string().max(500).required(),

  BV: Joi.number().positive().required(),
  price: Joi.number().positive().required(),
  dp_amount: Joi.number().positive().required(),

  status: Joi.string().valid("ACTIVE", "INACTIVE").default("ACTIVE"),
});

export const planUpdateSchema = Joi.object({
  planName: Joi.string().max(150).optional(),
  Description: Joi.string().max(500).optional(),

  BV: Joi.number().positive().optional(),
  price: Joi.number().positive().optional(),
  dp_amount: Joi.number().positive().optional(),

  status: Joi.string().valid("ACTIVE", "INACTIVE").optional(),
}).min(1);

//PlanPurchase
export const planPurchaseCreateSchema = Joi.object({
  plan_id: Joi.string().uuid().required(),
  //user_id: Joi.number().integer().positive().required(),

  BV: Joi.number().positive().required(),
  dp_amount: Joi.number().positive().required(),
  plan_amount: Joi.number().positive().required(),

  payment_mode: Joi.string().max(50).required(),
  payment_proof_uri: Joi.string().uri().required(),

  purchase_type: Joi.string()
    .valid("FIRST_PURCHASE", "REPURCHASE", "SHARE_PURCHASE")
    .required(),
});

export const planPurchaseUpdateSchema = Joi.object({
  BV: Joi.number().positive().optional(),
  dp_amount: Joi.number().positive().optional(),
  plan_amount: Joi.number().positive().optional(),

  payment_mode: Joi.string().max(50).optional(),
  payment_proof_uri: Joi.string().uri().optional(),

  purchase_type: Joi.string()
    .valid("FIRST_PURCHASE", "REPURCHASE", "SHARE_PURCHASE")
    .optional(),
}).min(1);

//systemincome
export const systemIncomeQuerySchema = Joi.object({
  period: Joi.string()
    .valid("LAST_7_DAYS", "LAST_30_DAYS", "THIS_MONTH")
    .optional(),

  fromDate: Joi.date().iso().optional(),
  toDate: Joi.date().iso().optional(),
})
  .xor("period", "fromDate")
  .with("fromDate", "toDate");
