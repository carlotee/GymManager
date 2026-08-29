import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    const credenciales = {
      email: this.email,
      password: this.password
    };

    // Petición POST al backend para verificar credenciales
    this.http.post('http://localhost:3000/api/login', credenciales).subscribe({
      next: (respuesta: any) => {
        alert('Login correcto. ¡Bienvenido!');
        // Aquí luego lo mandaremos al dashboard
      },
      error: (error) => {
        console.error('Error en login:', error);
        alert('Correo o contraseña incorrectos');
      }
    });
  }

  irAlRegistro() {
    this.router.navigate(['/registro']); // Cambia la URL a /registro
  }
}