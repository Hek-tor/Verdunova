import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

let authInstance = null;
let isAuthenticating = false;

export class Service {
    constructor(controller) {
        this.controller = controller;
        this._getAuthInstance();
    }

    async _getAuthInstance() {
        if (!authInstance && !isAuthenticating) {
            isAuthenticating = true;
            const firebaseConfig = {
                apiKey: "AIzaSyCjmbPdVY2ES4UnM-85K8hHJbbpnGe4TCY",
                authDomain: "verdunova-d5654.firebaseapp.com",
                databaseURL: "https://verdunova-d5654-default-rtdb.firebaseio.com",
                projectId: "verdunova-d5654",
                storageBucket: "verdunova-d5654.appspot.com",
                messagingSenderId: "706134226770",
                appId: "1:706134226770:web:4342285be02d7e9a72ac8b",
                measurementId: "G-7L91QM6X55"
            };
            const firebaseApp = initializeApp(firebaseConfig);
            authInstance = getAuth(firebaseApp);
            try {
                await signInAnonymously(authInstance);
            } catch (error) {
                console.error("Error de autenticación anonima:", error);
                throw error;
            }
        }
    }

    getURL() {
        // const development = 'http://localhost:3000';
        const production = 'https://verdunova-api.vercel.app';
        return production;
    }
    
    getAuthInstance() {
        return authInstance;
    }
}