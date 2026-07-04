import { createPageMetadata } from "@/lib/seo";

const AboutPage = () => {
  return (
    <div>
       <main className="w-full h-screen! container center text-center">
      <h1>404 - Page Not Found</h1>
    </main>
    </div>
  );
};

export default AboutPage;

export async function generateMetadata() {
  return createPageMetadata("/about");
}
