import { Injectable } from '@angular/core';
import { Client } from '../models/client';

// Firestore
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

// Rxjs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    clients: Client[] = [];
    clientsCollection: AngularFirestoreCollection<Client>;
    clientDocument: AngularFirestoreDocument<Client>;

    constructor(private ngFireStore: AngularFirestore) {
        // Get the clients colletion
        this.clientsCollection =  this.ngFireStore.collection('clients', ref => ref.orderBy('joinAt', 'desc'));
    }

    getClients(): Observable<Client[]> {
        // valueChanges(): allow us to access data only return an observable
        // snapshotChanges(): allow us to access metadata, for example the document ID
        return this.clientsCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Client;
                // console.log(a.payload.doc.data().joinAt.seconds);
                data.joinAt = new Date(a.payload.doc.data().joinAt.seconds * 1000);
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }

    getClient(id: string): Observable<Client>{
        // Get the client document
        this.clientDocument = this.ngFireStore.collection('clients').doc(id);

        // Return document value
        return this.clientDocument.valueChanges();
    }

    addClient(client: Client){
        this.clientsCollection.add(client);
    }

    updateClient(client: Client){
        // Get the client document
        this.ngFireStore.collection('clients').doc(client.id).update(client);
    }

    deleteClient(id: string){
        this.ngFireStore.collection('clients').doc(id).delete();
    }
}
