import { connectDB } from "../lib/db/mongoose";
import Stripe from "../models/stripe.model";

async function run() {
  await connectDB();
  const stripes = await Stripe.find().lean();
  console.log("DB Stripes Sample:", stripes);
  process.exit(0);
}

run().catch(console.error);
