import mongoose from 'mongoose';

const userSchema = ({
    email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
})


const User = mongoose.model('User', userSchema);
export default User;
