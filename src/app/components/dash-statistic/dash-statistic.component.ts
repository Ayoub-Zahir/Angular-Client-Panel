import { Component, OnInit, Input } from '@angular/core';
import { Client } from 'src/app/models/client';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-dash-statistic',
    templateUrl: './dash-statistic.component.html',
    styleUrls: ['./dash-statistic.component.css']
})
export class DashStatisticComponent implements OnInit {
    @Input() clientsObs: Observable<Client[]>;
    totalOwn: number = 0;
    highestBalance: number = 0;
    lowestBalance: number;

    constructor() { }

    ngOnInit() {
        this.clientsObs.subscribe(clients => {
            this.lowestBalance = clients[0].balance;
            
            clients.forEach(client => {
                // Calulat total
                this.totalOwn += client.balance;

                // Calulat highest balance
                if(this.highestBalance < client.balance)
                    this.highestBalance = client.balance;
                
                // Calulat lowest balance
                if(this.lowestBalance > client.balance)
                    this.lowestBalance = client.balance;    
            });
        });
    }
}
