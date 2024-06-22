import { Schema, model } from 'mongoose';

const ScheduleSchema = new Schema({
    userID: { type: String, required: true },
    name: { type: String, required: true },
    dates: { type: [Date], required: true },
});

export const Schedule = model('Schedule', ScheduleSchema);
