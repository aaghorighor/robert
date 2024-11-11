export const VALIDATION_RULES = {
  rules: {
    first_name: [
      {
        pattern: /^.+$/,
        message: 'first name is required'
      },
      {
        pattern: /^.{0,50}$/,
        message: 'first name must be no more than 50 characters',
      },
    ],
    last_name: [
      { pattern: /^.+$/, message: 'last name is required' },
      {
        pattern: /^.{0,50}$/,
        message: 'last name must be no more than 50 characters',
      },
    ],
    mobile: [
      { pattern: /^.+$/, message: 'mobile number is required' },
      {
        pattern: /^.{0,50}$/,
        message: 'mobile number must be no more than 20 characters',
      },
    ],
    email: [
      { pattern: /.+/, message: 'email address is required' },
      {
        pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: 'Please enter a valid email address',
      },
      {
        pattern: /^.{0,50}$/,
        message: 'email address must be no more than 50 characters',
      },
    ],
    church_name: [
      { pattern: /^.+$/, message: 'church name is required' },
      {
        pattern: /^.{0,50}$/,
        message: 'church name must be no more than 50 characters',
      },
    ],
    password: [
      { pattern: /^.+$/, message: 'password is required' },
      {
        pattern: /^.{0,20}$/,
        message: 'password must be no more than 20 characters',
      },
    ],
    confirm_password: [
      { pattern: /^.+$/, message: 'confirm password is required' },
      {
        pattern: /^.{0,20}$/,
        message: 'confirm password must be no more than 20 characters',
      },
    ],
    addressLine1: [
      {
        pattern: /^.+$/,
        message: "street address is required",
      },
    ],
    town: [
      {
        pattern: /^.+$/,
        message: "town is required",
      },
    ],
    country: [
      {
        pattern: /^.+$/,
        message: "country is required",
      },
    ],

  },

  fields: {
    first_name: '',
    last_name: '',
    mobile: '',
    email: '',
    password: '',
    confirm_password: '',
    addressLine1: "",
    county: "",
    town: "",
    country: "",
    country_code: "",
    postcode: "",
    completeAddress: "",
    location: {
      type: "Point",
      coordinates: []
    },
    planId: "",
    nickname: "",
    church_name: ""
  },
};
