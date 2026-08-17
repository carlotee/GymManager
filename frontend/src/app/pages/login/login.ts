import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  login() {
    console.log('Correo:', this.email);
    console.log('Contraseña:', this.password);

    if (this.email === 'admin@gmail.com' && this.password === '123456') {
      console.log('Login correcto');
    } else {
      console.log('Correo o contraseña incorrectos');
    }
  }
  irAlRegistro() {
    console.log('Redirigiendo al registro');
  }

}