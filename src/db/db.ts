import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoUrl = process.env.MONGODB_URL ? process.env.MONGODB_URL : '';

export async function connect () {
  try {
    await mongoose.connect(
      mongoUrl
    );
    
    console.log("Connected to the database!");
  } catch (error) {
    console.log(`Erro: ${error}`);
  };
};

export async function disconnect() {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from the database!");
  } catch (error) {
    console.log(`Erro: ${error}`);
  }
}