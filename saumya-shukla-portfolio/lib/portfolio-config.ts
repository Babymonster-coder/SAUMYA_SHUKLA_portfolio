// =====================================================
// REPLACE YOUR INFORMATION HERE
// This is the single source of truth for the portfolio.
// Edit these values to update the site everywhere.
// =====================================================

export const portfolioConfig = {
  name: "Saumya Shukla",
  role: "Data Science Student | Aspiring Data Analyst",
  degree: "B.Tech CSE (Data Science)",
  semester: "7th Semester",
  graduation: "2027",
  institute: "SR Institute of Management & Technology (SRIMT)",
  university: "AKTU",
  careerTarget: "Data Analyst / Data Scientist / Data Engineer",

  // REPLACE EMAIL HERE
  email: "your-email@example.com",
  // REPLACE LINKEDIN URL HERE
  linkedin: "https://linkedin.com/in/saumya-shukla-690a75346",
  // REPLACE GITHUB URL HERE
  github: "https://github.com/yourusername",

  // Place your resume PDF at: public/resume/Saumya-Shukla-Resume.pdf
  resume: "/resume/Saumya-Shukla-Resume.pdf",
  // Replace the placeholder image at: public/assets/images/profile.png
  profileImage: "/assets/images/profile.png",
}

// =====================================================
// ABOUT
// =====================================================
export const aboutText = [
  "Hi, I'm Saumya Shukla.",
  "I'm a B.Tech CSE (Data Science) student passionate about data analytics, programming and building practical technology solutions.",
  "I'm currently focused on Python, SQL, Power BI, data analysis and machine learning.",
]

// =====================================================
// SKILLS
// =====================================================
export const skills = {
  Programming: ["Python", "SQL", "HTML", "CSS", "JavaScript"],
  Data: ["Pandas", "NumPy", "Excel", "Power BI", "Matplotlib"],
  Database: ["MySQL", "MongoDB"],
  Tools: ["Git", "GitHub", "VS Code"],
  "Currently Learning": ["Statistics", "Machine Learning", "GenAI"],
}

// =====================================================
// PROJECTS
// Add future projects by appending to this array.
// Replace the placeholder github/demo links per project.
// =====================================================
export type Project = {
  title: string
  tech: string[]
  description: string
  github: string
  demo: string
}

export const projects: Project[] = [
  {
    title: "E-Commerce Sales Analytics",
    tech: ["Python", "Pandas", "SQL", "Power BI"],
    description:
      "Analyze e-commerce sales data to identify revenue trends, top-performing products, customer behavior and useful business insights.",
    // REPLACE PROJECT LINKS HERE
    github: "https://github.com/yourusername/ecommerce-sales-analytics",
    demo: "https://your-demo-link.com",
  },
  {
    title: "Movie Data Analysis",
    tech: ["Python", "Pandas", "Matplotlib"],
    description:
      "Explore movie datasets to identify trends in ratings, genres, revenue and other useful patterns.",
    github: "https://github.com/yourusername/movie-data-analysis",
    demo: "https://your-demo-link.com",
  },
  {
    title: "E-Commerce SQL Analytics",
    tech: ["MySQL", "SQL"],
    description:
      "Use SQL queries, joins, aggregations, subqueries and analytical techniques to extract business insights from e-commerce data.",
    github: "https://github.com/yourusername/ecommerce-sql-analytics",
    demo: "https://your-demo-link.com",
  },
  {
    title: "TripBee",
    tech: ["HTML", "CSS", "JavaScript", "Python", "MySQL", "MongoDB"],
    description:
      "A smart travel planning and booking platform concept designed to help users discover destinations, compare travel options, explore hotels and rentals, and plan trips using intelligent recommendations.",
    github: "https://github.com/yourusername/tripbee",
    demo: "https://your-demo-link.com",
  },
]

// =====================================================
// RESUME CONTENT
// =====================================================
export const resumeData = {
  education: [
    {
      title: "B.Tech CSE (Data Science)",
      org: "SR Institute of Management & Technology",
      meta: "AKTU • 2023–2027",
    },
  ],
  skills: [
    "Python",
    "SQL",
    "Pandas",
    "NumPy",
    "Excel",
    "Power BI",
    "MySQL",
    "MongoDB",
    "Git",
    "GitHub",
  ],
  projects: [
    "E-Commerce Sales Analytics",
    "Movie Data Analysis",
    "E-Commerce SQL Analytics",
    "TripBee",
  ],
  experience: [{ role: "Internship", org: "Main Crafts" }],
  certifications: ["AWS AI & GenAI", "Infosys Springboard Web Development"],
}

// =====================================================
// EXPERIENCE
// REPLACE INTERNSHIP DETAILS / LINKS HERE
// =====================================================
export const experience = {
  company: "Main Crafts",
  role: "Internship",
  // Replace with your real certificate / LOR links when available.
  certificateLink: "", // e.g. "/experience/main-crafts-certificate.pdf"
  lorLink: "", // e.g. "/experience/main-crafts-lor.pdf"
}

// =====================================================
// TERMINAL EASTER EGG
// =====================================================
export const terminalData = {
  query: ["SELECT *", "FROM career", "WHERE candidate = 'SAUMYA';"],
  results: [
    "Skills: Python, SQL, Power BI",
    "Projects: 4+",
    "Experience: Internship",
    "Status: OPEN TO OPPORTUNITIES",
  ],
}

// Panel identifiers used across the workspace + navigation.
export type PanelId =
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "resume"
  | "contact"
  | "terminal"
