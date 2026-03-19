import cors from 'cors';
import express, { Application, Request, Response,  } from 'express';
import userRoutes from './routes/user.route';
import productRoutes from './routes/product.route';
const port = 3000

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Application routes
// user routes 
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products',productRoutes );

// Testing route
app.get('/', (req: Request, res: Response) => {
  res.send('Ecomart Server is running!');
});

// Not found route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});


export default app;
