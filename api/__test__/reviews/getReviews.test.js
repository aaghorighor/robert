/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const { UserInputError } = require('apollo-server');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Review = require('../../model/review');
const { getReviews } = require('../../services/reviewService');

describe('getReviews', () => {
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

  it('should return sorted reviews when passed a valid id', async () => {
    // Arrange
    const review1 = new Review({ /* your review data */ });
    const review2 = new Review({ /* your review data */ });
    const review3 = new Review({ /* your review data */ });

    // Save them to in-memory DB
    await review1.save();
    await review2.save();
    await review3.save();

    // Act
    const reviews = await getReviews(review1._id);

    // Assert
    expect(reviews[0]._id).toEqual(review1._id);
    // Add more assertions as needed
  });

  it('should throw UserInputError when passed an invalid id', async () => {
    // Arrange
    const invalidId = 'invalidId';

    // Act and Assert
    await expect(getReviews(invalidId)).rejects.toThrow(UserInputError);
  });
});
