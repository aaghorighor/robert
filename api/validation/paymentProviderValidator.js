const Validator = require('fastest-validator');

function paymentProviderValidator(data) {
  const validator = new Validator();
  const doctorSchema = {
    name: { type: 'string', min: 3, max: 50, optional: true },
  };

  return validator.validate(data, doctorSchema);
}

function amountValidator(data) {
  const validator = new Validator();
  const doctorSchema = {
    amount: { type: 'number', positive: true, required: true },
  };

  return validator.validate(data, doctorSchema);
}

module.exports = {
  paymentProviderValidator,
  amountValidator,

};
