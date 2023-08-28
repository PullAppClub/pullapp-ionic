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
import { firstValueFrom } from 'rxjs';

type RequestOptions = {
  headers?: HttpHeaders;
} & { [k: string]: any };

@Injectable({
  providedIn: 'root',
})
export class RequestHelper {
  constructor(private readonly http: HttpClient) {}

  public async get<T>(params: GetParams): Promise<T> {
    const options = { ...this.createOptions(params), params: params.params };
    return firstValueFrom<T>(this.http.get<T>(params.url, options));
  }

  public post<T, K = void>(params: PostParams<K>): Promise<T> {
    return firstValueFrom<T>(
      this.http.post<T>(params.url, params.params, this.createOptions(params))
    );
  }

  public put<T, K = void>(params: PutParams<K>): Promise<T> {
    return firstValueFrom<T>(
      this.http.put<T>(params.url, params.params, this.createOptions(params))
    );
  }

  public delete<T>(params: DeleteParams): Promise<T> {
    return firstValueFrom<T>(
      this.http.get<T>(params.url, this.createOptions(params))
    );
  }

  public patch<T, K = void>(params: PatchParams<K>): Promise<T> {
    return firstValueFrom<T>(
      this.http.patch<T>(params.url, params.params, this.createOptions(params))
    );
  }

  public upload<T, K = void>(params: PostFormDataParams<K>): Promise<T> {
    const formData = new FormData();
    formData.append(params.fileName, params.file, params.fileName);

    if (params.params) {
      for (const [key, value] of Object.entries(params.params)) {
        formData.append(`${key}`, value as string);
      }
    }

    const request = this.http.post<T>(params.url, formData, {
      ...this.createOptions({
        ...params,
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    });

    return firstValueFrom(request);
  }

  private createOptions(params: CreateHttpOptionsParams): RequestOptions {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${params.token}`,
    });

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
