import LocalData from "../../../Services/LocalData"
import React, {useState, useEffect} from "react"
import BulletinItem from "../BulletinItem/BulletinItem"
import IBulletinListState from "./IBulletinListState"
import ApiService from "../../../Services/ApiService/ApiService"

const BulletinList: React.FC = () => {
    const [listState, setListState] = useState<IBulletinListState>({
        items: [],
        error: null,
        isLoaded: false,
    });

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {
        try {
            const bulletins = await ApiService.getBulletins();
            setListState({
                items: bulletins,
                isLoaded: true,
                error: null
            })
        } catch(err) {
            setListState({
                items: [],
                isLoaded: false,
                error: err
            })
        }
    }

    const handleUpVote = (bulletinId: string) => {
        const previousBulletins = listState.items;
        const updatedBulletins = listState.items.map((item) => {
            if(item.id === bulletinId) {
                return Object.assign({},
                {
                    title: item.title,
                    description: item.description,
                    id: item.id,
                    votes: item.votes + 1
                })
            } else {
                return item;
            }
        })

        setListState({
            items: updatedBulletins,
            error: null,
            isLoaded: true
        })

        const patchBody = updatedBulletins.find(x => x.id === bulletinId);

        try {
            ApiService.patchVotes(bulletinId, patchBody!);
        } catch(err) {
            setListState({
                items: previousBulletins,
                error: err,
                isLoaded: true
            })
        }
    }

    const itemRender = () => {
       return(
        <div className="main ui text container">
            <div id="content">
            <div className="ui unstackable items">
                {listState.items.sort((itemOne, itemTwo) => itemTwo.votes - itemOne.votes).map((item) => {
                  return <BulletinItem
                      key={"bulletin-" + item.id}
                      description={item.description}
                      id={item.id}
                      title={item.title}
                      votes={item.votes}
                      upvote={handleUpVote}
                  />
                })}
            </div>
            </div>
        </div>
       )
    }

    if(listState.isLoaded) {
        return itemRender();
    } else if(listState.error) {
        return <div>ERRROR: {listState.error}</div>
    }

    return <div>Loading...</div>
}

export default BulletinList;