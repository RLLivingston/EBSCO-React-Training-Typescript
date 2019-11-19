import { observable, computed, action, configure } from "mobx";
import IBulletinData from "../../Services/IBulletinData";
import IBulletinStore from "./IBulletinStore";

export class BulletinStore implements IBulletinStore {
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
    public removeBulletin(bulletinId: string): void {
        this.bulletins = this.bulletins.filter((b) => {
            return b.id !== bulletinId;
        });
    }

    @action
    public updateBulletin(bulletinId: string, patchBody: IBulletinData): void {
        this.bulletins = this.bulletins.filter((b) => {
            return b.id !== bulletinId;
        });

        this.bulletins.push(patchBody);
    }

    @action
    public rollback(bulletins: IBulletinData[]): void {
        this.bulletins = bulletins;
    }
}

export const bulletinStore = new BulletinStore();