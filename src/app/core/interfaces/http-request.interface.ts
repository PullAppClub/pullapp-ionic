interface BaseHttpRequest {
  url: string;
  token?: string;
  getHeaders?: boolean;
}

export interface GetParams extends BaseHttpRequest {
  params?: string;
  token?: string;
}

export interface PostParams<T = void> extends BaseHttpRequest {
  params?: T;
}

export interface PutParams<T = void> extends BaseHttpRequest {
  params?: T;
}

export interface DeleteParams extends BaseHttpRequest {}

export interface PatchParams<T = void> extends BaseHttpRequest {
  params?: T;
}

export interface CreateHttpOptionsParams extends Omit<BaseHttpRequest, 'url'> {}
