import IBulletinData from "../../Services/IBulletinData";
import { observable, action, computed } from "mobx";

class BulletinStore {
  @observable bulletins: IBulletinData[] = [];

  @computed
  public get bulletinCount(): number {
    return this.bulletins.length;
  }

  @action
  public addBulletins(bulletinsToAdd: IBulletinData[]): void {
    this.bulletins = bulletinsToAdd;
  }

  @action
  public addBulletin(newBulletin: IBulletinData): void {
    this.bulletins.push(newBulletin);
  }

  @action
  public removeBulletin(bulletinId: string): void {
    this.bulletins = this.bulletins.filter(b => {
      return b.id !== bulletinId;
    });
  }

  @action
  public updateBulletin(bulletinId: string, patchData: IBulletinData): void {
    this.bulletins = this.bulletins.filter(b => {
      return b.id !== bulletinId;
    });

    this.bulletins.push(patchData);
  }

  @action
  public rollback(bulletins: IBulletinData[]): void {
    this.bulletins = bulletins;
  }
}

const bulletinStore = new BulletinStore();

export default bulletinStore;
