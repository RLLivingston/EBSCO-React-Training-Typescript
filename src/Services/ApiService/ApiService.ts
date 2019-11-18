import IBulletinData from "../IBulletinData";

class ApiService {
    async getBulletins(): Promise<IBulletinData[]> {
        const bulletins = await fetch("https://react-app-bulletins1.azurewebsites.net/api/bulletins");

        return bulletins.json();
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
}

export default new ApiService();