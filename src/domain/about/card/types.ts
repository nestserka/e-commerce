export interface CardFromAboutPageProps {
  key: string;
  srcImg: string;
  firstDescription: string;
  secondDescription: string;
  linkForGitHub: string;
  description?: DescriptionData;
}

export interface DescriptionData {
  title: string;
  bio: string;
  contribution: string;
}
