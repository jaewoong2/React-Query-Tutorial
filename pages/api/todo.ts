import { ITodo } from './../../src/lib/Interfaces/ITodo';
import { NextApiRequest, NextApiResponse } from 'next';

export default (_req: NextApiRequest, res: NextApiResponse<ITodo>): void => {
    res.status(200).json({ message: 'I am a todo' });
};