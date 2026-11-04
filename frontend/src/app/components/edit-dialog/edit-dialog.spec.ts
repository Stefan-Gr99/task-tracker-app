import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EditDialog } from './edit-dialog';

describe('EditDialog', () => {
  let component: EditDialog;
  let fixture: ComponentFixture<EditDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDialog],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => {} } },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'Testaufgabe',
            description: 'Testbeschreibung'
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
