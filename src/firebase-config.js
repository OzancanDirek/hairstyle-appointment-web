import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBAA4wG2LxEQjHfo8yFzbjm339J4rPsFvs",
    authDomain: "hairstylerappointment.firebaseapp.com",
    projectId: "hairstylerappointment",
    storageBucket: "hairstylerappointment.firebasestorage.app",
    messagingSenderId: "125156964443",
    appId: "1:125156964443:web:9d21960ff260057263277e",
    measurementId: "G-NPTQN9B32G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;