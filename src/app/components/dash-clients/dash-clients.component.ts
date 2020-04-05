import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';

import { Client } from 'src/app/models/Client';
import { Permissions } from 'src/app/models/Permissions';

import Swal from 'sweetalert2';

@Component({
    selector: 'app-dash-clients',
    templateUrl: './dash-clients.component.html',
    styleUrls: ['./dash-clients.component.css']
})
export class DashClientsComponent implements OnInit {
    @Input() clientsObs: Observable<Client[]>;
    clients: Client[];
    permissions: Permissions;

    constructor(
        private clientService: ClientService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.clientsObs.subscribe(data => this.clients = data);

        // Getting auth permissions
        this.authService.getAuthClaims().subscribe(claims => this.permissions = claims.permissions);
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
