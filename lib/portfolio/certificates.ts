export type CertificateItem = {
  slug: string;
  src: string;
  title: string;
  subtitle: string;
  fullDescription: string;
};

/** Edit `title`, `subtitle`, and `fullDescription`. Keep `slug` and `src` as they are. */
export const certificates: CertificateItem[] = [
  {
    slug: "tech-voc-data",
    src: "/certi/tech_voc_data.webp",
    title: "Data Analytics 101",
    subtitle: "Data Analytics 101 Certificate of Completion",
    fullDescription: "A 1 month inclusive training on Data Analytics introducing analytics tools and technology and improving skills preparing the student to explore the world on Data Analytics.",
  },
  {
    slug: "bitcon",
    src: "/certi/bitcon.webp",
    title: "Batangas Information Technology Conference",
    subtitle: "Bitcon Certificate of Participation",
    fullDescription: "Batangas Information Technology Conference Discusses the ways we can use Ai on technology and business analysis, emnpowering integration, innovation, and security.",
  },
  {
    slug: "data-analytics-fundamentals",
    src: "/certi/certificate.Data_Analytics_Fundamentals_Justine_Ambal.webp",
    title: "Data Analytics Fundamentals",
    subtitle: "Data Analytics Fundamentals Certificate of Completion",
    fullDescription: "A certificate on completing a course on Data Analytics Fundamentals using multiple tools and technologies.",
  },
  {
    slug: "cisco-cybersecurity",
    src: "/certi/cisco_cybersecurity.webp",
    title: "Introduction to Cybersecurity",
    subtitle: "Introduction to Cybersecurity Certificate of Completion",
    fullDescription: "A certificate on completing a course on Introduction to Cybersecurity enforcing the use of cybersecurity principles and practices.",
  },
  {
    slug: "cisco-cybersecurity-badge",
    src: "/certi/cisco_cybersecurity_with_badge.webp",
    title: "Introduction to Cybersecurity Badge",
    subtitle: "A certificate on completing a course on Introduction to Cybersecurity and earning a badge serving as a proof of verification.",
    fullDescription: "A certificate on completing a course on Introduction to Cybersecurity and earning a badge serving as a proof of verification on mastering the basics of cybersecurity.",
  },
  {
    slug: "c-microsoft-and-freecodecamp",
    src: "/certi/C_microsoft_and_freecodecamp.webp",
    title: "Foundational C# with Microsoft",
    subtitle: "A certificate on completing a course on Foundational C# with Microsoft.",
    fullDescription: "A certifified certificate from microsoft and FreeCodeCamp on completing a course on Foundational C# with Microsoft showcasing the basics and advanced concepts of C# programming language.",
  },
  {
    slug: "datasense-excel",
    src: "/certi/datasense_fundamental_on_excel.webp",
    title: "Fundamental of Statistics with Microsoft Excel",
    subtitle: "A certificate on completing a online live course on Fundamental of Statistics with Microsoft Excel.",
    fullDescription: "A certificate of completion on completing a online live course on Fundamental of Statistics with Microsoft Excel showcasing the basics and advanced concepts of statistics using Microsoft Excel offered by DataSense and Data Analytics Philippines.",
  },
  {
    slug: "datasense-powerbi",
    src: "/certi/datasense_powerbi_intensive.webp",
    title: "Business Intelligence with Microsoft Power BI Desktop Technical with Capstone Project",
    subtitle: "A certificate on completing a online live course on Business Intelligence with Microsoft Power BI Desktop Technical with Capstone Project.",
    fullDescription: "A certificate of completion on completing a online live course on Business Intelligence with Microsoft Power BI Desktop Technical with Capstone Project showcasing the basics and advanced concepts of business intelligence and visualizing data and design using Microsoft Power BI Desktop.",
  },
  {
    slug: "dict-camarines-sur",
    src: "/certi/DICT-camarines-sur.webp",
    title: "Unleasshing Potential: How Leadership, Friendship, and Service Propel Growth",
    subtitle: "A certificate on completing course on Unleasshing Potential: How Leadership, Friendship, and Service Propel Growth.",
    fullDescription: "A certificate certified by DICT Camarines Sur on completing a course on Unleasshing Potential: How Leadership, Friendship, and Service Propel Growth.",
  },
  {
    slug: "os-cisco",
    src: "/certi/os_cisco.webp",
    title: "Operating Systems Basics",
    subtitle: "A certificate on completing a course on Operating Systems Basics on Cisco Networking Academy.",
    fullDescription: "A proof of completion on completing a course on Operating Systems Basics on Cisco Networking Academy explaining the architecture of windows and operation and its administrative tools.",
  },
  {
    slug: "simplilearn-aspnet",
    src: "/certi/Simplilearn_Certificate_ASPNET_240902_205308.webp",
    title: "Introduction to ASP.NET",
    subtitle: "A certificate of completion of Introduction to ASP.Net course on Simplilearn.",
    fullDescription: "A certificate of completion of Introduction to ASP.Net course on Simplilearn teaching ASP.Net framework and its features.",
  },
  {
    slug: "simplilearn-cplusplus",
    src: "/certi/Simplilearn_Certificate_Cplusplus_240902_143803.webp",
    title: "Introduction to C++",
    subtitle: "A certificate of completion of Introduction to C++ course on Simplilearn.",
    fullDescription: "A certificate of completion of Introduction to C++ course on Simplilearn teaching C++ programming language and its features deepening the understanding and skills.",
  },
  {
    slug: "tech-career",
    src: "/certi/tech_career.webp",
    title: "Tech Career Roadmap: Navigating Opportunities for IT Students",
    subtitle: "A certificate of participation on Tech Career Roadmap: Navigating Opportunities for IT Students on BSU TheNEU Lipa.",
    fullDescription: "A certificate of participation on Tech Career Roadmap: Navigating Opportunities for IT Students on BSU TheNEU Lipa discussing the career opportunities in the IT industry and showcasing different career paths and opportunities.",
  },

];

export function getCertificate(slug: string) {
  return certificates.find((item) => item.slug === slug);
}
