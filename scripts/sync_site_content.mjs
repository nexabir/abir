import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://swfyalqcopygvzpvlfcl.supabase.co';
const supabaseAnonKey = 'sb_publishable_VL6vP56l4txXVIKAtztNQQ_QUCI8LTm';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const defaultServices = [
  {
    title: "Rapid BI & Analytics Audit",
    tier: "Offer A • Quick Win",
    badge: "3-5 Days Turnaround",
    price: "$450 – $750",
    period: "fixed fee",
    desc: "Uncover hidden reporting bottlenecks, eliminate tracking discrepancies, and receive an actionable architecture blueprint.",
    timeframe: "Delivered in 3 to 5 business days",
    deliverables: [
      "Full audit of ad platforms (Meta, Google), GA4, CRM, and Excel reporting models",
      "Root cause diagnosis of attribution, ROAS, and CAC calculation discrepancies",
      "Fixed-scope technical recommendation report & recommended BI dashboard schema"
    ],
    ctaText: "Request Audit",
    featured: false
  },
  {
    title: "Custom Dashboard & Data Pipeline",
    tier: "Offer B • Core Engagement",
    badge: "Most Popular",
    price: "$1,200 – $2,800",
    period: "project-based",
    desc: "Consolidate scattered data sources into automated, client-ready Power BI dashboards that refresh without manual intervention.",
    timeframe: "Delivered in 2 to 3 weeks",
    deliverables: [
      "Automated multi-channel data ingestion & normalization pipeline (SQL / Python / Power Query)",
      "Executive KPI dashboard + deep-dive operational and cohort analysis views",
      "Interactive Loom video documentation, staff training, and 30-day post-delivery hypercare"
    ],
    ctaText: "Discuss Your Dashboard",
    featured: true
  },
  {
    title: "Fractional Analytics Partner",
    tier: "Offer C • Advisory Retainer",
    badge: "Dedicated Partner",
    price: "$800 – $1,500",
    period: "per month",
    desc: "Ongoing decision support, reporting automation, and custom deep-dive analysis without full-time employee overhead.",
    timeframe: "Month-to-month flexibility • 10-20 hrs/mo",
    deliverables: [
      "Bi-weekly executive KPI reviews & proactive growth bottleneck identification",
      "Continuous data model maintenance, new platform connectors, and metric updates",
      "Priority response on ad-hoc analytical queries and board/investor presentation decks"
    ],
    ctaText: "Explore Partnership",
    featured: false
  }
];

async function sync() {
  console.log('Authenticating with Supabase admin account...');
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'nexabir@gmail.com',
    password: '1234567890'
  });

  if (authError) {
    console.error('Auth error:', authError.message);
    process.exit(1);
  }
  console.log('Logged in successfully (User ID:', authData.user.id, ')');

  // 1. Sync Hero
  console.log('Updating hero content in Supabase...');
  const heroContent = {
    badge: 'Data & Analytics Consultant',
    title: 'Turning Fragmented Data into Clear Growth Decisions',
    subtitle: 'I help growing businesses and performance marketing agencies turn scattered ad spend, sales, and operational data into automated Power BI dashboards, actionable insights, and reliable monthly reports.',
    intro: 'Bridging the gap between raw data, executive visibility, and measurable revenue growth.',
    cv_url: 'CV of Md. Abir Ul Islam.pdf'
  };

  const { error: heroErr } = await supabase
    .from('site_content')
    .upsert({ id: 'hero', content: heroContent });

  if (heroErr) {
    console.error('Error updating hero:', heroErr.message);
  } else {
    console.log('Hero updated successfully.');
  }

  // 2. Fetch and update sections (preserve skills, experience, projects; add services)
  console.log('Updating sections with services in Supabase...');
  const { data: currentSections, error: secFetchErr } = await supabase
    .from('site_content')
    .select('*')
    .eq('id', 'sections')
    .single();

  const sectionsContent = currentSections ? currentSections.content : {};
  sectionsContent.services = defaultServices;

  const { error: secErr } = await supabase
    .from('site_content')
    .upsert({ id: 'sections', content: sectionsContent });

  if (secErr) {
    console.error('Error updating sections:', secErr.message);
  } else {
    console.log('Sections updated with services successfully.');
  }

  // 3. Sync Contact
  console.log('Updating contact settings in Supabase...');
  const contactContent = {
    email: 'nexabir@gmail.com',
    calendly: 'https://calendly.com',
    linkedin: 'https://bd.linkedin.com/in/md-abir-ul-islam'
  };

  const { error: contactErr } = await supabase
    .from('site_content')
    .upsert({ id: 'contact', content: contactContent });

  if (contactErr) {
    console.error('Error updating contact:', contactErr.message);
  } else {
    console.log('Contact settings updated successfully.');
  }

  console.log('All Supabase content sync completed successfully!');
}

sync();
