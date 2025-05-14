import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [NgxExtendedPdfViewerModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('pdfViewer1') pdfViewer1!: ElementRef;
  @ViewChild('pdfViewer2') pdfViewer2!: ElementRef;

  pdfSrc1: string | ArrayBuffer | null = null;
  pdfSrc2: string | ArrayBuffer | null = null;

  private scrollSubscription1: Subscription | undefined;
  private scrollSubscription2: Subscription | undefined;

  ngAfterViewInit(): void {
    this.setupScrollSync();
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription1) {
      this.scrollSubscription1.unsubscribe();
    }
    if (this.scrollSubscription2) {
      this.scrollSubscription2.unsubscribe();
    }
  }

  uploadPdf(event: any, viewerNumber: 1 | 2) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (viewerNumber === 1) {
          this.pdfSrc1 = e.target.result;
        } else {
          this.pdfSrc2 = e.target.result;
        }
      };
      reader.readAsArrayBuffer(file);
      // reader.readAsDataURL(file);

    } else {
      alert('Please upload a valid PDF file.');
      if (viewerNumber === 1) {
        this.pdfSrc1 = null;
      } else {
        this.pdfSrc2 = null;
      }
    }
    // Reset the file input so the same file can be uploaded again
    event.target.value = '';
  }

  setupScrollSync() {
    const pdfViewerElement1 = this.pdfViewer1.nativeElement.querySelector('ngx-extended-pdf-viewer');
    
    const pdfViewerElement2 = this.pdfViewer2.nativeElement.querySelector('ngx-extended-pdf-viewer');

    if (pdfViewerElement1 && pdfViewerElement2) {
      this.scrollSubscription1 = fromEvent(pdfViewerElement1, 'scroll').subscribe(() => {
        pdfViewerElement2.scrollTop = pdfViewerElement1.scrollTop;
        pdfViewerElement2.scrollLeft = pdfViewerElement1.scrollLeft;
      });

      this.scrollSubscription2 = fromEvent(pdfViewerElement2, 'scroll').subscribe(() => {
        pdfViewerElement1.scrollTop = pdfViewerElement2.scrollTop;
        pdfViewerElement1.scrollLeft = pdfViewerElement2.scrollLeft;
      });
    }
  }
}
