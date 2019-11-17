import React, { useState, useEffect } from "react";
import LocalData from "../../../Services/LocalData";
import BulletinItem from "../BulletinItem/BulletinItem";

const BulletinList: React.FC = () => {
  const [listState, setListState] = useState({
    error: null,
    isLoaded: false,
    items: []
  });

  return (
    <div className="main ui text container">
      <div id="content">
        <div className="ui unstackable items">
          {LocalData.map(item => {
            return (
              <BulletinItem
                key={"product-" + item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                url={item.url}
                votes={item.votes}
                upvote={() => {}}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BulletinList;
