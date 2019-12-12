import { Component, AfterViewInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit {
  @ViewChild("canvas", { static: false }) Canvas: ElementRef;
  public context: CanvasRenderingContext2D;
  title = "KoffiTime";
  texto = "KoffiTime";
  fuente = 48;
  ngAfterViewInit(): void {
    this.context = (this.Canvas.nativeElement as HTMLCanvasElement).getContext(
      "2d"
    );
    if (this.context) {
      this.drawImage();
    }
  }
  addText(): void {
    this.drawImage();
    const arrayFrase = this.contarTexto(`"${this.texto}"`);
    let y = 250;
    setTimeout(() => {
      this.context.font = "48px Palatino";
      this.context.fillStyle = "#FFFFFF";
      this.context.textAlign = "center";
      if (arrayFrase.length !== 1) {
        y = y - (this.fuente + 10) * (arrayFrase.length / 2);
      }
      arrayFrase.forEach(x => {
        this.context.fillText(x, 650, y);
        y += this.fuente + 10;
      });
    }, 250);
  }
  contarTexto(text: string): string[] {
    const arrayText = text.split(" ");
    const arrayFinal: string[] = [];
    let stringTemporal = "";
    arrayText.forEach((x, index) => {
      stringTemporal = `${stringTemporal}${x} `;
      if (stringTemporal.length >= 23 || index === arrayText.length - 1) {
        arrayFinal.push(stringTemporal);
        stringTemporal = "";
      }
    });
    return arrayFinal;
  }
  drawImage(): void {
    const img = new Image();
    img.onload = x => {
      this.context.drawImage(img, 0, 0);
    };
    img.src = "../assets/imgs/coffe.png";
  }
}
