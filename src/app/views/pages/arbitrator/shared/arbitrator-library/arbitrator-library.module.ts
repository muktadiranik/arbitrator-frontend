import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ArbitratorLibraryRoutingModule } from './arbitrator-library-routing.module';
import { NewfolderModalComponent } from './library-document/newfolder-modal/newfolder-modal.component';
import { DirectoryComponent } from './library-document/directory/directory.component';
import { FileComponent } from './library-document/file/file.component';

@NgModule({
  declarations: [NewfolderModalComponent, DirectoryComponent, FileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ArbitratorLibraryRoutingModule,
    RouterModule,
  ],
})
export class ArbitratorLibraryModule {}
