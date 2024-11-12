export const REVIEW_VALIDATION_RULES = {
  
  Review: {
    first_name: [
      { pattern: /.+/, message: 'First name is required' },
      {
        pattern: /^.{0,50}$/,
        message: 'Your name must be no more than 50 characters',
      },
    ],
    last_name: [
      { pattern: /.+/, message: 'Last name is required' },
      {
        pattern: /^.{0,50}$/,
        message: 'Your name must be no more than 50 characters',
      },
    ],
    desc: [
      { pattern: /.+/, message: 'Review is required' },
      {
        pattern: /^.{0,1000}$/,
        message: 'Message must be no more than 1000 characters',
      },
    ],
    star: [
      {
        pattern: /^[1-5]$/,
        message: 'Rating must be a number between 1 and 5',
      },
    ],
  },
  fields: {
    first_name: '',
    last_name: '',
    star: 0,
    desc: '',
  },
 
};
