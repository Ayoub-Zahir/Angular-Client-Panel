import { Component, OnInit } from '@angular/core';
import { Setting } from 'src/app/models/Setting';
import { SettingService } from 'src/app/services/setting.service';

@Component({
    selector: 'app-login-navbar',
    templateUrl: './login-navbar.component.html',
    styleUrls: ['./login-navbar.component.css']
})
export class LoginNavbarComponent implements OnInit {
    setting: Setting;

    constructor(private settingService: SettingService) { }

    ngOnInit() {
        this.settingService.getSettings()
            .subscribe(data => this.setting = data[0], err => console.error(err));
    }

}
