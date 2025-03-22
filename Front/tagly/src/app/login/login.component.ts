import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  //standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private AuthService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.AuthService.login( username, password ).subscribe({
        next: (response) => {
          if (response.message) {
            alert('Tag o contraseña incorrectos')
          } else {
            alert('Inicio de sesión exitoso');
            //this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          console.error('Error en el inicio de sesión:', error);
          this.errorMessage = 'Error en el inicio de sesión. Inténtalo de nuevo.';
        }
      });
    }
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
