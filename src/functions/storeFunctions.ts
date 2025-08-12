import { toast } from "react-toastify";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


export const signUpWithEmail = async (email: string, password: string) => {
    
    const userLogin = await createUserWithEmailAndPassword(auth, email, password);
    //await sendEmailVerification(userLogin.user);
    return userLogin.user;
}


export const signInWithEmail = async (email: string, password: string) => {
    const userLogin = await signInWithEmailAndPassword(auth, email, password);
    return userLogin.user;
}



export const signOut = async () => {
    return auth.signOut();
}

