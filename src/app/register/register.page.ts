import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [IonicModule, FormsModule, RouterModule],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email = '';
  password = '';

  constructor(private auth: Auth, private router: Router) {}

  async register() {
    if (!this.email || !this.password) {
      alert('Debes ingresar email y contraseña');
      return;
    }

    try {
      await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (err: any) {
      alert(`Error: ${err.code} - ${err.message}`);
      console.error(err);
    }
  }

  // Permite presionar Enter para registrar
  async onEnter() {
    await this.register();
  }
}
