import { Component, OnInit } from "@angular/core";

import Swal from 'sweetalert2';

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
    loading: boolean = false;

    constructor() { }

    ngOnInit() {

    }

    onSubmit(form) {
        if (form.valid) {

            this.loading = true;

            setTimeout(() => {
                this.loading = false;

                // Alert success updating client              
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'The settings has been successfully updated',
                    showConfirmButton: false,
                    timer: 2000,
                });
            }, 1100);

        }
    }
}
