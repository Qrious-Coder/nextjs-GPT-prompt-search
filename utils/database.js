import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(isConnected){
    console.log('MongoDB is already connected')
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: '',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    isConnected = true;
    console.log('MongoDB is connected')
  } catch (err) {
    console.error(err)
  }
}