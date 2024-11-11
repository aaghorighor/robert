export const UPDATE_CONTACT_RULES = {
  contact: {
     name: [
      { pattern: /^.+$/,
       message: 'name is required' },
      {
        pattern: /^.{0,50}$/,
        message: 'name must be no more than 50 characters',
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
    ]    
  },

  fields: {
    name: '',  
    mobile: '',
    email: '', 
    secure_url: '',   
    public_id: '',  
    logo_url: '',   
    logo_id: '',    
  },
};

export const ADDRESS_VALIDATION_RULES = {
  address: {    
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
    addressLine1: "",
    county: "",
    town: "",
    country: "",
    postcode: "" ,
    completeAddress: "",
    location: {
      type : "",
      coordinates :[]
    },   
  },
};

export const PASSWORD_VALIDATION_RULES = {
  password: {    
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
    password: "",
    confirm_password: "",    
  },
};