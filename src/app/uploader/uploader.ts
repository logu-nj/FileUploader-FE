import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SingleUploader } from '../single-uploader/single-uploader';
import { MultiUploader } from '../multi-uploader/multi-uploader';
import { FilePreview } from '../file-preview/file-preview';

@Component({
  selector: 'app-uploader',
  imports: [CommonModule,FormsModule,SingleUploader,MultiUploader,FilePreview],
  templateUrl: './uploader.html',
  styleUrl: './uploader.scss'
})
export class Uploader {
  tabIndex=0
}
