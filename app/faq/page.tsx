export default function FAQPage() {
  const faqs = [
    {
      q: "How long does delivery take?",
      a: "Delivery within Lagos typically takes 1-2 business days. Deliveries to other states in Nigeria take 3-5 business days depending on the location."
    },
    {
      q: "Do you offer warranties on your products?",
      a: "Yes, all our powerbanks and electronic accessories come with a standard 6-month warranty against manufacturer defects. Physical damage is not covered."
    },
    {
      q: "Can I return an item if I change my mind?",
      a: "We accept returns within 7 days of delivery, provided the item is unused, in its original packaging, and with all seals intact. Return shipping costs are borne by the customer."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major debit cards (Visa, Mastercard, Verve), Bank Transfers, USSD, and OPay. All payments are securely processed via Paystack/Flutterwave."
    },
    {
      q: "Are your products original?",
      a: "100% yes. We source directly from authorized distributors and manufacturers. We guarantee the authenticity of every item sold on OlaYKEnterprise."
    }
  ];

  return (
    <div className="container-custom py-16 max-w-3xl min-h-[60vh]">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">Frequently Asked Questions</h1>
      <p className="text-gray-600 text-center mb-12">
        Find answers to common questions about our products, shipping, and returns.
      </p>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex gap-3">
              <span className="text-primary font-black">Q.</span> {faq.q}
            </h3>
            <p className="text-gray-600 leading-relaxed flex gap-3">
              <span className="text-gray-300 font-black">A.</span> {faq.a}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center bg-gray-50 p-8 rounded-3xl border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
        <p className="text-gray-600 mb-6">Our support team is always ready to help.</p>
        <a href="/contact" className="inline-block bg-primary hover:bg-primary-dark text-white font-bold px-8 py-3 rounded-full transition-colors">
          Contact Support
        </a>
      </div>
    </div>
  );
}
