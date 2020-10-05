import { model, Schema } from 'mongoose';

const itinerarySchema = new Schema(
  {
    itineraryId: { type: Number, required: true, unique: true },
    cityId: { type: Number, required: true },
    countryId: { type: Number, required: true },
    userId: { type: Number, required: true },
    title: { type: String, required: true },
    rating: { type: Number, required: true },
    duration: { type: Number, required: true },
    price: { type: String, required: true },
    hashtags: [{ type: String, required: true }]
  },
  { timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' } }
);

const Itinerary = model('itineraries', itinerarySchema);
export default Itinerary;
