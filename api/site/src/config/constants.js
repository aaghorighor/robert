  
const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL;

const CLOUDINARY_CLOUD_NAME = "dwjjtakfs";
const CLOUDINARY_API_KEY = 992935722916518;
const CLOUDINARY_API_SECRET = "C07VzBp8zn8A5NlZ9QcELB-B25w";
const CLOUDINARY_UPLOAD_PRESET = "uo6l2ljb_realse_client_preset";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dwjjtakfs/image/upload";

const MAP_MOB =
  "pk.eyJ1Ijoia2Nta2NtMTIzNDUiLCJhIjoiY2xoY2UwYWlvMTByeDNsbnVxMDgzNGkydSJ9.-eRx20Td26hSDCkttb5giQ";

export {
  GRAPHQL_URL,
  CLOUDINARY_UPLOAD_URL,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_UPLOAD_PRESET,

  MAP_MOB
};

export const FEATURES = [  
  {
    name: 'House fellowship nearby',
    color: '#4338ca',
    icon: 'house',
    id: '2'   
  },
  {
    name: 'Campaigns',
    color: '#0e7490',
    icon: 'wallet-giftcard',
    id: '3'  
  },
  {
    name: 'Giving',
    color: '#a16207',
    icon: 'money',
    id: '4' 
  },
  {
    name: 'Hymns',
    color: '#44403c',
    icon: 'library-music',
    id: '5'
  },
  {
    name: 'Register Member',
    color: '#0284c7',
    icon: 'library-books',
    id: '6'   
  },  
  {
    name: 'Testimony',
    color: '#808000',
    icon: 'account-box',
    id: '7'
  },
  {
    name: 'Prayer Request',
    color: '#248f8f',
    icon: 'request-page',
    id: '8'
  },
  {
    name: 'Donations',
    color: '#0e7490',
    icon: 'wallet-giftcard',
    id: '9'
  },

];

export const PAYMENT_PROVIDERS = [
  {
    description: 'Stripe',
    value: 'Stripe',
  } 
];

export const DAILY_STATES ={
  STATE_IDLE : 'STATE_IDLE',
  STATE_CREATING : 'STATE_CREATING',
  STATE_JOINING : 'STATE_JOINING',
  STATE_JOINED : 'STATE_JOINED',
  STATE_LEAVING : 'STATE_LEAVING',
  STATE_ERROR : 'STATE_ERROR'
}

export const STATUS_ACTIVE = 'active';
export const STATUS_TRIALING = 'trialing';
export const STATUS_SUSPENDED = 'suspended';
export const STATUS_INCOMPLETE = 'incomplete';
export const STATUS_CANCELLED = 'cancelled';

export const USER_ROLES =[
   {
    description: 'user ',
    value: 'user',
  },
  {
    description: 'admin',
    value: 'admin',
  }  
]

export const DONATION_TYPE =[
   {
    description: 'Tithes ',
    value: 'Tithes',
  },
  {
    description: 'Offerings',
    value: 'Offerings',
  }  
]
