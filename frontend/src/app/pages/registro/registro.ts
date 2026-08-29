import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {

  nombre: string = '';
  apellido: string = ''; // Agregado para coincidir con la BD
  email: string = '';
  password: string = '';

  // Inyectamos HttpClient (para el backend) y Router (para cambiar de página)
  constructor(private http: HttpClient, private router: Router) { }

  registro() {
    const nuevoUsuario = {
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      password: this.password
    };

    // Petición POST a tu backend
    this.http.post('http://localhost:3000/api/registro', nuevoUsuario).subscribe({
      next: (respuesta: any) => {
        alert('¡Registro exitoso! Ya puedes iniciar sesión.');
        this.irAlLogin(); // Te manda al login automáticamente
      },
      error: (error) => {
        console.error('Error al registrar:', error);
        alert(error.error.mensaje || 'Hubo un error al registrarse');
      }
    });
  }

  irAlLogin() {
    this.router.navigate(['/login']); // Cambia la URL a /login
  }
}