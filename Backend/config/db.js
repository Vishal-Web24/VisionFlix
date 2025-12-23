import mongoose from "mongoose";
export async function connectionToDb(params) {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log( "connected",conn.connection.host);
  } catch (err) {
    console.log( "error to mongoDB ",err.message);
  }
}
