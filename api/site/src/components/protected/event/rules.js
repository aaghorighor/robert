
export const EVENT_RULES = {
  event: {
     title: [
      { pattern: /^.+$/,
       message: 'title is required' },
      {
        pattern: /^.{0,50}$/,
        message: 'title must be no more than 50 characters',
      },
    ],   
    start_time: [
      { pattern: /^.+$/,
       message: 'start time is required' },
      {
        pattern: /^.{0,50}$/,
        message: 'star time must be no more than 10 characters',
      },
    ],   
    end_time: [
      { pattern: /^.+$/,
       message: 'end time is required' },
      {
        pattern: /^.{0,50}$/,
        message: 'end time must be no more than 10 characters',
      },
    ], 
    start_date: [
      { pattern: /^.+$/,
       message: 'start date is required' }      
    ],
    end_date: [
      { pattern: /^.+$/,
       message: 'end date is required' }      
    ]  
    
  },

  fields: {
    _id: '', 
    title: '',  
    start_time: '',  
    end_time: '',
    start_date: new Date(),  
    end_date: new Date(),
    description: '',    
    status: false,   
    can_register: false,  
    secure_url: '',
    public_id: '', 
    upload_photo: false, 
    addressLine1: "",
    county: "",
    town: "",
    country: "",
    postcode: "",
    completeAddress: "",  
    location: {
      type :  "Point",
      coordinates :[]
    },
  },
};


