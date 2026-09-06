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
    slug: "bitcon",
    src: "/certi/bitcon.webp",
    title: "bitcon.png",
    subtitle: "bitcon.png",
    fullDescription: "bitcon.png",
  },
  {
    slug: "data-analytics-fundamentals",
    src: "/certi/certificate.Data_Analytics_Fundamentals_Justine_Ambal.webp",
    title: "certificate.Data_Analytics_Fundamentals_Justine_Ambal.png",
    subtitle: "certificate.Data_Analytics_Fundamentals_Justine_Ambal.png",
    fullDescription: "certificate.Data_Analytics_Fundamentals_Justine_Ambal.png",
  },
  {
    slug: "cisco-cybersecurity",
    src: "/certi/cisco_cybersecurity.webp",
    title: "cisco_cybersecurity.png",
    subtitle: "cisco_cybersecurity.png",
    fullDescription: "cisco_cybersecurity.png",
  },
  {
    slug: "cisco-cybersecurity-badge",
    src: "/certi/cisco_cybersecurity_with_badge.webp",
    title: "cisco_cybersecurity_with_badge.png",
    subtitle: "cisco_cybersecurity_with_badge.png",
    fullDescription: "cisco_cybersecurity_with_badge.png",
  },
  {
    slug: "c-microsoft-and-freecodecamp",
    src: "/certi/C_microsoft_and_freecodecamp.webp",
    title: "C_microsoft_and_freecodecamp.png",
    subtitle: "C_microsoft_and_freecodecamp.png",
    fullDescription: "C_microsoft_and_freecodecamp.png",
  },
  {
    slug: "datasense-excel",
    src: "/certi/datasense_fundamental_on_excel.webp",
    title: "datasense_fundamental_on_excel.png",
    subtitle: "datasense_fundamental_on_excel.png",
    fullDescription: "datasense_fundamental_on_excel.png",
  },
  {
    slug: "datasense-powerbi",
    src: "/certi/datasense_powerbi_intensive.webp",
    title: "datasense_powerbi_intensive.png",
    subtitle: "datasense_powerbi_intensive.png",
    fullDescription: "datasense_powerbi_intensive.png",
  },
  {
    slug: "dict-camarines-sur",
    src: "/certi/DICT-camarines-sur.webp",
    title: "DICT-camarines-sur.png",
    subtitle: "DICT-camarines-sur.png",
    fullDescription: "DICT-camarines-sur.png",
  },
  {
    slug: "os-cisco",
    src: "/certi/os_cisco.webp",
    title: "os_cisco.png",
    subtitle: "os_cisco.png",
    fullDescription: "os_cisco.png",
  },
  {
    slug: "simplilearn-aspnet",
    src: "/certi/Simplilearn_Certificate_ASPNET_240902_205308.webp",
    title: "Simplilearn_Certificate_ASPNET_240902_205308.jpg",
    subtitle: "Simplilearn_Certificate_ASPNET_240902_205308.jpg",
    fullDescription: "Simplilearn_Certificate_ASPNET_240902_205308.jpg",
  },
  {
    slug: "simplilearn-cplusplus",
    src: "/certi/Simplilearn_Certificate_Cplusplus_240902_143803.webp",
    title: "Simplilearn_Certificate_Cplusplus_240902_143803.jpg",
    subtitle: "Simplilearn_Certificate_Cplusplus_240902_143803.jpg",
    fullDescription: "Simplilearn_Certificate_Cplusplus_240902_143803.jpg",
  },
  {
    slug: "tech-career",
    src: "/certi/tech_career.webp",
    title: "tech_career.jpg",
    subtitle: "tech_career.jpg",
    fullDescription: "tech_career.jpg",
  },
  {
    slug: "tech-voc-data",
    src: "/certi/tech_voc_data.webp",
    title: "tech_voc_data.JPG",
    subtitle: "tech_voc_data.JPG",
    fullDescription: "tech_voc_data.JPG",
  },
];

export function getCertificate(slug: string) {
  return certificates.find((item) => item.slug === slug);
}
