import mongoose from "mongoose";

export const connectToDataBase = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return mongoose; 
    }

    const { connection } = await mongoose.connect(
      process.env.DATABASE_URL as string,
      { dbName: "nextAuth" }
    );
    console.log(`Connected to database: ${connection.host}`);
    
    return mongoose;
  } catch (error) {
    console.log('MongoDb not connected');
    throw new Error('Database connection failed');
  }
};
