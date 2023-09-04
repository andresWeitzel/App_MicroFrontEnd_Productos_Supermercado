//External
import { Injectable } from "@angular/core";
//Services
//Highchart and Treemap chart
import * as Highcharts from "highcharts";
import More from "highcharts/highcharts-more";
import Tree from "highcharts/modules/treemap";
import Heatmap from "highcharts/modules/heatmap";

@Injectable({
  providedIn: "root",
})
export class GenerateHighchartsService {
  constructor() {}

  highchart: typeof Highcharts = Highcharts;
  highchartOptions: Highcharts.Options;

  setHeatmap() {
    More(Highcharts);
    Tree(Highcharts);
    Heatmap(Highcharts);
  }

  getHeatmap() {
    this.setHeatmap();
    return this.highchart;
  }
  getHeatmapOptions() {
    this.setHeatmap();
    return (this.highchartOptions = {
      credits: {
        enabled: false,
      },
      chart: {
        height: 250,
        width: 800,
        inverted: true,
      },
      title: {
        text: "",
      },
      tooltip: {
        pointFormat: "<b><strong>{point.name}</strong></b>",
      },
      series: [
        {
          type: "treemap",
          layoutAlgorithm: "stripes",
          alternateStartingDirection: true,
          levels: [
            {
              level: 1,
              layoutAlgorithm: "stripes",
              dataLabels: {
                enabled: true,

                align: "left",
                verticalAlign: "top",
                style: {
                  fontSize: "13px",
                  fontWeight: "bold",
                },
              },
            },
          ],
          data: [
            {
              //-----------------BEBIDAS-------------------
              id: "Beb",
              name: "BEBIDAS",
              color: "rgb(18, 92, 19)",
            },
            {
              name: "Agua",
              parent: "Beb",
              value: 1,
            },
            {
              name: "Vinos",
              parent: "Beb",
              value: 1,
            },
            {
              name: "Gaseosas",
              parent: "Beb",
              value: 1,
            },
            //-----------------CARNES/PESCADOS-------------------
            {
              id: "Car/Pes",
              name: "CARNES Y PESCADOS",
              color: "rgb(35, 112, 20)",
            },
            {
              name: "Carne Vacuna",
              parent: "Car/Pes",
              value: 1,
            },
            {
              name: "Pollo/Granja",
              parent: "Car/Pes",
              value: 1,
            },
            //-----------------CONGELADOS-------------------
            {
              id: "Cong",
              name: "CONGELADOS",
              color: "rgb(55, 124, 25)",
            },
            {
              name: "Nugg/Rebozados",
              parent: "Cong",
              value: 1,
            },
            {
              name: "Hamburguesas",
              parent: "Cong",
              value: 1,
            },
            {
              name: "Helados",
              parent: "Cong",
              value: 1,
            },
            //-----------------LACTEOS/FRESCOS-------------------

            {
              id: "Lact",
              name: "LÁCTEOS Y FRESCOS",
              color: "rgb(75, 134, 30)",
            },
            {
              name: "Leches",
              parent: "Lact",
              value: 1,
            },
            {
              name: "Yogures",
              parent: "Lact",
              value: 1,
            },

            //-----------------FRUTAS/VERDURAS-------------------
            {
              id: "Frut/Ver",
              name: "FRUTAS Y VERDURAS",
              color: "rgb(100, 144, 35)",
            },
            {
              name: "Verduras",
              parent: "Frut/Ver",
              value: 1,
            },
            {
              name: "Frutas",
              parent: "Frut/Ver",
              value: 1,
            },
          ],
        },
      ],
    });
  }
}
