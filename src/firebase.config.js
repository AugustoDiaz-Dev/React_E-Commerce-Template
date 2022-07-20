import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyC3UlLAdfpmhBJTtPMnOn5bMtykEZlvcdU",
    authDomain: "fastfoodapp-97371.firebaseapp.com",
    databaseURL: "https://fastfoodapp-97371-default-rtdb.firebaseio.com",
    projectId: "fastfoodapp-97371",
    storageBucket: "fastfoodapp-97371.appspot.com",
    messagingSenderId: "927300945749",
    appId: "1:927300945749:web:f564aa80472cdc777111dc"
}

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };