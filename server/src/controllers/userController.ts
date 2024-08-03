import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getUser = async ( req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id, '-password');
        res.json(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            const valid = await bcrypt.compare(password, user.password);
            if (valid) {
                res.status(200).json(user);
            } else {
                res.status(401).send('Invalid credentials');
            }
        } else {
            return res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, name, email, password: hashedPassword });

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

