export interface FileEntryResponseModel {
  id: string;
  fileLocation: string;
  storageType: string;
  createdOn: string;
  isDeleted: boolean;
}

export interface FileEntryModel {
  fileLocation: string;
  storageType: string;
}