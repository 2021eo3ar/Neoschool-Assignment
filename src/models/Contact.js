import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: null },
    linkedin: { type: String, default: null },
    twitter: { type: String, default: null },
});

export default mongoose.model('Contact', ContactSchema);

