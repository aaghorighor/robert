const mongoose = require('mongoose');

const { Schema } = mongoose;

const CampaignContributionSchema = new Schema(
  {
    amount: { type: Number, required: true },
    first_name: {
      type: String,
      trim: true,
      required: true,
    },
    last_name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: false,
      required: false,
      default: '',
    },
    campaign: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model(
  'CampaignContribution',
  CampaignContributionSchema,
);
