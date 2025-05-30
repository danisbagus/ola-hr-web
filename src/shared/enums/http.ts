export enum ResultEnum {
  SUCCESS = 'SUCCESS',
  ERROR = 'INTERNAL_SERVER_ERROR',
  UNAUTHORIZED = 401,
  TIMEOUT = 30000
  // TYPE = 'success'
}

export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // text
  TEXT = 'text/plain;charset=UTF-8',
  // form-data urlencoded
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data multipart
  FORM_DATA = 'multipart/form-data;charset=UTF-8'
}
