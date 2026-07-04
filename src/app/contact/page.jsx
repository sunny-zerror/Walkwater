import { createPageMetadata } from "@/lib/seo";

const ContactPage = () => {
  return (
    <>
       <main className="w-full h-screen! container center text-center">
      <h1>404 - Page Not Found</h1>
    </main>
    </>
  );
};

export default ContactPage;

export async function generateMetadata() {
  return createPageMetadata("/contact");
}
