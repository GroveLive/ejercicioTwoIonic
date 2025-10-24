// src/app/settings/settings.page.ts
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase'; // Usa tu servicio existente

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  userEmail: string | null = null;

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  ngOnInit() {
    const user = this.firebaseService.getCurrentUser();
    this.userEmail = user?.email || 'Usuario desconocido';
  }

  async logout() {
    await this.firebaseService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
