import { Routes } from '@angular/router';
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { TabsPage } from './tabs/tabs.page';
import { HomePage } from './home/home.page';
import { SettingsPage } from './settings/settings.page';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },

  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomePage },
      { path: 'settings', component: SettingsPage },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: 'login' },
];
