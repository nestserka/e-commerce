export interface CardFromAboutPageProps {
  key: string;
  srcImg: string;
  firstDescription: string;
  secondDescription: string;
  linkForGitHub: string;
  handleClickForCard: () => void;
}

export interface DescriptionData {
  title: string;
  bio: string;
  contribution: string;
}
