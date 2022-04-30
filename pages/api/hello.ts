import { NextApiRequest, NextApiResponse } from 'next';

const hello = (_req: NextApiRequest, res: NextApiResponse): void => {
    res.status(200).json({ name: 'John Doe' });
};

export default hello;
