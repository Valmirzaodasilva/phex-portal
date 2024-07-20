import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { states } from 'src/assets/utils/states';

@Component({
  selector: 'app-brazil-map',
  templateUrl: './brazil-map.component.html',
  styleUrls: ['./brazil-map.component.scss'],
})
export class BrazilMapComponent implements OnInit {
  chartOptions: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // TODO: Load the map of Brazil in service one
    this.http.get('assets/utils/brazil.json').subscribe((geoJson: any) => {
      echarts.registerMap('brazil', geoJson);

      // Decrease height by 200px
      this.chartOptions = {
        title: {
          text: 'Mapa do Brasil com Estados',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}',
        },

        color: ['#b2ff00'],
        series: [
          {
            type: 'map',
            map: 'brazil',
            label: {
              show: false,
            },
            itemStyle: {
              areaColor: '#fcfcfc', // Change the color of the states
            },

            emphasis: {
              label: {
                show: false,
              },
              itemStyle: {
                areaColor: '#ff0000', // Change the color of the states when hovered
              },
            },
            aspectScale: 1,
            data: states,
          },
        ],
      };

      const chartDom = document.getElementById('brazilMap')!;
      // chartDom.style.height = (chartDom.clientHeight - 500) + 'px';
      // chartDom.style.width = (chartDom.clientWidth - 200) + 'px';
      const myChart = echarts.init(chartDom);
      myChart.setOption(this.chartOptions);

      myChart.on('click', this.onChartClick);
    });
  }

  onChartClick(params: any): void {
    console.log('Estado clicado:', params.data);
  }
}
