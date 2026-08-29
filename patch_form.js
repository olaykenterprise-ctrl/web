const fs = require('fs');
let code = fs.readFileSync('components/ui/BlockRenderer.tsx', 'utf8');

// Replace the single Location field with Address and City
const locationHtml = `<div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Location / State</label>
            <input required name="location" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm shadow-2xs" placeholder="City / State for delivery" />
          </div>`;

const newLocationHtml = `<div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Street Address</label>
            <input required name="address" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm shadow-2xs" placeholder="Detailed delivery address" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">City / State</label>
            <input required name="city" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm shadow-2xs" placeholder="e.g. Ikeja, Lagos" />
          </div>`;

// Then update how it's handled in handleSubmit
const handleSubmitOriginal = `shippingAddress: formData.get("location"),`;
const handleSubmitNew = `shippingAddress: \`\${formData.get("address")}, \${formData.get("city")}\`,`;

code = code.replace(locationHtml, newLocationHtml);
code = code.replace(handleSubmitOriginal, handleSubmitNew);

fs.writeFileSync('components/ui/BlockRenderer.tsx', code);
