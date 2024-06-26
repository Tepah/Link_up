import { Request, Response } from 'express';
import { Schedule } from '../models/Schedule';

/**
 * Retrieves all schedules from the database.
 *
 * @async
 * @function getSchedules
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @throws {Error} If an error occurs during database retrieval.
 */
export const getSchedules = async (req: Request, res: Response) => {
    try {
        const schedules = await Schedule.find();
        res.json(schedules);
    } catch (error) {
        res.status(500).send(error);
    }
}

/**
 * Retrieves a schedule from the database by ID.
 *
 * @async
 * @function getScheduleById
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @throws {Error} If an error occurs during database retrieval.
 */
export const getScheduleById = async (req: Request, res: Response) => {
    try {
        const schedule = await Schedule.findById(req.params.id);
        res.json(schedule);
    } catch (error) {
        res.status(500).send(error);
    }
}

/**
 * Creates a new schedule in the database.
 *
 * @async
 * @function createSchedule
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @throws {Error} If an error occurs during database insertion.
 */
export const createSchedule = async (req: Request, res: Response) => {
    try {
        const newSchedule = await Schedule.create(req.body);
        res.json(newSchedule);
    } catch (error) {
        res.status(500).send(error);
    }
}

/**
 * Updates a schedule in the database by ID.
 *
 * @async
 * @function updateSchedule
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @throws {Error} If an error occurs during database update.
 */
export const updateSchedule = async (req: Request, res: Response) => {
    try {
        const updatedSchedule = await Schedule.findByIdAndUpdate(req.params.id, req.body);
        res.json(updatedSchedule);
    } catch (error) {
        res.status(500).send(error);
    }
}

/**
 * Deletes a schedule from the database by ID.
 *
 * @async
 * @function deleteSchedule
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @throws {Error} If an error occurs during database deletion.
 */
export const deleteSchedule = async (req: Request, res: Response) => {
    try {
        const deletedSchedule = await Schedule.findByIdAndDelete(req.params.id);
        res.json(deletedSchedule);
    } catch (error) {
        res.status(500).send(error);
    }
}
