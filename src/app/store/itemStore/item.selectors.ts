import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ItemState } from './item.reducers';
import { ItemModel } from '../../models/item.model';

export const selectItemsState = createFeatureSelector<ItemState>('items');

export const selectItems = createSelector(
  selectItemsState,
  (state) => state.items
);

export const selectItemsByRoom = (roomId: number) => 
  createSelector(
    selectItems,
    (items: ItemModel[]) => items.filter((item) => item.location == roomId)
  );
