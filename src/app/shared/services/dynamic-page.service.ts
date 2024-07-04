import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { DynamicPageModel } from '../models/dynamic-page-models/dynamic-page.model';
import { ComponentTypeEnum } from '../enums/component-type-enum.enum';

@Injectable({
  providedIn: 'root',
})
export class DynamicPageService {
  constructor() {}

  getDynamicPageData(id: string): Observable<DynamicPageModel> {
    const returnData: DynamicPageModel = {
      title: 'Dynamic Page 1',
      components: [
        {
          type: ComponentTypeEnum.HERO,
          data: [
            {
              title: 'This is a title',
              carousel: [
                {
                  url: 'hero/banner.jpg',
                  title: 'This is a title',
                  subtitle: 'This is a caption',
                },
                {
                  url: 'hero/banner1.jpg',
                  title: 'This is a second title',
                  subtitle: 'This is a caption',
                },
              ],
            },
          ],
        },
      ],
    };

    const returnDataTwo: DynamicPageModel = {
      title: 'Dynamic Page 2',
      subtitle: 'This is a dynamic page',
      components: [],
    };

    if (id === '1') {
      return of(returnData);
    } else if (id === '2') {
      return of(returnDataTwo);
    }

    return of(returnData);
  }
}
