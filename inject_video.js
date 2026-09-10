require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const { randomUUID } = require('crypto');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const VIDEO_URL = 'https://youtube.com/shorts/V9SFCcuQJyk?si=7faa36n4_CfVPPa_';

(async () => {
  const { data, error } = await supabase.from('landing_pages').select('id, slug, body_list');
  if (error) { console.error(error); process.exit(1); }

  console.log('Pages:', data.map(p => p.slug));

  for (const page of data) {
    const bodyList = page.body_list || [];
    let changed = false;

    const newBodyList = bodyList.map((item) => {
      const parsed = typeof item === 'string' ? JSON.parse(item) : item;
      const blocks = parsed.blocks || [];

      // Skip if already has this video
      if (blocks.some(b => b.type === 'video' && (b.data?.url || '').includes('V9SFCcuQJyk'))) {
        console.log(`${page.slug}: already has video, skipping.`);
        return item;
      }

      const formIndex = blocks.findIndex(b => b.type === 'form');
      const insertAt = formIndex >= 0 ? formIndex : blocks.length;

      const videoBlock = { id: randomUUID(), type: 'video', data: { url: VIDEO_URL } };
      parsed.blocks = [...blocks.slice(0, insertAt), videoBlock, ...blocks.slice(insertAt)];
      changed = true;

      return typeof item === 'string' ? JSON.stringify(parsed) : parsed;
    });

    if (changed) {
      const { error: err } = await supabase.from('landing_pages').update({ body_list: newBodyList }).eq('id', page.id);
      if (err) console.error(`Error updating ${page.slug}:`, err);
      else console.log(`✅ Video injected into: ${page.slug}`);
    }
  }
})();
