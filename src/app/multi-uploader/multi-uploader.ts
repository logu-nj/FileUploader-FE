import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FilePreview } from '../file-preview/file-preview';

@Component({
  selector: 'app-multi-uploader',
  imports: [CommonModule,FilePreview],
  templateUrl: './multi-uploader.html',
  styleUrl: './multi-uploader.scss'
})
export class MultiUploader {
  fileObj:File[] = [];

  onFileSelected(event: any): void {
    this.fileObj = event;
  }
}
