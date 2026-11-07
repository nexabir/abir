export const allProjects = [
  {
    id: "strategic-financial-dashboard",
    title: "Multi-Company Strategic Financial Dashboard",
    category: "Strategic Finance & BI",
    impact_badge: "99.4% Reconciliation",
    problem: "CFOs, finance directors, and group controllers managing multiple corporate subsidiaries struggle to synthesize fragmented P&L statements, debt schedules, and balance sheets across disparate operating entities in real time.",
    approach: "Developed an interactive multi-company executive financial dashboard utilizing Chart.js and modern web architecture to model consolidated EBITDA margins, working capital cycles, and debt-to-equity leverage ratios.",
    impact: [
      "Consolidated 5 subsidiary balance sheets into a single real-time executive view",
      "Automated EBITDA variance decomposition across business units",
      "Eliminated 12+ hours of manual spreadsheet reconciliation per month"
    ],
    desc: "Multi-company strategic financial dashboard consolidating balance sheets, debt schedules, working capital ratios, and EBITDA variance modeling.",
    tags: ["Financial Modeling", "Chart.js", "CFO Dashboard", "Variance Analysis", "Balance Sheet Consolidation"],
    image: "/assets/projects/financial_consolidation.jpg",
    link: "https://strategic-financial-dashboard-pi.vercel.app",
    github_link: "https://github.com/abir2022/strategic-financial-dashboard",
    featured: true,
    blog_id: 1777824800001
  },
  {
    id: "misaiagent",
    title: "MisAIAgent: Grounded Academic & Departmental LLM Agent",
    category: "AI Agents & Modern Web",
    impact_badge: "Sub-Second Vector Search",
    problem: "University departments and large institutions maintain siloed databases of faculty rosters, course catalogues, and prerequisites, causing administrative staff to spend hundreds of hours manually answering repetitive student inquiries.",
    approach: "Built a grounded AI retrieval agent using Groq ultra-fast LLM inference, Supabase PostgreSQL, and serverless edge functions to deliver factual, hallucination-free natural language query answers.",
    impact: [
      "Zero-hallucination grounded responses enforced by strict context boundary prompts",
      "Sub-600ms query response time powered by Groq LPU inference",
      "Autonomous multi-parameter filtering across course and instructor rosters"
    ],
    desc: "Natural-language search over departmental faculty and course records — Supabase rows in, grounded answers out via Groq LLM & edge functions.",
    tags: ["AI Agent", "Groq LLM", "Edge Functions", "React", "Supabase", "PWA"],
    image: "/assets/projects/agency_reporting.jpg",
    link: "https://misaiagent.vercel.app",
    github_link: "https://github.com/abir2022/misaiagent",
    featured: true,
    blog_id: 1777824800002
  },
  {
    id: "price-elasticity-cockpit",
    title: "Interactive Price-Elasticity Simulation Cockpit",
    category: "Pricing & Econometrics",
    impact_badge: "Mathematical Profit Maxima",
    problem: "Commercial pricing managers routinely adjust product rates based on gut feeling or cost-plus markups, frequently overstepping critical price elasticity thresholds and destroying gross margin volume.",
    approach: "Formulated an econometrics-grounded price elasticity simulation engine modeling constant-elasticity and linear demand curves with interactive sliders to calculate the mathematical profit-maximizing price point (P*).",
    impact: [
      "Visualized revenue and volume tradeoff curves under price fluctuations of ±30%",
      "Calculated exact point of unit elasticity to safeguard gross margin thresholds",
      "Interactive simulation adopted for quarterly commercial pricing reviews"
    ],
    desc: "Interactive price-elasticity simulation cockpit modeling empirical demand curves, consumer surplus, and mathematical profit-maximizing price points.",
    tags: ["Econometrics", "Pricing Strategy", "Price Elasticity", "Chart.js", "Mathematical Modeling"],
    image: "/assets/projects/ecom_profitability.jpg",
    link: "https://price-elasticity-cockpit.vercel.app",
    github_link: "https://github.com/abir2022/price-elasticity-cockpit",
    featured: true,
    blog_id: 1777824800003
  },
  {
    id: "ops-flash-report",
    title: "Full-Stack Operations Flash Reporting Platform",
    category: "Strategic Finance & BI",
    impact_badge: "Daily Flash Reporting",
    problem: "Plant and operational directors rely on end-of-month retroactive reports to discover daily throughput bottlenecks, scrap spikes, and machine downtime, making proactive mitigation impossible.",
    approach: "Engineered a modern full-stack operational reporting platform integrating a React/Vite frontend, automated Python ETL ingestion scripts, Supabase PostgreSQL, and Cloudflare edge workers for sub-second flash metric delivery.",
    impact: [
      "Shifted operational reporting from 30-day retroactive reviews to daily flash updates",
      "Automated ingestion across 4 industrial telemetry sources via Python ETL",
      "Reduced downtime notification latency by 85%"
    ],
    desc: "Full-stack operations flash reporting platform: Vite web application, Python automated ETL, Supabase PostgreSQL, and edge workers.",
    tags: ["Vite", "TypeScript", "Python ETL", "Supabase", "PostgreSQL", "Cloudflare Workers"],
    image: "/assets/projects/b2b_sales_pipeline.jpg",
    link: "https://github.com/abir2022/ops-flash-report",
    github_link: "https://github.com/abir2022/ops-flash-report",
    featured: true,
    blog_id: 1777824800004
  },
  {
    id: "Rivers-of-Bangladesh",
    title: "Rivers of Bangladesh: Interactive 3D Geospatial Intelligence",
    category: "AI Agents & Modern Web",
    impact_badge: "3D GIS Visualization",
    problem: "Environmental researchers, river basin authorities, and water resource planners lacked an accessible, immersive 3D digital atlas to analyze river network morphology, historical hydrological shifts, and seasonal flooding risks.",
    approach: "Developed a web-based 3D GIS platform powered by CesiumJS, custom KML/KMZ topological spatial layers, React, and Supabase authentication to visualize bathymetry, historical trajectories, and community field notes.",
    impact: [
      "Rendered 50+ major national river basins with 3D elevation topology",
      "Integrated community research forums and verified water telemetry logs",
      "Eliminated expensive desktop GIS software requirements via browser 3D rendering"
    ],
    desc: "Interactive 3D river map with CesiumJS/KML-KMZ, historical hydrological data, a React blog/forum, auth and an admin dashboard.",
    tags: ["3D GIS", "CesiumJS", "KML/KMZ", "React", "Supabase", "Spatial Analytics"],
    image: "/assets/projects/financial_consolidation.jpg",
    link: "https://rivers-of-bangladesh-six.vercel.app",
    github_link: "https://github.com/abir2022/Rivers-of-Bangladesh",
    featured: true,
    blog_id: 1777824800005
  },
  {
    id: "Mrittika",
    title: "Mrittika: Content-Driven Web Platform & Headless CMS",
    category: "AI Agents & Modern Web",
    impact_badge: "Secure Headless CMS",
    problem: "Small businesses and cultural publishers struggle with heavyweight CMS platforms (such as WordPress) that present severe security vulnerabilities, slow load times, and complex database maintenance.",
    approach: "Architected a lightning-fast static content platform paired with a secure local admin dashboard that directly commits structured product, category, and blog updates to GitHub via API, triggering automated Vercel CI/CD builds.",
    impact: [
      "100/100 Lighthouse performance score with zero server maintenance overhead",
      "Direct GitHub API publishing pipeline eliminating SQL injection vectors",
      "Seamless product and editorial content workflows for non-technical editors"
    ],
    desc: "Modern content-driven web platform with secure local admin panel for managing products, categories, blogs, site settings, and publishing updates directly to GitHub.",
    tags: ["CMS Architecture", "GitHub API", "Static Site", "Vercel CI/CD", "JavaScript"],
    image: "/assets/projects/agency_reporting.jpg",
    link: "https://mrittika-six.vercel.app",
    github_link: "https://github.com/abir2022/Mrittika",
    featured: true,
    blog_id: 1777824800006
  },
  {
    id: "steel-price-intelligence-cockpit",
    title: "Steel Price Intelligence & Commodity Cockpit",
    category: "Pricing & Econometrics",
    impact_badge: "Strategic Procurement",
    problem: "Heavy industrial manufacturers face extreme volatility in raw scrap, rebar, and billet markets, often purchasing inventory at cyclical price peaks due to fragmented broker pricing.",
    approach: "Created a dedicated commodity price intelligence cockpit tracking international and domestic benchmark spreads, inventory carry costs, and rolling moving averages.",
    impact: [
      "Consolidated 6 raw material indices into a unified procurement index",
      "Highlighted high-risk buying zones using moving average divergence indicators",
      "Enabled procurement leaders to time raw material forward contracts effectively"
    ],
    desc: "Single-file steel price intelligence cockpit tracking scrap, rebar, billet price trends, volatility bands, and inventory procurement timing.",
    tags: ["Commodity Pricing", "Industrial Intelligence", "Procurement BI", "Chart.js", "Market Intelligence"],
    image: "/assets/projects/ecom_profitability.jpg",
    link: "https://steel-price-intelligence-cockpit.vercel.app",
    github_link: "https://github.com/abir2022/steel-price-intelligence-cockpit",
    featured: false,
    blog_id: 1777824800007
  },
  {
    id: "revenue-leakage-auditor",
    title: "Revenue Leakage Detection & Assurance Dashboard",
    category: "Strategic Finance & BI",
    impact_badge: "$380K Leakage Detected",
    problem: "Complex subscription billing, promotional discounts, and uncollected milestone billings result in 2-5% of total enterprise contract value leaking silently across departmental cracks.",
    approach: "Designed a multi-unit revenue assurance dashboard that cross-references billed invoicing records against CRM contracted entitlements and payment gateway transactions to expose unbilled revenue.",
    impact: [
      "Flagged $380K in cumulative unbilled service milestones and expired discounts",
      "Identified 4 systemic invoicing discrepancy clusters across business units",
      "Decreased Days Sales Outstanding (DSO) by 14 days"
    ],
    desc: "Revenue leakage detection dashboard across business units identifying billing disconnects, expired promotions, and uncollected milestone invoicing.",
    tags: ["Revenue Assurance", "Financial Auditing", "Billing Discrepancies", "Chart.js", "BI Dashboard"],
    image: "/assets/projects/financial_consolidation.jpg",
    link: "https://revenue-leakage-auditor.vercel.app",
    github_link: "https://github.com/abir2022/revenue-leakage-auditor",
    featured: false,
    blog_id: 1777824800008
  },
  {
    id: "marketing-budget-control-tower",
    title: "Marketing Budget & Expense Control Tower",
    category: "Strategic Finance & BI",
    impact_badge: "Zero Budget Overage",
    problem: "Multi-brand marketing teams suffer from unpredictable budget overages and delayed agency reconciliations, making quarterly cash burn forecasting unreliable.",
    approach: "Built an executive control tower visualising committed vs. actual ad spend, platform burn rates, pacing thresholds, and variance against approved annual financial plans.",
    impact: [
      "Prevented budget overspend across 8 regional marketing campaigns",
      "Provided continuous daily pacing alerts 15 days before monthly budget exhaustion",
      "Streamlined vendor invoice approval from 7 days to 24 hours"
    ],
    desc: "Marketing budget and expense control tower tracking channel-level ad spend, real-time pacing, committed vs. actual burn, and budget variance.",
    tags: ["Budget Management", "Marketing Finance", "Pacing Analytics", "Chart.js", "Expense Control"],
    image: "/assets/projects/agency_reporting.jpg",
    link: "https://marketing-budget-control-tower.vercel.app",
    github_link: "https://github.com/abir2022/marketing-budget-control-tower",
    featured: false,
    blog_id: 1777824800009
  },
  {
    id: "customer-insights-dashboard",
    title: "B2B Customer Insights & Segmentation Engine",
    category: "Operations & Portals",
    impact_badge: "+18% Expansion Lift",
    problem: "Enterprise account managers often treat all B2B accounts homogenously, failing to spot accounts ripe for expansion or early signals of disengagement.",
    approach: "Developed an RFM (Recency, Frequency, Monetary) and usage-frequency segmentation cockpit with interactive multidimensional filtering across company size, ARR, and engagement tiers.",
    impact: [
      "Segmented 450+ accounts into actionable high-yield cohort clusters",
      "Surfaced top 15% accounts driving 72% of margin for executive outreach",
      "Drove an 18% lift in secondary product cross-sell conversion"
    ],
    desc: "B2B customer research and segmentation dashboard analyzing RFM scores, churn risk tiers, engagement health, and expansion opportunities.",
    tags: ["Customer Segmentation", "RFM Analysis", "B2B Analytics", "Chart.js", "Account Health"],
    image: "/assets/projects/b2b_sales_pipeline.jpg",
    link: "https://customer-insights-dashboard-gold.vercel.app",
    github_link: "https://github.com/abir2022/customer-insights-dashboard",
    featured: false,
    blog_id: 1777824800010
  },
  {
    id: "business-recovery-dashboard",
    title: "Business-Unit Turnaround & Recovery Dashboard",
    category: "Strategic Finance & BI",
    impact_badge: "Break-Even Modeling",
    problem: "Distressed subsidiaries and unprofitable operating units require immediate granular diagnosis of fixed cost overhangs, gross margin degradation, and turnaround milestones.",
    approach: "Engineered a comprehensive financial turnaround dashboard with break-even sensitivity analysis, overhead reduction tracking, and milestone monitoring.",
    impact: [
      "Modeled exact operational break-even volume under 3 cost reduction scenarios",
      "Tracked 28 restructuring initiatives to restore positive cash flow",
      "Provided board members with milestone verification"
    ],
    desc: "Business-unit loss recovery and turnaround analytics dashboard modeling fixed-cost rationalization, break-even targets, and margin recovery.",
    tags: ["Turnaround Management", "Restructuring BI", "Financial Modeling", "Chart.js", "Break-Even Analysis"],
    image: "/assets/projects/financial_consolidation.jpg",
    link: "https://business-recovery-dashboard.vercel.app",
    github_link: "https://github.com/abir2022/business-recovery-dashboard",
    featured: false,
    blog_id: 1777824800011
  },
  {
    id: "agro-marketing-analytics",
    title: "Agro-Feed Strategic Marketing Analytics Dashboard",
    category: "Pricing & Econometrics",
    impact_badge: "Territorial Market Share",
    problem: "Agricultural feed distributors struggle to assess dealer territory penetration, competitor pricing pressure, and seasonal farm replenishment cycles across rural distribution routes.",
    approach: "Formulated an agro-marketing intelligence dashboard integrating dealer sales velocity, regional market share estimates, and credit term utilization.",
    impact: [
      "Mapped sales performance across 12 high-priority agricultural districts",
      "Correlated seasonal harvest cycles with product stock replenishment demand",
      "Identified under-penetrated dealer regions with 30%+ expansion potential"
    ],
    desc: "Agro-feed strategic marketing analysis dashboard mapping regional dealer sales velocity, farmer credit cycles, and territory market share.",
    tags: ["Agritech Analytics", "Field Distribution", "Pricing Intelligence", "Chart.js", "Market Penetration"],
    image: "/assets/projects/ecom_profitability.jpg",
    link: "https://agro-marketing-analytics.vercel.app",
    github_link: "https://github.com/abir2022/agro-marketing-analytics",
    featured: false,
    blog_id: 1777824800012
  },
  {
    id: "quarterly-marketing-review",
    title: "Quarterly Marketing Performance Review Suite",
    category: "Strategic Finance & BI",
    impact_badge: "Executive QBR Suite",
    problem: "Preparing quarterly business reviews (QBR) requires compiling dozens of slides with conflicting numbers from Google Analytics, Meta Ads, and CRM leads.",
    approach: "Built a streamlined quarterly review web application consolidating top-of-funnel reach, MQL/SQL conversion velocity, blended CAC, and channel ROAS into an interactive presentation deck.",
    impact: [
      "Replaced 40 static presentation slides with an interactive live dashboard",
      "Standardized marketing efficiency metrics across leadership stakeholders",
      "Cut QBR deck preparation time from 3 business days to instant generation"
    ],
    desc: "Quarterly marketing performance review app consolidating ad reach, pipeline generation, customer acquisition cost, and revenue attribution.",
    tags: ["QBR Presentation", "Marketing Analytics", "Performance Review", "Chart.js", "Executive Reporting"],
    image: "/assets/projects/agency_reporting.jpg",
    link: "https://quarterly-marketing-review.vercel.app",
    github_link: "https://github.com/abir2022/quarterly-marketing-review",
    featured: false,
    blog_id: 1777824800013
  },
  {
    id: "campaign-tracker",
    title: "Engineering Initiative & Campaign Delivery Tracker",
    category: "Operations & Portals",
    impact_badge: "96% Milestone Velocity",
    problem: "Multi-functional engineering initiatives suffer from unaligned sprint timelines, unclear blocker ownership, and delayed leadership visibility.",
    approach: "Designed an initiative tracking command center displaying sprint burnup charts, risk heatmaps, team capacity allocation, and milestone completion velocity.",
    impact: [
      "Tracked 14 concurrent enterprise engineering workstreams in real time",
      "Surfaced critical path dependency bottlenecks 2 weeks before release targets",
      "Maintained 96% on-time milestone delivery rate across cross-functional teams"
    ],
    desc: "Engineering campaign and initiative tracker dashboard tracking sprint burnup, risk heatmaps, and milestone completion velocity.",
    tags: ["Sprint Operations", "Initiative Tracking", "Project Governance", "Chart.js", "Engineering Analytics"],
    image: "/assets/projects/b2b_sales_pipeline.jpg",
    link: "https://campaign-tracker-nine-alpha.vercel.app",
    github_link: "https://github.com/abir2022/campaign-tracker",
    featured: false,
    blog_id: 1777824800014
  },
  {
    id: "field-officer-portal",
    title: "Field Officer Performance & Territorial Review Portal",
    category: "Operations & Portals",
    impact_badge: "Sales Force Telemetry",
    problem: "Area sales managers struggle to evaluate field officer visit frequency, lead closure efficiency, and territorial incentive distribution without unified telemetry.",
    approach: "Built a field officer performance evaluation portal combining target vs. achievement matrices, territory visit compliance, and tier-based incentive scorecards.",
    impact: [
      "Consolidated performance tracking for 60+ field sales representatives",
      "Increased customer visit compliance by 24% through transparent leaderboard metrics",
      "Automated quarterly sales commission calculation with zero disputes"
    ],
    desc: "Field officer performance and review portal tracking sales visit compliance, territory quotas, incentive payouts, and customer conversion rates.",
    tags: ["Sales Operations", "Field Management", "Performance Scorecards", "Chart.js", "Territory Analytics"],
    image: "/assets/projects/ecom_profitability.jpg",
    link: "https://field-officer-portal.vercel.app",
    github_link: "https://github.com/abir2022/field-officer-portal",
    featured: false,
    blog_id: 1777824800015
  },
  {
    id: "Heart-Plus",
    title: "Heart-Plus: Cloudflare Workers AI ECG Triage Telemetry",
    category: "AI Agents & Modern Web",
    impact_badge: "Edge AI Healthcare",
    problem: "Remote rural health centers lack on-site cardiology specialists, delaying initial ECG risk stratification and critical triage decisions.",
    approach: "Created an edge-first healthcare telemetry prototype on Cloudflare Workers, D1 SQL, R2 object storage, and Workers AI inference to process lead telemetry and assist preliminary triage.",
    impact: [
      "Sub-200ms edge AI triage inference without dedicated GPU server overhead",
      "Zero-trust client data isolation leveraging Cloudflare edge architecture",
      "Interactive visual ECG rhythm telemetry interface for clinical review"
    ],
    desc: "ECG triage and prescription workflow prototype powered by Cloudflare Workers, D1 SQL, R2 storage, and Cloudflare Workers AI.",
    tags: ["Cloudflare Workers", "Workers AI", "D1 SQL", "HealthTech", "TypeScript", "Vite"],
    image: "/assets/projects/financial_consolidation.jpg",
    link: "https://heart-plus-nine.vercel.app",
    github_link: "https://github.com/abir2022/Heart-Plus",
    featured: false,
    blog_id: 1777824800016
  },
  {
    id: "ignite-lab",
    title: "Ignite Lab: Virtual Training Platform & 3D Drill-Lab",
    category: "AI Agents & Modern Web",
    impact_badge: "Immersive EdTech",
    problem: "Technical vocational education requires expensive physical lab equipment, preventing remote learners from practicing hands-on machinery maintenance procedures.",
    approach: "Architected an interactive training portal with a 3D web drill-lab simulator, course curriculum management, role-based instructor permissions, and Supabase database.",
    impact: [
      "Built interactive 3D virtual maintenance drill simulations directly in browser",
      "Role-based authentication managing student progress and teacher grading",
      "Zero installation requirements across standard student devices"
    ],
    desc: "Virtual training lab: courses, live sessions, interactive 3D drill-lab module and role-based teacher accounts on Supabase.",
    tags: ["3D Simulation", "EdTech", "Supabase", "React", "Tailwind CSS", "Vite"],
    image: "/assets/projects/agency_reporting.jpg",
    link: "https://github.com/abir2022/ignite-lab",
    github_link: "https://github.com/abir2022/ignite-lab",
    featured: false,
    blog_id: 1777824800017
  },
  {
    id: "nexabir-services",
    title: "Nexabir Services: Digital Commerce & Client Operations Engine",
    category: "Operations & Portals",
    impact_badge: "Full E-Commerce Stack",
    problem: "Professional consulting practices need an automated digital storefront to manage tiered service offerings, intake briefs, cart checkout, and client delivery milestones without expensive third-party platforms.",
    approach: "Developed a customized digital commerce and operations portal with service catalogues, cart, Stripe/payment routing, client dashboard, and Supabase order status pipelines.",
    impact: [
      "End-to-end self-service onboarding and intake brief collection",
      "Automated client project milestone tracking from agreement to final delivery",
      "Unified admin telemetry for booking revenue and client pipeline health"
    ],
    desc: "Service business storefront: tiered catalogue, cart, checkout, order tracking, client and admin dashboards (React + Supabase).",
    tags: ["Storefront Engine", "React", "Supabase", "Client Portal", "Vite", "Netlify"],
    image: "/assets/projects/b2b_sales_pipeline.jpg",
    link: "https://github.com/abir2022/nexabir-services",
    github_link: "https://github.com/abir2022/nexabir-services",
    featured: false,
    blog_id: 1777824800018
  },
  {
    id: "nexabir-productivity",
    title: "Nexabir Productivity: Local-First Command Center PWA",
    category: "Operations & Portals",
    impact_badge: "Zero-Latency PWA",
    problem: "Executives and analysts juggle multiple tasks across disconnected tools, losing hours to context switching and slow cloud-based task management apps.",
    approach: "Engineered a local-first Progressive Web App (PWA) with sub-millisecond offline storage, Eisenhower matrix prioritization, habit tracking, and analytics dashboards.",
    impact: [
      "Sub-10ms UI interaction latency via local-first indexed caching",
      "100% offline functionality as an installable desktop and mobile PWA",
      "Integrated visual productivity and focus analytics telemetry"
    ],
    desc: "Personal productivity command-center PWA with local-first indexed storage, sprint task management, and focus metrics.",
    tags: ["PWA", "Local-First", "Productivity BI", "React", "Offline Architecture"],
    image: "/assets/projects/agency_reporting.jpg",
    link: "https://nexabir-productivity.vercel.app",
    github_link: "https://github.com/abir2022/nexabir-productivity",
    featured: false,
    blog_id: 1777824800019
  },
  {
    id: "nexabir-demo",
    title: "Nexabir Showcase: Interactive Responsive Product Demo",
    category: "AI Agents & Modern Web",
    impact_badge: "Cross-Device UI/UX",
    problem: "Prospective enterprise clients need to preview responsive software dashboards and client portal interfaces across desktop, tablet, and mobile breakpoints prior to custom development.",
    approach: "Built a modular standalone product showcase demonstrating responsive multi-viewport layouts, dark/light theme switching, and interactive dashboard telemetry.",
    impact: [
      "Interactive viewport switching for desktop, tablet, and mobile testing",
      "Smooth 60fps animations and accessible high-contrast UI tokens",
      "Published directly to GitHub Pages with instant global CDN distribution"
    ],
    desc: "A standalone, responsive Nexabir product showcase for desktop and mobile with interactive dashboard telemetry.",
    tags: ["UI/UX Engineering", "Responsive Design", "Product Showcase", "GitHub Pages"],
    image: "/assets/projects/financial_consolidation.jpg",
    link: "https://abir2022.github.io/nexabir-demo/",
    github_link: "https://github.com/abir2022/nexabir-demo",
    featured: false,
    blog_id: 1777824800020
  },
  {
    id: "Excel-Student-Performance-EDA",
    title: "Multi-Variable Student Performance Regression & EDA",
    category: "Data Science & EDA",
    impact_badge: "R² = 0.84 Explanatory Power",
    problem: "Academic institutions struggle to identify which student behavioral factors (study hours, attendance, previous scores) exert the strongest predictive influence on final exam failure risk.",
    approach: "Conducted multi-variable linear regression and exploratory data analysis across 200 student records using Python (Pandas/Statsmodels) and advanced Excel analytical toolkits.",
    impact: [
      "Discovered study hours correlate 0.78 with exam score",
      "Fitted regression model explains 84% of total score variance (R² = 0.84)",
      "Formulated early intervention thresholds to preempt student academic probation"
    ],
    desc: "200 students, four predictors: study hours correlate 0.78 with exam score and the regression model explains 84% of score variance (Excel + Python).",
    tags: ["Linear Regression", "Statistical Modeling", "Excel Analytics", "Python", "Pandas", "EDA"],
    image: "/assets/projects/ecom_profitability.jpg",
    link: "https://github.com/abir2022/Excel-Student-Performance-EDA",
    github_link: "https://github.com/abir2022/Excel-Student-Performance-EDA",
    featured: false,
    blog_id: 1777824800021
  },
  {
    id: "zomato-restaurant-eda",
    title: "Zomato 9,551 Restaurant Exploratory Geospatial Analysis",
    category: "Data Science & EDA",
    impact_badge: "Uncovering Aggregation Bias",
    problem: "Global restaurant aggregators frequently calculate unweighted national average ratings, producing heavily skewed conclusions that hide regional service disparities.",
    approach: "Executed an extensive exploratory data analysis across 9,551 Zomato restaurant listings utilizing Python, Pandas, and Seaborn to dissect pricing, delivery availability, and rating distributions.",
    impact: [
      "Discovered 22.5% of total listings are completely unrated (2,139 in India alone)",
      "Proved unweighted country averages produce severe Simpson's Paradox distortions",
      "Identified price tiers with the highest verified customer retention ratings"
    ],
    desc: "9,551 Zomato restaurants: 22.5% of listings are unrated and 2,139 of those are in India — why average-rating-by-country misleads.",
    tags: ["Exploratory Data Analysis", "Python", "Pandas", "Seaborn", "Geospatial Statistics"],
    image: "/assets/projects/b2b_sales_pipeline.jpg",
    link: "https://github.com/abir2022/zomato-restaurant-eda",
    github_link: "https://github.com/abir2022/zomato-restaurant-eda",
    featured: false,
    blog_id: 1777824800022
  },
  {
    id: "fast-food-sales-analysis",
    title: "Fast-Food Transactional EDA & Revenue Anomaly Audit",
    category: "Data Science & EDA",
    impact_badge: "64.6% Revenue Concentration",
    problem: "Fast-food franchise owners often experience unexplained inventory-to-cash discrepancies due to unrecorded transactions and heavily skewed menu item profitability.",
    approach: "Audited 1,000 order transactions through Python Pandas EDA, calculating Pareto revenue concentration, peak hourly sales surges, and payment record gaps.",
    impact: [
      "Identified top 3 menu items driving 64.6% of gross franchise revenue",
      "Flagged 11.6% of order transactions missing registered payment records",
      "Recommended kitchen inventory pre-prep schedules based on hourly order velocity"
    ],
    desc: "1,000 fast-food orders: three menu items carry 64.6% of revenue, and 11.6% of orders have no payment record (pandas EDA).",
    tags: ["Pareto Analysis", "Transactional Audit", "Python", "Pandas", "Retail Analytics"],
    image: "/assets/projects/agency_reporting.jpg",
    link: "https://github.com/abir2022/fast-food-sales-analysis",
    github_link: "https://github.com/abir2022/fast-food-sales-analysis",
    featured: false,
    blog_id: 1777824800023
  }
];

export const projectCategories = [
  "All Projects",
  "Strategic Finance & BI",
  "Pricing & Econometrics",
  "AI Agents & Modern Web",
  "Operations & Portals",
  "Data Science & EDA"
];
