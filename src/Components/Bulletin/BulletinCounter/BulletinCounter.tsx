import React from "react";
import IBulletinCounter from "./IBulletinCounterProps";

const BulletinCounter: React.FC<IBulletinCounter> = (props) => {
    const bulletinCount = props.bulletinStore.bulletinCount;
    return(
    <div>Bulletin Count - {bulletinCount}</div>
    )
}

export default BulletinCounter;