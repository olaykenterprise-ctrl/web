"use client";

import { useState } from "react";
import { Plus, Trash2, ArrowUp, ArrowDown, Type, Heading1, Heading2, Image as ImageIcon, Images, List, Play, MousePointerClick } from "lucide-react";
import { BlockType, PageBlock } from "@/lib/db";

export function BlockBuilder({ initialBlocks = [], fieldName = "blocks" }: { initialBlocks?: PageBlock[], fieldName?: string }) {
  const [blocks, setBlocks] = useState<PageBlock[]>(initialBlocks);
  const [showMenu, setShowMenu] = useState(false);

  const addBlock = (type: BlockType) => {
    const newBlock: PageBlock = {
      id: crypto.randomUUID(),
      type,
      data: getDefaultData(type)
    };
    setBlocks([...blocks, newBlock]);
    setShowMenu(false);
  };

  const removeBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;
    
    const newBlocks = [...blocks];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[swapIndex]] = [newBlocks[swapIndex], newBlocks[index]];
    setBlocks(newBlocks);
  };

  const updateBlockData = (index: number, newData: any) => {
    const newBlocks = [...blocks];
    newBlocks[index].data = { ...newBlocks[index].data, ...newData };
    setBlocks(newBlocks);
  };

  const getDefaultData = (type: BlockType) => {
    switch (type) {
      case 'headline': return { text: '' };
      case 'subheadline': return { text: '' };
      case 'body': return { text: '' };
      case 'image': return { urls: [''] };
      case 'list': return { items: ['', ''] };
      case 'video': return { url: '' };
      case 'button': return { label: 'Shop Now', link: '/' };
      case 'form': return { productName: 'Product Name', price: 10000 };
      default: return {};
    }
  };

  return (
    <div className="space-y-6">
      {/* Hidden input to pass data to Server Action */}
      <input type="hidden" name={fieldName} value={JSON.stringify(blocks)} />

      {blocks.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
          <p className="text-gray-500 mb-4 font-medium">No content blocks added yet.</p>
          <AddMenu onAdd={addBlock} />
        </div>
      ) : (
        <div className="space-y-4">
          {blocks.map((block, index) => (
            <div key={block.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden group">
              <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BlockIcon type={block.type} />
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">{block.type}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => moveBlock(index, 'up')} disabled={index === 0} className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30 transition-colors rounded-lg hover:bg-gray-200">
                    <ArrowUp size={14} />
                  </button>
                  <button type="button" onClick={() => moveBlock(index, 'down')} disabled={index === blocks.length - 1} className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30 transition-colors rounded-lg hover:bg-gray-200">
                    <ArrowDown size={14} />
                  </button>
                  <div className="w-px h-4 bg-gray-300 mx-1"></div>
                  <button type="button" onClick={() => removeBlock(index)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors rounded-lg">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <BlockEditor block={block} onChange={(data) => updateBlockData(index, data)} />
              </div>
            </div>
          ))}
          
          <div className="pt-4 flex justify-center">
            <AddMenu onAdd={addBlock} />
          </div>
        </div>
      )}
    </div>
  );
}

function AddMenu({ onAdd }: { onAdd: (type: BlockType) => void }) {
  const [open, setOpen] = useState(false);

  const options: { type: BlockType; label: string; icon: React.ReactNode }[] = [
    { type: 'headline', label: 'Headline', icon: <Heading1 size={16} /> },
    { type: 'subheadline', label: 'Sub-headline', icon: <Heading2 size={16} /> },
    { type: 'body', label: 'Text Body', icon: <Type size={16} /> },
    { type: 'image', label: 'Image(s)', icon: <Images size={16} /> },
    { type: 'list', label: 'Bullet List', icon: <List size={16} /> },
    { type: 'video', label: 'YouTube Video', icon: <Play size={16} /> },
    { type: 'button', label: 'Action Button', icon: <MousePointerClick size={16} /> },
    { type: 'form', label: 'Checkout Form', icon: <List size={16} /> },
  ];

  return (
    <div className="relative inline-block text-left">
      <button 
        type="button" 
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-gray-900 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-black transition-all shadow-sm text-sm"
      >
        <Plus size={16} /> Add Block
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)}></div>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-20 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {options.map(opt => (
              <button
                key={opt.type}
                type="button"
                onClick={() => { onAdd(opt.type); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors text-left"
              >
                <div className="text-gray-400">{opt.icon}</div>
                <span className="font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function BlockIcon({ type }: { type: BlockType }) {
  switch (type) {
    case 'headline': return <Heading1 size={16} className="text-blue-500" />;
    case 'subheadline': return <Heading2 size={16} className="text-purple-500" />;
    case 'body': return <Type size={16} className="text-gray-500" />;
    case 'image': return <Images size={16} className="text-emerald-500" />;
    case 'list': return <List size={16} className="text-pink-500" />;
    case 'video': return <Play size={16} className="text-red-500" />;
    case 'button': return <MousePointerClick size={16} className="text-blue-600" />;
    case 'form': return <List size={16} className="text-orange-500" />;
    default: return null;
  }
}

function BlockEditor({ block, onChange }: { block: PageBlock, onChange: (data: any) => void }) {
  if (block.type === 'headline' || block.type === 'subheadline') {
    return (
      <div className="space-y-3">
        <input 
          type="text" 
          value={block.data.text || ''} 
          onChange={(e) => onChange({ ...block.data, text: e.target.value })}
          className={`w-full bg-[#F4F7FB] px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-medium ${block.type === 'headline' ? 'text-xl' : 'text-lg'}`}
          placeholder={`Enter ${block.type}...`}
        />
        {block.type === 'headline' && (
          <input 
            type="text" 
            value={block.data.backgroundImage || ''} 
            onChange={(e) => onChange({ ...block.data, backgroundImage: e.target.value })}
            className="w-full bg-[#F4F7FB] px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
            placeholder="Optional Background Image URL for Hero section..."
          />
        )}
      </div>
    );
  }

  if (block.type === 'body') {
    return (
      <textarea 
        value={block.data.text} 
        onChange={(e) => onChange({ text: e.target.value })}
        rows={4}
        className="w-full bg-[#F4F7FB] px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-gray-800 text-sm resize-none"
        placeholder="Write some text..."
      />
    );
  }

  if (block.type === 'image') {
    const urls = block.data.urls || block.data.images || []; // support old carousel format if any
    if (urls.length === 0 && block.data.url) urls.push(block.data.url); // support old image format if any
    
    return (
      <div className="space-y-2">
        <p className="text-xs text-gray-500 mb-2">Add one image to display it, or multiple to create a carousel:</p>
        {urls.map((img: string, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0 text-gray-400 text-xs font-bold">{i+1}</div>
            <input 
              type="url" 
              value={img} 
              onChange={(e) => {
                const newUrls = [...urls];
                newUrls[i] = e.target.value;
                onChange({ urls: newUrls });
              }}
              className="flex-1 bg-[#F4F7FB] px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
              placeholder="Image URL..."
            />
            <button 
              type="button" 
              onClick={() => {
                const newUrls = urls.filter((_: any, index: number) => index !== i);
                onChange({ urls: newUrls });
              }}
              className="p-2 text-gray-400 hover:text-red-500"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <button 
          type="button" 
          onClick={() => onChange({ urls: [...urls, ''] })}
          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 mt-2 px-2"
        >
          + Add Image
        </button>
      </div>
    );
  }

  if (block.type === 'list') {
    const items = block.data.items || [];
    return (
      <div className="space-y-2">
        {items.map((item: string, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0 mx-2"></div>
            <input 
              type="text" 
              value={item} 
              onChange={(e) => {
                const newItems = [...items];
                newItems[i] = e.target.value;
                onChange({ items: newItems });
              }}
              className="flex-1 bg-[#F4F7FB] px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
              placeholder="List item..."
            />
            <button 
              type="button" 
              onClick={() => {
                const newItems = items.filter((_: any, index: number) => index !== i);
                onChange({ items: newItems });
              }}
              className="p-2 text-gray-400 hover:text-red-500"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <button 
          type="button" 
          onClick={() => onChange({ items: [...items, ''] })}
          className="text-xs font-bold text-emerald-600 hover:text-emerald-700 mt-2 px-2"
        >
          + Add Item
        </button>
      </div>
    );
  }

  if (block.type === 'video') {
    return (
      <input 
        type="url" 
        value={block.data.url} 
        onChange={(e) => onChange({ url: e.target.value })}
        className="w-full bg-[#F4F7FB] px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
        placeholder="YouTube Video URL (https://www.youtube.com/...)"
      />
    );
  }

  if (block.type === 'button') {
    return (
      <div className="space-y-3">
        <input 
          type="text" 
          value={block.data.label} 
          onChange={(e) => onChange({ label: e.target.value })}
          className="w-full bg-[#F4F7FB] px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-bold text-sm"
          placeholder="Button Text (e.g. Shop Now)"
        />
        <input 
          type="text" 
          value={block.data.link} 
          onChange={(e) => onChange({ link: e.target.value })}
          className="w-full bg-[#F4F7FB] px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
          placeholder="Link URL (e.g. /product/my-product)"
        />
      </div>
    );
  }

  if (block.type === 'form') {
    const options = block.data.options || [{ label: "1 piece", quantity: 1, price: block.data.price || 0 }];
    return (
      <div className="space-y-4">
        <div>
          <p className="text-xs text-gray-500 mb-1 font-bold">Product Name:</p>
          <input 
            type="text" 
            value={block.data.productName || ''} 
            onChange={(e) => onChange({ ...block.data, productName: e.target.value })}
            className="w-full bg-[#F4F7FB] px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-bold text-sm"
            placeholder="e.g. Self-Cleaning Flat Mop System"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
             <p className="text-xs text-gray-500 mb-1 font-bold">Original Price:</p>
             <input 
               type="number" 
               value={block.data.originalPrice || ''} 
               onChange={(e) => onChange({ ...block.data, originalPrice: Number(e.target.value) })}
               className="w-full bg-[#F4F7FB] px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
               placeholder="e.g. 30000"
             />
          </div>
          <div>
             <p className="text-xs text-gray-500 mb-1 font-bold">Discounted Price:</p>
             <input 
               type="number" 
               value={block.data.price || ''} 
               onChange={(e) => onChange({ ...block.data, price: Number(e.target.value) })}
               className="w-full bg-[#F4F7FB] px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-bold text-emerald-600"
               placeholder="e.g. 25000"
             />
          </div>
        </div>
        
        <div className="pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-700 mb-2 font-bold flex items-center gap-2">Quantity Dropdown Options:</p>
          <div className="space-y-2">
            {options.map((opt: any, idx: number) => (
              <div key={idx} className="flex gap-2 items-start">
                <input 
                  type="text" 
                  placeholder="Label (e.g. 2 Mops + Bucket...)" 
                  value={opt.label || ''} 
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[idx].label = e.target.value;
                    onChange({ ...block.data, options: newOptions });
                  }} 
                  className="flex-1 bg-[#F4F7FB] px-3 py-2 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-emerald-500" 
                />
                <input 
                  type="number" 
                  placeholder="Qty" 
                  value={opt.quantity || ''} 
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[idx].quantity = Number(e.target.value);
                    onChange({ ...block.data, options: newOptions });
                  }} 
                  className="w-16 bg-[#F4F7FB] px-2 py-2 rounded-lg border border-gray-200 text-xs focus:outline-none text-center focus:border-emerald-500" 
                />
                <input 
                  type="number" 
                  placeholder="Total NGN" 
                  value={opt.price || ''} 
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[idx].price = Number(e.target.value);
                    onChange({ ...block.data, options: newOptions });
                  }} 
                  className="w-24 bg-[#F4F7FB] px-2 py-2 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-emerald-500" 
                />
                <button 
                  onClick={() => {
                    const newOptions = options.filter((_: any, i: number) => i !== idx);
                    onChange({ ...block.data, options: newOptions });
                  }} 
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <button 
              onClick={() => {
                onChange({ ...block.data, options: [...options, { label: "", quantity: 1, price: 0 }] });
              }} 
              className="mt-2 text-xs text-emerald-600 font-bold flex items-center gap-1 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Plus size={14} /> Add Option
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <div>Unknown block type</div>;
}
