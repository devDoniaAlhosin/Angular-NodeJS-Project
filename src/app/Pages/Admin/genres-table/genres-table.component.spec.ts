import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresTableComponent } from './genres-table.component';

describe('GenresTableComponent', () => {
  let component: GenresTableComponent;
  let fixture: ComponentFixture<GenresTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenresTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenresTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
