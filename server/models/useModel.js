// Import mongoose
import mongoose from 'mongoose';

// Destructure Schema from mongoose
const { Schema } = mongoose;

// Define the user schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        max: 15,
        min: 8,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatarSource: {
        type: String,
        default: "",
    }
});

// Export the User model as the default export
export default mongoose.model('User', userSchema);
