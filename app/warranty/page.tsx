import Link from "next/link";

export default function Page() {
  return (
    <div className="container-custom py-16 min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Warranty Policy</h1>
      <div className="prose max-w-none text-gray-600">
        <p className="mb-4">Information regarding this page will be available here soon.</p>
        <p className="mb-4">We are currently updating our documentation. Please check back later or contact our customer support for immediate assistance.</p>
        <div className="mt-8">
          <Link href="/contact" className="text-primary font-medium hover:underline">Contact Customer Support</Link>
        </div>
      </div>
    </div>
  );
}
