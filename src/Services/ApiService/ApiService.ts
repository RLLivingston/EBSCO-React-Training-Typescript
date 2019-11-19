import IBulletinData from "../IBulletinData";
import IBulletinStore from "../../Stores/Bulletin/IBulletinStore";
import { bulletinStore } from "../../Stores/Bulletin/BulletinStore";

class ApiService {
    constructor(private readonly bulletinStore: IBulletinStore) {}

    async getBulletins(): Promise<void> {
        const bulletins = await fetch("https://react-app-bulletins1.azurewebsites.net/api/bulletins");
        const formattedBulletins = await bulletins.json();
        this.bulletinStore.addBulletins(formattedBulletins);
    }

    async patchVotes(bulletinId: string, patchBody: IBulletinData): Promise<void> {
        fetch("https://react-app-bulletins1.azurewebsites.net/api/bulletins/" + bulletinId, {
            method: "PATCH",
            body: JSON.stringify(patchBody),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    removeBulletin(bulletinId: string) {
        this.bulletinStore.removeBulletin(bulletinId);
    }

    rollbackBulletins(previousBulletins: IBulletinData[]): void {
        this.bulletinStore.rollback(previousBulletins);
    }
}

export default new ApiService(bulletinStore);