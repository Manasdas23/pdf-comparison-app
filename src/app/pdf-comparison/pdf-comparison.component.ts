import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
type PdfSource = string | Uint8Array | undefined;

@Component({
  selector: 'app-pdf-comparison',
  imports:  [CommonModule, PdfViewerModule],
  templateUrl: './pdf-comparison.component.html',
  styleUrl: './pdf-comparison.component.scss'
})

export class PdfComparisonComponent {
   pdfSrc1: PdfSource;
  pdfSrc2: PdfSource;
  page1 = 1;
  page2 = 1;
  totalPages1 = 0;
  totalPages2 = 0;
  zoom = 1.0;
  syncPages = false;

  onFileSelected(event: Event, pdfNumber: number): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const result = fileReader.result;
      const processed = this.processFileResult(result);
      
      if (pdfNumber === 1) {
        this.pdfSrc1 = processed;
      } else {
        this.pdfSrc2 = processed;
      }
    };

    fileReader.readAsArrayBuffer(file);
  }

  private processFileResult(result: string | ArrayBuffer | null): PdfSource {
    if (result === null) return undefined;
    if (typeof result === 'string') return result;
    return new Uint8Array(result);
  }

  onPageChange(page: number, pdfNumber: number): void {
    const newPage = Math.max(1, Math.min(
      page, 
      pdfNumber === 1 ? this.totalPages1 : this.totalPages2
    ));

    if (pdfNumber === 1) {
      this.page1 = newPage;
      if (this.syncPages) this.page2 = newPage;
    } else {
      this.page2 = newPage;
      if (this.syncPages) this.page1 = newPage;
    }
  }

  afterLoadComplete(pdfData: { numPages: number }, pdfNumber: number): void {
    if (pdfNumber === 1) {
      this.totalPages1 = pdfData.numPages;
    } else {
      this.totalPages2 = pdfData.numPages;
    }
  }

  zoomIn(): void {
    this.zoom = Math.min(3.0, this.zoom + 0.25);
  }

  zoomOut(): void {
    this.zoom = Math.max(0.25, this.zoom - 0.25);
  }

  toggleSync(): void {
    this.syncPages = !this.syncPages;
    if (this.syncPages) {
      this.page2 = this.page1;
    }
  }

  resetZoom(): void {
    this.zoom = 1.0;
  }
}