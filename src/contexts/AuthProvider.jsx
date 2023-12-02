import React, { createContext, useEffect, useState } from 'react'
import app from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    //if you log "user" in the Navbar component you'll get the data in the useState
    // const [user, setUser] = useState("kenny"); 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Create an account
    // From "https://firebase.google.com/docs/auth/web/password-auth"
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
        // .then((userCredential) => {
        //   // Signed up 
        //   const user = userCredential.user;
        //   // ...
        // })
        // .catch((error) => {
        //   const errorCode = error.code;
        //   const errorMessage = error.message;
        //   // ..
        // });
    }

    // Sign up with gmail
    // From "https://firebase.google.com/docs/auth/web/google-signin"
    const signUpWithGmail = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
        // .then((result) => {
        //     // This gives you a Google Access Token. You can use it to access the Google API.
        //     const credential = GoogleAuthProvider.credentialFromResult(result);
        //     const token = credential.accessToken;
        //     // The signed-in user info.
        //     const user = result.user;
        //     // IdP data available using getAdditionalUserInfo(result)
        //     // ...
        //   }).catch((error) => {
        //     // Handle Errors here.
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     // The email of the user's account used.
        //     const email = error.customData.email;
        //     // The AuthCredential type that was used.
        //     const credential = GoogleAuthProvider.credentialFromError(error);
        //     // ...
        //   });
    }

    // Log in with email and password
    // From "https://firebase.google.com/docs/auth/web/password-auth"
    const login = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
        // .then((userCredential) => {
        // // Signed in 
        // const user = userCredential.user;
        // // ...
        // })
        // .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // });
    }

    // Log out
    // From "https://firebase.google.com/docs/auth/web/password-auth"
    const logOut = () =>{
        // localStorage.removeItem('genius-token');
        return signOut(auth);
    }

    // update your profile
    // From "https://firebase.google.com/docs/auth/web/manage-users"
    const updateUserProfile = (name, photoURL) => {
      return  updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
        })
        // .then(() => {
        //     // Profile updated!
        //     // ...
        // }).catch((error) => {
        //     // An error occurred
        //     // ...
        // });
    }

    // check signed-in user
    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            // console.log(currentUser);
            setUser(currentUser);
            setLoading(false);
        });

        return () =>{
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user, 
        loading,
        createUser, 
        signUpWithGmail,
        updateUserProfile,
        login, 
        logOut,
    }

  return (
    // <div>AuthProvider</div>
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider