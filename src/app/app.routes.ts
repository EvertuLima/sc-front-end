import { Routes } from '@angular/router';
import { RoomListComponent } from './components/roomComponents/room-list/room-list.component';
import { ItemListComponent } from './components/itemComponents/item-list/item-list.component';
import { RoomDetailComponent } from './components/roomComponents/room-detail/room-detail.component';
import { LoginComponent } from './components/login/login.component';
import { ItemFormComponent } from './components/itemComponents/item-form/item-form.component';
import { RoomFormComponent } from './components/roomComponents/room-form/room-form.component';
import { UserFormComponent } from './components/userComponents/user-form/user-form.component';
import { UserProfileComponent } from './components/userComponents/user-profile/user-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { HomeComponent } from './components/home/home.component';



export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'user/register',
    component: UserFormComponent,
    canActivate: [LoginGuard]
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'rooms',
        component: RoomListComponent,
      },
      {
        path: 'rooms/:roomId',
        component: RoomDetailComponent,
      },
      {
        path: 'create-room',
        component: RoomFormComponent,
      },
      {
        path: 'create-item',
        component: ItemFormComponent,
      },
      {
        path: 'items',
        component: ItemListComponent,
      },
      {
        path: 'user/profile',
        component: UserProfileComponent,
      },
    ]
  },
  { 
    path: '**', 
    redirectTo: '' 
  },
];
