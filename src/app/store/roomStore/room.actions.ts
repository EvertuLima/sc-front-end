import { createAction, props } from '@ngrx/store';
import { RoomModel } from '../../models/room.model'; 

export const loadRooms = createAction('[Room] Load Rooms');

export const loadRoomsSuccess = createAction(
  '[Room] Load Rooms Success',
  props<{ rooms: RoomModel[] }>()
);

export const loadRoomsFailure = createAction(
  '[Room] Load Rooms Failure',
  props<{ error: string }>()
);

export const createRoom = createAction(
  '[Room] Create Room',
  props<{ room: RoomModel }>()
);

export const createRoomSuccess = createAction(
  '[Room] Create Room Success',
  props<{ room: RoomModel }>()
);

export const createRoomFailure = createAction(
  '[Room] Create Room Failure',
  props<{ error: string }>()
);
