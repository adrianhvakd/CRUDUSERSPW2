import { inject, Injectable } from "@angular/core";
import { Auth, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "@angular/fire/auth";
import { from, Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService{
    currentUser:User | null = null;
    auth = inject(Auth);
    get user(){
        return this.auth.currentUser;
    }
    constructor(){
        //recuperar usuario logeado
        onAuthStateChanged(this.auth,(use)=>{
            this.currentUser = use;
        })
    }
    login(email:string, password: string): Observable<User>{
        return from(signInWithEmailAndPassword(this.auth,email,password).then(res => res.user));
    }
    logout():Observable<void>{
        return from(signOut(this.auth));
    }

    isLoggedIn(){
        console.log(this.currentUser);
        return this.currentUser? true: false;
    }

}