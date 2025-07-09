import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom, catchError, Observable } from 'rxjs';
import { IBusiness } from '../../shared/interfaces';

@Injectable()
export class BusinessClientService {
  private readonly serviceUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.serviceUrl =
      process.env.BUSINESS_SERVICE_URL || 'http://localhost:3000';
  }

  async getBusinessByIdOrError(id: string): Promise<IBusiness> {
    const errorMessage = `Business with ID "${id}" not found`;

    return this.doRequest(
      this.httpService.get<IBusiness>(`${this.serviceUrl}/businesses/${id}`),
      errorMessage,
    );
  }

  async getBusinessesByIds(ids: string[]): Promise<IBusiness[]> {
    const errorMessage = `Businesses with IDs "${ids.join(', ')}" not found`;

    return this.doRequest(
      this.httpService.post<IBusiness[]>(
        `${this.serviceUrl}/businesses/find-by-ids`,
        { ids },
      ),
      errorMessage,
    );
  }

  private async doRequest<T>(
    request: Observable<AxiosResponse<T>>,
    errorMessage: string,
  ): Promise<T> {
    try {
      const response = await firstValueFrom(
        request.pipe(
          catchError((error) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (error.response?.status === 404) {
              throw new NotFoundException(errorMessage);
            }
            throw error;
          }),
        ),
      );

      return response.data;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      console.error('Error fetching business data:', error);
      throw new NotFoundException(errorMessage);
    }
  }
}
