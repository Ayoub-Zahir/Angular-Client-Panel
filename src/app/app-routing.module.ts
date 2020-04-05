import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { LoginComponent } from './components/login/login.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { SignupComponent } from './components/signup/signup.component';

// Service
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { AddClientGuard } from 'src/app/guards/add-client.guard';
import { EditClientGuard } from 'src/app/guards/edit-client.guard';

const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    { path: "", redirectTo: '/dashboard', pathMatch: 'full' },
    { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
    { path: "settings", component: SettingsComponent, canActivate: [AuthGuard, AdminGuard] },
    { path: "add-client", component: AddClientComponent, canActivate: [AuthGuard, AddClientGuard] },
    { path: "edit-client/:id", component: EditClientComponent, canActivate: [AuthGuard, EditClientGuard] },
    { path: "client/:id", component: ClientDetailsComponent, canActivate: [AuthGuard] },
    { path: "**", component: PageNotFoundComponent, canActivate: [AuthGuard] }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
    providers: [AuthGuard, AdminGuard, AddClientGuard, EditClientGuard]
})
export class AppRoutingModule { }

export const routingComponents = [DashboardComponent, SettingsComponent, PageNotFoundComponent, AddClientComponent, ClientDetailsComponent, EditClientComponent, LoginComponent, SignupComponent];