export type Link = {
  slug: string;
  title: string;
  image: {
    file: string;
    alt: string;
  };
  link: string;
  category: string;
  label: string;
};
export type Category = {
  slug: string;
  title: string;
  color: string;
};
export type Tutorial = {
  slug: string;
  icon: string;
  title: string;
  service: string;
  steps: {
    image?: {
      file: string;
      alt: string;
    };
    text: string;
  }[];
};
