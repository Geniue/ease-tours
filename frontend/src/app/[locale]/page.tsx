import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TourCard from "@/components/TourCard";
import BlogCard from "@/components/BlogCard";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getTrips, getBlogs } from "@/lib/api";
import { Link } from "@/i18n/navigation";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [trips, blogs] = await Promise.all([
    getTrips({ featured: "1" }),
    getBlogs({ limit: "3" }),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />

        {/* Featured Tours */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
              <ToursHeading />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trips.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        </section>

        {/* Latest Blog Posts */}
        {blogs.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                <BlogHeading />
              </h2>
              <p className="text-center text-gray-500 mb-14">
                <BlogSubheading />
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
              <div className="text-center mt-10">
                <Link
                  href="/blog"
                  className="inline-block bg-[#1a73a7] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#155d87] transition-colors"
                >
                  <ViewAllText />
                </Link>
              </div>
            </div>
          </section>
        )}

        <WhyChooseUs />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

function ToursHeading() {
  const t = useTranslations();
  return <>{t("nav.tours")}</>;
}

function BlogHeading() {
  const t = useTranslations("blog");
  return <>{t("latestPosts")}</>;
}

function BlogSubheading() {
  const t = useTranslations("blog");
  return <>{t("title")}</>;
}

function ViewAllText() {
  const t = useTranslations("blog");
  return <>{t("viewAll")}</>;
}
