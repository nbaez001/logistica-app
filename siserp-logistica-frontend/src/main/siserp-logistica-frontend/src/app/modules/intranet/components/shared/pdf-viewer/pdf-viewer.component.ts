import { Component, OnInit, Inject } from '@angular/core';
import { GenericService } from '../../../services/generic.service';
import { OutResponse } from '../../../dto/response/out.response';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {
  base64Pdf: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    @Inject(GenericService) private genericService: GenericService,
    private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.spinner.show();
    console.log('DATA REQUEST');
    console.log(this.data.objeto);
    this.descargarArchivo(this.data.objeto)
  }

  descargarArchivo(req): void {
    this.genericService.descargarArchivo(req.request, req.path).subscribe(
      (data: OutResponse<any>) => {
        if (data.rcodigo == 0) {
          this.base64Pdf = data.objeto.data;
          setTimeout(() => {
            this.spinner.hide();
          }, 700);
        }
      }, error => {
        console.log(error);
      });
  }

}
