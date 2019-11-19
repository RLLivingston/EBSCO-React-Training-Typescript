import React from "react";
import IBulletinItemProps from "./IBulletinItemProps";
import avatarImage from "../../../images/avatars/daniel.jpg";
import productImage from "../../../images/products/image-aqua.png";

const BulletinItem: React.FC<IBulletinItemProps> = (props) => {
    const handleUpVote = () => {
        props.upvote(props.id);
    }

    const removeBulletin = () => {
        props.remove(props.id);
    }

    return(
        <div className="item">
            <div className="image">
                <img src={productImage} alt="User" />
            </div>
            <div className="middle aligned content">
                <div className="header">
                    <a onClick={handleUpVote}>
                        <i className="large caret up icon" />
                    </a>
                    {props.votes}
                </div>
                <div className="description">
                    <a href={"#"}>{props.title}</a>
                    <p>{props.description}</p>
                </div>
                <div className="extra">
                    <span>Submitted by:</span>
                    <img className="ui avatar image" src={avatarImage} alt="Avatar" />
                </div>
            </div>
            <button onClick={removeBulletin}>X</button>
        </div>
    )
}

export default BulletinItem;