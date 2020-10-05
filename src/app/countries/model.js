import { model, Schema } from 'mongoose';

const countrySchema = new Schema(
  {
    countryId: { type: Number, required: true, unique: true },
    shortName: { type: String, required: true },
    fullName: { type: String, required: true },
    continent: { type: String, required: true }
  },
  { timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' } }
);

const Country = model('countries', countrySchema);
export default Country;
