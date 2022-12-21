import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    id_type: {
        type: String,
        required: true,
    }
});

const User = mongoose.model("user", userSchema);
export { User };
