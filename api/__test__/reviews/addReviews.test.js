/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const { UserInputError, ApolloError } = require('apollo-server');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Review = require('../../model/review');
const { addReview } = require('../../services/reviewService');
const { identifierValidator } = require('../../validation/identifierValidator');
const { reviewValidator } = require('../../validation/reviewValidator');

jest.mock('../../model/review');

describe('addReview', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  let mongoServer;

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = mongoServer.getUri();
    mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should throw UserInputError when identifierValidator returns errors', async () => {
    // Arrange
    const identifierValidateResult = [{ message: 'Error', field: 'id' }];
    identifierValidator.mockReturnValue(identifierValidateResult);
    const id = 'invalidId';
    const body = {};

    // Act and Assert
    await expect(addReview({ id }, body)).rejects.toThrow(UserInputError);
    expect(identifierValidator).toHaveBeenCalledWith(id);
  });

  it('should throw UserInputError when reviewValidator returns errors', async () => {
    // Arrange
    const validateResult = [{ message: 'Error', field: 'body' }];
    reviewValidator.mockReturnValue(validateResult);
    const id = 'validId';
    identifierValidator.mockReturnValue([]);
    const body = { star: 6 }; // assume this is invalid

    // Act and Assert
    await expect(addReview({ id }, body)).rejects.toThrow(UserInputError);
    expect(reviewValidator).toHaveBeenCalledWith(body);
  });

  it('should throw ApolloError when saving review throws error', async () => {
    // Arrange
    const id = 'validId';
    identifierValidator.mockReturnValue([]);
    reviewValidator.mockReturnValue([]);
    const body = { star: 4 }; // assume this is valid
    Review.mockImplementation(() => {
      throw new Error();
    });

    // Act and Assert
    await expect(addReview({ id }, body)).rejects.toThrow(ApolloError);
  });

  it('should return a review when passed valid parameters', async () => {
    // Arrange
    const id = 'validId';
    identifierValidator.mockReturnValue([]);
    reviewValidator.mockReturnValue([]);
    const body = { star: 4 }; // assume this is valid
    const expectedReview = new Review(body);
    Review.mockImplementation(() => expectedReview);

    // Act
    const result = await addReview({ id }, body);

    // Assert
    expect(result).toEqual(expectedReview);
    expect(Review).toHaveBeenCalledWith(body);
  });
});
