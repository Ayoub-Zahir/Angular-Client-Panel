import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Setting } from 'src/app/models/Setting';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SettingService {
    idSetting: string = '8PIG1s4WuMKlUGRE0cQM';
    settingsCollection: AngularFirestoreCollection<Setting>;

    constructor(private angularFirestore: AngularFirestore) {
        this.settingsCollection = this.angularFirestore.collection('settings');
    }

    getSettings(): Observable<Setting[]> {
        return this.settingsCollection.valueChanges();
    }

    updateSettings(settings: Setting) {
        return this.settingsCollection.doc(this.idSetting).update(settings);
    }
}
