import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminCrud } from './admin-crud';

describe('AdminCrud', () => {
  let component: AdminCrud;
  let fixture: ComponentFixture<AdminCrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCrud],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCrud);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
