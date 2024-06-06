import { checkSchema } from 'express-validator';

export const clientQueryValidator = checkSchema({
  name: {
    isString: {
      errorMessage: 'Name must be a string',
    },
    notEmpty: {
      errorMessage: 'Name is required',
    },
  },
  phone: {
    isString: {
      errorMessage: 'Phone number should be a string',
    },
    notEmpty: {
      errorMessage: 'Phone number is required',
    },
  },
  email: {
    isEmail: {
      errorMessage: 'Invalid email address',
    },
    notEmpty: {
      errorMessage: 'Email is required',
    },
    normalizeEmail: true,
  },
  projectLink: {
    isString: {
      errorMessage: 'Project link must be a string',
    },
    notEmpty: {
      errorMessage: 'Project link is required',
    },
  },
  projectDetails: {
    isString: {
      errorMessage: 'Project details must be a string',
    },
    notEmpty: {
        errorMessage: 'Project details is required',
    },
},
issueArise: {
  isString: {
    errorMessage: 'Issue Arise must be a string',
  },
  notEmpty: {
      errorMessage: 'Issue Arise is required',
  },
},
})