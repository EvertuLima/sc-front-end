import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { RoomService } from '../../services/roomService/room.service'; 
import {
  createRoom,
  createRoomFailure,
  createRoomSuccess,
  loadRooms,
  loadRoomsFailure,
  loadRoomsSuccess,
} from './room.actions';
import { loginSuccess } from '../authStore/auth.actions';

@Injectable()
export class RoomEffects {
  constructor(private actions$: Actions, private roomService: RoomService) {}

  loadRoomAfterLogin$ = createEffect(() => 
    this.actions$.pipe(
      ofType(loginSuccess),
      map(() => loadRooms())
    )
  );

  loadRooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRooms),
      mergeMap(() =>
        this.roomService.getAllRooms().pipe(
          map((rooms) => loadRoomsSuccess({ rooms })),
          catchError((error) => of(loadRoomsFailure({ error })))
        )
      )
    )
  );

  createRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createRoom),
      mergeMap(({ room }) =>
        this.roomService.postRoom(room).pipe(
          map((newRoom) => createRoomSuccess({ room: newRoom })),
          catchError((error) =>
            of(createRoomFailure({ error: error.message || 'Unknown error' }))
          )
        )
      )
    )
  );
}
