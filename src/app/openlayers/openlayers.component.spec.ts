import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpenlayersComponent } from './openlayers.component';

describe('OpenlayersComponent', () => {
  let component: OpenlayersComponent;
  let fixture: ComponentFixture<OpenlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenlayersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OpenlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
