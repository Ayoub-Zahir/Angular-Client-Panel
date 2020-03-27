import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SettingService } from 'src/app/services/setting.service';
import { ClientService } from 'src/app/services/client.service';

import { Client } from 'src/app/models/client';
import { Setting } from 'src/app/models/Setting';

import Swal from 'sweetalert2';

@Component({
    selector: 'app-edit-client',
    templateUrl: './edit-client.component.html',
    styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
    currentClient: Client;
    loading: boolean = false;
    idClient: string;
    setting: Setting;

    constructor(
        private activeRoute: ActivatedRoute,
        private clientService: ClientService,
        private settingService: SettingService,
        private router: Router
    ) { }

    ngOnInit() {

        // Getting the client
        this.idClient = this.activeRoute.snapshot.paramMap.get('id');
        this.clientService.getClient(this.idClient).subscribe(data => {
            if (data) {
                this.currentClient = data;
            } else
                console.error('Something went wrong!!');
        });

        // Getting the settings
        this.settingService.getSettings()
            .subscribe(data => this.setting = data[0], err => console.error(err));
    }

    onSubmit(form) {
        if (form.valid) {
            // Start loading ...
            this.loading = true;

            setTimeout(()=>{
                // Add id to new value
                form.value.id = this.idClient;

                // Update client to firebase database
                this.clientService.updateClient(form.value);
            
                // After 2s stop loading
                this.loading = false;

                // Redirect
                this.router.navigate([`/client/${this.idClient}`]);

                // Alert success updating client              
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'The client has been successfully updated',
                    showConfirmButton: false,
                    timer: 2000,
                });
    
                // Reset the form
                form.reset();
            },2000);
          
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
