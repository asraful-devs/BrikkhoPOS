import { Request } from 'express';
import { prisma } from '../../../../lib/prisma';

const createWorker = async (req: Request) => {
    const payload = req.body;

    const result = await prisma.worker.create({
        data: payload,
    });
    return result;
};

export const WorkerService = {
    createWorker,
};
