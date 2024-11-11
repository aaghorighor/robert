/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

const { identifierValidators } = require('../../validation/identifierValidator');

describe('identifierValidators', () => {
  it('should return an array of errors for invalid IDs', () => {
    const ids = ['123', '456', '789'];
    const result = identifierValidators(ids);

    expect(result).toHaveLength(3);
  });

  it('should return an empty array for valid IDs', () => {
    const ids = ['60a85b8642a06a15e8a5e5b3', '60a85b8642a06a15e8a5e5b4'];
    const result = identifierValidators(ids);

    expect(result).toHaveLength(0);
  });

  it('should return an empty array for an empty input', () => {
    const ids = [];
    const result = identifierValidators(ids);

    expect(result).toHaveLength(0);
  });
});
