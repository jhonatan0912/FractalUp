import { Injectable } from '@angular/core';
import { unsplash } from '@app/utils/unsplash.config';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private batchSize = 15;
  private delay = 1000;

  async loadImages(countries: string[]) {
    const requests = countries.map(country => this.getImages(country));
    return this.processInBatches(requests);
  }

  private async getImages(countryName: string): Promise<string[]> {
    try {
      const { response } = await unsplash.search.getPhotos({ query: encodeURIComponent(countryName), perPage: 1 });
      const results = response?.results || [];
      results.forEach(result => {
        console.log({ countryName: result.urls.raw });
      });
      return results.map(result => result.urls.raw);
    } catch (error) {
      console.error(`Error fetching images for ${countryName}:`, error);
      return [];
    }
  }

  private async processInBatches(requests: Promise<string[]>[]): Promise<string[]> {
    const results: string[] = [];

    for (let i = 0; i < requests.length; i += this.batchSize) {
      const batch = requests.slice(i, i + this.batchSize);
      const batchResults = await Promise.all(batch);

      results.push(...batchResults.flat());
      if (i + this.batchSize < requests.length) {
        await this.delayExecution(this.delay);
      }
    }

    return results;
  }

  private delayExecution(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
