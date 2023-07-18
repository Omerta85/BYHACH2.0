import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {store} from "./redux";
import {Provider} from 'react-redux'
import {createContext} from "react";
import firebase from "firebase/compat/app"
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyB4v6ZYAjZJQ2jyt-EA-9MGWNBn0jIjUwE",
    authDomain: "project-byhach.firebaseapp.com",
    projectId: "project-byhach",
    storageBucket: "project-byhach.appspot.com",
    messagingSenderId: "322080932230",
    appId: "1:322080932230:web:4d5b683d8fff660250ec07",
    measurementId: "G-33W5XCSMGT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const fireBase = firebase.initializeApp(firebaseConfig);
export const Context = createContext(null)

const auth = firebase.auth()
// const firestore = firebase.firestore()

ReactDOM.render(

    <React.StrictMode>
        <Context.Provider value={{
            firebase,
            auth
        }}>
            <Provider store={store}>
                <App/>
            </Provider>
        </Context.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

