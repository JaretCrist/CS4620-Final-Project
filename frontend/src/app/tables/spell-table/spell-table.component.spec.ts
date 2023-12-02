import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellTableComponent } from './spell-table.component';

describe('SpellTableComponent', () => {
  let component: SpellTableComponent;
  let fixture: ComponentFixture<SpellTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpellTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpellTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
