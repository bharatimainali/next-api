// Import the necessary types
import { NextApiRequest, NextApiResponse } from 'next';
// Import the fruits array
import fruits from '../../../app/data/fruits';

// Define the handler function with proper types for req and res
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;

    switch (method) {
        case 'GET':
            res.status(200).json({ fruits });
            break;
        case 'POST':
            const { name } = req.body;
            // Generate a new ID based on the length of the current fruits array
            const newId = fruits.length + 1;
            fruits.push({
                id: newId,
                name,
            });
            res.status(200).json(fruits);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}
