import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  CreateHttpOptionsParams,
  DeleteParams,
  GetParams,
  PatchParams,
  PostFormDataParams,
  PostParams,
  PutParams,
} from '../../interfaces/http-request.interface';
import { Error } from '../../interfaces/error.interface';
import { firstValueFrom, Observable, switchMap } from 'rxjs';

type RequestOptions = {
  headers?: HttpHeaders;
} & { [k: string]: any };

@Injectable({
  providedIn: 'root',
})
export class RequestHelper {
  constructor(private readonly http: HttpClient) {}

  public get<T>(params: GetParams): Observable<T> {
    return this.createOptions(params).pipe(
      switchMap(options => this.http.get<T>(params.url, options))
    );
  }

  public post<T, K = void>(params: PostParams<K>): Observable<T> {
    return this.createOptions(params).pipe(
      switchMap(options =>
        this.http.post<T>(params.url, params.params, options)
      )
    );
  }

  public put<T, K = void>(params: PutParams<K>): Observable<T> {
    return this.createOptions(params).pipe(
      switchMap(options => this.http.put<T>(params.url, params.params, options))
    );
  }

  public delete<T>(params: DeleteParams): Observable<T> {
    return this.createOptions(params).pipe(
      switchMap(options => this.http.delete<T>(params.url, options))
    );
  }

  public patch<T, K = void>(params: PatchParams<K>): Observable<T> {
    return this.createOptions(params).pipe(
      switchMap(options =>
        this.http.patch<T>(params.url, params.params, options)
      )
    );
  }

  public upload<T, K = void>(params: PostFormDataParams<K>): Observable<T> {
    const formData = new FormData();
    formData.append(params.fileName, params.file, params.fileName);

    if (params.params) {
      for (const [key, value] of Object.entries(params.params)) {
        formData.append(`${key}`, value as string);
      }
    }

    return this.createOptions({
      ...params,
      headers: { 'Content-Type': 'multipart/form-data' },
    }).pipe(
      switchMap(options =>
        this.http.post<T>(params.url, params.params, options)
      )
    );
  }

  private createOptions(
    params: CreateHttpOptionsParams
  ): Observable<RequestOptions> {
    return new Observable(observer => {
      if (params.token$) {
        params.token$.subscribe(token => {
          observer.next(this.createOptionsFromToken({ ...params, token }));
          observer.complete();
        });
      } else {
        observer.next(this.createOptionsFromToken(params));
        observer.complete();
      }
    });
  }

  private createOptionsFromToken(
    params: Omit<CreateHttpOptionsParams, 'token$'> & { token?: string }
  ): RequestOptions {
    let headers = new HttpHeaders();

    if (params.token) {
      headers = headers.append('Authorization', `Bearer ${params.token}`);
    }

    if (!params.showProgressBar) {
      headers = headers.append('ignoreProgressBar', '');
    }

    const options: RequestOptions = {
      headers,
    };

    if (params.getHeaders) {
      options['observe'] = 'response';
    }

    return options;
  }

  public getErrorMessage(params: Error): string {
    if (typeof params.error === 'object') {
      if (Array.isArray(params.error.message))
        return params.error.message.join(', ');
      else return params.error.message;
    }

    return params.message;
  }
}
