import { Schema, model } from 'mongoose';

const incompletePlanSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    schedules: { type: [String], required: true },
    host: { type: String, required: true }
});

export const IncompletePlan = model('UnconfirmedPlan', incompletePlanSchema);
