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

export type Site = {
  title: string;
  logo: Image;
  description: string;
  details: SiteDetail[];
  links: SiteLinks[];
};

export type SiteDetail = { title: string; content: string };

export type SiteLinks = { title: string; url: string };

export type TutorialStep = {
  image?: Image;
  text: string;
};

interface BaseTutorial {
  slug: string;
  icon: string;
  title: string;
  service: string;
}
export interface InternalTutorial extends BaseTutorial {
  steps: TutorialStep[];
}

export interface ExternalTutorial extends BaseTutorial {
  url: string;
}

export type Tutorial = InternalTutorial | ExternalTutorial;

export type Ressource = {
  slug: string;
  title: string;
  image: Image;
  url: string;
  category: string;
  label: string;
};
