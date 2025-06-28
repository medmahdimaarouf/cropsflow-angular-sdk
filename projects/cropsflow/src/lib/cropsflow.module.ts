import { HttpClientModule } from '@angular/common/http';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CropsFlow, CropsFlowClient, EventsManager, CropsFlowOptions, HttpClientConfig } from '@cropsflow/client';

export const HTTP_CLIENT_CONFIG_INJECTION_TOKEN = new InjectionToken('__Http_client_config__')

@NgModule({
  imports: [HttpClientModule]
})
export class CropsFlowModule {

  public static config(options: CropsFlowOptions): ModuleWithProviders<CropsFlowModule> {
    const client: CropsFlowClient = CropsFlow.client(options)
    const httpClientConfig: HttpClientConfig = {
      token: options.token,
      baseUrl: options.remote
    }
    return {
      ngModule: CropsFlowModule,
      providers: [
        {
          provide: HTTP_CLIENT_CONFIG_INJECTION_TOKEN,
          useValue: httpClientConfig,
        },
        {
          provide: CropsFlowClient,
          useValue: client
        },
        {
          provide: EventsManager,
          useValue: client.events()
        }
      ]
    }
  }
}
