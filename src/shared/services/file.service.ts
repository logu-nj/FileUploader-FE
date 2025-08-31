import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileEntryModel, FileEntryResponseModel } from '../models/file-entry.model';
import { environment } from '../environments/environment';
import { FileModel } from '../models/local-file.model';

// Adjust this to your API base URL

@Injectable({

  providedIn: 'root'
})
export class FileService {

  API_URL = environment.API_URL

  constructor(private http: HttpClient) { }

  listAllFiles(): Observable<FileEntryResponseModel[]> {
    return this.http.get<FileEntryResponseModel[]>(`${this.API_URL}/ListAllFiles`);
  }

  addFileEntry(files: FileEntryModel[]): Observable<FileEntryResponseModel[]> {
    return this.http.post<FileEntryResponseModel[]>(`${this.API_URL}/AddFileEntry`, files);
  }

  uploadFiles(files: File[]): Observable<FileEntryResponseModel[]> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('file', file, file.name); // 'files' must match backend param
    });

    return this.http.post<FileEntryResponseModel[]>(`${this.API_URL}/Upload`, formData);
  }

  uploadFilesWithProgress(obj: FileModel): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', obj.file);
    formData.append('fileName', obj.fileName);
    formData.append('fileType', obj.fileType);
    formData.append('fileSize', obj.fileSize.toString());

    const req = new HttpRequest('POST', `${this.API_URL}/Upload`, formData, {
      reportProgress: true, // track progress
      responseType: 'json'
    });

    return this.http.request(req);
  }

  deleteFile(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.API_URL}/Delete/${id}`);
  }
}
