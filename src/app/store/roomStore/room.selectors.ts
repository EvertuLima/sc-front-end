import { createSelector, createFeatureSelector } from '@ngrx/store';
import { RoomState } from './room.reducers';
import { RoomModel } from '../../models/room.model';

export const selectRoomsState = createFeatureSelector<RoomState>('rooms');

export const selectRooms = createSelector(
  selectRoomsState,
  (state: RoomState) => state.rooms
);

export const selectRoomById = (roomId: number) =>
  createSelector(selectRooms, (rooms: RoomModel[]) =>
    rooms.filter((rooms) => rooms.id === roomId)[0]
  );

// export const selectRoomsByResponsible = (responsibleId: number) =>
//   createSelector(selectRooms, (rooms: RoomModel[]) =>
//     rooms.filter((rooms) => rooms.responsible == responsibleId)
//   );
