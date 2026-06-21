import { AnnouncementBar, Navbar, Footer } from "@/components/layout";
import { getStripes } from "@/services/stripe.service";

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let headerText = undefined;
  try {
    const stripes = await getStripes();
    headerText = stripes.header?.[0];
  } catch (error) {
    console.error("Failed to load header stripe content:", error);
  }

  return (
    <>
      <AnnouncementBar content={headerText} />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
