export const DONATION_RULES = {
  donation: {   
    amount: [
    { pattern: /^.+$/,
       message: 'amount is required' },
    {
        pattern: /^\d+(\.\d{2})?$/,
        message: 'amount should be a number with at least 2 decimal places.',
    },      
    ] 
    
  },

  fields: {
    _id: '',      
    amount: '',
    date_donated: '',  
    online: false,
    email: '',     
    last_name: '',
    first_name: '',
    donation_type: '',      
  },
};

export const FILTER_DONATION_RULES = {
  donation: {   
    startDateStr: [
      { pattern: /^.+$/,
       message: 'start date is required' }      
    ],
    endDateStr: [
      { pattern: /^.+$/,
       message: 'end date is required' }      
    ]  
    
  },

  fields: {
    startDateStr: '',      
    endDateStr: '',  
    donation_type: '',      
  },
};