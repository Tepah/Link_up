import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import planRoutes from './routes/planRoutes';

require("dotenv").config();

const app = express();
const PORT = 3000

// @ts-ignore
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('Error connecting to MongoDB', error);
})

app.use(express.json());
app.use(userRoutes);
app.use(planRoutes);

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000')
})
