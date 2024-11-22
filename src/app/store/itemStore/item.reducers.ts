import { createReducer, on } from '@ngrx/store';
import { ItemModel } from '../../models/item.model';
import {
  createItem,
  createItemFailure,
  createItemSuccess,
  deleteItem,
  deleteItemFailure,
  deleteItemSuccess,
  loadItems,
  loadItemsFailure,
  loadItemsSuccess,
  updateItem,
  updateItemFailure,
  updateItemSuccess,
} from './item.actions';

export interface ItemState {
  items: ItemModel[];
  error: string | null;
}

export const initialState: ItemState = {
  items: [],
  error: null,
};

export const itemReducer = createReducer(
  initialState,
  on(loadItems, (state) => ({ ...state })),
  on(loadItemsSuccess, (state, { items }) => ({
    ...state,
    items: items,
    error: null,
  })),
  on(loadItemsFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(createItem, (state) => ({
    ...state,
    error: null,
  })),
  on(createItemSuccess, (state, { item }) => ({
    ...state,
    items: [...state.items, item],
    error: null,
  })),
  on(createItemFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(deleteItem, (state) => ({ ...state })),
  on(deleteItemSuccess, (state, { itemId }) => ({
    ...state,
    items: state.items.filter((item) => item.id != itemId),
    error: null,
  })),
  on(deleteItemFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(updateItem, (state) => ({
    ...state,
    error: null,
  })),
  on(updateItemSuccess, (state, { item }) => ({
    ...state,
    items: state.items.map((i) => (i.id === item.id ? { ...i, ...item } : i)),
    error: null,
  })),
  on(updateItemFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
);
