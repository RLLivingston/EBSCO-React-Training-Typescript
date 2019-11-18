import IBulletinData from "../../../Services/IBulletinData";

export default interface IBulletinListState {
    items: IBulletinData[],
    error: Error | null,
    isLoaded: boolean
}