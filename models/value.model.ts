import mongoose, { Schema, Document, Model } from "mongoose";

export interface IValueItem extends Document {
  title: string;
  description: string;
  iconName: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ValueItemSchema = new Schema<IValueItem>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    iconName: {
      type: String,
      required: [true, "Icon name is required"],
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const ValueItem: Model<IValueItem> =
  (mongoose.models.ValueItem as Model<IValueItem>) ||
  mongoose.model<IValueItem>("ValueItem", ValueItemSchema);

export default ValueItem;
