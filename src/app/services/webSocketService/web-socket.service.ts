import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$!: WebSocketSubject<any>;

  constructor() {
    if (typeof window !== 'undefined') {
      // Inicialize a conexão WebSocket com a URL do seu servidor
      this.socket$ = webSocket('ws://127.0.0.1:8000/ws/room/');
    }
  }

  // Envia mensagens via WebSocket
  sendMessage(msg: any) {
    if (this.socket$) {
      this.socket$.next(msg);
    }
  }

  // Escuta as mensagens recebidas
  onMessage(): Observable<any> {
    return this.socket$ ? this.socket$.asObservable() : new Observable();
  }

  // Fecha a conexão quando o componente não estiver mais ativo
  closeConnection() {
    if (this.socket$) {
      this.socket$.complete();
    }
  }
}
