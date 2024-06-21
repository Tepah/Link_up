import { Schema, model } from 'mongoose';

const PlanSchema = new Schema ({
    title: { type: String, required: true },
    description: { type: String, required: false},
    date: { type: Date, required: true},
    attending: {type: [String], required: true},
    host: {type: String, required: true}
})

export const Plan = model('Plan', PlanSchema);
