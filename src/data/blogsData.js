export const allBlogs = [
  {
    id: 1777738470286,
    slug: "blog-data-deciphered-bridge",
    timestamp: 1777738470286,
    title: "Data, Deciphered: Why I'm Building a Bridge Between Business Analysis and AI",
    category: "Strategy & Vision",
    readTime: "4 min read",
    snippet: "The role of a Business Analyst has moved beyond static requirements. Discover why converging business logic, financial mathematics, and AI agents forms the future of commercial decisions...",
    image: "/assets/blogs/data-deciphered.png",
    project_id: "strategic-financial-dashboard",
    content: `
      <p><strong>Introduction</strong></p>
      <p>The contemporary business analyst role has undergone a tectonic shift. It is no longer sufficient to merely gather user stories and author static Functional Requirement Documents (FRDs). Today, high-impact enterprise execution demands an intimate bridge between core financial mathematics, operational telemetry, and intelligent automated systems.</p>
      <br/>
      <p><strong>Vision: Why This Platform?</strong></p>
      <p>I built this space to explore where corporate strategy converges with modern engineering execution. The primary constraint for growing enterprises is rarely a lack of data—it is the velocity with which uncurated transactional data can be converted into defensible executive action.</p>
      <p>In this publication series, I document engineering breakdowns across four pivotal vectors:</p>
      <ul>
        <li><strong>Core Financial & Operational BI:</strong> Moving past standard charts into variance decomposition, 13-week rolling liquidity modeling, and contribution margin frameworks.</li>
        <li><strong>Econometric Pricing Strategy:</strong> Employing empirical price elasticity and commodity index modeling to eliminate arbitrary pricing decisions.</li>
        <li><strong>Edge AI & Retrieval Agents:</strong> Grounding Large Language Models on deterministic enterprise rows to answer complex institutional queries sub-second.</li>
        <li><strong>Full-Stack Analytics Portals:</strong> Architecting responsive web telemetry (React, Vite, Supabase, Cloudflare Workers) that replace clunky legacy software.</li>
      </ul>
      <br/>
      <p><strong>The Underlying Philosophy: Automate the Mundane, Amplify the Meaningful</strong></p>
      <p>Whether tracking multi-subsidiary debt covenants or deploying edge triage bots, the objective remains constant: eliminate systemic friction so leadership teams can focus on strategic capital allocation.</p>
    `
  },
  {
    id: 1777824800001,
    slug: "blog-strategic-financial-dashboard",
    timestamp: 1777824800000,
    title: "Consolidating Multi-Company Balance Sheets: How We Built a Real-Time CFO Control Suite",
    category: "Strategic Finance & BI",
    readTime: "6 min read",
    snippet: "Managing fragmented P&L statements across 5 corporate subsidiaries creates dangerous blindspots. Here is how we engineered an interactive multi-entity financial cockpit with automated variance decomposition...",
    image: "/assets/projects/financial_consolidation.jpg",
    project_id: "strategic-financial-dashboard",
    github_link: "https://github.com/abir2022/strategic-financial-dashboard",
    live_link: "https://strategic-financial-dashboard-pi.vercel.app",
    content: `
      <h2>The Problem: Fragmented Ledgers & Reconciliation Latency</h2>
      <p>In multi-entity holding groups and industrial conglomerates, monthly closing is often an ordeal. Each subsidiary runs its own general ledger schema, resulting in 40+ hours of manual reconciliation to answer basic questions: <em>What is our consolidated debt service coverage ratio? Which operating unit is draining working capital?</em></p>
      <br/>
      <h2>Architectural Approach: Unified Normalization & Interactive Variance</h2>
      <p>To solve this, we architected the <strong>Strategic Financial Dashboard</strong>. Built with a lightweight, zero-bloat web architecture and Chart.js, the system models:</p>
      <ul>
        <li><strong>Consolidated EBITDA Margins:</strong> Dynamic waterfall breakdowns isolating volume, price, and overhead variances across operating subsidiaries.</li>
        <li><strong>Working Capital Cycles:</strong> Real-time tracking of DSO (Days Sales Outstanding), DPO (Days Payable Outstanding), and DIO (Days Inventory Outstanding).</li>
        <li><strong>Debt Covenant & Solvency Ratios:</strong> Visual warning thresholds indicating covenant breach proximity on long-term credit lines.</li>
      </ul>
      <br/>
      <h2>Quantifiable Impact</h2>
      <p>By automating the multi-entity consolidation pipeline, month-end financial synthesis was compressed from 5 business days to instant executive inspection with 99.4% audit reconciliation accuracy.</p>
      <p><a href="https://strategic-financial-dashboard-pi.vercel.app" target="_blank">Explore the Live Vercel Demo</a> | <a href="https://github.com/abir2022/strategic-financial-dashboard" target="_blank">View GitHub Repository</a></p>
    `
  },
  {
    id: 1777824800002,
    slug: "blog-misaiagent",
    timestamp: 1777911200000,
    title: "Eliminating Hallucinations: Building a Grounded Edge AI Agent with Groq & Supabase",
    category: "AI Agents & Modern Web",
    readTime: "5 min read",
    snippet: "Generative AI without strict grounding is an enterprise liability. We built MisAIAgent using Groq LPU inference, Supabase PostgreSQL rows, and edge functions to achieve deterministic sub-second search...",
    image: "/assets/projects/agency_reporting.jpg",
    project_id: "misaiagent",
    github_link: "https://github.com/abir2022/misaiagent",
    live_link: "https://misaiagent.vercel.app",
    content: `
      <h2>The Hallucination Dilemma in Institutional Information Systems</h2>
      <p>Standard LLM deployments fail in academic departments and corporate intranets because generic foundational models will cheerfully fabricate office locations, course prerequisites, and faculty email addresses when unsure.</p>
      <br/>
      <h2>The System Architecture: Strict Retrieval-Augmented Grounding</h2>
      <p><strong>MisAIAgent</strong> was constructed under an uncompromising design rule: <em>The model may only formulate answers derived strictly from verified database records.</em></p>
      <ul>
        <li><strong>Sub-600ms Inference via Groq:</strong> Utilizing Groq's Language Processing Units (LPUs) to execute inference with near-zero token generation latency.</li>
        <li><strong>Deterministic Supabase Filtering:</strong> Queries first parse user intent into structured SQL parameters, pulling target instructor and curriculum records from Supabase PostgreSQL before prompting the LLM.</li>
        <li><strong>PWA Mobile Client:</strong> Fully installable Progressive Web App offering seamless instant search on mobile devices for campus visitors and students.</li>
      </ul>
      <br/>
      <h2>Takeaways for Enterprise AI Deployments</h2>
      <p>Context injection with rigid boundary constraints beats fine-tuning for institutional search. It eliminates training drift, safeguards data privacy, and ensures 100% verifiable outputs.</p>
      <p><a href="https://misaiagent.vercel.app" target="_blank">Test MisAIAgent Live</a> | <a href="https://github.com/abir2022/misaiagent" target="_blank">Inspect GitHub Codebase</a></p>
    `
  },
  {
    id: 1777824800003,
    slug: "blog-price-elasticity-cockpit",
    timestamp: 1777997600000,
    title: "The Mathematics of Pricing: Building an Interactive Price-Elasticity Simulation Cockpit",
    category: "Pricing & Econometrics",
    readTime: "7 min read",
    snippet: "Arbitrary price increases routinely destroy profitability when products cross unit elasticity thresholds. Discover how we built an econometric simulation tool to pinpoint optimal profit maxima (P*)...",
    image: "/assets/projects/ecom_profitability.jpg",
    project_id: "price-elasticity-cockpit",
    github_link: "https://github.com/abir2022/price-elasticity-cockpit",
    live_link: "https://price-elasticity-cockpit.vercel.app",
    content: `
      <h2>Why Cost-Plus Pricing Destroys Enterprise Value</h2>
      <p>Most commercial teams employ cost-plus pricing or intuitive gut checks. However, if a product's price elasticity of demand (|E_d|) is greater than 1.0 (elastic), a 10% price hike will precipitate a greater than 10% volume plunge, leading to net gross profit contraction.</p>
      <br/>
      <h2>Formulating the Interactive Cockpit</h2>
      <p>The <strong>Price Elasticity Cockpit</strong> allows commercial analysts to simulate non-linear demand reactions using both constant elasticity models (Q = A * P^epsilon) and linear demand curves (Q = a - bP):</p>
      <ul>
        <li><strong>Interactive Sensitivity Sliders:</strong> Slide baseline volume, unit variable costs, and elasticity parameters to observe real-time profit and revenue trajectories.</li>
        <li><strong>Identification of P* (Optimal Price):</strong> The simulation automatically solves the first derivative of total profit: d(Profit)/dP = 0, surfacing the exact point of maximum gross margin.</li>
        <li><strong>Consumer Surplus & Deadweight Loss:</strong> Visualizes the welfare tradeoff between aggressive extraction and market share volume expansion.</li>
      </ul>
      <br/>
      <h2>Strategic Application</h2>
      <p>This cockpit transformed quarterly commercial reviews from subjective pricing debates into rigorous mathematical scenario evaluations.</p>
      <p><a href="https://price-elasticity-cockpit.vercel.app" target="_blank">Launch the Simulation Cockpit</a> | <a href="https://github.com/abir2022/price-elasticity-cockpit" target="_blank">Review GitHub Repo</a></p>
    `
  },
  {
    id: 1777824800004,
    slug: "blog-ops-flash-report",
    timestamp: 1778084000000,
    title: "Engineering an Automated Operations Flash Reporting Pipeline: Python ETL, Supabase & Edge Workers",
    category: "Strategic Finance & BI",
    readTime: "6 min read",
    snippet: "Retroactive monthly operations reporting hides machine downtime until it is too late. Here is how we engineered an automated daily flash reporting pipeline using Python, Supabase, and Vite...",
    image: "/assets/projects/b2b_sales_pipeline.jpg",
    project_id: "ops-flash-report",
    github_link: "https://github.com/abir2022/ops-flash-report",
    content: `
      <h2>The Operational Latency Dilemma</h2>
      <p>In manufacturing and multi-facility operations, daily machine downtime, yield losses, and scrap spikes often languish inside local floor logs for 30 days before appearing in an executive monthly report. By the time leadership reads the report, the operational capital has already evaporated.</p>
      <br/>
      <h2>Full-Stack System Architecture</h2>
      <p>The <strong>Ops Flash Report</strong> platform was engineered to deliver sub-second visibility:</p>
      <ul>
        <li><strong>Automated Python ETL:</strong> Python scripts ingest raw telemetry and CSV logs from production lines, executing normalization, deduplication, and anomaly flagging.</li>
        <li><strong>Supabase PostgreSQL Database:</strong> Cloud-native relational storage with row-level security (RLS) separating plant-level metrics.</li>
        <li><strong>Vite & TypeScript Dashboard:</strong> High-performance frontend rendering responsive operational telemetry with zero client-side lag.</li>
        <li><strong>Cloudflare Edge Workers:</strong> Edge caching of daily flash summaries ensuring sub-100ms global dashboard load speeds.</li>
      </ul>
      <br/>
      <h2>Business Result</h2>
      <p>Downtime notification latency dropped by 85%, allowing plant supervisors to diagnose mechanical bottlenecks within hours rather than weeks.</p>
      <p><a href="https://github.com/abir2022/ops-flash-report" target="_blank">Inspect the Full Codebase on GitHub</a></p>
    `
  },
  {
    id: 1777824800005,
    slug: "blog-rivers-of-bangladesh",
    timestamp: 1778170400000,
    title: "Interactive 3D Geospatial Intelligence: Visualizing Bangladesh's River Networks with CesiumJS",
    category: "AI Agents & Modern Web",
    readTime: "8 min read",
    snippet: "River morphology, siltation, and seasonal flooding require immersive spatial analysis. Learn how we built a browser-based 3D GIS platform using CesiumJS, KML/KMZ topological layers, and React...",
    image: "/assets/projects/financial_consolidation.jpg",
    project_id: "Rivers-of-Bangladesh",
    github_link: "https://github.com/abir2022/Rivers-of-Bangladesh",
    live_link: "https://rivers-of-bangladesh-six.vercel.app",
    content: `
      <h2>Geospatial Challenges in River Basin Management</h2>
      <p>Bangladesh possesses one of the world's most intricate and dynamic deltaic river networks. Historically, inspecting hydrological changes, cross-border flows, and flood plain topography required heavy desktop GIS installations (ArcGIS, QGIS) inaccessible to field researchers, policy advocates, and the public.</p>
      <br/>
      <h2>Engineering the 3D Digital River Atlas</h2>
      <p><strong>Rivers of Bangladesh</strong> broke these spatial accessibility barriers:</p>
      <ul>
        <li><strong>CesiumJS 3D Globe Rendering:</strong> Leveraged WebGL hardware acceleration to render dynamic terrain elevation, satellite imagery, and river contours directly in modern browsers.</li>
        <li><strong>Custom KML/KMZ Spatial Layer Parsing:</strong> Ingested complex topological vectors defining 50+ major river basins and tributaries.</li>
        <li><strong>Interactive Community Telemetry:</strong> Supabase-backed user authentication enabling verified environmental researchers to log seasonal water levels, erosion warnings, and field photographs.</li>
      </ul>
      <br/>
      <h2>Impact on Public Data Democratization</h2>
      <p>By delivering high-fidelity 3D spatial intelligence through the web, researchers and students can inspect national river systems without licensing barriers.</p>
      <p><a href="https://rivers-of-bangladesh-six.vercel.app" target="_blank">Explore the Live 3D Globe</a> | <a href="https://github.com/abir2022/Rivers-of-Bangladesh" target="_blank">View GitHub Repository</a></p>
    `
  },
  {
    id: 1777824800006,
    slug: "blog-mrittika",
    timestamp: 1778256800000,
    title: "Headless Content Publishing Without the Vulnerabilities: The Architecture of Mrittika",
    category: "AI Agents & Modern Web",
    readTime: "5 min read",
    snippet: "Why run vulnerable WordPress databases when you can commit content directly to GitHub via API? Here is how Mrittika delivers an ultra-fast, 100/100 Lighthouse editorial platform...",
    image: "/assets/projects/agency_reporting.jpg",
    project_id: "Mrittika",
    github_link: "https://github.com/abir2022/Mrittika",
    live_link: "https://mrittika-six.vercel.app",
    content: `
      <h2>The Fragility of Traditional Content Management Systems</h2>
      <p>Small enterprise sites and editorial blogs frequently fall victim to outdated WordPress plugins, MySQL injection vectors, and sluggish server response times. For many content teams, maintaining a complex PHP/SQL backend is an unnecessary operational liability.</p>
      <br/>
      <h2>The Git-as-a-CMS Architecture</h2>
      <p><strong>Mrittika</strong> reimagines content management by decoupling the admin workflow entirely from runtime hosting:</p>
      <ul>
        <li><strong>Local & Authenticated Admin Studio:</strong> Editors draft articles, upload imagery, and curate product categories through an intuitive, modern UI.</li>
        <li><strong>Direct GitHub API Commits:</strong> Instead of writing to a vulnerable database, the panel authenticates via GitHub REST API, committing structured JSON payloads directly to the repository.</li>
        <li><strong>Automated Vercel CI/CD Rebuilds:</strong> Every Git commit triggers an automated build that generates immutable static HTML distributed instantly across global edge CDNs.</li>
      </ul>
      <br/>
      <h2>The Result: Unhackable, Zero-Maintenance Performance</h2>
      <p>The platform scores a perfect 100/100 on Google Lighthouse, incurs zero database hosting fees, and cannot be compromised via SQL injection.</p>
      <p><a href="https://mrittika-six.vercel.app" target="_blank">Visit Mrittika Live</a> | <a href="https://github.com/abir2022/Mrittika" target="_blank">Explore the GitHub Repo</a></p>
    `
  },
  {
    id: 1777824800007,
    slug: "blog-steel-price-intelligence",
    timestamp: 1778343200000,
    title: "Navigating Industrial Commodity Volatility: Building a Steel Price Intelligence Cockpit",
    category: "Pricing & Econometrics",
    readTime: "6 min read",
    snippet: "Heavy industrial rebar and scrap prices fluctuate rapidly across international exchanges. We engineered a single-file commodity intelligence cockpit to time raw material forward contracts...",
    image: "/assets/projects/ecom_profitability.jpg",
    project_id: "steel-price-intelligence-cockpit",
    github_link: "https://github.com/abir2022/steel-price-intelligence-cockpit",
    live_link: "https://steel-price-intelligence-cockpit.vercel.app",
    content: `
      <h2>The Cost of Bad Procurement Timing</h2>
      <p>In heavy manufacturing (steel rerolling, construction infrastructure), raw material procurement represents over 70% of total Cost of Goods Sold (COGS). Purchasing 5,000 metric tons of steel billet 2 weeks too early during a cyclical peak can wipe out an entire quarter's operating profit.</p>
      <br/>
      <h2>Engineering the Steel Intelligence Cockpit</h2>
      <p>To empower procurement directors with actionable foresight, we designed the <strong>Steel Price Intelligence Cockpit</strong>:</p>
      <ul>
        <li><strong>Index Consolidation:</strong> Tracks international scrap benchmarks, billet import parity, and domestic rebar price spreads in a unified telemetry stream.</li>
        <li><strong>Technical Volatility Bands:</strong> Uses rolling 30-day and 90-day moving averages and Bollinger volatility bands to detect overbought market conditions.</li>
        <li><strong>Single-File Portable Architecture:</strong> Engineered to run with zero dependencies for rapid deployment in boardroom discussions and trading floors.</li>
      </ul>
      <br/>
      <h2>Key Commercial Takeaway</h2>
      <p>Commodity intelligence is not about predicting the future with certainty—it is about avoiding high-risk buying zones and systematically locking in favorable conversion margins.</p>
      <p><a href="https://steel-price-intelligence-cockpit.vercel.app" target="_blank">Launch the Steel Cockpit</a> | <a href="https://github.com/abir2022/steel-price-intelligence-cockpit" target="_blank">View on GitHub</a></p>
    `
  },
  {
    id: 1777824800008,
    slug: "blog-revenue-leakage-auditor",
    timestamp: 1778429600000,
    title: "Uncovering $380K in Silent Revenue Leakage: An Algorithmic Assurance Dashboard",
    category: "Strategic Finance & BI",
    readTime: "7 min read",
    snippet: "Between CRM entitlements, expired promotional discounts, and manual billing milestones, 2-5% of revenue slips through the cracks. Discover how our audit dashboard identified $380K in unbilled capital...",
    image: "/assets/projects/financial_consolidation.jpg",
    project_id: "revenue-leakage-auditor",
    github_link: "https://github.com/abir2022/revenue-leakage-auditor",
    live_link: "https://revenue-leakage-auditor.vercel.app",
    content: `
      <h2>Where Enterprise Revenue Silently Vanishes</h2>
      <p>In multi-divisional enterprises with hybrid contracts, revenue leakage is an insidious phenomenon. It rarely happens through blatant theft; rather, it stems from operational friction: promotional pricing extending past contract expiration, service milestones achieved but unbilled, and misaligned ERP rate cards.</p>
      <br/>
      <h2>The Automated Revenue Assurance Model</h2>
      <p>We engineered the <strong>Revenue Leakage Auditor</strong> to systematically compare three independent data layers:</p>
      <ol>
        <li><strong>CRM Contractual Entitlements:</strong> Agreed billable rates, duration clauses, and discount expiration dates.</li>
        <li><strong>Operational Delivery Logs:</strong> Completed consulting sprints, software usage tiers, and shipped inventory batches.</li>
        <li><strong>ERP / Accounting Invoices:</strong> Actual billed invoices registered in accounts receivable.</li>
      </ol>
      <br/>
      <h2>Algorithmic Findings</h2>
      <p>The dashboard surfaced 4 systemic leakage clusters, isolating $380,000 in unbilled milestone deliverables and helping leadership reduce Days Sales Outstanding (DSO) by 14 days.</p>
      <p><a href="https://revenue-leakage-auditor.vercel.app" target="_blank">Explore the Live Auditor</a> | <a href="https://github.com/abir2022/revenue-leakage-auditor" target="_blank">Inspect GitHub Code</a></p>
    `
  },
  {
    id: 1777824800009,
    slug: "blog-marketing-budget-control-tower",
    timestamp: 1778516000000,
    title: "Zero Budget Overages: Building a Real-Time Marketing Control Tower",
    category: "Strategic Finance & BI",
    readTime: "5 min read",
    snippet: "Multi-channel ad platforms make overspending dangerously easy. Here is how we engineered an executive budget control tower tracking committed spend, daily pacing, and financial plan variance...",
    image: "/assets/projects/agency_reporting.jpg",
    project_id: "marketing-budget-control-tower",
    github_link: "https://github.com/abir2022/marketing-budget-control-tower",
    live_link: "https://marketing-budget-control-tower.vercel.app",
    content: `
      <h2>The Pacing Pitfall in High-Velocity Performance Marketing</h2>
      <p>Marketing teams managing campaigns across Meta, Google Ads, TikTok, and programmatic networks frequently discover budget overages weeks after the billing cycle ends. Without unified pacing telemetry, agency spend accelerates while actual revenue attribution lags behind.</p>
      <br/>
      <h2>Control Tower Features</h2>
      <p>The <strong>Marketing Budget Control Tower</strong> provides financial discipline:</p>
      <ul>
        <li><strong>Daily Burn Pacing Thresholds:</strong> Flags campaigns whose daily spend trajectory will exhaust monthly allotments more than 5 days premature.</li>
        <li><strong>Committed vs. Cash Actuals:</strong> Separates contracted vendor retainer commitments from variable programmatic auction spend.</li>
        <li><strong>Variance to Approved Financial Plan:</strong> Immediate executive visibility into quarterly budget alignment.</li>
      </ul>
      <p><a href="https://marketing-budget-control-tower.vercel.app" target="_blank">View Control Tower Demo</a> | <a href="https://github.com/abir2022/marketing-budget-control-tower" target="_blank">Access GitHub Repo</a></p>
    `
  },
  {
    id: 1777824800010,
    slug: "blog-customer-insights-dashboard",
    timestamp: 1778602400000,
    title: "Beyond Basic Churn: Engineering an RFM Customer Segmentation & Expansion Engine",
    category: "Operations & Portals",
    readTime: "6 min read",
    snippet: "Treating all customer accounts identically destroys retention. We built a multidimensional B2B customer insights cockpit utilizing RFM analysis to identify high-yield expansion targets...",
    image: "/assets/projects/b2b_sales_pipeline.jpg",
    project_id: "customer-insights-dashboard",
    github_link: "https://github.com/abir2022/customer-insights-dashboard",
    live_link: "https://customer-insights-dashboard-gold.vercel.app",
    content: `
      <h2>The Danger of Homogeneous Account Management</h2>
      <p>In B2B customer success, the top 20% of enterprise accounts typically generate 80% of net margin. Yet customer success reps often spend equal time triaging small, disengaged accounts while neglecting the expansion signals of high-value clients.</p>
      <br/>
      <h2>Implementing the Multidimensional RFM Engine</h2>
      <p>The <strong>Customer Insights Dashboard</strong> applies algorithmic segmentation:</p>
      <ul>
        <li><strong>Recency, Frequency, Monetary (RFM) Scoring:</strong> Mathematical clustering that categorizes clients into 'Champions', 'Potential Loyalists', 'At Risk', and 'Hibernating'.</li>
        <li><strong>Expansion Readiness Telemetry:</strong> Flags accounts displaying 90%+ feature utilization coupled with expanding seat licenses.</li>
        <li><strong>Churn Early-Warning Radar:</strong> Highlights accounts whose login frequency has dropped by 30% over trailing 30-day periods.</li>
      </ul>
      <p><a href="https://customer-insights-dashboard-gold.vercel.app" target="_blank">Test Customer Insights Live</a> | <a href="https://github.com/abir2022/customer-insights-dashboard" target="_blank">Review GitHub Codebase</a></p>
    `
  },
  {
    id: 1777824800011,
    slug: "blog-business-recovery-dashboard",
    timestamp: 1778688800000,
    title: "Financial Turnaround Analytics: Modeling Break-Even Targets for Distressed Business Units",
    category: "Strategic Finance & BI",
    readTime: "7 min read",
    snippet: "Turning around an unprofitable subsidiary requires granular fixed-cost rationalization. Here is how we modeled break-even sensitivity curves and restructuring milestones...",
    image: "/assets/projects/financial_consolidation.jpg",
    project_id: "business-recovery-dashboard",
    github_link: "https://github.com/abir2022/business-recovery-dashboard",
    live_link: "https://business-recovery-dashboard.vercel.app",
    content: `
      <h2>The Anatomy of a Corporate Turnaround</h2>
      <p>When an operating subsidiary reports persistent negative operational cash flow, executive leadership cannot afford to make blind across-the-board cuts. Doing so often damages high-margin revenue lines while leaving structural fixed overhead intact.</p>
      <br/>
      <h2>Break-Even Sensitivity & Restructuring Governance</h2>
      <p>The <strong>Business Recovery Dashboard</strong> was developed to model:</p>
      <ul>
        <li><strong>Contribution Margin Ratio (CMR) Sensitivity:</strong> Evaluates how targeted SKU price adjustments reduce the monthly sales volume needed to achieve break-even.</li>
        <li><strong>Fixed-Cost Overhead Deconstruction:</strong> Categorizes SG&A expenses into non-negotiable compliance costs vs. discretionary operational outlays.</li>
        <li><strong>Milestone Governance:</strong> Real-time tracking of 28 restructuring initiatives to ensure management accountability to the Board of Directors.</li>
      </ul>
      <p><a href="https://business-recovery-dashboard.vercel.app" target="_blank">Launch the Turnaround Dashboard</a> | <a href="https://github.com/abir2022/business-recovery-dashboard" target="_blank">Inspect GitHub Code</a></p>
    `
  },
  {
    id: 1777824800012,
    slug: "blog-agro-marketing-analytics",
    timestamp: 1778775200000,
    title: "Territorial Market Penetration: Designing an Agro-Feed Marketing Analytics Cockpit",
    category: "Pricing & Econometrics",
    readTime: "6 min read",
    snippet: "Mapping dealer velocity and credit terms across rural agricultural districts requires targeted spatial analytics. Here is how we designed a strategic agro-marketing cockpit...",
    image: "/assets/projects/ecom_profitability.jpg",
    project_id: "agro-marketing-analytics",
    github_link: "https://github.com/abir2022/agro-marketing-analytics",
    live_link: "https://agro-marketing-analytics.vercel.app",
    content: `
      <h2>The Nuance of Agricultural Distribution Networks</h2>
      <p>Agro-feed and agricultural input businesses operate under unique macroeconomic dynamics: seasonal crop harvest cycles, localized weather risks, and complex dealer credit terms. Without regionalized telemetry, sales executives cannot distinguish between seasonal slowdowns and competitive market loss.</p>
      <br/>
      <h2>Analytical Framework of the Agro Cockpit</h2>
      <p>The <strong>Agro-Marketing Analytics Dashboard</strong> unifies:</p>
      <ul>
        <li><strong>Dealer Velocity Index:</strong> Tracking inventory replenishment cadence across 12 high-priority agricultural districts.</li>
        <li><strong>Credit Term Risk Modeling:</strong> Correlating dealer outstanding receivables with harvest realization timelines.</li>
        <li><strong>Territory Penetration Scoring:</strong> Benchmarking company feed market share against regional livestock estimates.</li>
      </ul>
      <p><a href="https://agro-marketing-analytics.vercel.app" target="_blank">Explore the Live Agro Dashboard</a> | <a href="https://github.com/abir2022/agro-marketing-analytics" target="_blank">Check GitHub Source</a></p>
    `
  },
  {
    id: 1777824800013,
    slug: "blog-quarterly-marketing-review",
    timestamp: 1778861600000,
    title: "Retiring Static Slide Decks: Engineering an Interactive Quarterly Marketing Review App",
    category: "Strategic Finance & BI",
    readTime: "5 min read",
    snippet: "Static 50-slide PowerPoint presentations are where marketing accountability goes to die. We replaced static decks with an interactive web app uniting reach, CAC, and pipeline conversion...",
    image: "/assets/projects/agency_reporting.jpg",
    project_id: "quarterly-marketing-review",
    github_link: "https://github.com/abir2022/quarterly-marketing-review",
    live_link: "https://quarterly-marketing-review.vercel.app",
    content: `
      <h2>The Tyranny of the Quarterly PowerPoint Deck</h2>
      <p>Every quarter, marketing leaders spend dozens of hours copying screenshots of Google Analytics and ad managers into slide decks. During the meeting, half the time is squandered arguing whether the numbers match finance's billing records.</p>
      <br/>
      <h2>The Web-First QBR Solution</h2>
      <p>The <strong>Quarterly Marketing Review App</strong> turns static reporting into an exploratory dialogue:</p>
      <ul>
        <li><strong>Real-Time Funnel Inspection:</strong> Switch between awareness impressions, MQLs, SQLs, and closed revenue with unified conversion math.</li>
        <li><strong>Blended vs. Paid Customer Acquisition Cost (CAC):</strong> Prevents organic search traffic from masking declining ad channel efficiency.</li>
        <li><strong>Zero Slide Preparation Overhead:</strong> Numbers populate dynamically from live data feeds, completely eliminating manual screenshot copy-pasting.</li>
      </ul>
      <p><a href="https://quarterly-marketing-review.vercel.app" target="_blank">Test the QBR Web App</a> | <a href="https://github.com/abir2022/quarterly-marketing-review" target="_blank">Inspect on GitHub</a></p>
    `
  },
  {
    id: 1777824800014,
    slug: "blog-campaign-tracker",
    timestamp: 1778948000000,
    title: "Engineering Delivery Velocity: Designing a Campaign & Initiative Command Center",
    category: "Operations & Portals",
    readTime: "5 min read",
    snippet: "Cross-functional engineering initiatives fail when blocker ownership is ambiguous. Here is how we designed a real-time initiative command center tracking sprint burnup and risk heatmaps...",
    image: "/assets/projects/b2b_sales_pipeline.jpg",
    project_id: "campaign-tracker",
    github_link: "https://github.com/abir2022/campaign-tracker",
    live_link: "https://campaign-tracker-nine-alpha.vercel.app",
    content: `
      <h2>Why Complex Engineering Campaigns Slip</h2>
      <p>Initiatives involving software developers, QA engineers, and business stakeholders rarely fail from technical incompetence; they fail from lack of visibility into critical path dependencies. A single blocker in API authentication halts client onboarding for weeks.</p>
      <br/>
      <h2>Features of the Command Center</h2>
      <p>The <strong>Campaign Tracker</strong> delivers end-to-end transparency:</p>
      <ul>
        <li><strong>Sprint Burnup & Scope Velocity:</strong> Visualizes whether scope creep is jeopardizing planned delivery dates.</li>
        <li><strong>Critical Path Risk Heatmaps:</strong> Highlights dependent tasks that directly delay executive milestones.</li>
        <li><strong>Resource Allocation Balance:</strong> Ensures key engineers are not overloaded across competing initiatives.</li>
      </ul>
      <p><a href="https://campaign-tracker-nine-alpha.vercel.app" target="_blank">Launch the Live Tracker</a> | <a href="https://github.com/abir2022/campaign-tracker" target="_blank">GitHub Repository</a></p>
    `
  },
  {
    id: 1777824800015,
    slug: "blog-field-officer-portal",
    timestamp: 1779034400000,
    title: "Sales Force Telemetry: Constructing a Field Officer Performance & Incentive Portal",
    category: "Operations & Portals",
    readTime: "6 min read",
    snippet: "Evaluating distributed field officers requires transparent visit compliance and objective commission calculation. Discover how we built an interactive sales performance portal...",
    image: "/assets/projects/ecom_profitability.jpg",
    project_id: "field-officer-portal",
    github_link: "https://github.com/abir2022/field-officer-portal",
    live_link: "https://field-officer-portal.vercel.app",
    content: `
      <h2>The Challenge of Distributed Field Operations</h2>
      <p>Managing 50+ field sales officers operating across geographically dispersed retail territories creates serious operational blindspots. Without unified performance scorecards, top performers go unrewarded while underperforming routes persist undetected.</p>
      <br/>
      <h2>The Portal Architecture</h2>
      <p>The <strong>Field Officer Portal</strong> unifies territorial sales operations:</p>
      <ul>
        <li><strong>Target vs. Achievement Ratios:</strong> Real-time conversion tracking against quarterly volume and revenue quotas.</li>
        <li><strong>Territory Visit Compliance:</strong> Monitors route scheduling adherence to ensure retail partners receive consistent support.</li>
        <li><strong>Automated Incentive Calculator:</strong> Transparent commission tier calculations that eliminate end-of-quarter payout disputes.</li>
      </ul>
      <p><a href="https://field-officer-portal.vercel.app" target="_blank">View Field Officer Portal</a> | <a href="https://github.com/abir2022/field-officer-portal" target="_blank">View on GitHub</a></p>
    `
  },
  {
    id: 1777824800016,
    slug: "blog-heart-plus",
    timestamp: 1779120800000,
    title: "Edge-First HealthTech: Building an ECG Triage Prototype on Cloudflare Workers AI",
    category: "AI Agents & Modern Web",
    readTime: "7 min read",
    snippet: "Rural clinics often lack on-site cardiologists. We built Heart-Plus to explore sub-200ms edge AI triage inference using Cloudflare Workers, D1 SQL, and Workers AI...",
    image: "/assets/projects/financial_consolidation.jpg",
    project_id: "Heart-Plus",
    github_link: "https://github.com/abir2022/Heart-Plus",
    live_link: "https://heart-plus-nine.vercel.app",
    content: `
      <h2>The Clinical Need for Edge Telemetry</h2>
      <p>In rural and remote health centers, patients with acute chest pain frequently receive an ECG, but interpreting the tracing requires an on-call cardiologist who may be hours away. Preliminary risk stratification at the edge can save lives by prioritizing immediate transport.</p>
      <br/>
      <h2>Serverless Edge Architecture</h2>
      <p><strong>Heart-Plus</strong> was built on Cloudflare's serverless edge ecosystem:</p>
      <ul>
        <li><strong>Cloudflare Workers AI:</strong> Runs machine learning inference directly on global edge nodes without deploying dedicated GPU instances.</li>
        <li><strong>D1 SQL Database:</strong> Serverless relational storage recording patient intake telemetry and physician notes.</li>
        <li><strong>Visual Rhythm Interface:</strong> Interactive waveform rendering allowing attending clinicians to review AI triage flags in real time.</li>
      </ul>
      <p><a href="https://heart-plus-nine.vercel.app" target="_blank">Experience Heart-Plus Live</a> | <a href="https://github.com/abir2022/Heart-Plus" target="_blank">Inspect GitHub Source</a></p>
    `
  },
  {
    id: 1777824800017,
    slug: "blog-ignite-lab",
    timestamp: 1779207200000,
    title: "Immersive Virtual Vocational Training: Architecting Ignite Lab's 3D Simulation Platform",
    category: "AI Agents & Modern Web",
    readTime: "6 min read",
    snippet: "Physical training equipment is expensive and hazardous for beginners. We engineered Ignite Lab with browser-based 3D drill simulations, course management, and Supabase RBAC...",
    image: "/assets/projects/agency_reporting.jpg",
    project_id: "ignite-lab",
    github_link: "https://github.com/abir2022/ignite-lab",
    content: `
      <h2>Overcoming the Physical Training Bottleneck</h2>
      <p>Technical and vocational institutions struggle to provide every student with hands-on machinery access. Physical equipment is expensive to purchase, prone to accidental damage, and dangerous for novices without prior simulation practice.</p>
      <br/>
      <h2>The Ignite Lab Simulation Suite</h2>
      <p><strong>Ignite Lab</strong> delivers browser-based virtual practice:</p>
      <ul>
        <li><strong>Interactive 3D Drill-Lab:</strong> Interactive 3D component models that students can rotate, inspect, and disassemble directly in the browser.</li>
        <li><strong>Role-Based Access Control (RBAC):</strong> Tailored interfaces on Supabase for students, instructors, and system administrators.</li>
        <li><strong>Curriculum & Live Sessions:</strong> Integrated lesson pacing, assignment submission, and grading pipelines.</li>
      </ul>
      <p><a href="https://github.com/abir2022/ignite-lab" target="_blank">View Codebase on GitHub</a></p>
    `
  },
  {
    id: 1777824800018,
    slug: "blog-nexabir-services",
    timestamp: 1779293600000,
    title: "Building an Autonomous Service Business Storefront with React, Supabase & Netlify",
    category: "Operations & Portals",
    readTime: "5 min read",
    snippet: "Consultants waste countless hours sending manual proposals and chasing intake briefs. We built an automated service commerce portal with tiered packages, cart checkout, and client dashboards...",
    image: "/assets/projects/b2b_sales_pipeline.jpg",
    project_id: "nexabir-services",
    github_link: "https://github.com/abir2022/nexabir-services",
    content: `
      <h2>The Administrative Overhead of Advisory Practices</h2>
      <p>Independent consultants and small agencies often lose 10-15 hours a week manually exchanging emails, authoring custom proposals for standard scopes, and chasing client intake files. Productizing service delivery is the key to scaling without burnout.</p>
      <br/>
      <h2>The Storefront & Client Portal Architecture</h2>
      <p><strong>Nexabir Services</strong> streamlines this lifecycle:</p>
      <ul>
        <li><strong>Tiered Service Catalogue:</strong> Transparent scopes with explicit deliverables, turnaround times, and fixed pricing.</li>
        <li><strong>Automated Intake Onboarding:</strong> Captures client requirements, project credentials, and timeline goals during the checkout flow.</li>
        <li><strong>Client Delivery Dashboard:</strong> Provides clients with real-time milestone tracking and file delivery directly in their portal.</li>
      </ul>
      <p><a href="https://github.com/abir2022/nexabir-services" target="_blank">Review GitHub Repository</a></p>
    `
  },
  {
    id: 1777824800019,
    slug: "blog-nexabir-productivity",
    timestamp: 1779380000000,
    title: "Zero-Latency Focus: Designing a Local-First Productivity Command Center PWA",
    category: "Operations & Portals",
    readTime: "5 min read",
    snippet: "Cloud task managers that take 3 seconds to load destroy focus. Discover how we built an offline-first PWA with sub-10ms response times and Eisenhower matrix telemetry...",
    image: "/assets/projects/agency_reporting.jpg",
    project_id: "nexabir-productivity",
    github_link: "https://github.com/abir2022/nexabir-productivity",
    live_link: "https://nexabir-productivity.vercel.app",
    content: `
      <h2>Why Modern Productivity Software Fails</h2>
      <p>Modern cloud productivity tools are bloated with heavy bundles, recurring subscription paywalls, and slow network spinners. When an analyst is in deep focus, waiting 4 seconds for a task modal to open breaks the cognitive flow state.</p>
      <br/>
      <h2>The Local-First Engineering Philosophy</h2>
      <p><strong>Nexabir Productivity</strong> adheres to local-first principles:</p>
      <ul>
        <li><strong>Sub-10ms UI Interactions:</strong> All tasks, notes, and habits are stored directly in browser IndexedDB storage for instantaneous response.</li>
        <li><strong>100% Offline Capability:</strong> Works on planes, trains, and during network outages as an installable Progressive Web App.</li>
        <li><strong>Integrated Focus Telemetry:</strong> Features Eisenhower matrix urgency/importance sorting and Pomodoro completion analytics.</li>
      </ul>
      <p><a href="https://nexabir-productivity.vercel.app" target="_blank">Launch the Productivity App</a> | <a href="https://github.com/abir2022/nexabir-productivity" target="_blank">Inspect GitHub Source</a></p>
    `
  },
  {
    id: 1777824800020,
    slug: "blog-nexabir-demo",
    timestamp: 1779466400000,
    title: "Multi-Viewport Showcase: Engineering a Responsive Product Demo Suite",
    category: "AI Agents & Modern Web",
    readTime: "4 min read",
    snippet: "Demonstrating how software dashboards adapt across mobile, tablet, and desktop breakpoints is essential for client confidence. Here is how we built a standalone demo suite...",
    image: "/assets/projects/financial_consolidation.jpg",
    project_id: "nexabir-demo",
    github_link: "https://github.com/abir2022/nexabir-demo",
    live_link: "https://abir2022.github.io/nexabir-demo/",
    content: `
      <h2>Bridging the Expectation Gap in Web Product Delivery</h2>
      <p>Clients evaluating custom web services and analytics dashboards frequently worry about mobile usability. Demonstrating that data tables, KPI cards, and charts adapt smoothly across screen form-factors is crucial for closing high-value engagements.</p>
      <br/>
      <h2>Showcase Highlights</h2>
      <p>The <strong>Nexabir Showcase</strong> provides interactive preview capabilities:</p>
      <ul>
        <li><strong>Viewport Simulation:</strong> Toggle between desktop widescreen, tablet portrait, and mobile device frames with a single click.</li>
        <li><strong>High-Contrast Color Tokens:</strong> Demonstrates flawless legibility in both dark cybersecurity and light executive themes.</li>
        <li><strong>Direct GitHub Pages Deployment:</strong> Hosted with zero server maintenance on GitHub's global edge network.</li>
      </ul>
      <p><a href="https://abir2022.github.io/nexabir-demo/" target="_blank">View Live Demo Suite</a> | <a href="https://github.com/abir2022/nexabir-demo" target="_blank">Explore GitHub Code</a></p>
    `
  },
  {
    id: 1777824800021,
    slug: "blog-student-performance-eda",
    timestamp: 1779552800000,
    title: "Predicting Academic Outcomes: Multi-Variable Regression Across 200 Student Records (R² = 0.84)",
    category: "Data Science & EDA",
    readTime: "7 min read",
    snippet: "Does attendance matter more than study hours? We conducted multi-variable regression analysis using Python and Excel, proving study hours correlate 0.78 with final exam success...",
    image: "/assets/projects/ecom_profitability.jpg",
    project_id: "Excel-Student-Performance-EDA",
    github_link: "https://github.com/abir2022/Excel-Student-Performance-EDA",
    content: `
      <h2>The Statistical Investigation</h2>
      <p>Educational institutions frequently implement generic student tutoring programs without verifying which underlying behavioral factors exert the strongest mathematical leverage on exam scores.</p>
      <br/>
      <h2>Econometric Methodology & Findings</h2>
      <p>Using Python (Pandas, Statsmodels) and Advanced Excel regression modeling across 200 student records:</p>
      <ul>
        <li><strong>Study Hours Dominance:</strong> Study hours demonstrated a strong positive Pearson correlation of <strong>0.78</strong> with final exam scores (p &lt; 0.001).</li>
        <li><strong>High Explanatory Power (R² = 0.84):</strong> The four-predictor multi-variable model accounted for <strong>84% of total score variance</strong>.</li>
        <li><strong>Diminishing Marginal Returns:</strong> After 25 weekly study hours, marginal score gains tapered significantly, highlighting the importance of study efficiency over brute-force cramming.</li>
      </ul>
      <p><a href="https://github.com/abir2022/Excel-Student-Performance-EDA" target="_blank">View Dataset & Code on GitHub</a></p>
    `
  },
  {
    id: 1777824800022,
    slug: "blog-zomato-restaurant-eda",
    timestamp: 1779639200000,
    title: "Why Average Ratings Lie: Dissecting 9,551 Zomato Restaurants & Simpson's Paradox",
    category: "Data Science & EDA",
    readTime: "8 min read",
    snippet: "Unweighted country averages mislead decision makers. Analyzing 9,551 Zomato restaurants revealed that 22.5% of listings are unrated, with 2,139 of those concentrated in a single nation...",
    image: "/assets/projects/b2b_sales_pipeline.jpg",
    project_id: "zomato-restaurant-eda",
    github_link: "https://github.com/abir2022/zomato-restaurant-eda",
    content: `
      <h2>The Deception of Simple Averages</h2>
      <p>When analyzing large commercial datasets, aggregating ratings into a simple arithmetic mean across countries frequently introduces severe aggregation bias (Simpson's Paradox). Without inspecting the distribution, analysts reach deeply flawed conclusions.</p>
      <br/>
      <h2>Key Exploratory Findings Across 9,551 Restaurants</h2>
      <p>Utilizing Python, Pandas, Matplotlib, and Seaborn, the audit revealed:</p>
      <ul>
        <li><strong>The Zero-Rating Distortion:</strong> <strong>22.5% of all restaurant listings</strong> (2,148 venues) possessed a 0.0 rating because they were unrated, with <strong>2,139</strong> located in India alone. Including these in national averages dragged India's mean rating artificially low.</li>
        <li><strong>Online Delivery vs. Table Booking:</strong> Venues offering online delivery demonstrated significantly higher rating frequencies than dine-in-only establishments.</li>
        <li><strong>Price Tier Elasticity:</strong> High-end tier 4 venues maintained tight rating variance, while mid-tier venues displayed volatile customer sentiment.</li>
      </ul>
      <p><a href="https://github.com/abir2022/zomato-restaurant-eda" target="_blank">Inspect Jupyter Notebook on GitHub</a></p>
    `
  },
  {
    id: 1777824800023,
    slug: "blog-fast-food-sales-analysis",
    timestamp: 1779725600000,
    title: "Pareto in the Kitchen: Auditing 1,000 Fast-Food Orders for Revenue Concentration & Payment Gaps",
    category: "Data Science & EDA",
    readTime: "6 min read",
    snippet: "Three menu items carry 64.6% of total franchise revenue, while 11.6% of orders lack payment records. Learn how Python Pandas exploratory analysis exposed retail revenue friction...",
    image: "/assets/projects/agency_reporting.jpg",
    project_id: "fast-food-sales-analysis",
    github_link: "https://github.com/abir2022/fast-food-sales-analysis",
    content: `
      <h2>The Operational Friction in Quick-Service Restaurants (QSR)</h2>
      <p>Fast-food franchises operate on razor-thin net margins. Even small discrepancies in POS registration, peak kitchen prep bottlenecks, and payment gateway drops can turn a profitable month into a loss.</p>
      <br/>
      <h2>Audit Insights from 1,000 Transactions</h2>
      <p>Executing systematic exploratory data analysis with Python Pandas uncovered:</p>
      <ul>
        <li><strong>Extreme Pareto Revenue Concentration:</strong> Just <strong>three menu items</strong> accounted for <strong>64.6% of gross franchise revenue</strong>, suggesting that 60% of the long-tail menu could be streamlined to reduce kitchen prep overhead.</li>
        <li><strong>11.6% Unrecorded Payment Anomaly:</strong> 116 out of 1,000 order transactions contained missing or unrecorded payment method identifiers, flagging potential floor shrinkage and terminal sync failures.</li>
        <li><strong>Hourly Rush Hour Clustering:</strong> 72% of order volume concentrated in two distinct 90-minute lunch and evening surges, dictating optimal staff scheduling.</li>
      </ul>
      <p><a href="https://github.com/abir2022/fast-food-sales-analysis" target="_blank">Access the Analysis Notebook on GitHub</a></p>
    `
  }
];
