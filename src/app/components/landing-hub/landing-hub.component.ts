import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-hub',
  standalone: true,
  imports: [],
  templateUrl: './landing-hub.component.html',
  styleUrl: './landing-hub.component.scss'
})
export class LandingHubComponent implements OnInit {
  processedTopLogoUrl = '';
  processedFooterLogoUrl = '';

  ngOnInit(): void {
    this.processLogos();
  }

  processLogos(): void {
    const img = new Image();
    img.src = 'bravion logo.jpg';
    img.onload = () => {
      // 1. Process Footer Logo (transparent bg, white text, exact red icon)
      const canvasFooter = document.createElement('canvas');
      canvasFooter.width = img.width;
      canvasFooter.height = img.height;
      const ctxFooter = canvasFooter.getContext('2d');
      if (ctxFooter) {
        ctxFooter.drawImage(img, 0, 0);
        const imgData = ctxFooter.getImageData(0, 0, canvasFooter.width, canvasFooter.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // If close to white (background), make it transparent
          if (r > 220 && g > 220 && b > 220) {
            data[i + 3] = 0; // Alpha = 0
          }
          // If close to black (text), make it white
          else if (r < 80 && g < 80 && b < 80) {
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
          }
        }
        ctxFooter.putImageData(imgData, 0, 0);
        this.processedFooterLogoUrl = canvasFooter.toDataURL('image/png');
      }

      // 2. Process Top Left Logo (transparent bg, exact black text, exact red icon)
      const canvasTop = document.createElement('canvas');
      canvasTop.width = img.width;
      canvasTop.height = img.height;
      const ctxTop = canvasTop.getContext('2d');
      if (ctxTop) {
        ctxTop.drawImage(img, 0, 0);
        const imgData = ctxTop.getImageData(0, 0, canvasTop.width, canvasTop.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // If close to white (background), make it transparent
          if (r > 220 && g > 220 && b > 220) {
            data[i + 3] = 0; // Alpha = 0
          }
        }
        ctxTop.putImageData(imgData, 0, 0);
        this.processedTopLogoUrl = canvasTop.toDataURL('image/png');
      }
    };
  }
}
