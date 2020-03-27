import { Component, OnInit } from "@angular/core";
import { Setting } from 'src/app/models/Setting';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
    setting: Setting;
    loading: boolean = false;

    constructor(private settingService: SettingService) { }

    ngOnInit() {
        this.settingService.getSettings()
            .subscribe(data => this.setting = data[0], err => console.error(err));
    }

    onSubmit(form: { valid: boolean, value: Setting }) {
        if (form.valid) {

            this.loading = true;

            this.settingService.updateSettings(form.value).then(() => {

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

            }).catch(err => console.error(err));
        }
    }
}
