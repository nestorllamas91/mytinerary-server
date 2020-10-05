import { model, Schema } from 'mongoose';

const citySchema = new Schema(
  {
    cityId: { type: Number, required: true, unique: true },
    countryId: { type: Number, required: true },
    name: { type: String, required: true }
  },
  { timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' } }
);

const City = model('cities', citySchema);
export default City;
