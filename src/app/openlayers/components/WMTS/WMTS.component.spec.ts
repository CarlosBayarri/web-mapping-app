import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WMTSComponent } from './WMTS.component';

describe('SimpleMapComponent', () => {
  let component: WMTSComponent;
  let fixture: ComponentFixture<WMTSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WMTSComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WMTSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
