import React, {Component} from 'react';
import '../../styles/Friends.css';
import ViewFriends from '../view/ViewFriends';
import ViewSearching from '../view/ViewSearching';
import IconMenu from '../view/IconMenu';
import backIcon from '../../images/icons/back.svg';
import { LogContext } from '../../contexts/LogContext';

class Friends extends Component {
    state = {
        width: window.innerWidth,
        /*friends: [
            {name: "Ziad Hisham Ali", status: "online", image: "../../images/DSC_0287.jpg"},
            {name: "Youssef Ahmed", status: "offline", image: "../../images/DSC_0287.jpg"},
            {name: "Tarek Maher", status: "online", image: "../../images/DSC_0287.jpg"},
            {name: "Omar Shaker", status: "online", image: "../../images/DSC_0287.jpg"},
            {name: "Khalid Ramadan", status: "offline", image: "../../images/DSC_0287.jpg"},
            {name: "Mostafa Lasheen", status: "offline", image: "../../images/DSC_0287.jpg"},
            {name: "Mostafa Farrag", status: "online", image: "../../images/DSC_0287.jpg"}
        ],*/
        current: 0,
        searchList: [],
        searching: false,
    }

    static contextType = LogContext;

    componentDidMount() {
        window.addEventListener("resize", () => this.setState({width: window.innerWidth}));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", () => this.setState({width: window.innerWidth}));
    }

    getIcon = (iconName, changeVisibilityFunc, direction) => {
        if (this.state.width <= 1000) {
            return (
                <div className="flex-row align">
                    <h1 className="small-text white-text berlin-font light-weight margin-top margin-bottom-2 friend-header">Friends</h1>
                    <IconMenu icon={iconName} changeVisibility={changeVisibilityFunc} direction={direction}/>
                </div>
            )
        }
        return (
            <div>
                <h1 className="small-text white-text berlin-font light-weight margin-top margin-bottom-2">Friends</h1>
            </div>
        )
    }

    changeSearchingFalse = () => {
        setTimeout(() => {this.setState({searching: false})}, 1000);
    }

    search = (e) => {
        const { usersRef } = this.context;
        if (this.state.searching === false) {
            this.setState({searching: true});
        }
        let name = e.target.value;
        console.log("searching for: ", name);
        let firstName = name.split(/\s+/)[0];
        //let lastName = name.split(/\s+/)[1];
        usersRef.where("firstName", "==", firstName).get().then(querySnapshot => {
            console.log(querySnapshot);
            let searchList = [];
            querySnapshot.forEach(doc => {
                let sitem = {};
                sitem.id = doc.id;
                sitem.name = doc.data().firstName + " " + doc.data().lastName;
                sitem.status = "online";
                sitem.image = "../../images/DSC_0287.jpg";
                searchList.push(sitem);
            });
            this.setState({searchList});
        })
    }

    addFriend = (idx) => {
        console.log("searching list: ", this.state.searchList);
        console.log("added index: ", idx);
        let addedFriend = [...this.state.searchList][idx];
        console.log("added friend: ", addedFriend);
        this.props.friends.forEach(friend => {
            if (friend.id === addedFriend.id) {
                return;
            }
        });
        this.props.updateFriends(addedFriend);
    }

    render() {
        if (!this.state.searching) {
            return (
                <div className="friends grid-item">
                    {this.getIcon(backIcon, this.props.changeVisibilityFriends, "right")}
                    <input className="search-box small-text white-text berlin-font margin-bottom trans-background" onChange={e => this.search(e)} placeholder="search"/>
                    <ViewFriends friends={this.props.friends} current={this.state.current}/>
                </div>
            )
        } else {
            return (
                <div className="friends grid-item">
                    {this.getIcon(backIcon, this.props.changeVisibilityFriends, "right")}
                    <input className="search-box small-text white-text berlin-font margin-bottom trans-background" onBlur={() => this.changeSearchingFalse()} onChange={e => this.search(e)} placeholder="search"/>
                    <ViewSearching addFriend={this.addFriend} searchList={this.state.searchList} current={this.state.current}/>
                </div>
            )
        }
    }
}

export default Friends