import IBulletinData from "../../../Services/ILocalData";

export default interface IBulletinListState {
  error: Error | null;
  isLoaded: boolean;
  items: IBulletinData[];
}
