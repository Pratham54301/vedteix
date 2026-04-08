
export interface NavLinkItem {
    title: string;
    href?: string;
    description?: string;
  }
  
  export interface CareerNavLink {
    label: string;
    href?: string;
    isHighlighted?: boolean;
    items?: NavLinkItem[];
  }
  
  export const careersNavLinks: CareerNavLink[] = [
    {
      label: "Careers",
      href: "/careers",
      isHighlighted: true,
    },
    {
      label: "Locations",
      href: "/careers#locations", 
    },
    {
      label: "Professions",
      href: "/careers#openings",
    },
    {
      label: "Programs",
      items: [
        { title: "Internships", href: "/careers#programs", description: "Kickstart your career with us." },
        { title: "Graduate Programs", href: "/careers#programs", description: "For recent university graduates." },
        { title: "Apprenticeships", href: "/careers#programs", description: "Learn on the job." },
      ],
    },
    {
      label: "Life at VEDTEIX",
      items: [
        { title: "Our Culture", href: "/careers#why-join-us", description: "Discover our values and work environment." },
        { title: "Events", href: "/careers#why-join-us", description: "Join our team events and activities." },
        { title: "Testimonials", href: "/#testimonials", description: "Hear from our team members." },
      ],
    },
    {
        label: "Hiring Tips",
        href: "/careers#hiring-tips",
    }
  ];
  
