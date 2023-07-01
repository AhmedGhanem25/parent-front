import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParentsService {

  constructor(private http: HttpClient) { }

  public getParents(filter) {
    const url = environment.PARENT_API_BASE_URL + '/v1/users';
    return this.http.get(url, {
      params: filter
    });
  }
}
