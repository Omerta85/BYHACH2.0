import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from "./redux";
import { Provider } from 'react-redux'
import { createContext } from "react";
import firebase from "firebase/compat/app"
import 'firebase/compat/firestore'
import 'firebase/compat/auth'


firebase.initializeApp({
    apiKey: "AIzaSyB4v6ZYAjZJQ2jyt-EA-9MGWNBn0jIjUwE",
    authDomain: "project-byhach.firebaseapp.com",
    projectId: "project-byhach",
    storageBucket: "project-byhach.appspot.com",
    messagingSenderId: "322080932230",
    appId: "1:322080932230:web:4d5b683d8fff660250ec07",
    measurementId: "G-33W5XCSMGT"
});


export const Context = createContext(null)
const auth = firebase.auth()
// const firestore = firebase.firestore()

createRoot(document.getElementById('root')).render(
    <Context.Provider value={{ firebase, auth }}>
        <Provider store={store}>
            <App />
        </Provider>
    </Context.Provider>
);

reportWebVitals();

