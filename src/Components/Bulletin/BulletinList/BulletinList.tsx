import React, { useState, useEffect } from "react";
import LocalData from "../../../Services/LocalData";
import BulletinItem from "../BulletinItem/BulletinItem";
import IBulletinListState from "./IBulletinListState";
import ApiService from "../../../Services/Api/ApiService";

const BulletinList: React.FC = () => {
  const [listState, setListState] = useState<IBulletinListState>({
    error: null,
    isLoaded: false,
    items: []
  });

  useEffect(() => {
    // setListState({
    //   items: LocalData,
    //   error: null,
    //   isLoaded: true
    // });

    loadData();
  }, []);

  const loadData = async () => {
    try {
      const bulletins = await ApiService.getBulletins();
      setListState({
        items: bulletins,
        error: null,
        isLoaded: true
      });
    } catch (err) {
      setListState({
        items: [],
        error: err,
        isLoaded: false
      });
    }
  };

  const handleUpVote = (bulletinId: string) => {
    const previousBulletins = listState.items;
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

    const patchBody = updatedBulletins.find(x => x.id === bulletinId);

    try {
      ApiService.patchUpvotes(bulletinId, patchBody!);
    } catch (err) {
      setListState({
        items: previousBulletins,
        error: err,
        isLoaded: true
      });
    }
  };

  const itemRender = () => {
    return (
      <div className="main ui text container">
        <div id="content">
          <div className="ui unstackable items">
            {listState.items
              .sort((a, b) => b.votes - a.votes)
              .map(item => {
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

  return <div>{listState.isLoaded ? itemRender() : <div>Loading...</div>}</div>;
};

export default BulletinList;
