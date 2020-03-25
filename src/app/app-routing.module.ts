import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

// Components
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { SettingComponent } from './components/setting/setting.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { LoginComponent } from './components/login/login.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { SignupComponent } from './components/signup/signup.component';

// Service
import { AuthGardService } from 'src/app/gards/auth-gard.service';

const routes: Routes = [
    { path: "login", component: LoginComponent},
    { path: "signup", component: SignupComponent},
    { path: "", redirectTo:'/dashboard', pathMatch:'full'},
    { path: "dashboard", component: DashboardComponent, canActivate: [AuthGardService]},
    { path: "setting", component: SettingComponent, canActivate: [AuthGardService]},
    { path: "add-client", component: AddClientComponent, canActivate: [AuthGardService]},
    { path: "edit-client/:id", component: EditClientComponent, canActivate: [AuthGardService]},
    { path: "client/:id", component: ClientDetailsComponent, canActivate: [AuthGardService]},
    { path: "**", component: PageNotFoundComponent, canActivate: [AuthGardService]}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
    providers: [AuthGardService]
})
export class AppRoutingModule { }

export const routingComponents = [DashboardComponent, SettingComponent, PageNotFoundComponent, AddClientComponent, ClientDetailsComponent, EditClientComponent, LoginComponent, SignupComponent];