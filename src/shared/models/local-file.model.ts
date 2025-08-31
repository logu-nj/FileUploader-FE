export interface FileModel{
    file: File;
    filePreview: string | null;
    progress: number;
    uploading: boolean;
    fileName: string;
    fileType: string;
    fileSize: number;
}