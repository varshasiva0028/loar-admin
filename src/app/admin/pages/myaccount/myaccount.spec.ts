import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccount} from './myaccount';

describe('MyAccount', () => {
  let component: MyAccount;
  let fixture: ComponentFixture<MyAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAccount],
    }).compileComponents();

    fixture = TestBed.createComponent(MyAccount);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
