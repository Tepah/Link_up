import {Schema, model} from 'mongoose';

// Define the schema for the Archive model
const archiveSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    date: { type: Date, required: true },
    attended: {type: [String], required: true },
    host: {type: String, required: true }
});

export const Archive = model('Archive', archiveSchema);
