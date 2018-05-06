import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterFormComponent } from './twitter-form.component';

describe('TwitterFormComponent', () => {
  let component: TwitterFormComponent;
  let fixture: ComponentFixture<TwitterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
