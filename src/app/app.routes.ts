import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PdfComparisonComponent } from './pdf-comparison/pdf-comparison.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'no', component: PdfComparisonComponent },

];


