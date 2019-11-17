import React from "react";
import "./App.css";
import BulletinList from "./Components/Bulletin/BulletinList/BulletinList";
import Header from "./Components/Header/Header";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <BulletinList />
    </div>
  );
};

export default App;
