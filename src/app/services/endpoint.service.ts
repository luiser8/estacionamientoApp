import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {
  private url = environment.url;
  private headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

  constructor(private httpClient: HttpClient) {}

  public Get(route: String) {
    return this.httpClient.get(`${this.url}${route}`, { headers: this.headers });
  }
  public GetId(route: String, id: String) {
    return this.httpClient.get(`${this.url}${route}/${id}`, { headers: this.headers });
  }
  public Post(route: String, data: any) {
    return this.httpClient.post(`${this.url}${route}`, JSON.stringify(data), { headers: this.headers });
  }
  public Put(route: String, id: String, data: any) {
    return this.httpClient.put(`${this.url}${route}/${id}`, JSON.stringify(data), { headers: this.headers });
  }
  public Delete(route: String, id: String) {
    return this.httpClient.delete(`${this.url}${route}/${id}`, { headers: this.headers });
  }
}