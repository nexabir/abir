import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://swfyalqcopygvzpvlfcl.supabase.co';
const supabaseAnonKey = 'sb_publishable_VL6vP56l4txXVIKAtztNQQ_QUCI8LTm';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function upload() {
  console.log('Authenticating with admin account: nexabir@gmail.com ...');
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'nexabir@gmail.com',
    password: '1234567890'
  });

  if (authError) {
    console.error('Authentication failed:', authError.message);
    process.exit(1);
  }

  console.log('Logged in successfully as admin (User ID:', authData.user.id, ')');

  const { data: current, error: fetchErr } = await supabase
    .from('site_content')
    .select('*')
    .eq('id', 'sections')
    .single();

  if (fetchErr) {
    console.error('Error fetching sections:', fetchErr.message);
    process.exit(1);
  }

  const newProjects = [
    {
      title: 'Multi-Channel Agency Performance & Client Reporting Hub',
      impact_badge: '75% Time Saved',
      problem: 'Growing performance marketing agencies lose 15+ billable hours per account each month manually extracting ad spend, leads, and conversion metrics across fragmented platforms into spreadsheets, causing delayed reporting and human calculation errors.',
      approach: 'Architected a normalized Power BI & Excel data model connecting multi-channel ad spend, Cost Per Lead (CPL), CAC, and ROAS into automated client-ready dashboards with executive summary commentary and budget pacing threshold alerts.',
      impact: [
        '75% reduction in recurring monthly client reporting turnaround time',
        '100% elimination of manual CSV copy-paste errors across 4 ad networks',
        'Empowered account managers to conduct proactive strategy reviews, improving client retention by 22%'
      ],
      desc: 'End-to-end automated reporting architecture consolidating Meta, Google Ads, and GA4 into client-ready executive performance dashboards.',
      tags: ['Power BI', 'Marketing Analytics', 'Multi-Channel Attribution', 'Executive Reporting', 'ETL Automation'],
      image: '/assets/projects/agency_reporting.jpg',
      link: '#',
      github_link: 'https://github.com/nexabir'
    },
    {
      title: 'E-Commerce Revenue Velocity & SKU Profitability Command Center',
      impact_badge: '+$220K Net Margin',
      problem: 'A scaling D2C e-commerce brand generated $1.8M in top-line GMV but experienced declining net cash flow due to hidden product return costs, heavy discounting, and escalating ad costs masked by blended revenue reports.',
      approach: 'Engineered a cohort analysis and contribution margin framework (CM2/CM3) linking Shopify order data, returns, landed COGS, and shipping costs to evaluate true SKU profitability and customer lifetime value (LTV:CAC).',
      impact: [
        "Identified 14 unprofitable 'hero' SKUs draining $18,500/month in net ad spend",
        'Increased Average Order Value (AOV) by 18% through data-backed product bundling strategies',
        'Reduced dead stock by 34% by flagging slow-moving variants 45 days earlier'
      ],
      desc: 'Comprehensive unit economics and contribution margin model revealing true SKU profitability, customer cohort retention, and inventory velocity.',
      tags: ['E-Commerce Analytics', 'Unit Economics', 'Power BI / Excel', 'SKU Profitability', 'Shopify BI'],
      image: '/assets/projects/ecom_profitability.jpg',
      link: '#',
      github_link: 'https://github.com/nexabir'
    },
    {
      title: 'B2B Sales Pipeline Velocity & Churn Early-Warning Engine',
      impact_badge: '92% Forecast Accuracy',
      problem: 'Sales leadership struggled with inaccurate quarterly revenue forecasting (>35% deal slippage), while customer success teams were blindsided by enterprise client cancellations with no prior warning signals.',
      approach: 'Developed a weighted pipeline forecasting and customer health score algorithm. Model evaluates stage duration bottlenecks, stakeholder touchpoints, and trailing 30-day engagement trends to flag at-risk renewals.',
      impact: [
        'Achieved 92% quarterly forecast accuracy for executive board presentations',
        'Early-warning indicators surfaced 85% of at-risk accounts 4 weeks prior to renewal deadlines',
        'Accelerated sales velocity by 19 days through stage bottleneck remediation'
      ],
      desc: 'Executive sales pipeline and account health intelligence system tracking deal velocity, win probability, and proactive churn risk detection.',
      tags: ['Sales Intelligence', 'Pipeline Forecasting', 'Churn Prevention', 'Executive BI', 'SQL / Tableau'],
      image: '/assets/projects/b2b_sales_pipeline.jpg',
      link: '#',
      github_link: 'https://github.com/nexabir'
    },
    {
      title: 'Automated Financial Consolidation & 13-Week Cash Runway Suite',
      impact_badge: 'Close Cycle: 5 Days → 4 Hrs',
      problem: 'Monthly financial close across multiple operating units took 5 full days of manual ledger consolidation from disparate banking and accounting systems, delaying strategic capital allocation.',
      approach: 'Built an automated ETL data pipeline in Python and Advanced Excel VBA to consolidate multi-entity trial balances, calculate rolling 13-week cash runway, analyze budget vs. actual variances, and generate executive PDF summaries.',
      impact: [
        'Compressed monthly consolidation and close from 5 business days to under 4 hours',
        'Saved 160+ departmental hours monthly across accounting and operations',
        'Provided executive leadership with real-time rolling 13-week liquidity visibility'
      ],
      desc: 'Automated multi-entity financial consolidation ETL pipeline and rolling cash flow forecasting suite for corporate decision-makers.',
      tags: ['Financial Modeling', 'ETL Automation', 'Executive Dashboards', 'Excel VBA / Python', 'KPI Reporting'],
      image: '/assets/projects/financial_consolidation.jpg',
      link: '#',
      github_link: 'https://github.com/nexabir'
    }
  ];

  const updatedContent = {
    ...current.content,
    projects: newProjects
  };

  const { error: upsertErr } = await supabase
    .from('site_content')
    .upsert({ id: 'sections', content: updatedContent });

  if (upsertErr) {
    console.error('Failed to update Supabase site_content:', upsertErr.message);
    process.exit(1);
  }

  console.log('✅ SUCCESS: All 4 strategic consulting projects successfully uploaded to Supabase!');
  
  // Verify by re-reading
  const { data: verified, error: verifyErr } = await supabase
    .from('site_content')
    .select('*')
    .eq('id', 'sections')
    .single();

  if (verifyErr) {
    console.error('Verification query failed:', verifyErr.message);
  } else {
    console.log(`Verified database state: ${verified.content.projects.length} projects stored in Supabase sections:`);
    verified.content.projects.forEach((p, idx) => {
      console.log(`  [${idx + 1}] ${p.title} (${p.impact_badge})`);
    });
  }
}

upload();
