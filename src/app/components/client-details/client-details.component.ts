import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ClientService } from 'src/app/services/client.service';
import { AuthService } from 'src/app/services/auth.service';

import { Client } from 'src/app/models/client';
import { Permissions } from 'src/app/models/Permissions';

import Swal from 'sweetalert2';

@Component({
    selector: 'app-client-details',
    templateUrl: './client-details.component.html',
    styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
    client: Client;
    hasBalance: boolean = false;
    permissions: Permissions;

    constructor(
        private activeRoute: ActivatedRoute,
        private clientService: ClientService,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        // Getting the client
        const idClient = this.activeRoute.snapshot.paramMap.get('id');
        this.clientService.getClient(idClient).subscribe(data => {
            if (data) {
                if (data.balance > 0)
                    this.hasBalance = true;

                data.id = idClient;
                data.joinAt = new Date(data.joinAt.seconds * 1000);

                this.client = data;
            } else
                console.error('Something went wrong!!');

        });

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

                // Redirect 
                this.router.navigate(['/dashboard']);

                // Success alert after deleting the client
                Swal.fire({
                    title: 'Deleted!',
                    text: 'The client has been successfully deleted.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        })
    }

    // Update balance
    onSubmit() {
        this.clientService.updateClient(this.client);

        if (this.client.balance > 0)
            this.hasBalance = true;
        else
            this.hasBalance = false;

        // Alert success updating client              
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'The client balance has been updated',
            showConfirmButton: false,
            timer: 1500,
        });
    }
}
