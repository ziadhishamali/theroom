import React, { createContext, Component } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from '../components/auth/firebase';

export const LogContext = createContext();

class LogContextProvider extends Component {
    state = { 
        signedin: false,
        usersRef: null,
        firebaseUser: null,
        friends: [],
        firstName: "",
        lastName: "",
        image: "",
        gender: "",
        listeners: [],
    }

    setFirstName = (firstName) => {
        this.setState({firstName});
    }

    setLastName = (lastName) => {
        this.setState({lastName});
    }

    setImage = (image) => {
        this.setState({image});
    }

    setGender = (gender) => {
        this.setState({gender});
    }

    setUsersRef = (usersRef) => {
        this.setState({usersRef});
    }

    setFriends = (friends) => {
        this.setState({friends});
        this.state.usersRef.doc(this.state.firebaseUser.uid).update({friends: friends});
    }

    addListener = (listener) => {
        let listeners = [...this.state.listeners, listener];
        this.setState({listeners});
    }

    triggerLogout = () => {
        for (let listener in this.state.listeners) {
            this.state.listeners[listener]();
        }
    }

    componentDidMount() {
        // run authentication state listener
        auth.onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                this.setState({firebaseUser, signedin: true});
                this.props.history.push('./');
            } else {
                this.setState({firebaseUser, signedin: false});
                console.log("not logged in");
            }
        })
    }

    render() { 
        return ( 
            <LogContext.Provider value={{
                ...this.state,
                changeSignedIn: this.changeSignedIn,
                signInVerify: this.signInVerify,
                setFirstName: this.setFirstName,
                setLastName: this.setLastName,
                setUsersRef: this.setUsersRef,
                setFriends: this.setFriends,
                setImage: this.setImage,
                setGender: this.setGender,
                addListener: this.addListener,
                triggerLogout: this.triggerLogout,
            }}>
                {this.props.children}
            </LogContext.Provider>
        );
    }
}
 
export default withRouter(LogContextProvider);