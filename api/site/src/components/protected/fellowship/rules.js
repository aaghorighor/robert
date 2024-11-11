
export const FELLOWSHIP_RULES = {
  fellowship: {
     name: [
      { pattern: /^.+$/,
       message: 'name is required' },
      {
        pattern: /^.{0,100}$/,
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
    _id: '', 
    name: '',    
    mobile: '',   
    addressLine1: "",
    county: "",
    town: "",
    country: "",
    postcode: "",
    completeAddress: "",  
    location: {
      type :  "",
      coordinates :[]
    },
    status : false
  },
};


