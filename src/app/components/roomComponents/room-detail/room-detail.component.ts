import { Component, input, OnInit } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { Store } from '@ngrx/store';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ItemModel } from '../../../models/item.model';
import { UserModel } from '../../../models/user.model';
import { selectItemsByRoom } from '../../../store/itemStore/item.selectors';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RoomModel } from '../../../models/room.model';
import { selectRoomById } from '../../../store/roomStore/room.selectors';
import { selectCurrentUser } from '../../../store/userStore/user.selectors';
import { deleteItem } from '../../../store/itemStore/item.actions';
import { ConfirmationDeleteItemDialogComponent } from '../../../messages/confirmation-delete-item-dialog/confirmation-delete-item-dialog.component';
import { ItemFormComponent } from "../../itemComponents/item-form/item-form.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-detail',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    AsyncPipe,
    MatIconModule,
    ItemFormComponent,
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.css',
})
export class RoomDetailComponent implements OnInit {
  baseColumns: string[] = [
    'inventory_number',
    'description',
    'brand',
    'model',
    'condition',
    'notes',
    'detail',
  ];
  
  actionColumns: string[] = ['delete', 'update'];
  displayedColumns: string[] = [...this.baseColumns];
  dataSource = new MatTableDataSource<ItemModel>();

  roomId = input.required<number>();
  room$: Observable<RoomModel>;
  items$: Observable<ItemModel[]>;
  currentUser$: Observable<UserModel>;
  
  formMode: 'create' | 'edit' | null = null;
  itemToEdit: ItemModel | null = null;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private router: Router,
  ) {
    this.room$ = new Observable();
    this.items$ = new Observable();
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  ngOnInit(): void {
    this.room$ = this.store.select(selectRoomById(+this.roomId()));
    this.items$ = this.store.select(selectItemsByRoom(+this.roomId()));

    this.items$.subscribe((items) => {
      this.dataSource.data = items;
    });

    // Configurar as colunas baseado nas permissões
    combineLatest([
      this.currentUser$,
      this.room$
    ]).subscribe(([user, room]) => {
      if (user && room && this.hasPermission(user, room)) {
        this.displayedColumns = [...this.baseColumns, ...this.actionColumns];
      } else {
        this.displayedColumns = [...this.baseColumns];
      }
    });
  }

  hasPermission(user: UserModel, room: RoomModel): boolean {
    return user.is_staff || room.responsible_details?.id === user.id;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openCreateItemForm() {
    this.formMode = 'create';
    this.itemToEdit = {
      id: 0,
      inventory_number: '',
      description: '',
      brand: '',
      model: '',
      condition: '',
      notes: '',
      location: this.roomId()
    };
  }

  openEditItemForm(item: ItemModel) {
    this.formMode = 'edit';
    this.itemToEdit = { ...item };
  }

  closeItemForm() {
    this.formMode = null;
    this.itemToEdit = null;
  }

  onDeleteItem(itemId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDeleteItemDialogComponent, {
      width: '400px',
      height: '200px',
      data: { message: 'Tem certeza de que deseja excluir este item?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(deleteItem({ itemId }));
      }
    });
  }

  onFormSubmitted() {
    this.closeItemForm();
  }

  goToItemDetail(itemId: number): void {
    this.router.navigate(['/items', itemId]);
  }
}