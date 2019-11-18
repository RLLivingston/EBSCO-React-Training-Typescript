export default interface IBulletinItemProps {
    votes: number;
    description: string;
    title: string;
    id: string;
    upvote: (bulletinId: string) => void;
}