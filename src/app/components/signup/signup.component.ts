import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    email: string = '';
    password: string = '';
    confirmPassword: string = '';

    loading: boolean = false;

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        // Prevent the logged in user from returning to the signup page
        this.authService.getAuth().subscribe(user => {
            if(user)
                this.router.navigate([('/dashboard')]);
        })
    }

    onSubmit(form) {
        if (form.valid && form.value.password === form.value.confirmPassword) {
            // Process signup
            this.loading = true;

            this.authService.signup(form.value.email, form.value.password)
                .then( () => {
                    this.router.navigate(['/dashboard']);

                    // Success login
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'You Sigu up successfully !!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
                .catch(err => {
                    this.loading = false;
                    
                    if(err.code === 'auth/email-already-in-use'){
                        form.controls.email.setErrors({'emailExist': true});
                        form.controls.password.markAsTouched();
                    }
                });

        } else {
            // from invalid
            form.controls.email.markAsTouched();
            form.controls.password.markAsTouched();
            form.controls.confirmPassword.markAsTouched();
        }
    }

}
