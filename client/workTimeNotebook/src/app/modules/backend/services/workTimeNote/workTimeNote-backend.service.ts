import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { _backend_url, _workTimeNote_controller_url, _workTimeNote_method_url } from '../../utils/utils';
import { WorkTimeNoteBackendModel } from '../../models/workTimeNoteBackendModel.model';

@Injectable({
  providedIn: 'root'
})
export class WorkTimeNoteBackendService {

  constructor(private httpClient: HttpClient) {
  }

  getAll() {
    const url = _backend_url + _workTimeNote_controller_url + _workTimeNote_method_url;
    return this.httpClient.get<WorkTimeNoteBackendModel>(url);
  }
}
