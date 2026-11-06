export const site = {
  name: "Dhiya Labs",
  url: "https://dhiya.ai",
  mail: "hi@dhiya.ai",
  investors: "founders@dhiya.ai",
  endpoint: "/api/contact",
  announcement: "Design partner places are open",
  // Used by the privacy, terms and security pages. Set the registered company name, address and governing-law jurisdiction before relying on them.
  legal: {
    entity: "Dhiya Labs",
    address: "",
    jurisdiction: "the place where Dhiya Labs is established",
    updated: "6 November 2026",
  },
  nav: {
    platform: [
      { href: "/dil", label: "DIL", sub: "The system of record for the data centre" },
      { href: "/#platform", label: "The record", sub: "From chaos to calm" },
      { href: "/#architecture", label: "Architecture", sub: "How it fits together" },
      { href: "/#uses", label: "Use cases", sub: "What you use DIL for" },
    ],
    product: [
      { href: "/ayana", label: "Ayana", sub: "Sell · CRM + billing & revenue", img: "/media/logos/ayana-mark_on-chalk.svg" },
      { href: "/neev", label: "Neev", sub: "Operate · DC Ops", img: "/media/logos/neev-mark_on-chalk.svg" },
      { href: "/vitana", label: "Vitana", sub: "Resolve · IT Ops", img: "/media/logos/vitana-mark_on-chalk.svg" },
      { href: "/aire", label: "Aire", sub: "Compute · Cloud", img: "/media/logos/aire-mark_on-chalk.svg" },
    ],
    company: [
      { href: "/about", label: "About", sub: "Twenty years on the floor" },
      { href: "/about#investors", label: "Investors", sub: "Get in touch with the founders" },
      { href: "#talk", label: "Contact", sub: "Talk to us" },
    ],
  },
};
