const Validator = require('fastest-validator')

function sliderValidator(data) {
  const validator = new Validator()
  const schema = {
    title: { type: 'string', empty: false, max: 50 },
    message: { type: 'string', empty: false, max: 90 }
  }
  return validator.validate(data, schema)
}

module.exports = {
  sliderValidator
}
