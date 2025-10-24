import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../services/firebase';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  productos: any[] = [];
  nuevoNombre = '';
  nuevoPrecio: number | null = null;

  constructor(
    private firebaseService: FirebaseService,
    private auth: Auth,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.cargarProductos();
  }

  async cargarProductos() {
    this.productos = await this.firebaseService.getItems('productos');
  }

  async agregarProducto() {
    if (!this.nuevoNombre || this.nuevoPrecio == null) return;
    await this.firebaseService.createItem('productos', {
      nombre: this.nuevoNombre,
      precio: this.nuevoPrecio,
    });
    this.nuevoNombre = '';
    this.nuevoPrecio = null;
    await this.cargarProductos();
  }

  async eliminarProducto(id: string) {
    await this.firebaseService.deleteItem('productos', id);
    await this.cargarProductos();
  }

  async editarProducto(producto: any) {
    const nuevoPrecio = prompt('Nuevo precio:', producto.precio);
    if (nuevoPrecio) {
      await this.firebaseService.updateItem('productos', producto.id, {
        precio: Number(nuevoPrecio),
      });
      await this.cargarProductos();
    }
  }

  // 👇 Aquí el método de cierre de sesión
  async logout() {
    await signOut(this.auth);
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
