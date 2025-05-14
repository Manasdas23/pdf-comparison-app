import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfComparisonComponent } from './pdf-comparison.component';

describe('PdfComparisonComponent', () => {
  let component: PdfComparisonComponent;
  let fixture: ComponentFixture<PdfComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfComparisonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
