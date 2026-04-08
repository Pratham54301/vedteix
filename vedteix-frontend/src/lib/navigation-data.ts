export interface NavLinkItem {
    title: string;
    href?: string;
    description?: string;
    category?: string;
  }
  
  export interface NavLinkCategory {
    title: string;
    href?: string;
    description?: string;
  }
  
  export interface NavLink {
    label: string;
    href?: string;
    isMegaMenu?: boolean;
    categories?: NavLinkCategory[];
    items?: NavLinkItem[];
  }
  
  export const navLinks: NavLink[] = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Services",
      isMegaMenu: true,
      categories: [
        {
          title: "Web Development",
          href: "/services",
          description: "Crafting digital experiences for web and mobile.",
        },
        {
          title: "AI & Automation",
          href: "/services",
          description: "Leveraging intelligence to drive efficiency.",
        },
        {
            title: "Design & Branding",
            href: "/services",
            description: "Creating memorable and impactful brand identities.",
        },
      ],
      items: [
        { title: "Custom Software Development", category: "Web Development", href: "/services" },
        { title: "Mobile App Development", category: "Web Development", href: "/services" },
        { title: "Enterprise Solutions", category: "Web Development", href: "/services" },
        { title: "Machine Learning", category: "AI & Automation", href: "/services" },
        { title: "Robotic Process Automation", category: "AI & Automation", href: "/services" },
        { title: "Data Analytics", category: "AI & Automation", href: "/services" },
        { title: "UI/UX Design", category: "Design & Branding", href: "/services" },
        { title: "Brand Strategy", category: "Design & Branding", href: "/services" },
        { title: "Digital Marketing", category: "Design & Branding", href: "/services" },
      ],
    },
    {
        label: "Technologies",
        isMegaMenu: true,
        categories: [
          {
            title: "Frontend",
            href: "/#technologies",
            description: "Engaging user interfaces.",
          },
          {
            title: "Backend",
            href: "/#technologies",
            description: "Robust and scalable server-side logic.",
          },
          {
              title: "Mobile",
              href: "/#technologies",
              description: "Native and cross-platform apps.",
          },
        ],
        items: [
          { title: "React.js", category: "Frontend", href: "/#technologies" },
          { title: "Angular", category: "Frontend", href: "/#technologies" },
          { title: "Vue.js", category: "Frontend", href: "/#technologies" },
          { title: "Node.js", category: "Backend", href: "/#technologies" },
          { title: "Python", category: "Backend", href: "/#technologies" },
          { title: "Java", category: "Backend", href: "/#technologies" },
          { title: "iOS (Swift)", category: "Mobile", href: "/#technologies" },
          { title: "Android (Kotlin)", category: "Mobile", href: "/#technologies" },
          { title: "Flutter", category: "Mobile", href: "/#technologies" },
        ],
    },
    {
        label: "Company",
        items: [
            { title: "About Us", href: "/#about-us", description: "Learn about our mission and values." },
            { title: "Life at VEDTEIX", href: "/careers", description: "Discover our culture and team." },
            { title: "Our Process", href: "/contact", description: "How we bring ideas to life." },
        ]
    },
    {
      label: "Portfolio",
      href: "/portfolio",
    },
    {
      label: "Careers",
      href: "/careers",
    },
    {
      label: "Contact Us",
      href: "/#contact",
    },
  ];
  
