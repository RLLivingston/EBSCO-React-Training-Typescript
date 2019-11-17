import IBulletinData from "../ILocalData";

class ApiService {
  async getBulletins() {
    const bulletins = await fetch(
      "https://react-app-bulletins1.azurewebsites.net/api/bulletins"
    );
    const toJson = bulletins.json();

    return toJson;
  }

  async patchUpvotes(bulletinId: string, patchBody: IBulletinData) {
    fetch(
      "https://react-app-bulletins1.azurewebsites.net/api/bulletins/" +
        bulletinId,
      {
        method: "PATCH",
        body: JSON.stringify(patchBody),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}

export default new ApiService();
