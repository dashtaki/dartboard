import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlayersScoreComponent} from './players-score.component';

describe('PlayersScoreComponent', () => {
  let component: PlayersScoreComponent;
  let fixture: ComponentFixture<PlayersScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayersScoreComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
