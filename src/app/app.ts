import { Component, HostListener, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('birthday-site');

  /** True when the viewport is phone-sized and the experience is best on a bigger screen. */
  protected readonly isSmallScreen = signal(false);
  /** Lets the visitor bypass the suggestion and continue on their phone anyway. */
  protected readonly dismissed = signal(false);

  /** Phones are narrower than this; iPads/laptops are wider. */
  private static readonly MIN_WIDTH = 768;

  ngOnInit(): void {
    this.checkScreen();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkScreen();
  }

  protected continueAnyway(): void {
    this.dismissed.set(true);
  }

  private checkScreen(): void {
    if (typeof window === 'undefined') {
      return;
    }
    this.isSmallScreen.set(window.innerWidth < App.MIN_WIDTH);
  }
}
