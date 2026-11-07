import { createClient } from '@supabase/supabase-js';
import { allProjects } from '../src/data/projectsData.js';
import { allBlogs } from '../src/data/blogsData.js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://swfyalqcopygvzpvlfcl.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_VL6vP56l4txXVIKAtztNQQ_QUCI8LTm';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function syncAll() {
  console.log('🔄 Syncing Portfolio: 23 Projects and 24 Blog Case Studies to Supabase...');

  try {
    // 1. Authenticate if admin credentials available
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'nexabir@gmail.com',
      password: '1234567890'
    });

    if (authError) {
      console.warn('⚠️ Admin auth login skipped / error:', authError.message);
    } else {
      console.log('✅ Authenticated successfully as admin:', authData.user.email);
    }

    // 2. Fetch current sections to preserve existing services, clients, and settings
    const { data: current, error: fetchErr } = await supabase
      .from('site_content')
      .select('*')
      .eq('id', 'sections')
      .single();

    const existingContent = current?.content || {};
    const updatedSections = {
      ...existingContent,
      hidePricing: existingContent.hidePricing ?? false,
      projects: allProjects
    };

    const { error: sectionsErr } = await supabase
      .from('site_content')
      .upsert({ id: 'sections', content: updatedSections });

    if (sectionsErr) {
      console.error('❌ Failed to update sections in Supabase:', sectionsErr.message);
    } else {
      console.log(`✅ SUCCESS: Synced ${allProjects.length} projects to Supabase sections table!`);
    }

    // 3. Sync all blogs with exact schema columns
    const cleanBlogs = allBlogs.map(b => ({
      id: b.id,
      timestamp: b.timestamp,
      title: b.title,
      snippet: b.snippet,
      content: b.content,
      image: b.image || null
    }));

    const { error: blogsErr } = await supabase
      .from('blogs')
      .upsert(cleanBlogs);

    if (blogsErr) {
      console.error('❌ Failed to upsert blogs in Supabase:', blogsErr.message);
    } else {
      console.log(`✅ SUCCESS: Synced all ${cleanBlogs.length} architectural blog posts to Supabase blogs table!`);
    }

    console.log('🎉 Full portfolio synchronization complete!');
  } catch (err) {
    console.error('Synchronization exception:', err.message);
  }
}

syncAll();
