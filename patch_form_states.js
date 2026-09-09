const fs = require('fs');
let code = fs.readFileSync('components/ui/BlockRenderer.tsx', 'utf8');

const NIGERIA_STATES = `const NIGERIA_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", 
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe", 
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", 
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", 
  "Taraba", "Yobe", "Zamfara"
];`;

if (!code.includes('const NIGERIA_STATES')) {
  code = code.replace('function CheckoutFormBlock', NIGERIA_STATES + '\n\nfunction CheckoutFormBlock');
}

// Add state hook
code = code.replace(
  'const [selectedIndex, setSelectedIndex] = useState(0);',
  'const [selectedIndex, setSelectedIndex] = useState(0);\n  const [selectedState, setSelectedState] = useState("Lagos");'
);

// Replace header "🚚 Free Delivery Nationwide" with the new headers
code = code.replace(
  '<p className="text-[10px] text-gray-500">Nationwide Delivery</p>',
  '<p className="text-[10px] text-gray-500">Payment on Delivery (Lagos Only)</p>'
);

code = code.replace(
  '<h3 className="font-editorial text-xl font-bold text-gray-900 mt-2">🚚 Free Delivery Nationwide</h3>',
  '<h3 className="font-editorial text-xl font-bold text-gray-900 mt-2">🚚 Free Delivery Nationwide</h3>\n          <h4 className="text-sm font-bold text-emerald-600 mt-1">💵 Payment on Delivery (Lagos Only)</h4>'
);

// Form Fields replacement
const oldAddressHtml = `<div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Street Address</label>
            <input required name="address" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm shadow-2xs" placeholder="Detailed delivery address" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">City / State</label>
            <input required name="city" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm shadow-2xs" placeholder="e.g. Ikeja, Lagos" />
          </div>`;

const newAddressHtml = `<div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Street Address</label>
            <input required name="address" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm shadow-2xs" placeholder="Detailed delivery address" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">State</label>
            <select 
              required 
              name="state" 
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm shadow-2xs appearance-none"
            >
              {NIGERIA_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">City / LGA</label>
            <input required name="city" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm shadow-2xs" placeholder="e.g. Ikeja" />
          </div>
        </div>

        {/* Dynamic Warning Message */}
        {selectedState === 'Lagos' ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-xs font-medium flex items-center gap-2">
            <span className="text-base">✅</span>
            Payment on Delivery Available!
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl text-xs font-medium flex items-start gap-2">
            <span className="text-base mt-0.5">⚠️</span>
            <p><strong>Notice:</strong> Orders outside Lagos require Payment BEFORE Delivery. Please only submit this form if you are ready to make a transfer when our sales rep calls you.</p>
          </div>
        )}`;

code = code.replace(oldAddressHtml, newAddressHtml);

// Fix formData.get("city") string interpolation
code = code.replace(
  'shippingAddress: `${formData.get("address")}, ${formData.get("city")}`,',
  'shippingAddress: `${formData.get("address")}, ${formData.get("city")}, ${formData.get("state")}`, // modified'
);

fs.writeFileSync('components/ui/BlockRenderer.tsx', code);
