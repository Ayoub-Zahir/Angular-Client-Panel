import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    clientsObs: Observable<Client[]>;

    constructor(private clientService: ClientService) { }

    ngOnInit() {
        this.clientsObs = this.clientService.getClients();
    }

}
