import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maintenance',
  imports: [],
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.scss'
})
export class MaintenanceComponent implements OnInit {
  processedLogoUrl = 'bravion group black.jpeg';

  ngOnInit(): void {
    this.processLogo();
  }

  processLogo(): void {
    const img = new Image();
    img.src = 'bravion group black.jpeg?v=2';
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

          // Key out black/dark background
          if (r < 25 && g < 25 && b < 25) {
            data[i + 3] = 0; // Alpha = 0
          }
        }
        ctx.putImageData(imgData, 0, 0);
        this.processedLogoUrl = canvas.toDataURL('image/png');
      }
    };
  }
}
