import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAboutContent extends Document {
  heroCaption: string;
  heroTitle: string;
  heroDescription: string;
  narrativeTitle1: string;
  narrativeDescription1: string;
  narrativeTitle2: string;
  narrativeDescription2: string;
  narrativeImage: string;
  narrativeImagePublicId?: string;
  quoteText: string;
  quoteAuthor: string;
  createdAt: Date;
  updatedAt: Date;
}

const AboutContentSchema = new Schema<IAboutContent>(
  {
    heroCaption: {
      type: String,
      default: "Our Story",
      trim: true,
    },
    heroTitle: {
      type: String,
      default: "Crafting Simplicity. Inspiring Timelessness.",
      trim: true,
    },
    heroDescription: {
      type: String,
      default: "SAN was born from a desire to strip away the noise of modern fast fashion and return to what clothing was always meant to be: comfortable, beautiful, and built to endure.",
      trim: true,
    },
    narrativeTitle1: {
      type: String,
      default: "Design with Intention",
      trim: true,
    },
    narrativeDescription1: {
      type: String,
      default: "We believe that every piece of clothing should serve a clear purpose in your life. We do not design for temporary trends or seasons; we design for longevity, style, and ease. Our collections feature relaxed silhouettes, natural fabrics, and muted tones that integrate seamlessly into any wardrobe.",
      trim: true,
    },
    narrativeTitle2: {
      type: String,
      default: "Ethical & Transparent Craftsmanship",
      trim: true,
    },
    narrativeDescription2: {
      type: String,
      default: "Every thread in a SAN garment tells a story of care and respect. We partner only with mills and workshops that share our commitment to fair wages, safe conditions, and low environmental impact. By manufacturing in limited quantities, we eliminate waste and ensure that each detail is finished to the highest standards.",
      trim: true,
    },
    narrativeImage: {
      type: String,
      default: "/hero-bg.png",
      trim: true,
    },
    narrativeImagePublicId: {
      type: String,
      trim: true,
    },
    quoteText: {
      type: String,
      default: "Minimalism is not about having less. It is about making room for what truly matters.",
      trim: true,
    },
    quoteAuthor: {
      type: String,
      default: "— The SAN Philosophy",
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const AboutContent: Model<IAboutContent> =
  (mongoose.models.AboutContent as Model<IAboutContent>) ||
  mongoose.model<IAboutContent>("AboutContent", AboutContentSchema);

export default AboutContent;
