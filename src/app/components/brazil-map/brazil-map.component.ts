import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';
import { CoveragePageService } from 'src/app/shared/services/coverage-page.service';
import { XmlSanitizerService } from 'src/app/shared/services/xml-sanitizer.service';
import { states } from 'src/assets/utils/states';
import * as echarts from 'echarts';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { text } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-brazil-map',
  templateUrl: './brazil-map.component.html',
  styleUrls: ['./brazil-map.component.scss'],
})
export class BrazilMapComponent implements OnInit, OnChanges {
  chartOptions: any;

  areasData: any[] = [];
  areaDataView: any;

  currentPage = 1;
  pageSize = 10;

  stateSelected = ''

  constructor(
    private http: HttpClient,
    private coveragePageService: CoveragePageService,
    private xmlSanitizerService: XmlSanitizerService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    // TODO: Load the map of Brazil in service one
    this.http.get('assets/utils/brazil.json').subscribe((geoJson: any) => {
      echarts.registerMap('brazil', geoJson);

      // Decrease height by 200px
      this.chartOptions = {
        title: {
          text: 'Selecione um estado para consultar as áreas atendidas',
          left: 'center',
        },

        tooltip: {
          trigger: 'item',
          formatter: '{b}',
        },

        visualMap: {
          show: false,
          min: 100, // SET 0 para ranges
          max: 100,
          inRange: {
            color: ['#2d4b7b', '#2d4b7b'],
          },
          outOfRange: {
            color: ['#ff0000'], // Color for areas that are clicked
          },
          textStyle: {
            color: 'white',
          },
          itemStyle: {
            areaColor: '#ff0000', // Change the color of the states when hovered
          },
        },

        series: [
          {
            type: 'map',
            map: 'brazil',
            label: {
              show: false,
            },

            itemStyle: {
              areaColor: '#2d4b7b', // Change the color of the states
              borderColor: 'white', // Border color of the states
              color: 'white',
            },

            emphasis: {
              label: {
                show: false,
              },
              itemStyle: {
                areaColor: '#ff0000', // Change the color of the states when hovered
              },
            },

            select: {
              label: {
                show: true,
                color: 'white', // Change the color of the selected state text to white
                // position: [0, 0], // Add  position on the x/y-axis
                // backgroundColor: '#00000020', // Change the color of the selected state text to white
                // padding: 5,
                // borderRadius: 5,
              },
              itemStyle: {
                areaColor: '#ff0000', // Change the color of the selected state
              },
            },
            selectedMode: 'single',
            aspectScale: 1,
            data: states,
          },
        ],

        color: ['#ff00ea'], // Border color of the states
      };

      const chartDom = document.getElementById('brazilMap')!;
      // chartDom.style.height = (chartDom.clientHeight - 500) + 'px';
      // chartDom.style.width = (chartDom.clientWidth - 200) + 'px';
      const myChart = echarts.init(chartDom);
      myChart.setOption(this.chartOptions);

      myChart.off('click');
      myChart.on('click', this.onChartClick.bind(this));
    });
  }

  ngOnChanges(): void {
    this.areaDataView = this.paginatedAreasData;
  }

  onChartClick(params: any): void {
    this.loadingService.show();
    this.findAreas(params.data.uf);
  }

  findAreas(uf: string): void {
    this.stateSelected = this.coveragePageService.getUfe(uf);
    this.coveragePageService.getAreas(this.stateSelected).subscribe(
      (data) => {
        try {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data, 'text/html');
          const xmlsr = doc.getElementById('xmlsr');
          if (xmlsr) {
            this.currentPage = 1; // Reset to first page whenever new data is loaded
            this.areasData = this.xmlSanitizerService.parseXml(xmlsr.innerHTML);
            this.areaDataView = this.paginatedAreasData; // Update areaDataView
            this.loadingService.hide();
          }
        } catch (e) {
          this.areaDataView = this.paginatedAreasData; // Update areaDataView
          console.log('Resposta não é JSON:', data); // Resposta HTML ou outro formato
          this.loadingService.hide();
        }
      },
      (error) => {
        this.areaDataView = this.paginatedAreasData; // Update areaDataView
        console.error('Error:', error);
        this.loadingService.hide();
      }
    );
  }

  get paginatedAreasData(): any {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.areasData ? this.areasData.slice(start, end) : [];
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.areaDataView = this.paginatedAreasData;
  }
}
