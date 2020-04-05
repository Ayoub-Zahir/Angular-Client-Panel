import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    email: string = '';
    password: string = '';
    loading: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        // Prevent the logged in user from returning to the login page
        this.authService.getAuth().subscribe(user => {
            if (user) {
                this.router.navigate([('/dashboard')]);
            }
        })
    }

    onSubmit(form) {

        // Form valid processing ...
        if (form.valid) {

            // Display spinner
            this.loading = true;

            // Just for user experience 1500 ms time out
            setTimeout(() => {

                // Login from the Firebase authentication service
                this.authService.login(form.value.email, form.value.password)
                    .then(() => {
                        this.router.navigate(['/dashboard']);

                        // Success login
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Welcome Back !!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
                    .catch(err => {
                        // Hide spinner
                        this.loading = false;

                        // Email not exist
                        if (err.code === "auth/user-not-found") {
                            form.controls.email.setErrors({ 'notExist': true });
                        }

                        // Password incorrect
                        if (err.code === "auth/wrong-password") {
                            form.controls.password.setErrors({ 'passwordIncorrect': true });
                        }
                    });
            }, 1000);

        }
        else {
            // Error form invalid
            form.controls.email.markAsTouched();
            form.controls.password.markAsTouched();
        }

    }

}
