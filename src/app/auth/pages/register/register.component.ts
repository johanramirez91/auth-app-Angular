import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  formulario: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  registro(): void {
    const { name, email, password } = this.formulario.value;
    this.authService.register(name, email, password).subscribe((resp) => {
      if (resp === true) {
        Swal.fire({
          title: 'Usuario creado!',
          icon: 'success',
          text: 'Ya puedes iniciar sesión con tu nuevo usuario',
        });
        this.router.navigateByUrl('/login');
      } else {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: resp.msg,
        });
      }
    });
  }
}
