
export const CAMPAIGN_RULES = {
  campaign: {
     title: [
      { pattern: /^.+$/,
       message: 'title is required' },
      {
        pattern: /^.{0,100}$/,
        message: 'title must be no more than 100 characters',
      },
    ],   
    description: [
      { pattern: /^.+$/,
       message: 'description is required' },
      {
        pattern: /^.{0,1000}$/,
        message: 'description must be no more than 1000 characters',
      },
    ],    
    start_date: [
      { pattern: /^.+$/,
       message: 'start date is required' }      
    ],
    end_date: [
      { pattern: /^.+$/,
       message: 'end date is required' }      
    ],
    target_amount: [
    { pattern: /^.+$/,
       message: 'target amount is required' },
    {
        pattern: /^\d+(\.\d{2})?$/,
        message: 'target amount should be a number with at least 2 decimal places.',
    },      
    ] 
    
  },

  fields: {
    _id: '', 
    title: '',     
    target_amount: '',
    start_date: new Date(), 
    end_date: new Date(),
    description: '',    
    status: false,   
    secure_url: '',
    public_id: '', 
    upload_photo: false,   
  },
};


