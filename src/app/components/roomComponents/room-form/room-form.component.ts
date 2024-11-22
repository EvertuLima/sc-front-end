import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { createRoom } from '../../../store/roomStore/room.actions';

@Component({
  selector: 'app-room-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.css',
})
export class RoomFormComponent implements OnInit {
  roomForm!: FormGroup;
  buttonMsg = 'Create Room';
  @Output() formSubmitted = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.roomForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(65)]],
      description: ['', [Validators.maxLength(254)]],
      notes: ['', [Validators.maxLength(65)]],
    });
  }

  onSubmit() {
    if (this.roomForm.valid) {
      this.store.dispatch(createRoom({ room: this.roomForm.value }));
      this.roomForm.reset();
      this.formSubmitted.emit()
    }
  }
}
