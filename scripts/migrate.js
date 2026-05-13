import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// LOAD ENV (Hardcoded for this one-time script or use dotenv)
const supabaseUrl = 'https://swfyalqcopygvzpvlfcl.supabase.co';
const supabaseAnonKey = 'sb_publishable_VL6vP56l4txXVIKAtztNQQ_QUCI8LTm';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function migrate() {
  console.log('🚀 Starting migration...');

  try {
    const dataPath = path.join(__dirname, '../src/data/content.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const jsonData = JSON.parse(rawData);

    // 1. Migrate Blogs
    console.log('📝 Migrating blogs...');
    if (jsonData.blogs && jsonData.blogs.length > 0) {
      const { error: blogError } = await supabase
        .from('blogs')
        .upsert(jsonData.blogs);
      
      if (blogError) throw blogError;
      console.log(`✅ ${jsonData.blogs.length} blogs migrated.`);
    }

    // 2. Migrate Site Content (Sections)
    console.log('🌐 Migrating site sections...');
    const sections = ['hero', 'sections', 'graphics'];
    for (const section of sections) {
      if (jsonData[section]) {
        const { error: sectionError } = await supabase
          .from('site_content')
          .upsert({ id: section, content: jsonData[section] });
        
        if (sectionError) throw sectionError;
        console.log(`✅ Section "${section}" migrated.`);
      }
    }

    console.log('🎉 Migration completed successfully!');
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
  }
}

migrate();
