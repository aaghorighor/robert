const Validator = require('fastest-validator');

function reviewValidator(data) {
  const validator = new Validator();
  const schema = {
    star: { type: 'number', integer: true, min: 1, max: 5 },
    desc: { type: 'string', empty: false, max: 1000 },
  };
  return validator.validate(data, schema);
}

module.exports = { reviewValidator };
