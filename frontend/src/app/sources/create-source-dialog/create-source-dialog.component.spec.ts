import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSourceDialogComponent } from './create-source-dialog.component';

describe('CreateSourceDialogComponent', () => {
  let component: CreateSourceDialogComponent;
  let fixture: ComponentFixture<CreateSourceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSourceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSourceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
