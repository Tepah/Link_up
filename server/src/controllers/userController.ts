import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
                res.status(200).json({ token, user });
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
        let { username, name, email, password } = req.body;

        email = email.toLowerCase();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send('User already exists');
        }

        // Check if password is valid
        if (password.length < 6) {
            return res.status(400).send('Password must be at least 6 characters long');
        } else {
            const hasNumber = /\d/.test(password);
            const hasUpper = /[A-Z]/.test(password);
            const hasLower = /[a-z]/.test(password);
            if (!hasNumber || !hasUpper || !hasLower) {
                return res.status(400).send('Password must contain at least one uppercase letter, one lowercase letter, and one number');
            }
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, name, email, password: hashedPassword });

        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
        res.status(201).json({ token, user });
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

export const authenticateToken = (req: Request, res: Response, next: any) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Access denied');
    }
    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }
        req.user = user;
        next();
    })
}
