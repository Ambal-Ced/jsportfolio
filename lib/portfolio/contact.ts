export const contactName = "Justine Cedrick R. Ambal";

export type ContactItem = {
  id: "facebook" | "instagram" | "github" | "linkedin" | "mobile" | "email" | "address";
  label: string;
  href: string;
  value: string;
};

/** Edit `href` and `value`. Keep `id` and `label`. */
export const contactItems: ContactItem[] = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/justine.ambal.364",
    value: "Justine Cedrick R. Ambal",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/tinten.justine/",
    value: "tinten.justine",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Ambal-Ced",
    value: "ArZen",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ambal-ced3604/",
    value: "Justine Cedrick R. Ambal",
  },
  {
    id: "mobile",
    label: "Mobile",
    href: "tel:+639391962494",
    value: "+63 9391962494",
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:justineambal32@gmail.com",
    value: "justineambal32@gmail.com",
  },
  {
    id: "address",
    label: "Address",
    href: "",
    value: "San Jose, Batangas, 4227, Philippines",
  },
];
