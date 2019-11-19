import LocalData from "../../../Services/LocalData"
import React, {useState, useEffect} from "react"
import BulletinItem from "../BulletinItem/BulletinItem"
import IBulletinListState from "./IBulletinListState"
import ApiService from "../../../Services/ApiService/ApiService"
import IBulletinListProps from "./IBulletinListProps"

const BulletinList: React.FC<IBulletinListProps> = (props) => {
    const bulletinStore = props.bulletinStore;
    const [listState, setListState] = useState<IBulletinListState>({
        error: null,
        isLoaded: false,
    });

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {
        try {
            await ApiService.getBulletins();
            setListState({
                isLoaded: true,
                error: null
            })
        } catch(err) {
            setListState({
                isLoaded: false,
                error: err
            })
        }
    }

    const removeBulletin = (bulletinId: string): void => {
        ApiService.removeBulletin(bulletinId);
    }

    const handleUpVote = (bulletinId: string): void => {
        const previousBulletins = bulletinStore.bulletins;
        setListState({
            error: null,
            isLoaded: true
        })

        const patchBody = bulletinStore.bulletins.find(x => x.id === bulletinId)!;
        patchBody.votes += 1;

        try {
            ApiService.patchVotes(bulletinId, patchBody!);
        } catch(err) {
            ApiService.rollbackBulletins(previousBulletins);
            setListState({
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
                {bulletinStore.bulletins.sort((itemOne, itemTwo) => itemTwo.votes - itemOne.votes).map((item) => {
                  return <BulletinItem
                      key={"bulletin-" + item.id}
                      description={item.description}
                      id={item.id}
                      title={item.title}
                      votes={item.votes}
                      upvote={handleUpVote}
                      remove={removeBulletin}
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