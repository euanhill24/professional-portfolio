export const content = {
  hero: {
    label: "Portfolio — 2026",
    name: "Euan Hill",
    subtitle: "AI Consultant",
  },
  about: {
    heading: "A brief introduction",
    paragraph:
      "Consulting manager at Roboyo specialising in enterprise AI strategy and hands-on delivery. I've spent eight years leading AI and automation programmes across financial services, pharma, manufacturing, and telecom — designing multi-agent AI platforms, running process studies that identify millions in savings, and growing engineering teams from scratch to 30+ people.",
    stats: [
      { value: 8, suffix: "+", label: "Years experience" },
      { value: 25, suffix: "+", label: "Projects delivered" },
      { value: 15, suffix: "+", label: "Enterprise clients" },
    ],
  },
  career: {
    heading: "The journey so far",
    entries: [
      {
        period: "2026 — Present",
        role: "Senior Consulting Manager",
        company: "Roboyo",
        description:
          "Leading AI strategy, solution design, and delivery for enterprise clients across EMEA. Designed multi-agent AI platforms on Azure AI Foundry, led automation studies identifying $1.35M/year in savings, and managed implementation teams of up to 30+ engineers delivering £3M+ in EBITDA impact.",
      },
      {
        period: "2024 — 2026",
        role: "Consulting Manager",
        company: "Roboyo",
        description:
          "Led greenfield product builds and AI discovery engagements across financial services and facilities management. Grew an engineering team from 4 to 30+ and delivered £3M+ in recurring EBITDA through a loan administration platform.",
      },
      {
        period: "2022 — 2024",
        role: "Senior Consultant",
        company: "Roboyo",
        description:
          "Delivered process mining, intelligent automation, and AI proof-of-value projects across pharma, financial services, and life sciences. Developed the Celonis operating model for a global crop science division. Automated pharmaceutical briefing document creation, targeting 2,500 hours saved annually.",
      },
      {
        period: "2021 — 2022",
        role: "Consultant",
        company: "Roboyo",
        description:
          "Built and deployed robotic process automation solutions across consumer goods, energy, and manufacturing. Trained client teams on Power Automate, established automation centres of excellence, and delivered RPA implementations using UiPath and Automation Anywhere.",
      },
      {
        period: "2019 — 2021",
        role: "Management Consultant",
        company: "North Highland",
        description:
          "Led BI and innovation on a major rail infrastructure programme. Built an integrated Microsoft tooling strategy, delivered Power BI dashboards and Power Apps, and redesigned the portfolio operating model — resolving accountability gaps and streamlining cross-team operations.",
      },
    ],
  },
  work: {
    heading: "Selected engagements",
    entries: [
      {
        number: "01",
        title: "AI-Powered NTE Intelligence Platform",
        tag: "Facilities Management",
        description:
          "Designed and delivered a multi-agent AI platform automating Not-To-Exceed breach management across ~50,000 service invoices monthly. Built an orchestrator with four specialist agents (Labor, Parts, Warranty, Communications) on Azure AI Foundry, with a two-tier intelligence model for deterministic validation and predictive breach prevention.",
        outcomes: [
          "Resolution time: days to hours",
          "Millions in warranty savings",
          "260 person-day delivery",
        ],
      },
      {
        number: "02",
        title: "Robotic Process Study & AI Agent Delivery",
        tag: "Telecom Infrastructure",
        description:
          "Led the engineering track of a process study across 24 end-to-end processes and 20,000+ jobs/year. Identified 21 automation opportunities addressing 703K hours/year. Designed and managed delivery of a multi-agent permit research system spanning 500+ US government jurisdictions.",
        outcomes: [
          "$1.35M/year savings identified",
          "Working multi-agent POC",
          "21 opportunity business cases",
        ],
      },
      {
        number: "03",
        title: "Greenfield Loan Administration Platform",
        tag: "Financial Services",
        description:
          "Technical Product Owner for a greenfield loan administration tool replacing legacy technology. Agreed the strategy, designed the solution, and led the implementation from a four-person team to a 30+ engineer organisation.",
        outcomes: [
          "£3M+ recurring EBITDA",
          "90% operational automation",
          "Team scaled 4 to 30+",
        ],
      },
      {
        number: "04",
        title: "Briefing Documents Automation",
        tag: "Pharmaceutical",
        description:
          "Delivered an AI proof of value automating pharmaceutical sales briefing document creation. The solution ingested sales materials, used AI to analyse content type and intent, and pre-populated 50–70% of each document with compliance-standard wording — across 2,000+ documents per year.",
        outcomes: [
          "2,500 hours freed annually",
          "50–70% auto-populated",
          "Zero compliance errors",
        ],
      },
      {
        number: "05",
        title: "AI Discovery & Implementation",
        tag: "Financial Services",
        description:
          "Led AI discovery and delivered three case-classification and completeness-checking solutions for a financial advisory firm. Evaluated Azure AI Foundry vs AI Builder, refined prompts for paraplanner allocation, and built orchestration with Power Automate.",
        outcomes: [
          "3 AI solutions delivered",
          "Azure AI Foundry + AI Builder",
          "End-to-end: discovery to production",
        ],
      },
    ],
  },
  projects: {
    heading: "Personal projects",
    entries: [
      {
        title: "CatFinder",
        description:
          "Cat Tinder for my sister — who gave up on dating apps and decided to adopt a cat instead. Scrapes every cat available near Edinburgh every two hours, then an AI reviews each profile and photos to rank them by vibe and match. The best ones float to the top for easy swiping.",
        tech: ["Next.js", "TypeScript", "Supabase", "GitHub Actions"],
        github: "https://github.com/euanhill24/CatFinder",
        live: "https://cat-finder-rho.vercel.app",
        status: "Active",
      },
      {
        title: "Bergen",
        description:
          "A family trip to Norway and a Google Doc that was getting out of hand. Replaced it with a purpose-built travel companion: day-by-day itinerary, curated local picks with prices in NOK, an interactive map, and a practical guide covering weather, transport, and customs.",
        tech: ["Next.js", "TypeScript", "React"],
        github: "https://github.com/euanhill24/bergen",
        live: "https://bergen-pi.vercel.app",
        status: "Shipped",
      },
    ],
  },
  contact: {
    heading: "Let's chat",
    email: "euan.hill24@gmail.com",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/euan-hill/" },
      { label: "GitHub", url: "https://github.com/euanhill24" },
    ],
  },
};
