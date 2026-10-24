import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://swfyalqcopygvzpvlfcl.supabase.co';
const supabaseAnonKey = 'sb_publishable_VL6vP56l4txXVIKAtztNQQ_QUCI8LTm';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const defaultClients = [
  {
    name: "Akij Resource",
    logo: "/assets/clients/akij-resource.png",
    industry: "Conglomerate & Industrial Manufacturing",
    website: "https://akijresource.com/",
    scope: "Business intelligence architecture, sales reporting consolidation, and executive operational KPIs.",
    tag: "Enterprise BI"
  },
  {
    name: "Anwar Group of Industries",
    logo: "/assets/clients/Anwar-Group.jpg",
    industry: "Infrastructure & Industrial Conglomerate",
    website: "https://anwargroup.com/",
    scope: "Multi-entity financial consolidation, cash runway visibility, and financial variance dashboards.",
    tag: "Financial Analytics"
  },
  {
    name: "Daffodil Family",
    logo: "/assets/clients/Daffodil Family.png",
    industry: "Education, Technology & Venture Ecosystem",
    website: "https://daffodil.family/",
    scope: "Strategic analytics, operational monitoring dashboards, and academic performance tracking systems.",
    tag: "Data Strategy"
  },
  {
    name: "Global Entrepreneurship Network (GEN)",
    logo: "/assets/clients/GEN.png",
    industry: "Global Venture Ecosystem & Programs",
    website: "https://www.genglobal.org/",
    scope: "Venture ecosystem telemetry, startup program metrics, and stakeholder impact analytics.",
    tag: "Program Analytics"
  },
  {
    name: "Biggani.org",
    logo: "/assets/clients/biggani.org.png",
    industry: "Science & Tech Knowledge Platform",
    website: "https://biggani.org/",
    scope: "Audience telemetry, digital engagement tracking, and multi-channel content performance analytics.",
    tag: "Digital Analytics"
  },
  {
    name: "DRILLAB",
    logo: "/assets/clients/DRILLAB.png",
    industry: "Innovation, Research & Lab Technology",
    website: "https://drillab.com/",
    scope: "Operational workflow telemetry, research data pipeline automation, and tracking dashboards.",
    tag: "Operational BI"
  },
  {
    name: "LearnTime",
    logo: "/assets/clients/learntime.png",
    industry: "EdTech & Online Learning Platform",
    website: "https://learntime.com.bd/",
    scope: "Student cohort retention analysis, course revenue velocity, and user acquisition analytics.",
    tag: "Cohort Analytics"
  },
  {
    name: "DPI Entrepreneurship Club",
    logo: "/assets/clients/DPI-Entrepreneurship-Club.png",
    industry: "Institutional Incubator & Community",
    website: "https://www.facebook.com/dpientrepreneurshipclub/",
    scope: "Venture incubation telemetry, student startup progress tracking, and workshop metrics.",
    tag: "Venture Analytics"
  }
];

async function syncClients() {
  console.log('Authenticating with admin account: nexabir@gmail.com ...');
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'nexabir@gmail.com',
    password: '1234567890'
  });

  if (authError) {
    console.error('Authentication failed:', authError.message);
    process.exit(1);
  }

  console.log('Logged in successfully (User ID:', authData.user.id, ')');

  const { data: currentSections, error: fetchErr } = await supabase
    .from('site_content')
    .select('*')
    .eq('id', 'sections')
    .single();

  if (fetchErr) {
    console.error('Error fetching sections:', fetchErr.message);
    process.exit(1);
  }

  const sectionsContent = currentSections ? currentSections.content : {};
  sectionsContent.clients = defaultClients;

  const { error: upsertErr } = await supabase
    .from('site_content')
    .upsert({ id: 'sections', content: sectionsContent });

  if (upsertErr) {
    console.error('Error updating sections.clients:', upsertErr.message);
    process.exit(1);
  }

  console.log('Successfully saved clients & partner logos to Supabase site_content!');
}

syncClients();
