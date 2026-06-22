import { connectDB } from "@/lib/db/mongoose";
import AboutContent from "@/models/about.model";

function serializeAbout(doc: any) {
  if (!doc) return null;
  const obj = { ...doc };
  if (doc._id) obj.id = doc._id.toString();
  return obj;
}

/**
 * Get About Page content document. Creates one with default values if none exist.
 */
export async function getAboutContent() {
  await connectDB();
  let content = await AboutContent.findOne({}).lean();
  if (!content) {
    const created = await AboutContent.create({});
    content = created.toObject();
  }
  return serializeAbout(content);
}

/**
 * Update About Page content document.
 */
export async function updateAboutContent(data: {
  heroCaption?: string;
  heroTitle?: string;
  heroDescription?: string;
  narrativeTitle1?: string;
  narrativeDescription1?: string;
  narrativeTitle2?: string;
  narrativeDescription2?: string;
  narrativeImage?: string;
  narrativeImagePublicId?: string;
  quoteText?: string;
  quoteAuthor?: string;
}) {
  await connectDB();
  let content = await AboutContent.findOne({});
  if (content) {
    content.set(data);
    await content.save();
  } else {
    content = await AboutContent.create(data);
  }
  return serializeAbout(content.toObject());
}
