export const UPDATE_ONE_RULES = {
  updateOne: {  
    name: [
      { pattern: /.+/, message: 'name is required' },           
    ],
    value: [
      { pattern: /.+/, message: 'value is required' },
      {
        pattern: /^.{0,2000}$/,
        message: 'value must be no more than 20000 characters',
      },
    ] 
  },

  fields: {   
    name: '',
    value: ''   
  },
};

