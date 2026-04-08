type CaseStudyContent = {
    type: string;
    text?: string;
    src?: string;
    alt?: string;
    hint?: string;
};

type BaseCaseStudy = {
    slug: string;
    title: string;
    category: string;
    description: string;
    imageHint: string;
    content: CaseStudyContent[];
};

type CaseStudyWithImage = BaseCaseStudy & {
    imageUrl: string;
};

type CaseStudyMaybeWithImage = BaseCaseStudy & {
    imageUrl?: string;
};

export const services = [
  {
    iconName: "Code",
    title: "Web Development",
    description: "Building responsive, high-performance websites and applications tailored to your business needs.",
  },
  {
    iconName: "Smartphone",
    title: "Mobile App Development",
    description: "Creating intuitive and engaging mobile experiences for iOS and Android platforms.",
  },
  {
    iconName: "BrainCircuit",
    title: "AI & ML Solutions",
    description: "Leveraging artificial intelligence to automate processes, gain insights, and drive innovation.",
  },
  {
    iconName: "Gem",
    title: "Blockchain & Web3",
    description: "Developing decentralized applications and smart contracts for the next generation of the internet.",
  },
  {
    iconName: "PenTool",
    title: "UI/UX Design",
    description: "Designing beautiful, user-centric interfaces that are both functional and delightful.",
  },
  {
    iconName: "Megaphone",
    title: "Digital Marketing",
    description: "Driving growth and engagement through data-driven digital marketing strategies.",
  },
  {
    iconName: "Cloud",
    title: "Cloud Computing",
    description: "Architecting and managing scalable, secure, and cost-effective cloud infrastructure on AWS, GCP, and Azure.",
  },
  {
    iconName: "ShieldCheck",
    title: "Cybersecurity",
    description: "Protecting your digital assets with comprehensive security audits, threat detection, and robust defense strategies.",
  },
  {
    iconName: "Wifi",
    title: "Internet of Things (IoT)",
    description: "Building connected device ecosystems that gather data, automate tasks, and create smarter environments.",
  },
];

export const whyChooseUs = [
    {
      iconName: "Users",
      title: "Expert Team",
      description: "Our team consists of industry veterans and passionate technologists committed to excellence."
    },
    {
      iconName: "Lightbulb",
      title: "Innovative Solutions",
      description: "We stay at the forefront of technology to deliver cutting-edge solutions that solve real-world problems."
    },
    {
      iconName: "HeartHandshake",
      title: "Client-Centric Approach",
      description: "Your success is our priority. We work closely with you to understand your goals and deliver results."
    },
    {
      iconName: "Target",
      title: "Proven Results",
      description: "We have a track record of delivering successful projects for clients across various industries."
    }
];

export const technologies = [
  { name: 'HTML5', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/html5.svg', color: '#E34F26', websiteUrl: 'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5' },
  { name: 'CSS3', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/css3.svg', color: '#1572B6', websiteUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { name: 'JavaScript', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/javascript.svg', color: '#F7DF1E', websiteUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { name: 'TypeScript', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/typescript.svg', color: '#3178C6', websiteUrl: 'https://www.typescriptlang.org/' },
  { name: 'React', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/react.svg', color: '#61DAFB', websiteUrl: 'https://react.dev/' },
  { name: 'Next.js', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/nextdotjs.svg', color: '#FFFFFF', websiteUrl: 'https://nextjs.org/' },
  { name: 'Node.js', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/nodedotjs.svg', color: '#339933', websiteUrl: 'https://nodejs.org/' },
  { name: 'Express.js', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/express.svg', color: '#FFFFFF', websiteUrl: 'https://expressjs.com/' },
  { name: 'Python', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/python.svg', color: '#3776AB', websiteUrl: 'https://www.python.org/' },
  { name: 'Angular', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/angular.svg', color: '#DD0031', websiteUrl: 'https://angular.io/' },
  { name: 'Vue.js', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/vuedotjs.svg', color: '#4FC08D', websiteUrl: 'https://vuejs.org/' },
  { name: 'Nuxt.js', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nuxtdotjs.svg', color: '#00DC82', websiteUrl: 'https://nuxt.com/' },
  { name: 'Flutter', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/flutter.svg', color: '#02569B', websiteUrl: 'https://flutter.dev/' },
  { name: 'SASS', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/sass.svg', color: '#CC6699', websiteUrl: 'https://sass-lang.com/' },
  { name: 'Redux', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/redux.svg', color: '#764ABC', websiteUrl: 'https://redux.js.org/' },
  { name: 'GraphQL', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/graphql.svg', color: '#E10098', websiteUrl: 'https://graphql.org/' },
  { name: 'Webpack', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/webpack.svg', color: '#8DD6F9', websiteUrl: 'https://webpack.js.org/' },
  { name: 'Vite', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/vite.svg', color: '#646CFF', websiteUrl: 'https://vitejs.dev/' },
  { name: 'Tailwind CSS', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/tailwindcss.svg', color: '#06B6D4', websiteUrl: 'https://tailwindcss.com/' },
  { name: 'Bootstrap', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/bootstrap.svg', color: '#7952B3', websiteUrl: 'https://getbootstrap.com/' },
  { name: 'Firebase', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/firebase.svg', color: '#FFCA28', websiteUrl: 'https://firebase.google.com/' },
  { name: 'AWS', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazonaws.svg', color: '#FF9900', websiteUrl: 'https://aws.amazon.com/' },
  { name: 'Docker', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/docker.svg', color: '#2496ED', websiteUrl: 'https://www.docker.com/' },
  { name: 'GitHub', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/github.svg', color: '#FFFFFF', websiteUrl: 'https://github.com/' },
  { name: 'Figma', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/figma.svg', color: '#F24E1E', websiteUrl: 'https://www.figma.com/' },
  { name: 'PostgreSQL', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/postgresql.svg', color: '#4169E1', websiteUrl: 'https://www.postgresql.org/' },
  { name: 'MySQL', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/mysql.svg', color: '#4479A1', websiteUrl: 'https://www.mysql.com/' },
  { name: 'MongoDB', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/mongodb.svg', color: '#47A248', websiteUrl: 'https://www.mongodb.com/' },
];

export const testimonials = [
    {
        quote: "VEDTEIX TECHNOLOGY transformed our digital presence. Their expertise and dedication are unmatched. The results exceeded all our expectations.",
        name: "John Doe",
        title: "CEO, Innovate Corp",
        avatar: "https://placehold.co/100x100.png",
        hint: "man portrait"
    },
    {
        quote: "Working with VEDTEIX was a game-changer for our logistics. Their AI solution streamlined our operations and cut costs significantly.",
        name: "Jane Smith",
        title: "COO, Global Logistics",
        avatar: "https://placehold.co/100x100.png",
        hint: "woman portrait"
    },
    {
        quote: "The team's professionalism and technical skill are top-notch. They delivered a high-quality mobile app on time and on budget.",
        name: "Samuel Lee",
        title: "Founder, Tech Startup",
        avatar: "https://placehold.co/100x100.png",
        hint: "person portrait"
    },
    {
        quote: "Their cybersecurity solutions are robust and gave us peace of mind. We feel our data is more secure than ever.",
        name: "Emily White",
        title: "CISO, Secure Finance",
        avatar: "https://placehold.co/100x100.png",
        hint: "woman face"
    },
    {
        quote: "The cloud migration project was seamless. VEDTEIX's team handled everything with precision and minimal downtime.",
        name: "Michael Brown",
        title: "IT Director, CloudFirst Inc.",
        avatar: "https://placehold.co/100x100.png",
        hint: "man face"
    }
]

const imageMap: { [key: string]: string } = {
    "A B Testing and Analysis Framework": "A B Testing and Analysis Framework.avif",
    "Interactive Data Visualization Dashboard": "Interactive Data Visualization Dashboard.png",
    "Accessibility (a11y) Overhaul for a Government Website": "Accessibility Overhaul for Government Website.png",
    "Admin Panel for a Content Management System": "Admin Panel for CMS.png",
    "Automated Anomaly Detection System": "ai-anomaly-detection.jpg",
    "AI-Powered Logistics Optimization": "ai-powered-logistics-optimization.jpeg",
    "Booking Interface for a Travel Agency": "Booking Interface for a Travel Agency.png",
    "CI/CD Pipeline Automation": "CI CD Pipeline Automation.jpg",
    "Cloud Migration from On Prem to AWS": "Cloud Migration from On Prem to AWS.jpg",
    "Computer Vision for Quality Control": "Computer Vision for Quality Control.jpg",
    "Crypto Wallet Dashboard": "Crypto Wallet Dashboard.png",
    "Custom CRM for a Sales Team": "Custom CRM for Sales Team.png",
    "Customer Lifetime Value (CLV) Platform": "Customer Lifetime Value.webp",
    "Customer Segmentation Analysis": "Customer Segmentation Analysis.jpeg",
    "Decentralized Autonomous Organization (DAO) Platform": "DAO Platform.jpg",
    "DeFi Lending and Borrowing Protocol": "DeFi Lending and Borrowing Protocol.avif",
    "Design System & Component Library": "Design System & Component Library.png",
    "E-commerce Mobile App": "E-commerce Mobile App.png",
    "Enterprise Resource Planning (ERP) System": "Enterprise Resource Planning System.png",
    "Event Management Dashboard": "Event Management Dashboard.png",
    "Food Delivery App": "Food Delivery App.webp",
    "Frontend for a Live-Streaming Service": "Frontend for Live-Streaming Service.png",
    "Frontend for a Social Networking Platform": "Frontend for Social Networking Platform.png",
    "Gamified Learning Platform UI": "Gamified Learning Platform UI.jpeg",
    "Healthcare Patient Portal": "Healthcare Patient Portal.png",
    "High-Performance E-commerce Storefront": "High-Performance E-commerce Storefront.png",
    "Interactive Resume Builder": "Interactive Resume Builder.jpeg",
    "Marketing Website for a SaaS Product": "Marketing Website for a SaaS Product.jpeg",
    "Mobile Banking App": "Mobile Banking App.png",
    "Next-Gen Intrusion Detection System": "Next-Gen Intrusion Detection System.jpeg",
    "NFT Marketplace for Digital Art": "NFT Marketplace for Digital Art.jpg",
    "Natural Language Processing for Customer Support": "NLP for Customer Support.png",
    "On-demand Home Services App": "On-demand Home Services App.webp",
    "Online Learning and Course Marketplace": "Online Learning and Course Marketplace.png",
    "Personalized Recommendation Engine": "Personalized Recommendation Engine.png",
    "Phishing Simulation and Training Platform": "Phishing Simulation and Training Platform.webp",
    "Progressive Web App (PWA) for a News Outlet": "Progressive Web App for News Outlet.png",
    "Real-Time Collaborative Whiteboard App": "Real-Time Collaborative Whiteboard App.png",
    "Real-Time Sales Performance Dashboard": "Real-Time Sales Performance Dashboard.jpeg",
    "Real-time Stock Trading Interface": "Real-time Stock Trading Interface.png",
    "Recipe Finder Application": "Recipe Finder Application.png",
    "SaaS Project Management Tool": "SaaS Project Management Tool.png",
    "Secure Cloud Infrastructure Audit": "Secure Cloud Infrastructure Audit.avif",
    "Single Page Application (SPA) for a Music Streamer": "Single Page Application for Music Streamer.png",
    "Social Media & Chat App": "Social Media and Chat App.png",
    "Supply Chain Tracking on Blockchain": "Supply Chain Tracking on Blockchain.png",
    "Supply Chain Visualization": "Supply Chain Visualization.png",
    "Telemedicine & Virtual Consultation Platform": "Telemedicine & Virtual Consultation Platform.png",
    "UI for a Configuration Management Tool": "UI for Configuration Management Tool.png",
    "Web-Based Photo Editing Tool": "Web-Based Photo Editing Tool.png",
  };

const detailedCaseStudies: CaseStudyWithImage[] = [
  {
    slug: "ai-powered-logistics-optimization",
    title: "AI-Powered Logistics Optimization",
    category: "AI & Machine Learning",
    description: "How we leveraged machine learning to reduce operational costs by 30% for a global shipping company, improving delivery times and customer satisfaction.",
    imageUrl: "/portfolio/ai-powered-logistics-optimization.jpeg",
    imageHint: "logistics warehouse",
    content: [
      { type: "heading", text: "The Challenge: Navigating Complexity" },
      { type: "paragraph", text: "Our client, a leading global logistics provider, was facing significant challenges with their supply chain. Inefficient routing, unpredictable delays, and rising fuel costs were eating into their profit margins. They needed a solution that could not only predict but also proactively manage these complexities in real-time." },
      { type: "image", src: "/portfolio/ai-powered-logistics-optimization.jpeg", alt: "AI-Powered Logistics Optimization", hint: "logistics warehouse" },
      { type: "heading", text: "Our Solution: A Predictive AI Engine" },
      { type: "paragraph", text: "VEDTEIX developed a bespoke AI engine that integrated with their existing systems. This engine analyzed historical shipping data, weather patterns, traffic conditions, and fuel price fluctuations to predict the most optimal routes. It also provided dynamic rerouting suggestions to drivers in response to unforeseen events, minimizing delays." },
      { type: "heading", text: "The Results: Tangible Business Impact" },
      { type: "paragraph", text: "The implementation of our AI solution yielded remarkable results within the first six months: a 30% reduction in operational costs, a 15% improvement in on-time delivery rates, and a significant decrease in carbon emissions. The client was able to offer more competitive pricing and enhance their customer service, solidifying their market leadership." },
    ],
  },
  {
    slug: "cybersecurity-for-finance",
    title: "Fortifying a Bank's Digital Fortress",
    category: "Cybersecurity",
    description: "A comprehensive cybersecurity overhaul for a major financial institution to protect against sophisticated cyber threats and ensure regulatory compliance.",
    imageUrl: "/portfolio/Secure Cloud Infrastructure Audit.avif",
    imageHint: "cyber security",
    content: [
      { type: "heading", text: "The Threat Landscape" },
      { type: "paragraph", text: "A prominent financial institution was facing increasing pressure from sophisticated cyber threats. With customer data and billions in assets at stake, their existing security infrastructure was proving inadequate. They required a complete overhaul to not only defend against current threats but also to anticipate future attack vectors." },
      { type: "heading", text: "VEDTEIX's Multi-Layered Defense" },
      { type: "paragraph", text: "We implemented a multi-layered security strategy that included advanced threat intelligence, a 24/7 Security Operations Center (SOC), and employee training programs. Our solution involved deploying next-generation firewalls, intrusion detection systems, and AI-powered anomaly detection to identify and neutralize threats before they could cause harm." },
      { type: "image", src: "/portfolio/Next-Gen Intrusion Detection System.jpeg", alt: "Security Operations Center dashboard", hint: "security dashboard" },
      { type: "heading", text: "Achieving Unprecedented Security" },
      { type: "paragraph", text: "The new security framework successfully thwarted several high-level intrusion attempts within the first quarter. The institution passed all regulatory compliance audits with flying colors and saw a marked increase in customer trust. Our proactive approach to cybersecurity provided them with the peace of mind to focus on their core business." },
    ],
  },
  {
    slug: "data-analytics-retail",
    title: "Unlocking Retail Insights with Data",
    category: "Data Analytics",
    description: "Transforming a leading retailer's vast data sets into actionable strategies for personalization, inventory management, and sales growth.",
    imageUrl: "/portfolio/Real-Time Sales Performance Dashboard.jpeg",
    imageHint: "retail store",
    content: [
      { type: "heading", text: "The Data Deluge" },
      { type: "paragraph", text: "A major retail chain was collecting massive amounts of data from sales, customer loyalty programs, and online interactions, but they struggled to extract meaningful value from it. They needed a robust data analytics platform to understand customer behavior and optimize their operations." },
      { type: "heading", text: "From Raw Data to Rich Insights" },
      { type: "paragraph", text: "VEDTEIX built a centralized data warehouse and implemented a powerful analytics platform. We developed custom dashboards that provided real-time insights into sales trends, customer segmentation, and inventory levels. This allowed the retailer to make data-driven decisions, from personalizing marketing campaigns to optimizing stock in each store." },
      { type: "heading", text: "Driving Growth Through Data" },
      { type: "paragraph", text: "The new data analytics capabilities led to a 20% increase in sales from personalized marketing efforts and a 25% reduction in overstock situations. The retailer was able to create a more engaging and personalized shopping experience, fostering customer loyalty and driving significant revenue growth." }
    ]
  },
  {
    slug: "full-stack-e-commerce-platform",
    title: "Building a Full-Stack E-commerce Platform",
    category: "Full Stack Development",
    description: "Building a scalable and robust e-commerce platform from the ground up, enhancing customer engagement and conversion rates.",
    imageUrl: "/portfolio/High-Performance E-commerce Storefront.png",
    imageHint: "e-commerce website",
    content: [
        { type: "heading", text: "Bridging the Digital and Physical" },
        { type: "paragraph", text: "An online retailer wanted to solve the problem of high return rates and customer uncertainty by providing a more robust and feature-rich shopping experience." },
        { type: "heading", text: "Our Solution: An Integrated Full-Stack Platform" },
        { type: "paragraph", text: "We developed a seamless, high-performance e-commerce platform with a custom backend for inventory management and a reactive frontend for a smooth user experience. This included features like real-time stock updates, personalized recommendations, and a streamlined checkout process." },
        { type: "image", src: "/portfolio/E-commerce Mobile App.png", alt: "E-commerce dashboard", hint: "e-commerce dashboard" },
        { type: "heading", text: "Results: Higher Confidence, Higher Sales" },
        { type: "paragraph", text: "The new platform was a resounding success. The retailer saw a 40% increase in conversion rates and a 25% decrease in product returns. Customer confidence soared, leading to higher average order values and repeat business." }
    ]
  }
];

const generatedStudies: CaseStudyWithImage[] = [
    // AI & Machine Learning
    {
        slug: "ai-anomaly-detection",
        title: "Automated Anomaly Detection System",
        category: "AI & Machine Learning",
        description: "An unsupervised learning model that identifies unusual patterns and outliers in real-time data streams for proactive issue resolution.",
        imageUrl: "/portfolio/ai-anomaly-detection.jpg",
        imageHint: "artificial intelligence",
        content: [],
    },
    {
        slug: "ai-customer-support-nlp",
        title: "Natural Language Processing for Customer Support",
        category: "AI & Machine Learning",
        description: "Developed an NLP-powered chatbot that understands and responds to customer queries, reducing support tickets by 40%.",
        imageUrl: "/portfolio/NLP for Customer Support.png",
        imageHint: "artificial intelligence",
        content: [],
    },
    {
        slug: "ai-computer-vision-qc",
        title: "Computer Vision for Quality Control",
        category: "AI & Machine Learning",
        description: "An automated visual inspection system using deep learning to detect manufacturing defects with 99.5% accuracy.",
        imageUrl: "/portfolio/Computer Vision for Quality Control.jpg",
        imageHint: "artificial intelligence",
        content: [],
    },
    {
        slug: "ai-recommendation-engine",
        title: "Personalized Recommendation Engine",
        category: "AI & Machine Learning",
        description: "A collaborative filtering engine for an e-commerce platform that increased user engagement and sales by 18%.",
        imageUrl: "/portfolio/Personalized Recommendation Engine.png",
        imageHint: "artificial intelligence",
        content: [],
    },
    {
        slug: "ai-dynamic-pricing-model",
        title: "Dynamic Pricing Model for Ride-Sharing",
        category: "AI & Machine Learning",
        description: "A machine learning model that adjusts ride prices based on real-time supply, demand, and traffic conditions.",
        imageUrl: "/portfolio/ai-powered-logistics-optimization.jpeg", // Placeholder, original not in list
        imageHint: "artificial intelligence",
        content: [],
    },
    {
        slug: "ai-predictive-maintenance-iot",
        title: "Predictive Maintenance for Industrial IoT",
        category: "AI & Machine Learning",
        description: "An IoT-integrated AI system that predicts equipment failure, reducing downtime and maintenance costs.",
        imageUrl: "/portfolio/ai-powered-logistics-optimization.jpeg", // Placeholder, original not in list
        imageHint: "artificial intelligence",
        content: [],
    },
    {
        slug: "ai-document-analysis",
        title: "AI-Powered Document Analysis",
        category: "AI & Machine Learning",
        description: "Automated extraction and classification of key information from unstructured legal and financial documents.",
        imageUrl: "/portfolio/ai-powered-logistics-optimization.jpeg", // Placeholder, original not in list
        imageHint: "artificial intelligence",
        content: [],
    },
    {
        slug: "ai-sentiment-analysis",
        title: "Sentiment Analysis for Brand Monitoring",
        category: "AI & Machine Learning",
        description: "A tool that analyzes social media and news sentiment to provide real-time brand reputation insights.",
        imageUrl: "/portfolio/ai-powered-logistics-optimization.jpeg", // Placeholder, original not in list
        imageHint: "artificial intelligence",
        content: [],
    },
    {
        slug: "ai-credit-risk-scoring",
        title: "Credit Risk Scoring Model",
        category: "AI & Machine Learning",
        description: "A robust machine learning model for a fintech client to assess creditworthiness more accurately than traditional methods.",
        imageUrl: "/portfolio/ai-powered-logistics-optimization.jpeg", // Placeholder, original not in list
        imageHint: "artificial intelligence",
        content: [],
    },
    {
        slug: "ai-medical-imaging-analysis",
        title: "AI-Based Medical Imaging Analysis",
        category: "AI & Machine Learning",
        description: "A deep learning solution to assist radiologists in identifying and classifying anomalies in medical scans.",
        imageUrl: "/portfolio/ai-powered-logistics-optimization.jpeg", // Placeholder, original not in list
        imageHint: "artificial intelligence",
        content: [],
    },
    {
        slug: "ai-sales-forecasting",
        title: "Sales Forecasting Platform",
        category: "AI & Machine Learning",
        description: "A time-series forecasting model that helps a retail client predict future sales with high accuracy.",
        imageUrl: "/portfolio/ai-powered-logistics-optimization.jpeg", // Placeholder, original not in list
        imageHint: "artificial intelligence",
        content: [],
    },
    // Cybersecurity
    {
        slug: "cyber-next-gen-ids",
        title: "Next-Gen Intrusion Detection System",
        category: "Cybersecurity",
        description: "Developed a network-based IDS using machine learning to detect and respond to zero-day threats in real-time.",
        imageUrl: "/portfolio/Next-Gen Intrusion Detection System.jpeg",
        imageHint: "cyber security",
        content: [],
    },
    {
        slug: "cyber-cloud-security-audit",
        title: "Secure Cloud Infrastructure Audit",
        category: "Cybersecurity",
        description: "Conducted a comprehensive security audit for a multi-cloud environment, identifying and mitigating critical vulnerabilities.",
        imageUrl: "/portfolio/Secure Cloud Infrastructure Audit.avif",
        imageHint: "cyber security",
        content: [],
    },
    {
        slug: "cyber-phishing-simulation-platform",
        title: "Phishing Simulation & Training Platform",
        category: "Cybersecurity",
        description: "A custom platform to train employees to recognize and report phishing attempts, significantly reducing human error.",
        imageUrl: "/portfolio/Phishing Simulation and Training Platform.webp",
        imageHint: "cyber security",
        content: [],
    },
    {
        slug: "cyber-encrypted-messaging-app",
        title: "End-to-End Encrypted Messaging App",
        category: "Cybersecurity",
        description: "Built a secure communication application with post-quantum cryptography standards for ultimate privacy.",
        imageUrl: "/portfolio/Secure Cloud Infrastructure Audit.avif", // Placeholder
        imageHint: "cyber security",
        content: [],
    },
    {
        slug: "cyber-smart-contract-audit",
        title: "Smart Contract Security Audit",
        category: "Cybersecurity",
        description: "Performed a rigorous audit on a DeFi protocol's smart contracts, preventing potential exploits worth millions.",
        imageUrl: "/portfolio/DeFi Lending and Borrowing Protocol.avif", // Placeholder
        imageHint: "cyber security",
        content: [],
    },
    {
        slug: "cyber-gdpr-ccpa-automation",
        title: "GDPR & CCPA Compliance Automation",
        category: "Cybersecurity",
        description: "A software solution that helps businesses automate data mapping and compliance reporting for privacy regulations.",
        imageUrl: "/portfolio/Secure Cloud Infrastructure Audit.avif", // Placeholder
        imageHint: "cyber security",
        content: [],
    },
    {
        slug: "cyber-vulnerability-management-dashboard",
        title: "Vulnerability Management Dashboard",
        category: "Cybersecurity",
        description: "A centralized dashboard for a large enterprise to track, prioritize, and remediate security vulnerabilities across all assets.",
        imageUrl: "/portfolio/Next-Gen Intrusion Detection System.jpeg", // Placeholder
        imageHint: "cyber security",
        content: [],
    },
    {
        slug: "cyber-threat-intelligence-integration",
        title: "Threat Intelligence Platform Integration",
        category: "Cybersecurity",
        description: "Integrated multiple threat intelligence feeds into a client's SIEM for proactive threat hunting and defense.",
        imageUrl: "/portfolio/Next-Gen Intrusion Detection System.jpeg", // Placeholder
        imageHint: "cyber security",
        content: [],
    },
    {
        slug: "cyber-digital-forensics-incident-response",
        title: "Digital Forensics & Incident Response",
        category: "Cybersecurity",
        description: "Provided expert incident response services to contain a data breach and conduct a thorough forensic investigation.",
        imageUrl: "/portfolio/Next-Gen Intrusion Detection System.jpeg", // Placeholder
        imageHint: "cyber security",
        content: [],
    },
    {
        slug: "cyber-ssdlc-implementation",
        title: "Secure Software Development Lifecycle (SSDLC) Implementation",
        category: "Cybersecurity",
        description: "Guided a software company in adopting secure coding practices, automated security testing, and DevSecOps principles.",
        imageUrl: "/portfolio/Secure Cloud Infrastructure Audit.avif", // Placeholder
        imageHint: "cyber security",
        content: [],
    },
    {
        slug: "cyber-iam-overhaul",
        title: "Identity and Access Management (IAM) Overhaul",
        category: "Cybersecurity",
        description: "Redesigned and implemented a modern IAM solution with multi-factor authentication for a global workforce.",
        imageUrl: "/portfolio/Secure Cloud Infrastructure Audit.avif", // Placeholder
        imageHint: "cyber security",
        content: [],
    },
    {
        slug: "cyber-pentesting-as-a-service",
        title: "Penetration Testing as a Service",
        category: "Cybersecurity",
        description: "Provided continuous penetration testing for a client's web applications to identify vulnerabilities before attackers could.",
        imageUrl: "/portfolio/Next-Gen Intrusion Detection System.jpeg", // Placeholder
        imageHint: "cyber security",
        content: [],
    },
    // Data Analytics
    {
        slug: "data-clv-platform",
        title: "Customer Lifetime Value (CLV) Platform",
        category: "Data Analytics",
        description: "An analytics platform that calculates and predicts customer lifetime value, enabling targeted marketing strategies.",
        imageUrl: "/portfolio/Customer Lifetime Value.webp",
        imageHint: "data charts",
        content: [],
    },
    {
        slug: "data-sales-dashboard",
        title: "Real-Time Sales Performance Dashboard",
        category: "Data Analytics",
        description: "Developed an interactive dashboard for a national sales team to monitor KPIs and performance in real-time.",
        imageUrl: "/portfolio/Real-Time Sales Performance Dashboard.jpeg",
        imageHint: "data charts",
        content: [],
    },
    {
        slug: "data-supply-chain-visualization",
        title: "Supply Chain Visualization & Analytics",
        category: "Data Analytics",
        description: "A tool that provides end-to-end visibility into the supply chain, identifying bottlenecks and optimization opportunities.",
        imageUrl: "/portfolio/Supply Chain Visualization.png",
        imageHint: "data charts",
        content: [],
    },
    {
        slug: "data-customer-segmentation",
        title: "Customer Segmentation Analysis",
        category: "Data Analytics",
        description: "Used clustering algorithms to segment a user base into distinct personas, improving marketing campaign ROI by 35%.",
        imageUrl: "/portfolio/Customer Segmentation Analysis.jpeg",
        imageHint: "data charts",
        content: [],
    },
    {
        slug: "data-ab-testing-framework",
        title: "A/B Testing & Analysis Framework",
        category: "Data Analytics",
        description: "Built a scalable framework for a web company to run and analyze A/B tests, driving data-informed product decisions.",
        imageUrl: "/portfolio/A B Testing and Analysis Framework.avif",
        imageHint: "data charts",
        content: [],
    },
    {
        slug: "data-social-media-analytics",
        title: "Social Media Analytics & Insights",
        category: "Data Analytics",
        description: "A platform that tracks key metrics and trends across social media channels to inform content strategy.",
        imageUrl: "/portfolio/Frontend for Social Networking Platform.png", // Placeholder
        imageHint: "data charts",
        content: [],
    },
    {
        slug: "data-operational-efficiency",
        title: "Operational Efficiency Analytics",
        category: "Data Analytics",
        description: "Analyzed operational data for a manufacturing client to identify inefficiencies, leading to a 15% reduction in production costs.",
        imageUrl: "/portfolio/CI CD Pipeline Automation.jpg", // Placeholder
        imageHint: "data charts",
        content: [],
    },
    {
        slug: "data-market-basket-analysis",
        title: "Market Basket Analysis for Retail",
        category: "Data Analytics",
        description: "Uncovered product associations and buying patterns to optimize store layouts and cross-selling promotions.",
        imageUrl: "/portfolio/High-Performance E-commerce Storefront.png", // Placeholder
        imageHint: "data charts",
        content: [],
    },
    {
        slug: "data-healthcare-data-warehouse",
        title: "Healthcare Data Warehousing Solution",
        category: "Data Analytics",
        description: "Designed and built a HIPAA-compliant data warehouse for a hospital network to enable clinical research and reporting.",
        imageUrl: "/portfolio/Healthcare Patient Portal.png", // Placeholder
        imageHint: "data charts",
        content: [],
    },
    {
        slug: "data-fraud-detection",
        title: "Fraud Detection Analytics",
        category: "Data Analytics",
        description: "A real-time analytics engine that flags fraudulent transactions with high accuracy for an online payment processor.",
        imageUrl: "/portfolio/Next-Gen Intrusion Detection System.jpeg", // Placeholder
        imageHint: "data charts",
        content: [],
    },
    {
        slug: "data-website-funnel-analysis",
        title: "Website Traffic & Funnel Analysis",
        category: "Data Analytics",
        description: "A comprehensive analysis of website traffic to identify user drop-off points and optimize the conversion funnel.",
        imageUrl: "/portfolio/Interactive Data Visualization Dashboard.png", // Placeholder
        imageHint: "data charts",
        content: [],
    },
     {
        slug: "data-geospatial-analysis-platform",
        title: "Geospatial Analysis Platform",
        category: "Data Analytics",
        description: "Developed a platform for visualizing and analyzing geospatial data for urban planning and logistics optimization.",
        imageUrl: "/portfolio/Supply Chain Visualization.png", // Placeholder
        imageHint: "data charts",
        content: [],
    },
    // Full Stack Development
    {
        slug: "fullstack-erp-system",
        title: "Enterprise Resource Planning (ERP) System",
        category: "Full Stack Development",
        description: "A custom-built ERP system for a mid-sized manufacturer to manage inventory, sales, and financials in one place.",
        imageUrl: "/portfolio/Enterprise Resource Planning System.png",
        imageHint: "code screen",
        content: [],
    },
    {
        slug: "fullstack-saas-project-management",
        title: "SaaS Project Management Tool",
        category: "Full Stack Development",
        description: "Developed a multi-tenant SaaS application with collaborative features, task management, and time tracking.",
        imageUrl: "/portfolio/SaaS Project Management Tool.png",
        imageHint: "code screen",
        content: [],
    },
    {
        slug: "fullstack-online-learning-platform",
        title: "Online Learning & Course Marketplace",
        category: "Full Stack Development",
        description: "A full-featured platform for instructors to create and sell courses, with video streaming and student management.",
        imageUrl: "/portfolio/Online Learning and Course Marketplace.png",
        imageHint: "code screen",
        content: [],
    },
    {
        slug: "fullstack-collaborative-whiteboard-app",
        title: "Real-Time Collaborative Whiteboard App",
        category: "Full Stack Development",
        description: "A web application using WebSockets for real-time collaboration, allowing teams to brainstorm and design together.",
        imageUrl: "/portfolio/Real-Time Collaborative Whiteboard App.png",
        imageHint: "code screen",
        content: [],
    },
    {
        slug: "fullstack-custom-crm",
        title: "Custom CRM for a Sales Team",
        category: "Full Stack Development",
        description: "Built a bespoke Customer Relationship Management tool tailored to the unique workflow of a B2B sales organization.",
        imageUrl: "/portfolio/Custom CRM for Sales Team.png",
        imageHint: "code screen",
        content: [],
    },
    {
        slug: "fullstack-telemedicine-platform",
        title: "Telemedicine & Virtual Consultation Platform",
        category: "Full Stack Development",
        description: "A secure platform connecting patients with doctors via video calls, with integrated booking and payment systems.",
        imageUrl: "/portfolio/Telemedicine & Virtual Consultation Platform.png",
        imageHint: "code screen",
        content: [],
    },
    {
        slug: "fullstack-subscription-box-platform",
        title: "Subscription Box Management Platform",
        category: "Full Stack Development",
        description: "A complete solution for a subscription box company, handling recurring payments, shipping logistics, and customer accounts.",
        imageUrl: "/portfolio/SaaS Project Management Tool.png", // Placeholder
        imageHint: "code screen",
        content: [],
    },
    {
        slug: "fullstack-restaurant-booking-system",
        title: "Restaurant Booking & Management System",
        category: "Full Stack Development",
        description: "An online reservation system for a chain of restaurants, including table management and customer feedback features.",
        imageUrl: "/portfolio/Booking Interface for a Travel Agency.png", // Placeholder
        imageHint: "code screen",
        content: [],
    },
    {
        slug: "fullstack-iot-device-portal",
        title: "IoT Device Management Portal",
        category: "Full Stack Development",
        description: "A web portal for a client to monitor and manage thousands of IoT devices in the field, with dashboards and alerts.",
        imageUrl: "/portfolio/Admin Panel for CMS.png", // Placeholder
        imageHint: "code screen",
        content: [],
    },
    {
        slug: "fullstack-hr-payroll-system",
        title: "Internal HR & Payroll System",
        category: "Full Stack Development",
        description: "Developed a comprehensive internal system for managing employee data, leave requests, and automating payroll.",
        imageUrl: "/portfolio/Enterprise Resource Planning System.png", // Placeholder
        imageHint: "code screen",
        content: [],
    },
    {
        slug: "fullstack-event-ticketing-platform",
        title: "Event Ticketing & Management Platform",
        category: "Full Stack Development",
        description: "A scalable platform for creating and managing events, selling tickets, and checking in attendees.",
        imageUrl: "/portfolio/Event Management Dashboard.png",
        imageHint: "code screen",
        content: [],
    },
    {
        slug: "fullstack-headless-cms",
        title: "Headless CMS & API for a Media Company",
        category: "Full Stack Development",
        description: "Built a flexible headless CMS to power content across a media company's website, mobile apps, and partner sites.",
        imageUrl: "/portfolio/Admin Panel for CMS.png",
        imageHint: "code screen",
        content: [],
    },
    {
        slug: "fullstack-fitness-coaching-app",
        title: "Fitness Tracking & Coaching Application",
        category: "Full Stack Development",
        description: "A web and mobile app for users to log workouts, track progress, and connect with personal trainers.",
        imageUrl: "/portfolio/Gamified Learning Platform UI.jpeg", // Placeholder
        imageHint: "code screen",
        content: [],
    },
    {
        slug: "fullstack-real-estate-portal",
        title: "Real Estate Property Listing Portal",
        category: "Full Stack Development",
        description: "A full-stack application for real estate agents to list properties and for buyers to search and filter listings.",
        imageUrl: "/portfolio/Booking Interface for a Travel Agency.png", // Placeholder
        imageHint: "code screen",
        content: [],
    },
    {
        slug: "fullstack-b2b-marketplace",
        title: "B2B Wholesale Marketplace",
        category: "Full Stack Development",
        description: "A multi-vendor platform for businesses to buy and sell goods in bulk, with custom pricing and order management.",
        imageUrl: "/portfolio/High-Performance E-commerce Storefront.png", // Placeholder
        imageHint: "code screen",
        content: [],
    },
    // Frontend Development (React.js)
    {
        slug: "frontend-data-visualization-dashboard",
        title: "Interactive Data Visualization Dashboard",
        category: "Frontend Development (React.js)",
        description: "A complex dashboard built with React and D3.js to visualize large datasets for financial analysts.",
        imageUrl: "/portfolio/Interactive Data Visualization Dashboard.png",
        imageHint: "website interface",
        content: [],
    },
    {
        slug: "frontend-ecommerce-storefront",
        title: "High-Performance E-commerce Storefront",
        category: "Frontend Development (React.js)",
        description: "Developed a lightning-fast, server-side rendered e-commerce storefront using Next.js and Redux.",
        imageUrl: "/portfolio/High-Performance E-commerce Storefront.png",
        imageHint: "website interface",
        content: [],
    },
    {
        slug: "frontend-design-system-library",
        title: "Design System & Component Library",
        category: "Frontend Development (React.js)",
        description: "Created a comprehensive design system and reusable React component library for a large enterprise client.",
        imageUrl: "/portfolio/Design System & Component Library.png",
        imageHint: "website interface",
        content: [],
    },
    {
        slug: "frontend-music-streamer-spa",
        title: "Single Page Application (SPA) for a Music Streamer",
        category: "Frontend Development (React.js)",
        description: "A slick, responsive SPA for a music streaming service, providing a seamless user experience.",
        imageUrl: "/portfolio/Single Page Application for Music Streamer.png",
        imageHint: "website interface",
        content: [],
    },
    {
        slug: "frontend-news-pwa",
        title: "Progressive Web App (PWA) for a News Outlet",
        category: "Frontend Development (React.js)",
        description: "Built a PWA with offline capabilities, enabling users to read news articles even without an internet connection.",
        imageUrl: "/portfolio/Progressive Web App for News Outlet.png",
        imageHint: "website interface",
        content: [],
    },
    {
        slug: "frontend-photo-editing-tool",
        title: "Web-Based Photo Editing Tool",
        category: "Frontend Development (React.js)",
        description: "A feature-rich photo editor in the browser, using WebGL and React for high-performance image manipulation.",
        imageUrl: "/portfolio/Web-Based Photo Editing Tool.png",
        imageHint: "website interface",
        content: [],
    },
    {
        slug: "frontend-saas-marketing-website",
        title: "Marketing Website for a SaaS Product",
        category: "Frontend Development (React.js)",
        description: "A beautiful and animated marketing website built with Gatsby to showcase a new SaaS product.",
        imageUrl: "/portfolio/Marketing Website for a SaaS Product.jpeg",
        imageHint: "website interface",
        content: [],
    },
    {
        slug: "frontend-social-networking-platform",
        title: "Frontend for a Social Networking Platform",
        category: "Frontend Development (React.js)",
        description: "Developed the complete user interface for a new social media platform, focusing on performance and user engagement.",
        imageUrl: "/portfolio/Frontend for Social Networking Platform.png",
        imageHint: "website interface",
        content: [],
    },
    {
        slug: "frontend-cms-admin-panel",
        title: "Admin Panel for a Content Management System",
        category: "Frontend Development (React.js)",
        description: "A powerful and intuitive admin panel for a headless CMS, allowing content creators to manage data easily.",
        imageUrl: "/portfolio/Admin Panel for CMS.png",
        imageHint: "website interface",
        content: [],
    },
    {
        slug: "frontend-accessibility-overhaul",
        title: "Accessibility (a11y) Overhaul for a Government Website",
        category: "Frontend Development (React.js)",
        description: "Refactored a large public-facing website to be fully WCAG 2.1 AA compliant, ensuring access for all users.",
        imageUrl: "/portfolio/Accessibility Overhaul for Government Website.png",
        imageHint: "website interface",
        content: [],
    },
    {
        slug: "frontend-stock-trading-interface",
        title: "Real-time Stock Trading Interface",
        category: "Frontend Development (React.js)",
        description: "A complex trading UI with live data streams, charts, and order execution functionality.",
        imageUrl: "/portfolio/Real-time Stock Trading Interface.png",
        imageHint: "website interface",
        content: [],
    },
    {
        slug: "frontend-travel-booking-interface",
        title: "Booking Interface for a Travel Agency",
        category: "Frontend Development (React.js)",
        description: "An intuitive and user-friendly interface for searching and booking flights, hotels, and vacation packages.",
        imageUrl: "/portfolio/Booking Interface for a Travel Agency.png",
        imageHint: "website interface",
        content: [],
    },
    {
        slug: "frontend-gamified-learning-ui",
        title: "Gamified Learning Platform UI",
        category: "Frontend Development (React.js)",
        description: "Created an engaging and interactive user interface for an educational platform using gamification elements.",
        imageUrl: "/portfolio/Gamified Learning Platform UI.jpeg",
        imageHint: "website interface",
        content: [],
    },
    {
        slug: "frontend-live-streaming-service-ui",
        title: "Frontend for a Live-Streaming Service",
        category: "Frontend Development (React.js)",
        description: "Built the player and chat interface for a video live-streaming platform, optimizing for low latency.",
        imageUrl: "/portfolio/Frontend for Live-Streaming Service.png",
        imageHint: "website interface",
        content: [],
    },
    {
        slug: "frontend-config-management-tool-ui",
        title: "UI for a Configuration Management Tool",
        category: "Frontend Development (React.js)",
        description: "A detailed and complex user interface for a developer tool, allowing for intricate configuration management.",
        imageUrl: "/portfolio/UI for Configuration Management Tool.png",
        imageHint: "website interface",
        content: [],
    },
    {
        slug: "frontend-config-management-tool-ui",
        title: "Crypto Wallet Dashboard",
        category: "Frontend Development (React.js)",
        description: "A detailed and complex user interface for a developer tool, allowing for intricate configuration management.",
        imageUrl: "/portfolio/Crypto Wallet Dashboard.png",
        imageHint: "website interface",
        content: [],
    },
    {
        slug: "frontend-config-management-tool-ui",
        title: "Healthcare Patient Portal",
        category: "Frontend Development (React.js)",
        description: "A detailed and complex user interface for a developer tool, allowing for intricate configuration management.",
        imageUrl: "/portfolio/Healthcare Patient Portal.png",
        imageHint: "website interface",
        content: [],
    },
    {
        slug: "frontend-config-management-tool-ui",
        title: "Interactive Resume Builder",
        category: "Frontend Development (React.js)",
        description: "A detailed and complex user interface for a developer tool, allowing for intricate configuration management.",
        imageUrl: "/portfolio/Interactive Resume Builder.jpeg",
        imageHint: "website interface",
        content: [],
    },
    {
        slug: "frontend-config-management-tool-ui",
        title: "Event Management Dashboard",
        category: "Frontend Development (React.js)",
        description: "A detailed and complex user interface for a developer tool, allowing for intricate configuration management.",
        imageUrl: "/portfolio/Event Management Dashboard.png",
        imageHint: "website interface",
        content: [],
    },
    {
        slug: "frontend-config-management-tool-ui",
        title: "Recipe Finder Application",
        category: "Frontend Development (React.js)",
        description: "A detailed and complex user interface for a developer tool, allowing for intricate configuration management.",
        imageUrl: "/portfolio/Recipe Finder Application.png",
        imageHint: "website interface",
        content: [],
    },
    // Flutter Development (Mobile Apps)
    {
        slug: "flutter-mobile-banking-app",
        title: "Mobile Banking App",
        category: "Flutter Development (Mobile Apps)",
        description: "A secure and feature-rich mobile banking app for iOS and Android with biometric login and fund transfers.",
        imageUrl: "/portfolio/Mobile Banking App.png",
        imageHint: "mobile app",
        content: [],
    },
    {
        slug: "flutter-ecommerce-app",
        title: "E-commerce Mobile App",
        category: "Flutter Development (Mobile Apps)",
        description: "A native-performing shopping app built with Flutter, featuring a seamless checkout and push notifications.",
        imageUrl: "/portfolio/E-commerce Mobile App.png",
        imageHint: "mobile app",
        content: [],
    },
    {
        slug: "flutter-food-delivery-app",
        title: "Food Delivery App",
        category: "Flutter Development (Mobile Apps)",
        description: "A complete food delivery application with real-time order tracking for customers, restaurants, and drivers.",
        imageUrl: "/portfolio/Food Delivery App.webp",
        imageHint: "mobile app",
        content: [],
    },
    {
        slug: "flutter-home-services-app",
        title: "On-demand Home Services App",
        category: "Flutter Development (Mobile Apps)",
        description: "An app connecting users with local service professionals like plumbers and electricians, with booking and payments.",
        imageUrl: "/portfolio/On-demand Home Services App.webp",
        imageHint: "mobile app",
        content: [],
    },
    {
        slug: "flutter-social-media-chat-app",
        title: "Social Media & Chat App",
        category: "Flutter Development (Mobile Apps)",
        description: "A cross-platform social application with photo sharing, direct messaging, and a dynamic content feed.",
        imageUrl: "/portfolio/Social Media and Chat App.png",
        imageHint: "mobile app",
        content: [],
    },
    {
        slug: "flutter-fitness-tracker-app",
        title: "Fitness & Workout Tracker App",
        category: "Flutter Development (Mobile Apps)",
        description: "A mobile app for tracking workouts, setting fitness goals, and providing guided exercise routines.",
        imageUrl: "/portfolio/Gamified Learning Platform UI.jpeg", // Placeholder
        imageHint: "mobile app",
        content: [],
    },
    {
        slug: "flutter-language-learning-app",
        title: "Language Learning App",
        category: "Flutter Development (Mobile Apps)",
        description: "An interactive app for learning new languages, featuring quizzes, flashcards, and voice recognition exercises.",
        imageUrl: "/portfolio/Online Learning and Course Marketplace.png", // Placeholder
        imageHint: "mobile app",
        content: [],
    },
    {
        slug: "flutter-event-ticketing-app",
        title: "Event Discovery & Ticketing App",
        category: "Flutter Development (Mobile Apps)",
        description: "A mobile app for finding local events, purchasing tickets, and storing them digitally.",
        imageUrl: "/portfolio/Event Management Dashboard.png", // Placeholder
        imageHint: "mobile app",
        content: [],
    },
    {
        slug: "flutter-meditation-app",
        title: "Meditation & Mindfulness App",
        category: "Flutter Development (Mobile Apps)",
        description: "A calming app offering guided meditations, breathing exercises, and sleep stories, built with a focus on serene UI/UX.",
        imageUrl: "/portfolio/Mobile Banking App.png", // Placeholder
        imageHint: "mobile app",
        content: [],
    },
    {
        slug: "flutter-smart-home-app",
        title: "IoT Smart Home Control App",
        category: "Flutter Development (Mobile Apps)",
        description: "An app to control and monitor smart home devices like lights, thermostats, and security cameras from anywhere.",
        imageUrl: "/portfolio/On-demand Home Services App.webp", // Placeholder
        imageHint: "mobile app",
        content: [],
    },
    {
        slug: "flutter-travel-planner-app",
        title: "Travel & Itinerary Planning App",
        category: "Flutter Development (Mobile Apps)",
        description: "A mobile companion for travelers to organize trips, store booking information, and discover points of interest.",
        imageUrl: "/portfolio/Booking Interface for a Travel Agency.png", // Placeholder
        imageHint: "mobile app",
        content: [],
    },
    {
        slug: "flutter-conference-app",
        title: "Mobile App for a Conference",
        category: "Flutter Development (Mobile Apps)",
        description: "A dedicated app for a large tech conference, featuring schedules, speaker bios, and networking tools.",
        imageUrl: "/portfolio/Event Management Dashboard.png", // Placeholder
        imageHint: "mobile app",
        content: [],
    },
    {
        slug: "flutter-employee-comm-app",
        title: "Internal Employee Communication App",
        category: "Flutter Development (Mobile Apps)",
        description: "A secure internal app for a corporation to share company news, announcements, and employee directories.",
        imageUrl: "/portfolio/Admin Panel for CMS.png", // Placeholder
        imageHint: "mobile app",
        content: [],
    },
    {
        slug: "flutter-patient-portal-app",
        title: "Patient Portal App for a Hospital",
        category: "Flutter Development (Mobile Apps)",
        description: "An app for patients to view medical records, schedule appointments, and communicate with their healthcare providers.",
        imageUrl: "/portfolio/Healthcare Patient Portal.png",
        imageHint: "mobile app",
        content: [],
    },
    {
        slug: "flutter-mobile-game",
        title: "Mobile Game for a Marketing Campaign",
        category: "Flutter Development (Mobile Apps)",
        description: "Developed a simple, addictive mobile game as part of a viral marketing campaign for a consumer brand.",
        imageUrl: "/portfolio/Gamified Learning Platform UI.jpeg", // Placeholder
        imageHint: "mobile app",
        content: [],
    },
    // Blockchain & Web3 Development
    {
        slug: "web3-dao-platform",
        title: "Decentralized Autonomous Organization (DAO) Platform",
        category: "Blockchain & Web3 Development",
        description: "A platform for creating and managing DAOs with on-chain voting and treasury management.",
        imageUrl: "/portfolio/DAO Platform.jpg",
        imageHint: "blockchain network",
        content: [],
    },
    {
        slug: "web3-nft-marketplace",
        title: "NFT Marketplace for Digital Art",
        category: "Blockchain & Web3 Development",
        description: "Built a fully-functional NFT marketplace on Ethereum for minting, buying, and selling digital collectibles.",
        imageUrl: "/portfolio/NFT Marketplace for Digital Art.jpg",
        imageHint: "blockchain network",
        content: [],
    },
    {
        slug: "web3-defi-lending-protocol",
        title: "DeFi Lending and Borrowing Protocol",
        category: "Blockchain & Web3 Development",
        description: "Developed a decentralized protocol allowing users to lend and borrow crypto assets with variable interest rates.",
        imageUrl: "/portfolio/DeFi Lending and Borrowing Protocol.avif",
        imageHint: "blockchain network",
        content: [],
    },
    {
        slug: "web3-supply-chain-tracking",
        title: "Supply Chain Tracking on Blockchain",
        category: "Blockchain & Web3 Development",
        description: "A solution using a private blockchain to track goods from origin to consumer, ensuring authenticity and transparency.",
        imageUrl: "/portfolio/Supply Chain Tracking on Blockchain.png",
        imageHint: "blockchain network",
        content: [],
    },
    {
        slug: "web3-decentralized-identity",
        title: "Decentralized Identity (DID) Solution",
        category: "Blockchain & Web3 Development",
        description: "Created a self-sovereign identity system, giving users control over their personal data.",
        imageUrl: "/portfolio/Secure Cloud Infrastructure Audit.avif", // Placeholder
        imageHint: "blockchain network",
        content: [],
    },
    {
        slug: "web3-crypto-wallet-app",
        title: "Crypto Wallet Mobile App",
        category: "Blockchain & Web3 Development",
        description: "A non-custodial mobile wallet for iOS and Android to securely store, send, and receive various cryptocurrencies.",
        imageUrl: "/portfolio/Crypto Wallet Dashboard.png",
        imageHint: "blockchain network",
        content: [],
    },
    {
        slug: "web3-tokenized-real-estate",
        title: "Tokenized Real Estate Platform",
        category: "Blockchain & Web3 Development",
        description: "A platform for fractional ownership of real estate assets through security tokens on the blockchain.",
        imageUrl: "/portfolio/Real-time Stock Trading Interface.png", // Placeholder
        imageHint: "blockchain network",
        content: [],
    },
    {
        slug: "web3-play-to-earn-game",
        title: "Web3 Gaming with Play-to-Earn (P2E) Mechanics",
        category: "Blockchain & Web3 Development",
        description: "Integrated NFT assets and a P2E token economy into an existing online game.",
        imageUrl: "/portfolio/Gamified Learning Platform UI.jpeg", // Placeholder
        imageHint: "blockchain network",
        content: [],
    },
    {
        slug: "web3-on-chain-governance-portal",
        title: "On-Chain Governance Portal",
        category: "Blockchain & Web3 Development",
        description: "A user-friendly portal for token holders of a protocol to create and vote on governance proposals.",
        imageUrl: "/portfolio/Admin Panel for CMS.png", // Placeholder
        imageHint: "blockchain network",
        content: [],
    },
    {
        slug: "web3-cross-chain-bridge",
        title: "Cross-Chain Asset Bridge",
        category: "Blockchain & Web3 Development",
        description: "Developed a secure bridge to transfer assets between different blockchain networks like Ethereum and Polygon.",
        imageUrl: "/portfolio/DAO Platform.jpg", // Placeholder
        imageHint: "blockchain network",
        content: [],
    },
    // Cloud Solutions & DevOps
    {
        slug: "devops-cicd-pipeline-automation",
        title: "CI/CD Pipeline Automation",
        category: "Cloud Solutions & DevOps",
        description: "Designed and implemented a fully automated CI/CD pipeline using Jenkins and GitHub Actions, reducing deployment time by 90%.",
        imageUrl: "/portfolio/CI CD Pipeline Automation.jpg",
        imageHint: "cloud servers",
        content: [],
    },
    {
        slug: "devops-cloud-migration-aws",
        title: "Cloud Migration from On-Prem to AWS",
        category: "Cloud Solutions & DevOps",
        description: "Managed the end-to-end migration of a client's legacy infrastructure to a scalable and cost-effective AWS environment.",
        imageUrl: "/portfolio/Cloud Migration from On Prem to AWS.jpg",
        imageHint: "cloud servers",
        content: [],
    },
    {
        slug: "devops-iac-with-terraform",
        title: "Infrastructure as Code (IaC) with Terraform",
        category: "Cloud Solutions & DevOps",
        description: "Automated the provisioning and management of cloud infrastructure on GCP using Terraform, ensuring consistency and reliability.",
        imageUrl: "/portfolio/CI CD Pipeline Automation.jpg", // Placeholder
        imageHint: "cloud servers",
        content: [],
    },
    {
        slug: "devops-kubernetes-management",
        title: "Kubernetes Cluster Management",
        category: "Cloud Solutions & DevOps",
        description: "Set up and managed a production-grade Kubernetes cluster for a microservices-based application, optimizing for performance and cost.",
        imageUrl: "/portfolio/Cloud Migration from On Prem to AWS.jpg", // Placeholder
        imageHint: "cloud servers",
        content: [],
    },
    {
        slug: "devops-serverless-architecture",
        title: "Serverless Application Architecture",
        category: "Cloud Solutions & DevOps",
        description: "Re-architected a monolithic application into a serverless model using AWS Lambda and API Gateway, reducing operational overhead.",
        imageUrl: "/portfolio/Cloud Migration from On Prem to AWS.jpg", // Placeholder
        imageHint: "cloud servers",
        content: [],
    },
    {
        slug: "devops-cloud-cost-optimization",
        title: "Cloud Cost Optimization",
        category: "Cloud Solutions & DevOps",
        description: "Analyzed a client's cloud spend and implemented strategies that resulted in a 40% monthly cost reduction.",
        imageUrl: "/portfolio/CI CD Pipeline Automation.jpg", // Placeholder
        imageHint: "cloud servers",
        content: [],
    },
    {
        slug: "devops-disaster-recovery-plan",
        title: "High-Availability & Disaster Recovery Plan",
        category: "Cloud Solutions & DevOps",
        description: "Designed and implemented a multi-region disaster recovery solution on Azure to ensure business continuity.",
        imageUrl: "/portfolio/Cloud Migration from On Prem to AWS.jpg", // Placeholder
        imageHint: "cloud servers",
        content: [],
    },
    {
        slug: "devops-centralized-logging-monitoring",
        title: "Centralized Logging & Monitoring System",
        category: "Cloud Solutions & DevOps",
        description: "Set up a centralized logging and monitoring stack using the ELK stack (Elasticsearch, Logstash, Kibana) for better observability.",
        imageUrl: "/portfolio/Interactive Data Visualization Dashboard.png", // Placeholder
        imageHint: "cloud servers",
        content: [],
    },
    {
        slug: "devops-automated-security-compliance",
        title: "Automated Security & Compliance in the Cloud",
        category: "Cloud Solutions & DevOps",
        description: "Implemented automated security checks and compliance monitoring within the CI/CD pipeline for a fintech client.",
        imageUrl: "/portfolio/Secure Cloud Infrastructure Audit.avif", // Placeholder
        imageHint: "cloud servers",
        content: [],
    },
    {
        slug: "devops-devsecops-transformation",
        title: "DevSecOps Transformation",
        category: "Cloud Solutions & DevOps",
        description: "Guided an organization in integrating security practices into their DevOps culture and workflows.",
        imageUrl: "/portfolio/CI CD Pipeline Automation.jpg", // Placeholder
        imageHint: "cloud servers",
        content: [],
    },
    {
        slug: "devops-scalable-media-processing",
        title: "Scalable Media Processing Pipeline",
        category: "Cloud Solutions & DevOps",
        description: "Built a cloud-native pipeline to automatically process and transcode large video files for a media streaming service.",
        imageUrl: "/portfolio/Cloud Migration from On Prem to AWS.jpg", // Placeholder
        imageHint: "cloud servers",
        content: [],
    },
    {
        slug: "devops-performance-testing-load-balancing",
        title: "Performance Testing & Load Balancing Setup",
        category: "Cloud Solutions & DevOps",
        description: "Conducted extensive performance testing and configured a robust load balancing solution to handle high traffic loads.",
        imageUrl: "/portfolio/CI CD Pipeline Automation.jpg", // Placeholder
        imageHint: "cloud servers",
        content: [],
    },
];

export const caseStudies: CaseStudyWithImage[] = [...detailedCaseStudies, ...generatedStudies];

export const blogPosts = [
  {
    slug: "demystifying-web3",
    title: "Demystifying Web3: What's Next for the Internet?",
    category: "Blockchain",
    description: "Web3 represents the next evolution of the internet. We break down the core concepts of decentralization, blockchain, and crypto-economics.",
    imageHint: "blockchain abstract",
    imageUrl: "/portfolio/DAO Platform.jpg"
  },
  {
    slug: "ai-in-business-automation",
    title: "The Role of AI in Modern Business Automation",
    category: "AI & ML",
    description: "Artificial intelligence is no longer science fiction. Discover how AI-powered automation can enhance efficiency and drive growth for your business.",
    imageHint: "robot human",
    imageUrl: "/portfolio/ai-anomaly-detection.jpg"
  },
  {
    slug: "ux-design-first-impressions",
    title: "Why UX Design is Crucial for First Impressions",
    category: "UI/UX Design",
    description: "A great user experience is key to customer retention. Learn the fundamental principles of UX design that can make or break your application.",
    imageHint: "design wireframe",
    imageUrl: "/portfolio/Design System & Component Library.png"
  },
   {
    slug: "future-of-cybersecurity",
    title: "Navigating the Future of Cybersecurity",
    category: "Cybersecurity",
    description: "As technology evolves, so do cyber threats. We explore the upcoming trends in cybersecurity and how to stay ahead of the curve.",
    imageHint: "digital security",
    imageUrl: "/portfolio/Next-Gen Intrusion Detection System.jpeg"
  },
  {
    slug: "mobile-first-development",
    title: "The Importance of Mobile-First Development",
    category: "Development",
    description: "With the majority of users accessing the internet on mobile devices, a mobile-first approach to development is no longer optional.",
    imageHint: "mobile phone app",
    imageUrl: "/portfolio/Mobile Banking App.png"
  },
   {
    slug: "data-driven-decisions",
    title: "Making Data-Driven Decisions for Business Growth",
    category: "Data Analytics",
    description: "Learn how to harness the power of your data to make smarter, more effective business decisions that lead to sustainable growth.",
    imageHint: "analytics chart",
    imageUrl: "/portfolio/Interactive Data Visualization Dashboard.png"
  }
];

export const faqs = [
  {
    question: "What kind of technologies do you specialize in?",
    answer: "We specialize in a wide range of modern technologies including web and mobile development (React, Next.js, Node.js, Flutter), AI/ML, Blockchain, Cloud Computing (AWS, GCP, Azure), and Cybersecurity. Our goal is to use the best tools for the job to deliver robust and scalable solutions."
  },
  {
    question: "How do you approach a new project?",
    answer: "Our project approach is collaborative and agile. We start with a deep dive into your requirements and goals. This is followed by a planning and design phase, iterative development sprints with regular feedback sessions, and rigorous testing to ensure quality. We believe in transparency and keep you involved throughout the entire process."
  },
  {
    question: "What is the typical timeline for a project?",
    answer: "The timeline for a project varies greatly depending on its scope and complexity. A simple website might take a few weeks, while a complex enterprise application could take several months. After our initial consultation and requirement analysis, we provide a detailed project plan with estimated timelines."
  },
  {
    question: "Do you offer support and maintenance after the project is launched?",
    answer: "Yes, we offer ongoing support and maintenance packages to ensure your application remains secure, up-to-date, and performs optimally. We can tailor a support plan to fit your specific needs, whether it's for regular updates, security monitoring, or on-demand technical assistance."
  },
  {
    question: "How do you ensure the quality of your deliverables?",
    answer: "Quality is at the core of everything we do. We employ a multi-faceted approach that includes code reviews, automated testing (unit, integration, and end-to-end), manual testing by our QA team, and user acceptance testing (UAT). This comprehensive process helps us deliver reliable and high-performance products."
  }
];

export const officeLocations = [
    {
        name: "Headquarters",
        address: "Bopal Ghuma Road, Sanidhya, Ahmedabad, Gujarat 380058",
        email: "prathams54301@gmail.com",
        phone: "7777967668"
    }
];

export const portfolioCategories = [
  "All",
  "AI & Machine Learning",
  "Cybersecurity",
  "Data Analytics",
  "Full Stack Development",
  "Frontend Development (React.js)",
  "Flutter Development (Mobile Apps)",
  "Blockchain & Web3 Development",
  "Cloud Solutions & DevOps",
];

export type PortfolioProject = {
  title: string;
  category: string;
  image: string;
  imageHint: string;
};

const projectsData: Omit<PortfolioProject, 'image'>[] = [
  // AI & Machine Learning - 5
  { title: "AI-Powered Logistics Optimization", category: "AI & Machine Learning", imageHint: "logistics warehouse"},
  { title: "Automated Anomaly Detection System", category: "AI & Machine Learning", imageHint: "artificial intelligence"},
  { title: "Natural Language Processing for Customer Support", category: "AI & Machine Learning", imageHint: "artificial intelligence"},
  { title: "Computer Vision for Quality Control", category: "AI & Machine Learning", imageHint: "artificial intelligence"},
  { title: "Personalized Recommendation Engine", category: "AI & Machine Learning", imageHint: "artificial intelligence"},
  
  // Cybersecurity - 3
  { title: "Next-Gen Intrusion Detection System", category: "Cybersecurity", imageHint: "cyber security"},
  { title: "Secure Cloud Infrastructure Audit", category: "Cybersecurity", imageHint: "cyber security"},
  { title: "Phishing Simulation and Training Platform", category: "Cybersecurity", imageHint: "cyber security"},
  
  // Data Analytics - 5
  { title: "Customer Lifetime Value (CLV) Platform", category: "Data Analytics", imageHint: "data charts"},
  { title: "Real-Time Sales Performance Dashboard", category: "Data Analytics", imageHint: "data charts"},
  { title: "Supply Chain Visualization", category: "Data Analytics", imageHint: "data charts"},
  { title: "Customer Segmentation Analysis", category: "Data Analytics", imageHint: "data charts"},
  { title: "A B Testing and Analysis Framework", category: "Data Analytics", imageHint: "data charts"},

  // Full Stack Development - 4
  { title: "Enterprise Resource Planning (ERP) System", category: "Full Stack Development", imageHint: "code screen"},
  { title: "SaaS Project Management Tool", category: "Full Stack Development", imageHint: "code screen"},
  { title: "Online Learning and Course Marketplace", category: "Full Stack Development", imageHint: "code screen"},
  { title: "Real-Time Collaborative Whiteboard App", category: "Full Stack Development", imageHint: "code screen"},

  // Frontend Development (React.js) - 20
  { title: "Interactive Data Visualization Dashboard", category: "Frontend Development (React.js)", imageHint: "website interface"},
  { title: "High-Performance E-commerce Storefront", category: "Frontend Development (React.js)", imageHint: "website interface"},
  { title: "Design System & Component Library", category: "Frontend Development (React.js)", imageHint: "website interface"},
  { title: "Single Page Application (SPA) for a Music Streamer", category: "Frontend Development (React.js)", imageHint: "website interface"},
  { title: "Progressive Web App (PWA) for a News Outlet", category: "Frontend Development (React.js)", imageHint: "website interface"},
  { title: "Web-Based Photo Editing Tool", category: "Frontend Development (React.js)", imageHint: "website interface"},
  { title: "Marketing Website for a SaaS Product", category: "Frontend Development (React.js)", imageHint: "website interface"},
  { title: "Frontend for a Social Networking Platform", category: "Frontend Development (React.js)", imageHint: "website interface"},
  { title: "Admin Panel for a Content Management System", category: "Frontend Development (React.js)", imageHint: "website interface"},
  { title: "Accessibility (a11y) Overhaul for a Government Website", category: "Frontend Development (React.js)", imageHint: "website interface"},
  { title: "Real-time Stock Trading Interface", category: "Frontend Development (React.js)", imageHint: "website interface"},
  { title: "Booking Interface for a Travel Agency", category: "Frontend Development (React.js)", imageHint: "website interface"},
  { title: "Gamified Learning Platform UI", category: "Frontend Development (React.js)", imageHint: "website interface"},
  { title: "Frontend for a Live-Streaming Service", category: "Frontend Development (React.js)", imageHint: "website interface"},
  { title: "UI for a Configuration Management Tool", category: "Frontend Development (React.js)", imageHint: "website interface"},
  { title: "Crypto Wallet Dashboard", category: "Frontend Development (React.js)", imageHint: "website interface"},
  { title: "Healthcare Patient Portal", category: "Frontend Development (React.js)", imageHint: "website interface"},
  { title: "Interactive Resume Builder", category: "Frontend Development (React.js)", imageHint: "website interface"},
  { title: "Event Management Dashboard", category: "Frontend Development (React.js)", imageHint: "website interface"},
  { title: "Recipe Finder Application", category: "Frontend Development (React.js)", imageHint: "website interface"},
  
  // Flutter Development (Mobile Apps) - 5
  { title: "Mobile Banking App", category: "Flutter Development (Mobile Apps)", imageHint: "mobile app"},
  { title: "E-commerce Mobile App", category: "Flutter Development (Mobile Apps)", imageHint: "mobile app"},
  { title: "Food Delivery App", category: "Flutter Development (Mobile Apps)", imageHint: "mobile app"},
  { title: "On-demand Home Services App", category: "Flutter Development (Mobile Apps)", imageHint: "mobile app"},
  { title: "Social Media & Chat App", category: "Flutter Development (Mobile Apps)", imageHint: "mobile app"},
  
  // Blockchain & Web3 Development - 4
  { title: "Decentralized Autonomous Organization (DAO) Platform", category: "Blockchain & Web3 Development", imageHint: "blockchain network"},
  { title: "NFT Marketplace for Digital Art", category: "Blockchain & Web3 Development", imageHint: "blockchain network"},
  { title: "DeFi Lending and Borrowing Protocol", category: "Blockchain & Web3 Development", imageHint: "blockchain network"},
  { title: "Supply Chain Tracking on Blockchain", category: "Blockchain & Web3 Development", imageHint: "blockchain network"},

  // Cloud Solutions & DevOps - 2
  { title: "CI/CD Pipeline Automation", category: "Cloud Solutions & DevOps", imageHint: "cloud servers"},
  { title: "Cloud Migration from On Prem to AWS", category: "Cloud Solutions & DevOps", imageHint: "cloud servers"},
];

  
export function generateImagePathFromTitle(title: string): string {
    const imageName = imageMap[title];
    if (imageName) {
        return `/portfolio/${imageName}`;
    }
    // Fallback to a default image if no mapping is found
    return `/portfolio/High-Performance E-commerce Storefront.png`;
}
  
export const portfolioProjects: PortfolioProject[] = projectsData.map(project => ({
  ...project,
  image: generateImagePathFromTitle(project.title)
}));
    
    
