export const LOGIN_RULES = {
  login: {  
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
    password: [
      { pattern: /.+/, message: 'password is required' },
      {
        pattern: /^.{0,20}$/,
        message: 'password must be no more than 20 characters',
      },
    ] 
  },

  fields: {   
    email: '',
    password: ''   
  },
};

export const FORGOT_PASSWORD_RULES = {
  forgot: {  
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
    ]   
  },

  fields: {   
    email: ''      
  },
};

export const RESET_PASSWORD_RULES = {
  reset: {  
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
  },

  fields: {   
    confirm_password: '',
    password: '',
    token: ''     
  },
};

export const PATIENT_REGISTRATION_RULES = {
  register: {
    first_name: [
      { pattern: /^.+$/,
       message: 'first name is required' },
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
    password: [
      { pattern: /^.+$/, message: 'password is required' },
      {
        pattern: /^.{0,50}$/,
        message: 'password must be no more than 20 characters',
      },
    ],
    confirm_password: [
      { pattern: /^.+$/, message: 'confirm password is required' },
      {
        pattern: /^.{0,50}$/,
        message: 'confirm password must be no more than 20 characters',
      },
    ]   
  },

  fields: {
    first_name: '',
    last_name: '',
    mobile: '',
    email: '',
    password: '',
    confirm_password: ''   
  },
};