import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreCarouselComponent } from './genre-carousel.component';

describe('GenreCarouselComponent', () => {
  let component: GenreCarouselComponent;
  let fixture: ComponentFixture<GenreCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
