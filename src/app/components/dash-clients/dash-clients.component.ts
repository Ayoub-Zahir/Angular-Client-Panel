import { Component, OnInit, Input } from '@angular/core';
import { Client } from 'src/app/models/client';
import { Observable } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-dash-clients',
    templateUrl: './dash-clients.component.html',
    styleUrls: ['./dash-clients.component.css']
})
export class DashClientsComponent implements OnInit {
    @Input() clientsObs: Observable<Client[]>;
    clients: Client[];

    constructor(private clientService: ClientService) { }

    ngOnInit() {
        this.clientsObs.subscribe(data => this.clients = data);
    }

    onDelete(id: string) {
        // Confirm dialog
        Swal.fire({
            title: 'Are you sure you want to detete this client?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3C91E6',
            cancelButtonColor: '#F25F5C',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                // Delete client from firebase
                this.clientService.deleteClient(id);

                // Success alert after deleting the client
                Swal.fire({
                    title: 'Deleted!',
                    text: 'The client has been deleted.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        })
    }

}
