import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./firebase";

interface AuthState {
    user: User | null
    isInitialized: boolean
}

export const authState: AuthState = $state({
    user: null,
    isInitialized: false
})

onAuthStateChanged(auth, (user)=>{
    authState.user = user;
    authState.isInitialized = true;
});
 