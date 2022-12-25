import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    event: { type: String, required: true },
    creator: { type: String, required: true },
    callback: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Event = mongoose.model("Event", EventSchema);
