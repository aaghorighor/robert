/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
const { UserInputError, ApolloError } = require('apollo-server');
const { Church } = require('../model');
const { identifierValidator } = require('../validation/identifierValidator');
const {
  contactValidator,
  updateAddressValidator,
  updateOneValidator,
  updateFeatureValidator
} = require('../validation/churchValidator');
const { logger } = require('../util/logger');

async function updateChurchContact({ suid }, body) {
  const identifierValidateResult = identifierValidator(suid);
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    );
  }

  const bodyErrors = contactValidator(body);
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    });
  }

  try {
    await Church.findByIdAndUpdate(suid, body, {
      new: true
    });

    return true;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Error updating church contact');
  }
}

async function updateFeatures({ suid }, features) {
  try {
    const validateResult = updateFeatureValidator({ features })
    if (validateResult.length) {
      throw new UserInputError(validateResult.map(it => it.message).join(','), {
        invalidArgs: validateResult.map(it => it.field).join(',')
      })
    }

    await Church.updateOne({ _id: suid }, { $set: { features } })
    return true
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Error while trying to update church features.')
  }
}

async function updateChurchAddress({ suid }, body) {
  const identifierValidateResult = identifierValidator(suid);
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    );
  }

  const bodyErrors = updateAddressValidator(body);
  if (bodyErrors.length) {
    throw new UserInputError(bodyErrors.map(it => it.message).join(','), {
      invalidArgs: bodyErrors.map(it => it.field).join(',')
    });
  }

  try {
    await Church.updateOne(
      { _id: suid },
      {
        $set: {
          address: body
        }
      }
    );

    return true;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Error updating church address');
  }
}

async function deleteChurch(id) {
  const identifierValidateResult = identifierValidator(id);
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    );
  }

  try {
    await Church.findByIdAndRemove(id);
    return true;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Error deleting church');
  }
}
async function getChurchById(id) {
  const identifierValidateResult = identifierValidator(id);
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    );
  }
  try {
    const church = await Church.findById(id);
    return church;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Error fetching church');
  }
}
async function getChurchByIdentifier(id) {
  const identifierValidateResult = identifierValidator(id);
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map(it => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map(it => it.field).join(',')
      }
    );
  }
  try {
    const church = await Church.findById(id, {
      name: 1,
      mobile: 1,
      email: 1,
      address: 1,
      contacts: 1,
      sliders: 1,
      secure_url: 1,
      public_id: 1,
      logo_url: 1,
      logo_id: 1,
      currency: 1,
      description: 1
    });
    return church;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Error fetching church');
  }
}
async function getChurchesByName(churchName) {
  try {
    const churches = await Church.find({ name: new RegExp(churchName, 'i') });
    return churches;
  } catch (error) {
    throw new ApolloError('Error fetching churches');
  }
}
async function updateBulk({ suid }, body) {
  try {
    await Church.findByIdAndUpdate(suid, body);
    return true;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Error updating contacts');
  }
}
async function updateOneChurch({ suid }, name, value) {
  const validateResult = updateOneValidator({ name, value });

  if (validateResult.length) {
    throw new UserInputError(
      validateResult.map(it => it.message).join(','),
      { invalidArgs: validateResult.map(it => it.field).join(',') }
    );
  }

  try {
    const updatedChurch = await Church.findByIdAndUpdate(
      suid,
      { $set: { [name]: value } },
      { new: true } // Return the updated document
    );

    if (!updatedChurch) {
      throw new ApolloError('Church not found or invalid ID');
    }

    return true;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Error updating church');
  }
}

async function getChurchesByCountryCode(countryCode) {
  try {
    const churches = await Church.find({
      'address.country_code': new RegExp(countryCode, 'i')
    });
    return churches;
  } catch (error) {
    throw new ApolloError('Error fetching churches');
  }
}
async function searchChurches(searchTerm) {
  try {
    const churches = await Church.find({
      $text: { $search: searchTerm }
    }).limit(100);
    return churches;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Error searching for churches');
  }
}
async function searchChurchesWithinRadius(latitude, longitude, radius) {
  try {
    const churches = await Church.find({
      'address.location': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseFloat(radius) * 1000
        }
      }
    }).limit(100);

    return churches;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Error searching for churches');
  }
}

module.exports = {
  updateChurchContact,
  updateChurchAddress,
  deleteChurch,
  getChurchById,
  getChurchesByName,
  updateBulk,
  updateOneChurch,
  getChurchesByCountryCode,
  searchChurches,
  searchChurchesWithinRadius,
  getChurchByIdentifier,
  updateFeatures
};
