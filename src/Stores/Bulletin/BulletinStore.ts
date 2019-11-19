import IBulletinData from "../../Services/IBulletinData";
import { observable, action, computed } from "mobx";

class BulletinStore {
  @observable bulletins: IBulletinData[] = [];

  @computed
  public get bulletinCount() {
    return this.bulletins.length;
  }

  @action
  public addBulletins(bulletinsToAdd: IBulletinData[]) {
    this.bulletins = bulletinsToAdd;
  }

  @action
  public addBulletin(newBulletin: IBulletinData) {
    this.bulletins.push(newBulletin);
  }

  @action
  public removeBulletin(bulletinId: string) {
    this.bulletins = this.bulletins.filter(b => {
      return b.id !== bulletinId;
    });
  }

  @action
  public updateBulletin(bulletinId: string, patchData: IBulletinData) {
    this.bulletins = this.bulletins.filter(b => {
      return b.id !== bulletinId;
    });

    this.bulletins.push(patchData);
  }

  @action
  public rollback(bulletins: IBulletinData[]) {
    this.bulletins = bulletins;
  }
}

const bulletinStore = new BulletinStore();

export default bulletinStore;
