/* eslint-disable linebreak-style */
const { UserInputError, ApolloError } = require('apollo-server');
const User = require('../../model/user');
const { removeUser } = require('../../services/userService');

// Mocking the identifierValidator function
jest.mock('../../validation/identifierValidator', () => (id) => {
  if (id === 'invalid_id') {
    return [{ field: 'id', message: 'Invalid identifier' }];
  }
  return [];
});

describe('removeUser', () => {
  it('should remove a user and return true', async () => {
    // Mocking the findByIdAndRemove function
    User.findByIdAndRemove = jest.fn().mockResolvedValue();

    const result = await removeUser('valid_id');

    expect(User.findByIdAndRemove).toHaveBeenCalledWith('valid_id');
    expect(result).toBe(true);
  });

  it('should throw UserInputError when identifier is invalid', async () => {
    // Mocking the findByIdAndRemove function
    User.findByIdAndRemove = jest.fn().mockResolvedValue();

    try {
      await removeUser('invalid_id');
    } catch (error) {
      expect(error).toBeInstanceOf(UserInputError);
      expect(error.message).toBe('Invalid identifier');
      expect(error.extensions).toEqual({ invalidArgs: 'id' });
    }
  });

  it('should throw ApolloError when an error occurs during removal', async () => {
    // Mocking the findByIdAndRemove function to throw an error
    const errorMessage = 'Something went wrong';
    User.findByIdAndRemove = jest
      .fn()
      .mockRejectedValue(new Error(errorMessage));

    try {
      await removeUser('valid_id');
    } catch (error) {
      expect(error).toBeInstanceOf(ApolloError);
      expect(error.message).toBe(errorMessage);
    }
  });
});
