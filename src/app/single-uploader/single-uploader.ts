import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilePreview } from '../file-preview/file-preview';

@Component({
  selector: 'app-single-uploader',
  imports: [CommonModule,FormsModule,FilePreview],
  templateUrl: './single-uploader.html',
  styleUrl: './single-uploader.scss'
})
export class SingleUploader {
  fileObj:File | null = null;

  onFileSelected(event: any): void {
    this.fileObj = event;
  }
 
}
