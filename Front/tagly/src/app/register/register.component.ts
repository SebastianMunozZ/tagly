import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private UsersService: UsersService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['']
    }, { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, surname, email, username, password } = this.registerForm.value;
      console.log('name:', name, 'surname:', surname, 'email:', email, 'Username:', username, 'Password:', password);

      this.UsersService.register({ name, surname, email, username, password }).subscribe({
        next: (response) => {
          
          if (response.error) {
            alert(response.error.response)
          } else {
            alert('Usuario registrado con éxito');
            this.router.navigate(['/login']);
          }
          
        },
        error: (error) => {
          console.error('Error en el registro:', error);
          this.errorMessage = 'Error en el registro. Inténtalo de nuevo.';
        }
      });

    }
  }

  onLogin() {
    this.router.navigate(['/login']);
  }
}
