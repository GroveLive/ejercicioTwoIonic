import { Component } from '@angular/core';
import { IonicModule, IonInput } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, FormsModule, RouterModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private auth: Auth, private router: Router) {}

  async login() {
    if (!this.email || !this.password) {
      alert('Debes ingresar email y contraseña');
      return;
    }

    try {
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
      this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
    } catch (err: any) {
      alert(`Error: ${err.code} - ${err.message}`);
      console.error(err);
    }
  }

  // Permite presionar Enter para iniciar sesión
  async onEnter() {
    await this.login();
  }
}
