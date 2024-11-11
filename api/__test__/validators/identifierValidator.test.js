/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

const {
  identifierValidator,
} = require('../../validation/identifierValidator');

describe('identifierValidator', () => {
  it('should return an empty array when the identifier is valid', () => {
    const validId = 'valid_id';

    const result = identifierValidator(validId);

    expect(result).toEqual([]);
  });

  it('should return an array with validation errors when the identifier is invalid', () => {
    const invalidId = 'invalid_id';

    const result = identifierValidator(invalidId);

    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty('field', '_id');
    expect(result[0]).toHaveProperty(
      'message',
      'The _id field must be a valid ObjectID.',
    );
  });
});
