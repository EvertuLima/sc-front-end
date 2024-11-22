import { createReducer, on } from '@ngrx/store';

import { RoomModel } from '../../models/room.model'; 
import {
  createRoom,
  createRoomFailure,
  createRoomSuccess,
  loadRooms,
  loadRoomsFailure,
  loadRoomsSuccess,
} from './room.actions';

export interface RoomState {
  rooms: RoomModel[];
  error: string | null;
}

export const initialState: RoomState = {
  rooms: [],
  error: null,
};

export const roomReducer = createReducer(
  initialState,
  on(loadRooms, (state) => ({ ...state })),
  on(loadRoomsSuccess, (state, { rooms }) => ({
    ...state,
    rooms: rooms,
    error: null,
  })),
  on(loadRoomsFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(createRoom, (state, { room }) => ({
    ...state,
    error: null,
  })),
  on(createRoomSuccess, (state, { room }) => ({
    ...state,
    rooms: [...state.rooms, room],
    error: null,
  })),
  on(createRoomFailure, (state, { error }) => ({
    ...state,
    error: error,
  }))
);
