import React from 'react';
import image from '../../images/DSC_0287.jpg';

const ViewFriends = ({friends, current}) => {

    const status = (friend) => {
        if (friend.status === "online") {
            return (
                <span className="small-text green-text arial-font light-weight margin-bottom--- margin-top-10">{friend.status}</span>
            )
        } else {
            return (
                <span className="small-text red-text arial-font light-weight margin-bottom--- margin-top-10">{friend.status}</span>
            )
        }
    }

    const background = (idx) => {
        if (idx === current) {
            return "friend-item align black-background-trans";
        } else {
            return "friend-item align";
        }
    }

    const view = friends.length ? (
        friends.map((friend, idx) => {
            return (
                <div key={idx} className={background(idx)}>
                    <img src={image} alt="img" className="friend-image margin-left"/>
                    <div className="flex-column margin-left">
                        <span className="small-text white-text berlin-font light-weight margin-top---">{friend.name}</span><br/>
                        {status(friend)}
                    </div>
                </div>
            )
        })
    ) : (
        <div>
            <span className="medium-text berlin-font white-text">you don't have friends yet !!</span><br/>
            <button className="submit-button button-orange small-text berlin-font margin-top">Add Friends</button>
        </div>
    )

    return (
        <div className="friends-list">
            {view}
        </div>
    )
}

export default ViewFriends