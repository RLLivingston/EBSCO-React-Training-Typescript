import React from "react";
import "./App.css";
import BulletinList from "./Components/Bulletin/BulletinList/BulletinList";
import Header from "./Components/Header/Header";
import bulletinStore from "./Stores/Bulletin/BulletinStore";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <BulletinList bulletinStore={bulletinStore} />
    </div>
  );
};

export default App;
