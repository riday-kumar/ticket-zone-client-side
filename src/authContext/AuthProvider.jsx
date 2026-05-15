import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const signUpWithEmail = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  const emailVerify = () => {
    sendEmailVerification(auth.currentUser);
  };

  const logOut = () => {
    signOut(auth);
  };

  const googleLogin = () => {
    signInWithPopup(auth, googleProvider);
  };

  const value = {
    signUpWithEmail,
    signInWithEmail,
    emailVerify,
    logOut,
    googleLogin,
  };
  return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthProvider;
