import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-hub',
  standalone: true,
  imports: [],
  templateUrl: './landing-hub.component.html',
  styleUrl: './landing-hub.component.scss'
})
export class LandingHubComponent {
  isNavigating = false;
  navigationTarget = '';

  navigateTo(event: Event, targetUrl: string, targetName: string): void {
    event.preventDefault();
    this.navigationTarget = targetName;
    this.isNavigating = true;

    // Direct page redirect after transition completes
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 1000);
  }
}
