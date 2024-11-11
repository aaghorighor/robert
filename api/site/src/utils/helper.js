import { useLocation } from 'react-router-dom';
import { saveAs } from 'file-saver';
import { utils, write } from 'xlsx';
const querystring = require('querystring');

const getQueryParam = () => {
  return new URLSearchParams(useLocation().search);
};

const getVAT = (rate, amount) => {
  return (amount * rate) / (100 + 20);
};

const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('cloud_name', process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
  formData.append(
    'upload_preset',
    process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
  );

  try {
    const response = await fetch(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      return {
        error: true,
        message: `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      secure_url: data.url,
      public_id: data.public_id,
      original_filename: data.original_filename,
      error: false,
    };
  } catch (err) {
    return {
      error: true,
      message: err.message,
    };
  }
};


const getPlanStatus = (status) => {
  if (status === 'active' || status === 'Active' || status === 'trialing') {
    return 'bg-success-light';
  }
  if (status === 'suspended' || status === 'Suspended') {
    return 'bg-warning-light';
  }
  if (status === 'incomplete' || status === 'Incomplete') {
    return 'bg-primary-light';
  }
  if (status === 'cancelled' || status === 'Cancelled') {
    return 'bg-danger-light';
  }
  return 'btn-color-13';
};

function convertToDateOnly(timestamp) {
  if (!timestamp) return;
  const timestampSeconds = parseInt(timestamp) / 1000;
  const dateObj = new Date(timestampSeconds * 1000);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const dateStr = `${year}-${month}-${day}`;

  return dateStr;
}

function convertTimestamp(timestamp) {
  if (!timestamp) return;
  const timestampSeconds = parseInt(timestamp) / 1000;
  const dateObj = new Date(timestampSeconds * 1000);

  return dateObj;
}

function completeAddress(address) {
  if (!address) return;
  let completeAddress = '';

  if (address.addressLine1) {
    completeAddress += address.addressLine1 + ', ';
  }

   if (address.town) {
    completeAddress += address.town + ', ';
  }

  if (address.county) {
    completeAddress += address.county + ', ';
  } 

  if (address.country) {
    completeAddress += address.country + ', ';
  }

  if (address.postcode) {
    completeAddress += address.postcode;
  }

  return completeAddress;
}

const stripeCustomerPortal = async (stripeCustomerId, token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/create-customer-portal-session`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stripeCustomerId: stripeCustomerId,
        }),
        credentials: 'include',
      },
    );

    if (!response.ok) {
      return {
        error: true,
        message: `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      url: data.url,
      error: false,
    };
  } catch (err) {
    return {
      error: true,
      message: err.message,
    };
  }
};

const dateConverter = (stringDate) => {
  const parts = stringDate.split('/');
  return `${parts[0]}-${parts[1]}-${parts[2]}`;
};

const timeStampConverter = (timestamp, localFormat) => {
  const formattedDate = new Date(parseInt(timestamp));
  return dateConverter(formattedDate.toLocaleDateString(localFormat));
};

const converterTimeStampToDate = (timestamp) => {
  const formattedDate = new Date(parseInt(timestamp));
  return formattedDate;
};

function formatCurrency(currencySymbol, amount) {
  const numericAmount = parseFloat(amount);

  if (isNaN(numericAmount) || !Number.isFinite(numericAmount)) {
    return 'Invalid amount';
  }

  let formattedAmount;
  if (numericAmount >= 1000000) {
    formattedAmount =
      (numericAmount / 1000000).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) + 'M';
  } else if (numericAmount >= 1000) {
    formattedAmount =
      (numericAmount / 1000).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) + 'K';
  } else {
    formattedAmount = numericAmount.toFixed(2);
  }

  return currencySymbol + formattedAmount;
}
async function onStripeOnBoarding(body) {
  try {
    const response = await fetch(process.env.REACT_APP_CREATE_STRIPE_CONNECT_ACCOUNT, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    const { url } = await response.json();
    window.location.href = url;

    return { success: true };
  } catch (error) {
    console.error('Error in onStripeOnBoarding:', error.message);
    return { success: false, error: error.message };
  }
}
async function onStripeDashboard(body) {
  try {
    const response = await fetch(process.env.REACT_APP_STRIPE_CONNECT_DASHBOARD, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    const { url } = await response.json();
    window.location.href = url;

    return { success: true };
  } catch (error) {
    console.error('Error in Stripe Dashboard:', error.message);
    return { success: false, error: error.message };
  }
}
async function searchAddress(query) {
  const params = {
    q: query,
    format: 'json',
    addressdetails: 1,
    polygon_geojson: 0,
  };

  const queryString = new URLSearchParams(params).toString();
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?${queryString}`,
      requestOptions,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error while fetching address:', error);
    return null;
  }
}
function formatAddressParts(address) {
  const { suburb, city, state, postcode, country, country_code, place } = address;
  const addressPartsToInclude = [];

  if (country_code === 'us' || country_code === 'gb') {
    const postcodeOrZipCode = postcode || '';
    addressPartsToInclude.push(suburb, city, state, postcodeOrZipCode, country);
  } else {
    addressPartsToInclude.push(place, city, state, country);
  }

  return addressPartsToInclude.join(', ');
}
function renderStatus(status) {
  switch (status) {
    case 'completed':
      return 'bg-success-light';
    case 'accepted':
      return 'bg-warning-light';
    case 'rejected':
      return 'bg-danger-light';
    default:
      return 'bg-primary-light';
  }
}

function renderStatusYesNo(status) {
  switch (status) {
    case true:
      return 'bg-success-light';
    case false:
      return 'bg-danger-light';
    default:
      return 'bg-primary-light';
  }
}

async function connectStripeCustomerPortal(token, currentUser) {
  const result = await stripeCustomerPortal(
    currentUser?.stripeCustomerId,
    currentUser.suid,
  );

  if (result?.url) {
    window.location.href = result.url;
  }
}

async function handleStripeConnect(currentUser) {
  const stripeConnectParams = {
    client_id: process.env.REACT_APP_STRIPE_CONNECT_KEY,
    scope: 'read_write',
    state: currentUser.suid,
    return_url: process.env.REACT_APP_STRIPE_CONNECT_REDIRECT,
    response_type: 'code',
    'stripe_user[email]': currentUser?.email,
    'stripe_user[first_name]': currentUser?.first_name,
    'stripe_user[last_name]': currentUser?.last_name,
  };

  const reqQuery = querystring.stringify(stripeConnectParams);
  const url = `https://connect.stripe.com/oauth/authorize?${reqQuery}`;
  window.location.href = url;
};

function Download(data, name) {
  const ws = utils.json_to_sheet(data); // Where data is your JSON array
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Sheet1");

  // Write workbook (use type 'binary')
  const wbout = write(wb, { bookType: 'xlsx', type: 'binary' });

  // Convert binary string to character array
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

  // Trigger download
  saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), `${name}.xlsx`);
}

const animation = ({ name, delay }) => {
  return {
    animationName: name,
    animationDelay: delay,
    animationFillMode: 'both',
    animationDuration: '700ms',
    animationDirection: 'normal',
    animationTimingFunction: 'ease',
  };
};

const slideInDownAnimate = (delay) => animation({ name: 'slideInDown', delay });
const zoomInAnimate = (delay) => animation({ name: 'zoomIn', delay });
const fadeInAnimate = (delay) => animation({ name: 'fadeIn', delay });

function convertToShortDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString(undefined, options);
}

function convertToUnix(dateString) {
  const date = new Date(dateString);
  const unixTimestamp = date.getTime();
  return unixTimestamp
}

function convertFromUnix(unixTimestamp) {
  const formattedDate = new Date(unixTimestamp * 1000); 
  return formattedDate;
}

export {
  getQueryParam,
  getVAT,
  uploadImage,
  getPlanStatus,
  convertToDateOnly,
  convertTimestamp,
  completeAddress,
  stripeCustomerPortal,
  dateConverter,
  timeStampConverter,
  formatCurrency,
  onStripeOnBoarding,
  renderStatus,
  renderStatusYesNo,
  connectStripeCustomerPortal,
  slideInDownAnimate,
  zoomInAnimate,
  fadeInAnimate,
  searchAddress,
  formatAddressParts,
  handleStripeConnect,
  Download,
  onStripeDashboard,
  converterTimeStampToDate,
  convertToShortDate,
  convertToUnix,
  convertFromUnix
};
