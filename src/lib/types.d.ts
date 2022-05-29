export type Category = {
  slug: string;
  title: string;
  color: string;
};
export type Image = {
  src: string;
  alt: string;
};
export type Link = {
  slug: string;
  title: string;
  image: Image;
  url: string;
  category: string;
  label: string;
};
export type Sidebar = {
  logo: Image;
  description: string;
  details: SidebarDetail[];
  links: SidebarLink[];
};
export type SidebarDetail = { title: string; content: string };
export type SidebarLink = { title: string; url: string };
export type Tutorial = {
  slug: string;
  icon: string;
  title: string;
  service: string;
  steps: TutorialStep[];
};
export type TutorialStep = {
  image?: Image;
  text: string;
};
