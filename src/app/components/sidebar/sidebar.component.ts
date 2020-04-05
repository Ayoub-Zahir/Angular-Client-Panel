import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    isAdmin: boolean;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.authService.getAuthClaims()
            .subscribe(claims => {
                if (claims)
                    this.isAdmin = claims.admin;
            });
    }

    logout() {
        this.authService.logout()
            .then(() => {
                this.router.navigate(['/login']);
            });
    }
}
