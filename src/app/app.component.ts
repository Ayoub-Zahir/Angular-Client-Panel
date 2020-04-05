import { Component } from '@angular/core';
import { ClaimsService } from 'src/app/services/claims.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'client-panel';

    constructor(private claimsService: ClaimsService) {
        // this.claimsService.initAdminAccount().subscribe(res => console.log(res));
    }
}
