import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    clientsObs: Observable<Client[]>;
    isAdmin: boolean;

    constructor(
        private clientService: ClientService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.clientsObs = this.clientService.getClients();
        this.authService.getAuthClaims().subscribe(claims => {
            this.isAdmin = claims.admin;
        });
    }

}
