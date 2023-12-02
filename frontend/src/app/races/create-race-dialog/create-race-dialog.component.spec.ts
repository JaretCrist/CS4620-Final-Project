import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRaceDialogComponent } from './create-race-dialog.component';

describe('CreateRaceDialogComponent', () => {
  let component: CreateRaceDialogComponent;
  let fixture: ComponentFixture<CreateRaceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRaceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRaceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
