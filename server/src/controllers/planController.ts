import { Request, Response } from 'express';
import { Plan } from '../models/Plan';

export const getPlans = async (req: Request, res: Response) => {
    try {
        const plans = await Plan.find();
        res.json(plans);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getPlanByID = async ( req: Request, res: Response) => {
    try {
        const plan = await Plan.findById(req.params.id);
        res.json(plan);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getPlansByUserID = async ( req: Request, res: Response) => {
    try {
        const plans = await Plan.find({ attending: req.params.id })
        res.json(plans);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getPlansByHostID = async ( req: Request, res: Response) => {
    try {
        const plans = await Plan.find({ host: req.params.id })
        res.json(plans);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const createPlan = async (req: Request, res: Response) => {
    try {
        const plan = new Plan(req.body);
        await plan.save();
        res.status(201).json(plan);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const deletePlan = async (req: Request, res: Response) => {
    try {
        const plan = await Plan.findByIdAndDelete(req.params.id);
        if (!plan) {
            return res.status(404).send('Plan not found');
        }
        res.json(plan);
    } catch (error) {
        res.status(500).json(error);
    }
}
