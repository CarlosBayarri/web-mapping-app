import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WFSComponent } from './WFS.component';

describe('SimpleMapComponent', () => {
  let component: WFSComponent;
  let fixture: ComponentFixture<WFSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WFSComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WFSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
