export default function AboutPage() {
  return (
    <div className="container-custom py-16 max-w-4xl min-h-[60vh]">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">About OlaYKEnterprise</h1>
      
      <div className="prose prose-lg prose-purple max-w-none">
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Welcome to OlaYKEnterprise, Nigeria's premier destination for high-quality tech accessories, power solutions, and content creation tools.
        </p>
        
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-6">
          In a world that never stops moving, staying connected is more than a convenience—it's a necessity. Our mission is to provide affordable, reliable, and premium powerbanks, fast-charging cables, and tech accessories that power your daily life without breaking the bank.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Why Choose Us?</h2>
        <div className="grid md:grid-cols-2 gap-8 mt-6">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h3 className="text-xl font-bold text-primary mb-2">Quality Assured</h3>
            <p className="text-gray-600 text-sm">Every product in our inventory undergoes strict quality control to ensure durability and performance.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h3 className="text-xl font-bold text-primary mb-2">Fast Nationwide Delivery</h3>
            <p className="text-gray-600 text-sm">We partner with the best logistics companies to ensure your orders reach you anywhere in Nigeria, fast.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h3 className="text-xl font-bold text-primary mb-2">Customer First</h3>
            <p className="text-gray-600 text-sm">Our dedicated support team is always ready to assist you with any questions or issues.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h3 className="text-xl font-bold text-primary mb-2">Secure Payments</h3>
            <p className="text-gray-600 text-sm">Shop with confidence using our encrypted and highly secure payment gateways.</p>
          </div>
        </div>

        <div className="mt-16 p-8 bg-primary text-white rounded-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Power Your Life Today</h2>
          <p className="mb-6 opacity-90 max-w-xl mx-auto">Explore our wide range of tech accessories and find the perfect match for your devices.</p>
          <a href="/shop" className="inline-block bg-accent text-primary-dark font-bold px-8 py-3 rounded-full hover:bg-accent-dark hover:scale-105 transition-all">
            Start Shopping
          </a>
        </div>
      </div>
    </div>
  );
}
