import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryChecklistComponent } from './library-checklist/library-checklist.component';
import { LibraryClauseComponent } from './library-clause/library-clause.component';
import { LibraryDocumentComponent } from './library-document/library-document.component';

const routes: Routes = [
  { path: 'document', component: LibraryDocumentComponent },
  { path: 'clause', component: LibraryClauseComponent },
  { path: 'template', component: LibraryChecklistComponent },
  { path: '', redirectTo: 'document', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArbitratorLibraryRoutingModule {}
