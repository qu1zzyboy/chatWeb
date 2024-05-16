import mongoose from "mongoose"
const { Schema } = mongoose;
const { model } = mongoose;
const messageSchema = new Schema({
    message: {
        text: {
            type: String,
            required: true
        },
        user: Array,
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
    },

}, {
    timestamps: true,
});

export default model("message", messageSchema)