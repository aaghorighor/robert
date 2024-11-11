
export const NOTE_FORM_RULES = {
  Note: {
    note: [
      { pattern: /^.+$/,
       message: 'Note is required' }      
    ],  
    status: [
      { pattern: /^.+$/,
       message: 'Status is required' }      
    ],       
  },

  fields: {
    note: '',   
    status: '',  
  } 
};
