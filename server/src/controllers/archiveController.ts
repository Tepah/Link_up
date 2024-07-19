import { Request, Response } from 'express';
import { Archive } from '../models/Archive';

export const getArchives = async (req: Request, res: Response) => {
    try {
        const archives = await Archive.find();
        res.json(archives);
    } catch (error) {
        res.status(500).send
    }
}

export const getArchiveByID = async (req: Request, res: Response) => {
    try {
        const archive = await Archive.findById(req.params.id);
        res.json(archive);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getArchivesByUserID = async (req: Request, res: Response) => {
    try {
        const archives = await Archive.find({ attended: req.params.id });
        res.json(archives);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const createArchive = async (req: Request, res: Response) => {
    try {
        const archive = new Archive(req.body);
        await archive.save();
        res.status(201).json(archive);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const updateArchive = async (req: Request, res: Response) => {
    try {
        const archive = await Archive.findByIdAndUpdate(req.params.id, req.body);
        res.json(archive);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteArchive = async (req: Request, res: Response) => {
    try {
        const archive = await Archive.findByIdAndDelete(req.params.id);
        if (!archive) {
            return res.status(404).send('Archive not found');
        }
        res.json(archive);
    } catch (error) {
        res.status(500).json(error);
    }
}
