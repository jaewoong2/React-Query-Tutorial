import { IPerson } from '@src/lib/Interfaces/IPerson';
import { NextApiRequest, NextApiResponse } from 'next';
// /person 

export default (_req: NextApiRequest, res: NextApiResponse<IPerson>): void => {
    res.status(200).json({ id: '1', name: 'Jone Doe', age: 25 })
}