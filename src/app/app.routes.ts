import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './shared/guards/login.guard';
 import { AdminGuard } from './shared/guards/admin.guard';
import { UserComponent } from './components/user/user.component';
import { BookComponent } from './components/book/book.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FineComponent } from './components/fine/fine.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
      path: 'book',
      component: BookComponent,
      canActivate: [LoginGuard]
    },
    {
      path: 'notification',
      component: NotificationComponent,
      canActivate: [LoginGuard]
    },
    {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [LoginGuard]
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [LoginGuard]
    },
    {
      path: 'fine',
      component: FineComponent
    },
    {
        path: 'admin',
        canActivate: [LoginGuard, AdminGuard],
        children: [
          {
            path: 'home',
            component: HomeComponent 
          },
          {
            path: 'user',
            component: UserComponent
          },
          {
            path: 'book',
            component: BookComponent
          },
          {
            path: 'notification',
            component: NotificationComponent
          },
          {
            path: 'profile',
            component: ProfileComponent
          }
        ]
      }
];
