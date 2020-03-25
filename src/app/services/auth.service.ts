import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private angularFireAuth: AngularFireAuth) { }

    login(email: string, password: string): Promise<firebase.auth.UserCredential>{
        return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
    }

    logout(): Promise<void>{
        return this.angularFireAuth.auth.signOut();
    }

    getAuth(): Observable<firebase.User>{
        return this.angularFireAuth.authState;
    }
}
