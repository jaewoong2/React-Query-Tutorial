import { IPerson } from './../../../src/lib/Interfaces/IPerson';
import { NextApiRequest, NextApiResponse } from 'next';
// api/person/:id


export default (req: NextApiRequest, res: NextApiResponse<IPerson | Error>): void => {
    const { query: { id } } = req;


    if (typeof id === 'string') {
        res.status(200).json({ id, name: 'Jone Doe', age: 25 });
    } else {
        res.status(500).json(new Error('id is not of string | number type'));

    }
}