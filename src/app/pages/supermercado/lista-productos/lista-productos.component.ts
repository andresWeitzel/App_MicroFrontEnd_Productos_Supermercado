import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { ProductoDto } from "src/app/models/ProductoDto";
import { ProductoService } from "src/app/services/producto/producto.service";
import { TokenService } from "src/app/services/token/token.service";
import { GenerateFilesService } from "src/app/services/utilities/generate-files.service";
import { ToastNotificationService } from "src/app/services/utilities/toast-notification.service";
import { SpinLoaderService } from "src/app/services/utilities/spin-loader.service";

//Highchart and Treemap chart
import * as Highcharts from "highcharts";
import More from "highcharts/highcharts-more";
import Tree from "highcharts/modules/treemap";
import Heatmap from "highcharts/modules/heatmap";


More(Highcharts);
Tree(Highcharts);
Heatmap(Highcharts);

@Component({
  selector: "app-lista-productos",
  templateUrl: "./lista-productos.component.html",
  styleUrls: ["./lista-productos.component.scss"],
})
export class ListaProductosComponent implements OnInit {
  //ImgPaths
  imgHelp = "assets/icons/idea.png";
  imgCsv = "assets/icons/csv.png";
  imgExcel = "assets/icons/excel.png";
  imgPdf = "assets/icons/pdf (3).png";
  imgSearch = "assets/icons/search02.png";
  imgRecycle = "assets/icons/recycle.png";
  //Table list
  imgSortUp = "assets/icons/sortUp.png";
  imgSortDown = "assets/icons/sortDown.png";
  imgEditProduct = "assets/icons/edit.png";
  imgDeleteProduct = "assets/icons/delete.png";
  //Pagination
  imgLastPagePrevious = "assets/icons/lastPagePrevious.png";
  imgPagePrevious = "assets/icons/pagePrevious.png";

  //Product
  productos: ProductoDto[] = [];
  productoSelect: ProductoDto[] = [];
  idProdSelect: number = 0;
  codProdSelect: string = "";
  nombrProdSelect: string = "";
  nroProdAgua = 3;

  //Filters Products
  filtroProdBusqueda: string = "";
  filtroProdCampo: string = "";

  //Segurity
  isAdmin = false;
  isUser = false;

  //List & Paginated
  typeListTable = true;
  nroPage = 0;
  isFirstPage = false;
  isLastPage = false;
  totalPages = 0;
  nroElements = 10;
  nroCurrentElements = 0;
  nroTotalElements = 0;
  orderBy = "id";
  direction = "asc";

  //Errors
  errMsj: string;

  navigationExtras: NavigationExtras = {
    state: {
      value: null,
    },
  };

  constructor(
    private router: Router,
    private productoService: ProductoService,
    private tokenService: TokenService,
    private generateFileService: GenerateFilesService,
    private toastService: ToastNotificationService,
    private spinLoaderService: SpinLoaderService
  ) {}

  ngOnInit() {
    this.listarProductos();
    this.checkEliminarProducto();
  }

  // ======================
  // ===== PRODUCT LIST ===
  // ======================
  listarProductos() {
    this.productoService
      .listado(this.nroPage, this.nroElements, this.orderBy, this.direction)
      .subscribe(
        (data: any) => {
          this.productos = data.content;
          this.isFirstPage = data.first;
          this.isLastPage = data.last;
          this.totalPages = data.totalPages;
          this.nroCurrentElements = data.numberOfElements;
          this.nroTotalElements = data.totalElements;
        },
        (err) => {

          this.errMsj = err.error.message;
          console.log(this.errMsj);
          this.toastService.error(this.errMsj);
        }
      );
  }

  // ==================================
  // ===== PRODUCT LIST WITH FILTERS ===
  // ===================================
  listarProductosFilterAndField() {
    this.productoService
      .listadoFilterAndField(
        this.filtroProdCampo,
        this.filtroProdBusqueda,
        this.nroPage,
        this.nroElements,
        this.orderBy,
        this.direction
      )
      .subscribe(
        (data: any) => {
          this.productos = data.content;
          this.isFirstPage = data.first;
          this.isLastPage = data.last;
          this.totalPages = data.totalPages;
          this.nroCurrentElements = data.numberOfElements;
          this.nroTotalElements = data.totalElements;
        },
        (err) => {
          this.errMsj = err.message;
          console.log(this.errMsj);
          this.toastService.error(this.errMsj);
        }
      );
  }

  // ==================================
  // ===== SET FILTERS FOR PRODUCTS ===
  // ===================================
  setFilter(campo: string, filtro: string) {
    this.filtroProdCampo = '';
    this.filtroProdBusqueda = '';

    if (filtro === ('' || null) || campo === ('' || null)) {
      this.listarProductos();
    } else {
      this.filtroProdCampo = campo;
      this.filtroProdBusqueda = filtro;

      this.listarProductosFilterAndField();
    }
  }

  // =======================
  // ===== EDIT PRODUCTS ===
  // =======================
  editarProducto(producto: any): void {

    this.spinLoaderService.load(100);

    this.navigationExtras.state["value"] = producto;
    this.router.navigate(["editar-productos"], this.navigationExtras);
  }

  // =============================
  // ==== CHECK DELETE PRODUCTS ===
  // ==============================
  checkEliminarProducto() {
    this.isAdmin = this.tokenService.isAdmin();
  }

  // =======================
  // ===== DELETE PRODUCTS ===
  // =======================
  eliminarProducto(id: number): void {

    this.spinLoaderService.load(100);


    this.productoService.delete(id).subscribe(
      (data: any) => {
        this.toastService.successfulOperation("Se ha eliminado el Producto");

        setTimeout(() => {
          this.refresh();
        }, 2100);
      },
      (err) => {
        this.errMsj = err.error.message;
        console.log(this.errMsj);
        this.toastService.error(this.errMsj);
      }
    );
  }

  // ====================================
  // ===== DELETE PRODUCT ERROR AUTH===
  // =====================================
  eliminarProductoNoAuth(id: number): void {

    this.spinLoaderService.load(100);


    this.toastService.unauthorizedOperation(
      "Servicio Habilitado para administradores!!"
    );

    setTimeout(() => {
      this.refresh();
    }, 2100);
  }

  // =========================
  // ===== RECARGAR-REFRESH===
  // =========================
  refresh() {
    window.location.reload();
  }

  // ====================
  // ===== SET PRODUCT===
  // ====================
  setProductoSelect(producto: ProductoDto) {
    this.idProdSelect = producto.id;
    this.codProdSelect = producto.codigo;
    this.nombrProdSelect = producto.nombre;
  }

  // ====================
  // ===== SET TYPE LIST===
  // ====================
  setTypeListTable(set: boolean) {
    this.typeListTable = set;
  }

  // =====================
  // ===== PAGINATION ===
  // =====================

  // =====================
  // ===== ORDER BY ===
  // =====================
  orderByDirection(type: string, direct: string): void {
    try {
      this.orderBy = type;
      this.direction = direct;

      if (this.filtroProdBusqueda == ("" || null)) {
        this.listarProductos();
      } else {
        this.listarProductosFilterAndField();
      }
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // =====================
  // ===== LAST PAGE===
  // =====================
  paginaAnterior(): void {
    try {
      if (this.filtroProdBusqueda == ("" || null)) {
        if (this.nroPage != 0 && this.nroPage > 0) {
          this.nroPage--;
          this.listarProductos();
        } else {
          this.toastService.error("No es posible disminuir una página!!");
        }
      }
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }
  // =====================
  // ===== NEXT PAGE===
  // =====================
  paginaSiguiente(): void {
    try {
      if (this.filtroProdBusqueda === ("" || null)) {
        if (!this.isLastPage && this.nroPage >= 0) {
          this.nroPage++;
          this.listarProductos();
        } else {
          this.toastService.error("No es posible aumentar una página!!");
        }
      }
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }
  // =====================
  // ===== CHANGE PAGE===
  // =====================
  cambiarPagina(pagina: number): void {
    try {
      this.nroPage = pagina;

      if (this.filtroProdBusqueda === "" || this.filtroProdBusqueda === null) {
        this.listarProductos();
      } else {
        this.listarProductosFilterAndField();
      }
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  getPaginate() {
    try {
      var paginate = {
        nroPage: this.nroPage,
        totalPages: this.totalPages,
        nroCurrentElements: this.nroCurrentElements,
        nroTotalElements: this.nroTotalElements,
      };
      return paginate;
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // =========================
  // ===== GENERATE EXCEL===
  // =========================

  generateExcel(): void {
    try {
      let nameExcel = "listaProductos.xlsx";

      let data = document.getElementById("table");

      let paginate = this.getPaginate();

      this.generateFileService.generateExcel(nameExcel, data, paginate);
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // =====================
  // ===== GENERATE CSV===
  // =====================

  generateCsv(): void {
    try {
      let nameCsv = "listaProductos.csv";

      let data = document.getElementById("table");

      this.generateFileService.generateCsv(nameCsv, data);
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // =====================
  // ===== GENERATE PDF===
  // =====================
  generatePdf(): void {
    try {
      let namePdf = "listaComponentes.pdf";
      let data: any = document.getElementById("table");

      this.generateFileService.generatePdf(namePdf, data);
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // =====================
  // ===== HIGHCHART===
  // =====================
  Highcharts03: typeof Highcharts = Highcharts;

  chartOptions03: Highcharts.Options = {
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
  };
}
