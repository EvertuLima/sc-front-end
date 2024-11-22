import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { loadRooms } from './store/roomStore/room.actions';
import { loadItems } from './store/itemStore/item.actions';
import { WebSocketService } from './services/webSocketService/web-socket.service';
import { loadCurrentUser } from './store/userStore/user.actions';
import { selectCurrentUser } from './store/userStore/user.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private socketSubscription = new Subscription();
  userLoggedIn$ = new Observable<boolean>;

  constructor(
    private store: Store,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.userLoggedIn$ = this.store.select(selectCurrentUser).pipe(
      map(user => !!user)
    );
    // Certifique-se de que estamos no lado do cliente
    if (typeof window !== 'undefined' && this.userLoggedIn$) {
      this.store.dispatch(loadCurrentUser());

      this.store.dispatch(loadRooms());
      this.socketSubscription = this.webSocketService
        .onMessage()
        .subscribe((message) => {
          // console.log('Mensagem recebida via WebSocket:', message);
          if (message.type === 'rooms_updated') {
            this.store.dispatch(loadRooms());
          }
        });

      this.store.dispatch(loadItems());
      // Escuta mensagens via WebSocket
      this.socketSubscription = this.webSocketService
        .onMessage()
        .subscribe((message) => {
          // console.log('Mensagem recebida via WebSocket:', message);
          if (message.type === 'components_updated') {
            this.store.dispatch(loadItems());
          }
        });
    }
  }

  ngOnDestroy(): void {
    // Cancela a assinatura e fecha a conexão WebSocket ao sair do componente
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
    this.webSocketService.closeConnection();
  }
}
