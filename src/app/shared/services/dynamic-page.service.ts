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
        {
          type: ComponentTypeEnum.TITLE,
          data: [
            {
              text: 'This is a TITLE',
              sizeDesktop: 12,
            },
          ],
        },
        {
          type: ComponentTypeEnum.TEXT,
          data: [
            {
              text: 'This is a text',
              sizeMobile: 12,
              sizeTablet: 12,
              sizeDesktop: 12,
            },
            {
              text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
              sizeMobile: 12,
              sizeTablet: 6,
              sizeDesktop: 3,
            },
            {
              text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
              sizeMobile: 12,
              sizeTablet: 6,
              sizeDesktop: 3,
            },
            {
              text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
              sizeMobile: 12,
              sizeTablet: 6,
              sizeDesktop: 3,
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
