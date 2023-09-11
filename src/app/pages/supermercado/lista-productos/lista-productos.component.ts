import { Component, OnInit } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { ProductoDto } from "src/app/models/ProductoDto";
import { ProductoService } from "src/app/services/producto/producto.service";
import { TokenService } from "src/app/services/token/token.service";
import { GenerateFilesService } from "src/app/services/utilities/generate-files.service";
import { ToastNotificationService } from "src/app/services/utilities/toast-notification.service";
import { SpinLoaderService } from "src/app/services/utilities/spin-loader.service";
import { GenerateHighchartsService } from "src/app/services/utilities/generate-highcharts.service";

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
  products: ProductoDto[] = [];
  productSelected: ProductoDto[] = [];
  idProductSelected: number = 0;
  codeProductSelected: string = "";
  nameProductSelected: string = "";

  //Filters Products
  productsSearchFilter: string = "";
  productsFieldSearch: string = "";

  //Segurity
  isAdmin = false;
  isUser = false;

  //List & Paginated
  tableTypeListed = true;
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
  //Highcharts
  Highchart = this.generateHighcharts.getHeatmap();
  HighchartOptions = this.generateHighcharts.getHeatmapOptions();
  //Fix

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
    private spinLoaderService: SpinLoaderService,
    private generateHighcharts: GenerateHighchartsService
  ) {}

  ngOnInit() {
    this.listProducts();
    this.checkDeleteProducts();
  }

  // =======================
  // ===== LIST PRODUCTS ===
  // =======================
  listProducts() {
    this.productoService
      .listado(this.nroPage, this.nroElements, this.orderBy, this.direction)
      .subscribe(
        (data: any) => {
          this.products = data.content;
          this.isFirstPage = data.first;
          this.isLastPage = data.last;
          this.totalPages = data.totalPages;
          this.nroCurrentElements = data.numberOfElements;
          this.nroTotalElements = data.totalElements;
        },
        (error) => {
          this.errMsj = error.message;
          console.log(this.errMsj);
          this.toastService.error(this.errMsj);
        }
      );
  }

  // ====================================
  // ===== LIST PRODUCTS WITH FILTERS ===
  // ====================================
  listProductsFilterAndField() {
    this.productoService
      .listadoFilterAndField(
        this.productsFieldSearch,
        this.productsSearchFilter,
        this.nroPage,
        this.nroElements,
        this.orderBy,
        this.direction
      )
      .subscribe(
        (data: any) => {
          this.products = data.content;
          this.isFirstPage = data.first;
          this.isLastPage = data.last;
          this.totalPages = data.totalPages;
          this.nroCurrentElements = data.numberOfElements;
          this.nroTotalElements = data.totalElements;
        },
        (error) => {
          this.errMsj = error.message;
          console.log(this.errMsj);
          this.toastService.error(this.errMsj);
        }
      );
  }

  // ==================================
  // ===== SET FILTERS FOR PRODUCTS ===
  // ===================================
  setFilter(campo: string, filtro: string) {
    try {
      this.productsFieldSearch = "";
      this.productsSearchFilter = "";

      if (filtro === "" || filtro === null || campo === "" || campo === null) {
        this.listProducts();
      } else {
        this.productsFieldSearch = campo;
        this.productsSearchFilter = filtro;

        this.listProductsFilterAndField();
      }
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // ===============================
  // ===== EDIT PRODUCT NAVIGATE ===
  // ===============================
  navigateEditProduct(producto: any): void {
    try {
      this.spinLoaderService.load(100);

      this.navigationExtras.state["value"] = producto;
      this.router.navigate(["editar-productos"], this.navigationExtras);
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // =============================
  // ===== CHECK TOKEN SERVICE ===
  // ===== FOR DELETE PRODUCT  ===
  //==============================
  checkDeleteProducts() {
    try {
      this.isAdmin = this.tokenService.isAdmin();
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // =========================
  // ===== DELETE PRODUCTS ===
  // =========================
  deleteProduct(id: number): void {
    this.spinLoaderService.load(100);

    this.productoService.delete(id).subscribe(
      (data: any) => {
        this.toastService.successfulOperation("Se ha eliminado el Producto");

        setTimeout(() => {
          this.refresh();
        }, 2100);
      },
      (error) => {
        this.errMsj = error.message;
        console.log(this.errMsj);
        this.toastService.error(this.errMsj);
      }
    );
  }

  // ====================================
  // ===== DELETE PRODUCT ERROR AUTH===
  // =====================================
  deleteProductNoAuth(id: number): void {
    try {
      this.spinLoaderService.load(100);

      this.toastService.unauthorizedOperation(
        "Servicio Habilitado para administradores!!"
      );

      setTimeout(() => {
        this.refresh();
      }, 2100);
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // =========================
  // ===== RELOAD-REFRESH===
  // =========================
  refresh() {
    try {
      window.location.reload();
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // =========================
  // ===== SET PRODUCT SELECT===
  // =========================
  setProductSelected(producto: ProductoDto) {
    try {
      this.idProductSelected = producto.id;
      this.codeProductSelected = producto.codigo;
      this.nameProductSelected = producto.nombre;
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }

  // ====================
  // ===== SET TYPE LIST===
  // ====================
  setTableTypeListed(set: boolean) {
    try {
      this.tableTypeListed = set;
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
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

      if (this.productsSearchFilter == "" || this.productsSearchFilter == null) {
        this.listProducts();
      } else {
        this.listProductsFilterAndField();
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
  lastPage(): void {
    try {
      if (this.productsSearchFilter == "" || this.productsSearchFilter == null) {
        if (this.nroPage != 0 && this.nroPage > 0) {
          this.nroPage--;
          this.listProducts();
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
  nextPage(): void {
    try {
      if (this.productsSearchFilter == "" || this.productsSearchFilter == null) {
        if (!this.isLastPage && this.nroPage >= 0) {
          this.nroPage++;
          this.listProducts();
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
  changePage(pagina: number): void {
    try {
      this.nroPage = pagina;

      if (this.productsSearchFilter == "" || this.productsSearchFilter == null) {
        this.listProducts();
      } else {
        this.listProductsFilterAndField();
      }
    } catch (error) {
      this.errMsj = error.message;
      console.log(this.errMsj);
      this.toastService.error(this.errMsj);
    }
  }
  // ======================
  // ===== GET PAGINATE ===
  // ======================

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
}
