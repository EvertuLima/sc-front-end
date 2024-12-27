import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { createItem, updateItem } from '../../../store/itemStore/item.actions';
import { ItemModel } from '../../../models/item.model';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css'
})
export class ItemFormComponent implements OnInit {
  itemForm!: FormGroup;
  @Output() formSubmitted = new EventEmitter<void>();
  @Input() itemToEdit?: ItemModel;

  get buttonMsg(): string {
    return this.itemToEdit?.id ? 'Atualizar Item' : 'Criar Item';
  }

  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    // console.log(this.itemToEdit)
    this.itemForm = this.formBuilder.group({
      inventory_number: ['', [Validators.maxLength(65)]],
      description: ['', [Validators.required, Validators.maxLength(254)]],
      brand: ['', [Validators.maxLength(65)]],
      model: ['', [Validators.maxLength(65)]],
      condition: ['', [Validators.maxLength(65)]],
      notes: ['', [Validators.maxLength(65)]],
    });

    if (this.itemToEdit) {
      this.itemForm.patchValue(this.itemToEdit);
    }
  }

  onSubmit() {
    if (this.itemForm.valid && this.itemToEdit) {
      if (this.itemToEdit.id) {
        // Update existing item
        this.store.dispatch(
          updateItem({
            itemId: this.itemToEdit.id,
            updatedData: { ...this.itemForm.value},
          })
        );
      } else {
        // Create new item
        this.store.dispatch(
          createItem({ 
            item: {
              ...this.itemForm.value,
              location: this.itemToEdit.location
            }
          })
        );
      }
      this.itemForm.reset();
      this.formSubmitted.emit();
    }
  }
}