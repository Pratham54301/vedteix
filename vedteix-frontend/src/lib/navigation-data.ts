export interface NavLinkItem {
  title: string;
  titleKey: string;
  href?: string;
  description?: string;
  descriptionKey?: string;
  categoryId?: string;
}

export interface NavLinkCategory {
  id: string;
  title: string;
  titleKey: string;
  href?: string;
  description?: string;
  descriptionKey?: string;
}

export interface NavLink {
  label: string;
  labelKey: string;
  href?: string;
  isMegaMenu?: boolean;
  categories?: NavLinkCategory[];
  items?: NavLinkItem[];
}

export const navLinks: NavLink[] = [
  {
    label: "Home",
    labelKey: "nav.home",
    href: "/",
  },
  {
    label: "Services",
    labelKey: "nav.services",
    isMegaMenu: true,
    categories: [
      {
        id: "web",
        title: "Web Development",
        titleKey: "mega.web.title",
        href: "/services",
        description: "Crafting digital experiences for web and mobile.",
        descriptionKey: "mega.web.desc",
      },
      {
        id: "ai",
        title: "AI & Automation",
        titleKey: "mega.ai.title",
        href: "/services",
        description: "Leveraging intelligence to drive efficiency.",
        descriptionKey: "mega.ai.desc",
      },
      {
        id: "design",
        title: "Design & Branding",
        titleKey: "mega.design.title",
        href: "/services",
        description: "Creating memorable and impactful brand identities.",
        descriptionKey: "mega.design.desc",
      },
    ],
    items: [
      {
        title: "Custom Software Development",
        titleKey: "mega.item.customSoftware",
        categoryId: "web",
        href: "/services",
      },
      {
        title: "Mobile App Development",
        titleKey: "mega.item.mobileApp",
        categoryId: "web",
        href: "/services",
      },
      {
        title: "Enterprise Solutions",
        titleKey: "mega.item.enterprise",
        categoryId: "web",
        href: "/services",
      },
      {
        title: "Machine Learning",
        titleKey: "mega.item.ml",
        categoryId: "ai",
        href: "/services",
      },
      {
        title: "Robotic Process Automation",
        titleKey: "mega.item.rpa",
        categoryId: "ai",
        href: "/services",
      },
      {
        title: "Data Analytics",
        titleKey: "mega.item.analytics",
        categoryId: "ai",
        href: "/services",
      },
      {
        title: "UI/UX Design",
        titleKey: "mega.item.uiux",
        categoryId: "design",
        href: "/services",
      },
      {
        title: "Brand Strategy",
        titleKey: "mega.item.brand",
        categoryId: "design",
        href: "/services",
      },
      {
        title: "Digital Marketing",
        titleKey: "mega.item.marketing",
        categoryId: "design",
        href: "/services",
      },
    ],
  },
  {
    label: "Technologies",
    labelKey: "nav.technologies",
    isMegaMenu: true,
    categories: [
      {
        id: "fe",
        title: "Frontend",
        titleKey: "mega.tech.fe.title",
        href: "/#technologies",
        description: "Engaging user interfaces.",
        descriptionKey: "mega.tech.fe.desc",
      },
      {
        id: "be",
        title: "Backend",
        titleKey: "mega.tech.be.title",
        href: "/#technologies",
        description: "Robust and scalable server-side logic.",
        descriptionKey: "mega.tech.be.desc",
      },
      {
        id: "mobile",
        title: "Mobile",
        titleKey: "mega.tech.mobile.title",
        href: "/#technologies",
        description: "Native and cross-platform apps.",
        descriptionKey: "mega.tech.mobile.desc",
      },
    ],
    items: [
      { title: "React.js", titleKey: "mega.tech.react", categoryId: "fe", href: "/#technologies" },
      { title: "Angular", titleKey: "mega.tech.angular", categoryId: "fe", href: "/#technologies" },
      { title: "Vue.js", titleKey: "mega.tech.vue", categoryId: "fe", href: "/#technologies" },
      { title: "Node.js", titleKey: "mega.tech.node", categoryId: "be", href: "/#technologies" },
      { title: "Python", titleKey: "mega.tech.python", categoryId: "be", href: "/#technologies" },
      { title: "Java", titleKey: "mega.tech.java", categoryId: "be", href: "/#technologies" },
      { title: "iOS (Swift)", titleKey: "mega.tech.ios", categoryId: "mobile", href: "/#technologies" },
      { title: "Android (Kotlin)", titleKey: "mega.tech.android", categoryId: "mobile", href: "/#technologies" },
      { title: "Flutter", titleKey: "mega.tech.flutter", categoryId: "mobile", href: "/#technologies" },
    ],
  },
  {
    label: "Company",
    labelKey: "nav.company",
    items: [
      {
        title: "About Us",
        titleKey: "navCompany.about",
        href: "/about",
        description: "Learn about our mission and values.",
        descriptionKey: "navCompany.aboutDesc",
      },
      {
        title: "Life at VEDTEIX",
        titleKey: "navCompany.life",
        href: "/careers",
        description: "Discover our culture and team.",
        descriptionKey: "navCompany.lifeDesc",
      },
      {
        title: "Our Process",
        titleKey: "navCompany.process",
        href: "/contact",
        description: "How we bring ideas to life.",
        descriptionKey: "navCompany.processDesc",
      },
    ],
  },
  {
    label: "Portfolio",
    labelKey: "nav.portfolio",
    href: "/portfolio",
  },
  {
    label: "Book a call",
    labelKey: "nav.book",
    href: "/book-appointment",
  },
  {
    label: "Careers",
    labelKey: "nav.careers",
    href: "/careers",
  },
  {
    label: "Contact Us",
    labelKey: "nav.contact",
    href: "/contact",
  },
];
