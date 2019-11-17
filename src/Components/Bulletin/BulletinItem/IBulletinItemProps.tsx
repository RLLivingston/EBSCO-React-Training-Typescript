export interface IBulletinItemProps {
  upvote: (bulletinId: string) => void;
  votes: number;
  description: string;
  title: string;
  id: string;
}
