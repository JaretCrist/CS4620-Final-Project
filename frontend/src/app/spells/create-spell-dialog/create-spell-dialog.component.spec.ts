import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSpellDialogComponent } from './create-spell-dialog.component';

describe('CreateSpellDialogComponent', () => {
  let component: CreateSpellDialogComponent;
  let fixture: ComponentFixture<CreateSpellDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSpellDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSpellDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
