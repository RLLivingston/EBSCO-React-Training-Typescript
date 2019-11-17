import React, { useState, useEffect } from "react";
import LocalData from "../../../Services/LocalData";
import BulletinItem from "../BulletinItem/BulletinItem";
import IBulletinListState from "./IBulletinListState";

const BulletinList: React.FC = () => {
  const [listState, setListState] = useState<IBulletinListState>({
    error: null,
    isLoaded: false,
    items: []
  });

  useEffect(() => {
    setListState({
      items: LocalData,
      error: null,
      isLoaded: true
    });
  }, []);

  const handleUpVote = (bulletinId: string) => {
    const updatedBulletins = listState.items.map(item => {
      if (item.id === bulletinId) {
        return Object.assign(
          {},
          {
            title: item.title,
            description: item.description,
            id: item.id,
            votes: item.votes + 1
          }
        );
      } else {
        return item;
      }
    });

    setListState({
      items: updatedBulletins,
      error: null,
      isLoaded: true
    });
  };

  return (
    <div className="main ui text container">
      <div id="content">
        <div className="ui unstackable items">
          {listState.items.map(item => {
            return (
              <BulletinItem
                key={"product-" + item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                votes={item.votes}
                upvote={handleUpVote}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BulletinList;
