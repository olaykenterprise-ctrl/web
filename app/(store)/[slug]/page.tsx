import { getLandingPageBySlug } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Play, ShoppingCart } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const page = await getLandingPageBySlug(resolvedParams.slug);
  if (!page) return {};
  
  return {
    title: `${page.title} | OlaYK Enterprise`,
    description: page.subheading,
  };
}

export default async function LandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const page = await getLandingPageBySlug(resolvedParams.slug);

  if (!page) {
    notFound();
  }

  // Convert YouTube link to embed format
  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const embedUrl = getEmbedUrl(page.videoLink || "");

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
            {page.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {page.subheading}
          </p>
          
          {page.ctaLink && (
            <Link 
              href={page.ctaLink}
              className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white font-black text-lg py-4 px-10 rounded-full transition-all shadow-xl shadow-primary/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/30"
            >
              <ShoppingCart size={24} />
              Shop Now
            </Link>
          )}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
        {/* Video Section */}
        {embedUrl && (
          <section className="relative rounded-3xl overflow-hidden shadow-2xl bg-black aspect-video max-w-4xl mx-auto border-4 border-white">
            <iframe
              src={embedUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </section>
        )}

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Features / Body List */}
          {Array.isArray(page.bodyList) && page.bodyList.length > 0 && (
            <section className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Why You Need This</h2>
              <ul className="space-y-4">
                {page.bodyList.map((item, index) => (
                  <li key={index} className="flex gap-4 items-start">
                    <CheckCircle2 className="text-primary shrink-0 mt-1" size={24} />
                    <span className="text-gray-700 text-lg leading-relaxed font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Photo Gallery */}
          {Array.isArray(page.photos) && page.photos.length > 0 && (
            <section className="grid grid-cols-2 gap-4">
              {page.photos.map((photo, index) => (
                <div key={index} className={`relative rounded-3xl overflow-hidden shadow-sm bg-gray-200 border-4 border-white ${index === 0 && page.photos.length % 2 !== 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}>
                  <Image
                    src={photo}
                    alt={`${page.title} - Image ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
