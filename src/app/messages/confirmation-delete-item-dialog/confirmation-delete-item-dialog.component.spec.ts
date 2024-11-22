import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDeleteItemDialogComponent } from './confirmation-delete-item-dialog.component';

describe('ConfirmationDeleteItemDialogComponent', () => {
  let component: ConfirmationDeleteItemDialogComponent;
  let fixture: ComponentFixture<ConfirmationDeleteItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationDeleteItemDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDeleteItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
