import mongoose from 'mongoose';
import 'dotenv/config';
import app from './app';


async function main() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('Database URL is not provided in environment variables');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully');
 
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

main();

export default app;