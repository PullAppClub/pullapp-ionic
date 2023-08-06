interface BaseHttpRequest {
  url: string;
  token?: string;
  getHeaders?: boolean;
  showProgressBar?: boolean;
}

export interface GetParams extends BaseHttpRequest {
  params?: Record<string, string>;
  token?: string;
}

export interface PostParams<T = void> extends BaseHttpRequest {
  params?: T;
}

export interface PostFormDataParams<T = void> extends PostParams<T> {
  file: File;
  fileName: string;
}

export interface PutParams<T = void> extends BaseHttpRequest {
  params?: T;
}

export interface DeleteParams extends BaseHttpRequest {}

export interface PatchParams<T = void> extends BaseHttpRequest {
  params?: T;
}

export interface CreateHttpOptionsParams extends Omit<BaseHttpRequest, 'url'> {
  headers?: Record<any, any>;
}

export interface HttpMessageResponse {
  message: string;
}
