import { model, Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    activityId: { type: Number, required: true, unique: true },
    itineraryId: { type: Number, required: true },
    cityId: { type: Number, required: true },
    countryId: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
  },
  { timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' } }
);

const Activity = model('activities', activitySchema);
export default Activity;
