import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FileService } from '../../shared/services/file.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FileModel } from '../../shared/models/local-file.model';

@Component({
  selector: 'app-file-preview',
  imports: [CommonModule],
  providers: [FileService],
  templateUrl: './file-preview.html',
  styleUrl: './file-preview.scss'
})
export class FilePreview implements OnChanges {
  @Input() fileObj: File | any = null;
  @Input() multiUploader: boolean = false;
  @Input() enableUpload: boolean = false;
  uploading: boolean = false;
  progress: number = 0;
  message: string = '';

  constructor(protected fileService: FileService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.fileObj) {
      this.onFileSelected(this.fileObj);
    }
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.fileObj = []; // reset previous
    Array.from(files).forEach(file => {
      const fileData: FileModel = {
        file,
        filePreview: null,
        progress: 0,
        uploading: false,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
      };
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => (fileData.filePreview = reader.result as string);
        reader.readAsDataURL(file);
      } else if (file.type === 'application/pdf') {
        fileData.filePreview = 'pdf';
      } else {
        fileData.filePreview = 'other';
      }
      this.fileObj.push(fileData);
    });
  }


  upload(): void {
    if (this.fileObj.length === 0) {
      this.message = 'No files selected!';
      return;
    }
    this.fileObj.forEach((obj: any) => {
      obj.uploading = true;
      this.fileService.uploadFilesWithProgress(obj).subscribe({
        next: (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            obj.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event.type === HttpEventType.Response) {
            obj.uploading = false;
          }
        },
        error: (err) => {
          obj.uploading = false;
          console.error(err);
        }
      });
    });
  }
}
