import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SettingService } from '../services/setting.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SignupGuard implements CanActivate {
    constructor(
        private settingService: SettingService,
        private router: Router
    ) { }
    
    canActivate(): Observable<boolean>{
        return this.settingService.getSettings().pipe(
            map(settings => {
                if(settings[0].disableSignup){
                    this.router.navigate(['/login']);
                    return false;
                } else
                    return true;
            })
        ); 
    }

}
