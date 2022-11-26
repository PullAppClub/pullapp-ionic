import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  CreateHttpOptionsParams,
  DeleteParams,
  GetParams,
  PatchParams,
  PostParams,
  PutParams,
} from '../../interfaces/http-request.interface';

type RequestOptions = {
  headers?: HttpHeaders;
} & { [k: string]: any };

@Injectable({
  providedIn: 'root',
})
export class RequestHelper {
  constructor(private readonly http: HttpClient) {}

  public get<T>(params: GetParams): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.http.get(params.url, this.createOptions(params)).subscribe({
        next: response => resolve(response as T),
        error: error => reject(error),
      });
    });
  }

  public post<T, K = void>(params: PostParams<K>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.http
        .post(params.url, params.params, this.createOptions(params))
        .subscribe({
          next: response => resolve(response as T),
          error: error => reject(error),
        });
    });
  }

  public put<T, K = void>(params: PutParams<K>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.http
        .post(params.url, params.params, this.createOptions(params))
        .subscribe({
          next: response => resolve(response as T),
          error: error => reject(error),
        });
    });
  }

  public delete<T>(params: DeleteParams): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.http.delete(params.url, this.createOptions(params)).subscribe({
        next: response => resolve(response as T),
        error: error => reject(error),
      });
    });
  }

  public patch<T, K = void>(params: PatchParams<K>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.http
        .patch(params.url, params.params, this.createOptions(params))
        .subscribe({
          next: response => resolve(response as T),
          error: error => reject(error),
        });
    });
  }

  private createOptions(params: CreateHttpOptionsParams): RequestOptions {
    const headers = new HttpHeaders({
      Authorization: params.token || '',
    });

    const options: RequestOptions = {
      headers,
    };

    if (params.getHeaders) {
      options['observe'] = 'response';
    }

    return options;
  }
}
