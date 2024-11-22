import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { RoomModel } from '../../../models/room.model';
import { selectRooms } from '../../../store/roomStore/room.selectors';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css',
})
export class RoomListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['detail', 'description', 'notes'];
  dataSource = new MatTableDataSource<RoomModel>();

  @Input() userId?: number;

  rooms$: Observable<RoomModel[]>;
  private roomsSubscription = new Subscription();

  constructor(private store: Store, private router: Router) {
    this.rooms$ = this.store.select(selectRooms);
  }

  ngOnInit(): void {
    this.roomsSubscription = this.rooms$
      .pipe(
        map((rooms) =>
          // Verifica se o userId está presente e filtra; caso contrário, retorna todas as salas
          this.userId
            ? rooms.filter((room) => room.responsible === this.userId)
            : rooms
        )
      )
      .subscribe((filteredRooms) => {
        this.dataSource.data = filteredRooms;
      });
  }

  ngOnDestroy(): void {
    if (this.roomsSubscription) {
      this.roomsSubscription.unsubscribe();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goToRoomDetail(roomId: number): void {
    this.router.navigate(['/rooms', roomId]);
  }
}
