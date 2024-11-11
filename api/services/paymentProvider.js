/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const { UserInputError } = require('apollo-server');
const {
  paymentProviderValidator,
} = require('../validation/paymentProviderValidator');
const { identifierValidator } = require('../validation/identifierValidator');

const Church = require('../model/church');

const addPaymentProvider = async ({ suid }, body) => {
  const paymentProviderValidateResult = paymentProviderValidator({
    name: body.name,
  });
  if (paymentProviderValidateResult.length) {
    throw new UserInputError(
      paymentProviderValidateResult.map((it) => it.message).join(','),
      {
        invalidArgs: paymentProviderValidateResult
          .map((it) => it.field)
          .join(','),
      },
    );
  }

  const church = await Church.findOneAndUpdate(
    { suid },
    { $push: { payment_provider: body } },
    { new: true },
  ).exec();

  const newPaymentProvider = church.payment_provider[church.payment_provider.length - 1];
  return newPaymentProvider;
};

const updateOnePaymentProvider = async ({ suid }, id, body) => {
  const { name, key, secret, active } = body;

  const identifierValidateResult = identifierValidator(suid);
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map((it) => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map((it) => it.field).join(','),
      },
    );
  }

  const paymentProviderValidateResult = paymentProviderValidator({ name });
  if (paymentProviderValidateResult.length) {
    throw new UserInputError(
      paymentProviderValidateResult.map((it) => it.message).join(','),
      {
        invalidArgs: paymentProviderValidateResult
          .map((it) => it.field)
          .join(','),
      },
    );
  }

  await Church.updateOne(
    { suid, 'payment_provider._id': id },
    {
      $set: {
        'payment_provider.$.name': name,
        'payment_provider.$.key': key,
        'payment_provider.$.secret': secret,
        'payment_provider.$.active': active,
      },
    },
  ).exec();

  return true;
};

const removeOnePaymentProvider = async ({ suid }, id) => {
  const identifierValidateResult = identifierValidator(suid);
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map((it) => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map((it) => it.field).join(','),
      },
    );
  }

  await Church.findByIdAndUpdate(
    suid,
    { $pull: { payment_provider: { _id: id } } },
    { new: true },
  ).exec();

  return true;
};

const fetchPaymentProviders = async (suid) => {
  const identifierValidateResult = identifierValidator(suid);
  if (identifierValidateResult.length) {
    throw new UserInputError(
      identifierValidateResult.map((it) => it.message).join(','),
      {
        invalidArgs: identifierValidateResult.map((it) => it.field).join(','),
      },
    );
  }

  const church = await Church.findOne({ _id: suid });
  const payment_provider = church.payment_provider.sort(
    (a, b) => b.createdAt - a.createdAt,
  );

  return payment_provider;
};

module.exports = {
  addPaymentProvider,
  updateOnePaymentProvider,
  removeOnePaymentProvider,
  fetchPaymentProviders,
};
