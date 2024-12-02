import { ActionReducer, MetaReducer } from '@ngrx/store';

import { resetState } from './store.action';
import { RoomState } from './roomStore/room.reducers';
import { ItemState } from './itemStore/item.reducers';
import { AuthState } from './authStore/auth.reducers';
import { RegisterUserState } from './registerUserStore/registerUser.reducers';
import { UserState } from './userStore/user.reducers';
import { CommentState } from './commentStore/comment.reducers';

export interface State {
  rooms: RoomState;
  items: ItemState;
  auth: AuthState;
  registerUser: RegisterUserState;
  user: UserState;
  comments: CommentState
}

export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state: any, action: any) {
    if (action.type === resetState.type) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaStoreReducers: MetaReducer<State>[] = [clearState];