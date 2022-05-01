import { NextApiRequest, NextApiResponse } from 'next';
import { IPerson } from '@src/lib/Interfaces/IPerson';

export default (req: NextApiRequest, res: NextApiResponse<IPerson>): void => {
    const data: IPerson = JSON.parse(req.body);
    res.status(200).json(data);
};