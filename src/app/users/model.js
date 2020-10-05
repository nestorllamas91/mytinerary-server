import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    userId: { type: Number, required: true, unique: true },
    countryId: { type: Number, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true }
    },
    isLoggedIn: { type: Boolean, required: true }
  },
  { timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' } }
);

const User = model('users', userSchema);
export default User;
