import { HttpClient, HttpResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ErrorHttpResponse, HttpClientConfig, HttpClientWrapper, HTTPMethod, SuccessHttpResponse } from "@cropsflow/client";
import { catchError, map } from 'rxjs/operators';
import { HTTP_CLIENT_CONFIG_INJECTION_TOKEN } from "./cropsflow.module";

@Injectable({ providedIn: 'any' })
export class AngularHttpClientWrapper extends HttpClientWrapper {
  constructor(private http: HttpClient, @Inject(HTTP_CLIENT_CONFIG_INJECTION_TOKEN) config: HttpClientConfig) {
    super(config)
  }
  request<SuccessHttpResponse>(method: HTTPMethod, url: string, options: any): Promise<SuccessHttpResponse> {
    return this.http.request<HttpResponse<any>>(method, url, options).pipe(
      map((e: any) => new SuccessHttpResponse(e.data, e.status) as any),
      catchError(async (e) => new ErrorHttpResponse(e.error, e.status) as any)
    ).toPromise()
  }
}
