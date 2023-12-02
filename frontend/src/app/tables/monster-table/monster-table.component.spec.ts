import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterTableComponent } from './monster-table.component';

describe('MonsterTableComponent', () => {
  let component: MonsterTableComponent;
  let fixture: ComponentFixture<MonsterTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonsterTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonsterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
