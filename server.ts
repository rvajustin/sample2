import express, { Request, Response } from 'express';

const app = express();
const PORT = 80;

// Define a simple route to serve "Hello, World!"
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});