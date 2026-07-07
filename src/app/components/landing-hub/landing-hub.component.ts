import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-hub',
  standalone: true,
  imports: [],
  templateUrl: './landing-hub.component.html',
  styleUrl: './landing-hub.component.scss'
})
export class LandingHubComponent implements OnInit {
  processedTopLogoUrl = 'bravion group white.jpeg';
  processedFooterLogoUrl = 'bravion group black.jpeg';

  ngOnInit(): void {
    this.processLogo('bravion group white.jpeg?v=2', false, (url) => {
      this.processedTopLogoUrl = url;
    });
    this.processLogo('bravion group black.jpeg?v=2', true, (url) => {
      this.processedFooterLogoUrl = url;
    });
  }

  processLogo(src: string, isBlackBg: boolean, callback: (url: string) => void): void {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          if (isBlackBg) {
            // Key out black/dark background (close to 0,0,0)
            if (r < 25 && g < 25 && b < 25) {
              data[i + 3] = 0; // Alpha = 0
            }
          } else {
            // Key out white/light background (close to 255,255,255)
            if (r > 230 && g > 230 && b > 230) {
              data[i + 3] = 0; // Alpha = 0
            }
          }
        }
        ctx.putImageData(imgData, 0, 0);
        callback(canvas.toDataURL('image/png'));
      }
    };
  }
}
