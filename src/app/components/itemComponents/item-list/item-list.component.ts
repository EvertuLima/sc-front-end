import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ItemModel } from '../../../models/item.model';
import { selectItems } from '../../../store/itemStore/item.selectors';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [MatTableModule, MatInputModule, MatFormFieldModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
})
export class ItemListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'inventory_number',
    'description',
    'brand',
    'model',
    'condition',
    'notes',
    'location_name'
  ];
  dataSource = new MatTableDataSource<ItemModel>();

  items$: Observable<ItemModel[]>;
  private itemsSubscription = new Subscription();

  constructor(private store: Store) {
    this.items$ = this.store.select(selectItems);
  }
  ngOnInit(): void {
    this.itemsSubscription = this.items$.subscribe((items) => {
      this.dataSource.data = items;
    });
  }

  ngOnDestroy(): void {
    if (this.itemsSubscription) {
      this.itemsSubscription.unsubscribe();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
