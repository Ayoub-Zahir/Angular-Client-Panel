// Angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Firebase modules
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Environment
import { environment } from 'src/environments/environment';

// Components
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashStatisticComponent } from './components/dash-statistic/dash-statistic.component';
import { DashClientsComponent } from './components/dash-clients/dash-clients.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginNavbarComponent } from './components/login-navbar/login-navbar.component';

// Routing module && components
import { AppRoutingModule, routingComponents } from 'src/app/app-routing.module';

// Services
import { ClientService } from 'src/app/services/client.service';
import { AuthService } from 'src/app/services/auth.service';
import { SettingService } from 'src/app/services/setting.service';

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        DashStatisticComponent,
        DashClientsComponent,
        routingComponents,
        NavbarComponent,
        LoginNavbarComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule
    ],
    providers: [ClientService, AuthService, SettingService],
    bootstrap: [AppComponent]
})
export class AppModule { }
