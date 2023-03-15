import firebase from 'firebase/compat/app';
import { getStorage } from "firebase/storage";
import 'firebase/compat/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
	apiKey: "AIzaSyAfjgelagk3DJPEE90yKsQBdXxnntZUHSk",
	authDomain: "moment-learning.firebaseapp.com",
	projectId: "moment-learning",
	storageBucket: "moment-learning.appspot.com",
	messagingSenderId: "898908785235",
	appId: "1:898908785235:web:88c0c393f35fd5107314a6"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();
const getStorageClient = getStorage();
export { db, getStorageClient };
export default firebase;