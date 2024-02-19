import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(url, { dbName: "ai-image-generator" })
    .then(() => console.log("Mongo Db connected"))
    .catch((err) => console.log("Error connecting MongoDB", err));
};

export default connectDB;
