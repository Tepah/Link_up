import { Request, Response } from 'express';
import { IncompletePlan } from '../models/IncompletePlan';
import {Schedule} from "../models/Schedule";

/**
 * Retrieves Incomplete plans from the database.
 *
 * @async
 * @function getIncompletePlans
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @throws {Error} If an error occurs during database retrieval.
 */
export const getIncompletePlans = async (req: Request, res: Response) => {
    try {
        const IncompletePlans = await IncompletePlan.find();
        res.json(IncompletePlans);
    } catch (error) {
        res.status(500).send(error);
    }
}

/**
 * Retrieves an Incomplete plan from the database by ID.
 *
 * @async
 * @function getIncompletePlansById
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @throws {Error} If an error occurs during database retrieval.
 */
export const getIncompletePlansById = async (req: Request, res: Response) => {
    try {
        const incompletePlan = await IncompletePlan.findById(req.params.id);
        res.json(incompletePlan);
    } catch (error) {
        res.status(500).send(error);
    }
}

/**
 * Retrieves all Incomplete plans for the current user by first getting all the user's schedules
 * and then finding all incomplete plans that have those schedule IDs in the schedules array.
 *
 * @async
 * @function getIncompletePlansByUser
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @throws {Error} If an error occurs during database retrieval.
 */
export const getIncompletePlansByUser = async (req: Request, res: Response) => {
    try {
        const getAllUserSchedules = await Schedule.find({ userID: req.params.id });

        const incompletePlansPromises = getAllUserSchedules.map(async (schedule) => {
            return IncompletePlan.find({ schedules: schedule._id });
        })

        const incompletePlans = await Promise.all(incompletePlansPromises);
        res.json(incompletePlans.flat());
    } catch (error) {
        res.status(500).send(error);
    }
}

/**
 * Creates a new Incomplete plan in the database.
 *
 * @async
 * @function createIncompletePlan
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @throws {Error} If an error occurs during database insertion.
 */
export const createIncompletePlan = async (req: Request, res: Response) => {
    try {
        const incompletePlan = new IncompletePlan(req.body);
        await incompletePlan.save();
        res.status(201).json(incompletePlan);
    } catch (error) {
        res.status(400).send(error);
    }
}

/**
 * Updates an Incomplete plan in the database.
 *
 * @async
 * @function updateIncompletePlan
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @throws {Error} If an error occurs during database update.
 */
export const updateIncompletePlan = async (req: Request, res: Response) => {
    try {
        const incompletePlan = await IncompletePlan.findByIdAndUpdate(req.body);
        if (!incompletePlan) {
            return res.status(404).send('Incomplete plan not found');
        }
        res.json(incompletePlan);
    } catch (error) {
        res.status(500).send(error);
    }
}

/**
 * Deletes an Incomplete plan from the database.
 * @async
 * @function deleteIncompletePlan
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @throws {Error} If an error occurs during database deletion.
 */
export const deleteIncompletePlan = async (req: Request, res: Response) => {
    try {
        const incompletePlan = await IncompletePlan.findByIdAndDelete(req.params.id);
        if (!incompletePlan) {
            return res.status(404).send('Incomplete plan not found');
        }
        res.json(incompletePlan);
    } catch (error) {
        res.status(500).send(error);
    }
}
