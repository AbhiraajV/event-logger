import mongoose from "mongoose";
export const DbConnect = async () => {
  mongoose.set("strictQuery", true);
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    })
    .then(() => console.log("Connected to the DB :D"))
    .catch((error) => console.log("Mongo connection failed", error));
};
