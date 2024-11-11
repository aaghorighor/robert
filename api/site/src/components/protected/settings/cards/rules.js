export const CHURCH_PAYMENT_PROVIDER_RULES = {
  Provider: {
    name: [
      {
        pattern: /^.+$/,
        message: 'Provider name is required'
      }
    ],
  },

  fields: {
    name: '',
    key: '',
    secret: '',
    active: false,
    _id: ''
  }
};

export const CHURCH_GENERAL_SETTINGS_RULES = {
  General: {
    currency: [
      {
        pattern: /^(\$|€|£|¥|₹|₦)$/,
        message: 'Currency symbol not supported at this time'
      }
    ],
    tax_rate: [
      {
        pattern: /^\d+(\.\d+)?$/,
        message: 'Tax rate not valid, valid i.e 2.5'
      }
    ],
  },
  bankRules: {
    sort_code: [
      {
        pattern: /^.+$/,
        message: 'sort code is required'
      }
    ],
    account_number: [
      {
        pattern: /^.+$/,
        message: 'account number is required'
      }
    ],
    bank_name: [
      {
        pattern: /^.+$/,
        message: 'bank name is required'
      }
    ],
    reference: [
      {
        pattern: /^.+$/,
        message: 'reference is required'
      }
    ],
  },
  fields: {
    currency: '',
    tax_rate: '',
    sort_code: '',
    account_number: '',
    bank_name: '',
    reference: '',
    prayer_request_email: '',
    giving_url: '',
    isSearchable: false,
    enable_url_giving: false,
    enable_bank_transfer: false,
    enable_app_giving: false
  }
};

export const USER_RULES = {
  user: {
    first_name: [
      {
        pattern: /^.+$/,
        message: 'first name is required'
      },
      {
        pattern: /^.{0,50}$/,
        message: 'first name must be no more than 50 characters',
      },
    ],
    last_name: [
      {
        pattern: /^.+$/,
        message: 'last name is required'
      },
      {
        pattern: /^.{0,50}$/,
        message: 'last name must be no more than 50 characters',
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
    ],
    role: [
      {
        pattern: /^.+$/,
        message: 'role is required'
      }
    ],
    password: [
      { pattern: /^.+$/, message: 'password is required' },
      {
        pattern: /^.{0,20}$/,
        message: 'password must be no more than 20 characters',
      },
    ],
  },

  fields: {
    _id: '',
    first_name: '',
    last_name: '',
    mobile: '',
    email: '',
    role: '',
    user_status: false,
    password: '',
    change_password: false,
    edit: false,
  },
};

export const SLIDER_RULES = {
  slider: {
    title: [
      {
        pattern: /^.+$/,
        message: 'title is required'
      },
      {
        pattern: /^.{0,50}$/,
        message: 'title must be no more than 50 characters',
      },
    ],
    message: [
      {
        pattern: /^.+$/,
        message: 'message is required'
      },
      {
        pattern: /^.{0,90}$/,
        message: 'message must be no more than 90 characters',
      },
    ],
  },

  fields: {
    _id: '',
    title: '',
    message: '',
    status: false,
    imageOnly: false,
    edit: false,
    secure_url: '',
    public_id: '',
    upload_photo: false,
  },
};

export const CONTACT_RULES = {
  contact: {
    title: [
      {
        pattern: /^.+$/,
        message: 'title is required'
      },
      {
        pattern: /^.{0,31}$/,
        message: 'title must be no more than 50 characters',
      },
    ],
    fullNames: [
      {
        pattern: /^.+$/,
        message: 'fullNames is required'
      },
      {
        pattern: /^.{0,31}$/,
        message: 'fullNames must be no more than 50 characters',
      },
    ],
    phone: [
      {
        pattern: /^.+$/,
        message: 'phone is required'
      },
      {
        pattern: /^.{0,75}$/,
        message: 'phone must be no more than 20 characters',
      },
    ],
  },

  fields: {
    _id: '',
    title: '',
    fullNames: '',
    phone: '',
    status: false,
    edit: false,
  },
};

export const PUSH_NOTIFICATION_RULES = {
  pushNotification: {
    title: [
      {
        pattern: /^.+$/,
        message: 'title is required'
      },
      {
        pattern: /^.{0,31}$/,
        message: 'title must be no more than 31 characters',
      },
    ],
    message: [
      {
        pattern: /^.+$/,
        message: 'message is required'
      },
      {
        pattern: /^.{0,75}$/,
        message: 'message must be no more than 61 characters',
      },
    ],
  },

  fields: {
    _id: '',
    title: '',
    message: '',
    status: false,
    send_notification: false,
    edit: false,
  },
};

export const MEMBER_RULES = {
  member: {
    first_name: [
      {
        pattern: /^.+$/,
        message: 'first name is required'
      },
      {
        pattern: /^.{0,50}$/,
        message: 'first name must be no more than 50 characters',
      },
    ],
    last_name: [
      {
        pattern: /^.+$/,
        message: 'last name is required'
      },
      {
        pattern: /^.{0,50}$/,
        message: 'last name must be no more than 50 characters',
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
    _id: '',
    first_name: '',
    last_name: '',
    mobile: '',
    email: '',
    user_status: false,
    edit: false,
  },
};

export const TESTIMONY_RULES = {
  testimony: {
    first_name: [
      {
        pattern: /^.+$/,
        message: 'first name is required'
      },
      {
        pattern: /^.{0,50}$/,
        message: 'first name must be no more than 50 characters',
      },
    ],
    last_name: [
      {
        pattern: /^.+$/,
        message: 'last name is required'
      },
      {
        pattern: /^.{0,50}$/,
        message: 'last name must be no more than 50 characters',
      },
    ],
    description: [
      { pattern: /^.+$/, message: 'description is required' },
      {
        pattern: /^.{0,1000}$/,
        message: 'description must be no more than 1000 characters',
      },
    ]    

  },

  fields: {
    _id: '',
    first_name: '',
    last_name: '',
    description: '',   
    status: true,
    edit: false,
  },
};


