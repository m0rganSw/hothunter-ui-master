import globalAxios, { AxiosError } from 'axios';
import { EmployersApi } from 'services/api/api/employers-api';
import { OffersApi } from 'services/api/api/offers-api';

import { ClientsApi } from './api/clients-api';
import { JobRequestApi } from './api/job-request-api';

export class Api {
  clients: ClientsApi = new ClientsApi();
  jobRequests: JobRequestApi = new JobRequestApi();
  employers: EmployersApi = new EmployersApi();
  offers: OffersApi = new OffersApi();
  constructor() {
    this.setDefaults();
  }

  private setDefaults = () => {
    globalAxios.interceptors.response.use(
      (config) => config,
      (error: AxiosError<any>) => {
        throw error;
      }
    );
  };
}

export const api = new Api();
