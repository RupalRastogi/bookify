// using context API to provide firebase instance to the app

import {createContext, useContext, useState, useEffect, use} from "react";
import { initializeApp } from "firebase/app";
import { getAuth, 
    createUserWithEmailAndPassword ,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged
} from "firebase/auth";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    getDoc,
    doc, 
    query, 
    where } from "firebase/firestore";

// create Context
const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyCTofH89pwWmnGSBtZc0RCawGoErpasRcg",
  authDomain: "bookify-6a9b6.firebaseapp.com",
  projectId: "bookify-6a9b6",
  storageBucket: "bookify-6a9b6.firebasestorage.app",
  messagingSenderId: "700682239121",
  appId: "1:700682239121:web:3b065a69d1372bab3d1330",
  measurementId: "G-4HH2R6HF19"
};

// create Hook
export const useFirebase = () => useContext(FirebaseContext);

// firebase app instance -> connects the app to firebase account
const firebaseapp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseapp);
const googleProvider = new GoogleAuthProvider();
const firebaseDB = getFirestore(firebaseapp);

// create Provider
export const FirebaseProvider = (props) =>{
   
    const [user,setUser] = useState(null);

    // track user state
    useEffect(() =>{
        onAuthStateChanged(firebaseAuth, (currentUser) =>{
            console.log("user", currentUser);
            if(currentUser){
                setUser(currentUser);
            }else{
                setUser(null);
            }
        });
    },[])

   const signUserWithEmailAndPassword = (email,password) =>{
    return createUserWithEmailAndPassword(firebaseAuth,email,password);
   }

   const signinUserWithEmailAndPassword = (email,password) =>{
    return signInWithEmailAndPassword(firebaseAuth,email,password);
   }

   const signInWithGoogle = () =>{
    return signInWithPopup(firebaseAuth,googleProvider);
   }

   const isLoggedIn = user? true : false;

   console.log("user", user);

   const handleCreateNewListing = async(name,isbnNumber,price) =>{
    // logic to create a new listing in firestore
    return await addDoc(collection(firebaseDB,"books"),{
        name,
        isbnNumber,
        price,
        userId: user.uid,
        userEmail: user.email
        });
   }

   const listAllBooks = async() =>{
        return getDocs(collection(firebaseDB,"books"));
   }

   
   const getBookById = async(bookId) =>{
    const docRef = doc(firebaseDB, "books", bookId);
    const result = await getDoc(docRef);
    return result;
   }
   
   const placeOrder = async(bookId, quantity) =>{
    // logic to place order
     const collectionRef = collection(firebaseDB,"books", bookId, "orders");
     const result = await addDoc(collectionRef,{
        userId: user.uid,
        userEmail: user.email,  
        quantity: Number(quantity)
         
    });

    return result;
   }

   const fetchMyBooks = async() =>{
    // logic to fetch my orders

    const collectionRef = collection(firebaseDB,"books");
    const q = query(collectionRef, where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    console.log("orders", querySnapshot);
    return querySnapshot;
  
   }

   const getOrders = async(bookId) =>{
    const collectionRef = collection(firebaseDB,"books", bookId, "orders");
    const result = await getDocs(collectionRef);
    return result;
   }

    return (
        <FirebaseContext.Provider value = 
        {{signUserWithEmailAndPassword, 
        signinUserWithEmailAndPassword,
        signInWithGoogle,
        isLoggedIn,
        handleCreateNewListing,
        listAllBooks,
        getBookById,
        placeOrder,
        currentUser: user,
        fetchMyBooks,
        getOrders

        }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}