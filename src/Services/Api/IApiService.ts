import IBulletinData from "../IBulletinData";

export default interface IApiService {
  getBulletins: () => Promise<IBulletinData[]>;
  patchUpvotes: (bulletinId: string, patchBody: IBulletinData) => Promise<void>;
}
