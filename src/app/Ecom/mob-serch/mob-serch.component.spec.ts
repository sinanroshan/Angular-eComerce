import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobSerchComponent } from './mob-serch.component';

describe('MobSerchComponent', () => {
  let component: MobSerchComponent;
  let fixture: ComponentFixture<MobSerchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobSerchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobSerchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
