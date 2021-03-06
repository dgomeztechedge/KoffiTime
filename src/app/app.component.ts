import { Component, AfterViewInit, HostListener } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) Canvas: ElementRef;
  @ViewChild('image', { static: false }) img: ElementRef;
  public context: CanvasRenderingContext2D;
  texto = 'KoffiTime';
  color = 'white';
  file: File = null;
  fileSrc: string = null;
  rutaImagen = '../assets/imgs/coffe.png';
  fuente = 48;
  ngAfterViewInit(): void {
    this.context = (this.Canvas.nativeElement as HTMLCanvasElement).getContext(
      '2d'
    );
    if (this.context) {
      this.drawImage();
    }
  }
  addText(x, y): void {
    this.drawImage();
    const arrayFrase = this.contarTexto(`"${this.texto}"`);
    setTimeout(() => {
      this.context.font = `${this.fuente}px Palatino`;
      this.context.fillStyle = this.color;
      this.context.textAlign = 'center';
      this.context.lineJoin = 'round';
      this.context.miterLimit = 2;
      this.context.strokeStyle = 'black';
      this.context.lineWidth = this.fuente / 10;

      if (arrayFrase.length !== 1) {
        y = y - (this.fuente + 10) * (arrayFrase.length / 2);
      }
      arrayFrase.forEach(frase => {
        this.context.strokeText(frase, x, y);
        this.context.fillText(frase, x, y);
        y += this.fuente + 10;
      });
      this.rutaImagen = (this.Canvas
        .nativeElement as HTMLCanvasElement).toDataURL();
    }, 250);
  }

  getCoordinates(event) {
    const rect = this.img.nativeElement;
    const differenceX = rect.scrollWidth / 991;
    const differenceY = rect.scrollHeight / 558;
    const x = event.clientX / differenceX - this.fuente * 4;
    const y = event.clientY / differenceY;
    this.addText(x, y);
  }
  contarTexto(text: string): string[] {
    const arrayText = text.split(' ');
    const arrayFinal: string[] = [];
    let stringTemporal = '';
    const fraseSize = 1152 / this.fuente;
    arrayText.forEach((x, index) => {
      stringTemporal = `${stringTemporal}${x} `;
      if (
        stringTemporal.length >= fraseSize ||
        index === arrayText.length - 1
      ) {
        arrayFinal.push(stringTemporal);
        stringTemporal = '';
      }
    });
    return arrayFinal;
  }
  drawImage(): void {
    const img = new Image();
    img.onload = x => {
      this.context.drawImage(img, 0, 0, 991, 558);
    };
    if (this.fileSrc === null) {
      img.src = '../assets/imgs/coffe.png';
    } else {
      img.src = this.fileSrc;
    }
  }

  @HostListener('paste', ['$event.clipboardData.files'])
  onPaste(e) {
    this.onFileSelected(e);
  }
  onChange(event) {
    this.color = event;
  }

  onFileSelected(file: FileList) {
    this.file = file.item(0);
    const img = new Image();
    const fr = new FileReader();
    fr.onload = x => {
      this.fileSrc = fr.result as string;
      img.src = fr.result as string;
    };
    img.onload = x => {
      this.context.drawImage(img, 0, 0, 991, 558);
      this.rutaImagen = (this.Canvas
        .nativeElement as HTMLCanvasElement).toDataURL();
    };
    fr.readAsDataURL(this.file);
  }
}
