export const CONTACT_VALIDATION_RULES = {
  Contact :{
  name: [
    { pattern: /.+/, message: 'Your name is required' },
    {
      pattern: /^.{0,50}$/,
      message: 'Your name must be no more than 50 characters',
    },
  ],
  email: [
    { pattern: /.+/, message: 'Email address is required' },
    {
      pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: 'Please enter a valid email address',
    },
    {
      pattern: /^.{0,50}$/,
      message: 'Email address must be no more than 50 characters',
    },
  ],
  subject: [
    { pattern: /.+/, message: 'Subject is required' },
    {
      pattern: /^.{0,50}$/,
      message: 'Subject must be no more than 50 characters',
    },
  ],
  message: [
    { pattern: /.+/, message: 'Message is required' },
    {
      pattern: /^.{0,200}$/,
      message: 'Message must be no more than 200 characters',
    },
  ],
  },
fields: {
   name: '',
    email: '',
    subject: '',
    message: '',
  } 
};
