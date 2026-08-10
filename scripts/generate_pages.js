const fs = require('fs');
const path = require('path');

const pages = [
  { path: 'returns', title: 'Returns & Refunds' },
  { path: 'terms', title: 'Terms & Conditions' },
  { path: 'payment-methods', title: 'Payment Methods' },
  { path: 'privacy', title: 'Privacy Policy' },
  { path: 'warranty', title: 'Warranty Policy' },
  { path: 'how-to-order', title: 'How to Order' },
  { path: 'report-issue', title: 'Report an Issue' },
  { path: 'shop', title: 'Shop All' },
  { path: 'deals', title: "Today's Deals" },
  { path: 'new-arrivals', title: 'New Arrivals' },
  { path: 'track-order', title: 'Track Order' },
];

const template = (title) => `import Link from "next/link";

export default function Page() {
  return (
    <div className="container-custom py-16 min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">${title}</h1>
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
`;

pages.forEach(p => {
  const dir = path.join(__dirname, '..', 'app', p.path);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(path.join(dir, 'page.tsx'), template(p.title));
});

console.log("Pages created successfully.");
