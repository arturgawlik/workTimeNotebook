import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { _backend_url, _workTimeNote_controller_url, _workTimeNote_getAll_method_url, _workTimeNote_save_method_url } from '../../utils/utils';
import { WorkTimeNoteBackendModel } from '../../models/workTimeNoteBackendModel.model';

@Injectable({
  providedIn: 'root'
})
export class WorkTimeNoteBackendService {

  constructor(private httpClient: HttpClient) {
  }

  getAll() {
    const url = _backend_url + _workTimeNote_controller_url + _workTimeNote_getAll_method_url;
    return this.httpClient.get<WorkTimeNoteBackendModel[]>(url);
  }

  save(workTimeNoteBackendModel: WorkTimeNoteBackendModel) {
    const url = _backend_url + _workTimeNote_controller_url + _workTimeNote_save_method_url;
    return this.httpClient.post<WorkTimeNoteBackendModel>(url, workTimeNoteBackendModel);
  }
}
