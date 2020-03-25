import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-client',
    templateUrl: './add-client.component.html',
    styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
    currentClient: Client = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: 'America',
        balance: null
    }

    loading: boolean = false;
    disableBalanceOnAdd: boolean = false;

    constructor(private clientService: ClientService) { }

    ngOnInit() { }

    onSubmit(form) {
        if (form.valid) {
            // Start loading ...
            this.loading = true;

            // Generate random String for fake avatar
            const randomString = Math.random().toString(36).substring(5);

            // Add the external fields
            this.currentClient.img = `https://api.adorable.io/avatars/240/${randomString}.png`;
            this.currentClient.joinAt = new Date();

            setTimeout(()=>{
                // Add client to firebase database
                this.clientService.addClient(this.currentClient);
            
                // After 2s stop loading
                this.loading = false;

                // Alert success adding client
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                      confirmButton: 'uk-button uk-button-primary uk-border-pill uk-margin-right',
                      cancelButton: 'uk-button uk-button-default uk-border-pill'
                    },
                    buttonsStyling: false
                })                
                swalWithBootstrapButtons.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'The client has been successfully added',
                    showCancelButton: true,
                    confirmButtonText: '<a href="/dashboard" style="color: white;text-decoration: none;">go to dashboard <span uk-icon="forward"></span></a> ',
                    cancelButtonText: 'close <span uk-icon="close"></span>',
                    showCloseButton: true,
                })
    
                // Reset the form
                form.reset();

                // Reset the default location
                this.currentClient.location = 'America';

            }, 1500);
          
        } else
            // Error form invalid
            Swal.fire({
                icon: 'error',
                title: 'From invalid...',
                text: 'Please fill out the form correctly!',
                showCloseButton: true,
                confirmButtonText: 'Try Again',
                timer: 2500,
                focusConfirm: false,
            });    
    }

}
