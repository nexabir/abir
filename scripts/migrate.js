import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// LOAD ENV from environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables.');
  process.exit(1);
}

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
