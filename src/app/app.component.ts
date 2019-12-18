import { Component, AfterViewInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) Canvas: ElementRef;
  @ViewChild('image', {static: false}) img: ElementRef;
  public context: CanvasRenderingContext2D;
  title = 'KoffiTime';
  texto = 'KoffiTime';
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
  addText(x,y): void {
    this.drawImage();
    const arrayFrase = this.contarTexto(`"${this.texto}"`);
    setTimeout(() => {
      this.context.font = `${this.fuente}px Palatino`;
      this.context.fillStyle = '#FFFFFF';
      this.context.textAlign = 'center';
      if (arrayFrase.length !== 1) {
        y = y - (this.fuente + 10) * (arrayFrase.length / 2);
      }
      arrayFrase.forEach(frase => {
        this.context.fillText(frase, x, y);
        y += this.fuente + 10;
      });
      this.rutaImagen = (this.Canvas
        .nativeElement as HTMLCanvasElement).toDataURL();
    }, 250);
  }

  getCoordinates(event) {
    const rect = (this.img.nativeElement);
    const differenceX = rect.scrollWidth / 991;
    const differenceY = rect.scrollHeight / 558;
    var x =  (event.clientX / differenceX) - (this.fuente * 4);
    var y =  event.clientY / differenceY ;
    console.log(x,y)
    this.addText(x, y);
  }
  contarTexto(text: string): string[] {
    const arrayText = text.split(' ');
    const arrayFinal: string[] = [];
    let stringTemporal = '';
    const fraseSize = (1152 / this.fuente);
    arrayText.forEach((x, index) => {
      stringTemporal = `${stringTemporal}${x} `;
      if (stringTemporal.length >= fraseSize || index === arrayText.length - 1
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
      this.context.drawImage(img, 0, 0);
    };
    img.src = '../assets/imgs/coffe.png';
  }
}
