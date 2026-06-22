import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Popper {
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  rotate: number;
  shape: 'rect' | 'circle' | 'triangle';
}

interface Potato {
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotate: number;
}

interface BurstPiece {
  tx: number;
  ty: number;
  color: string;
  size: number;
  rotate: number;
  duration: number;
}

type DropMode = 'confetti' | 'potato';

@Component({
  selector: 'app-celebration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './celebration.html',
  styleUrl: './celebration.css'
})
export class Celebration implements OnInit, OnDestroy {
  poppers: Popper[] = [];
  potatoes: Potato[] = [];
  mode: DropMode = 'potato';
  showButton = false;
  celebrating = false;
  burst: BurstPiece[] = [];

  private readonly colors = [
    '#ff595e', '#ffca3a', '#8ac926', '#1982c4',
    '#6a4c93', '#ff7b00', '#f15bb5', '#00bbf9'
  ];
  private readonly shapes: Popper['shape'][] = ['rect', 'circle', 'triangle'];
  private revealTimer?: ReturnType<typeof setTimeout>;
  private navigateTimer?: ReturnType<typeof setTimeout>;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.poppers = Array.from({ length: 80 }, () => this.createPopper());
    this.potatoes = Array.from({ length: 35 }, () => this.createPotato());

    // The plane finishes its ~6s flight; drop the button when it has
    // almost crossed the screen (~80% of the way).
    this.revealTimer = setTimeout(() => {
      this.showButton = true;
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.revealTimer) {
      clearTimeout(this.revealTimer);
    }
    if (this.navigateTimer) {
      clearTimeout(this.navigateTimer);
    }
  }

  private createPopper(): Popper {
    return {
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      size: 8 + Math.random() * 10,
      rotate: Math.random() * 360,
      shape: this.shapes[Math.floor(Math.random() * this.shapes.length)]
    };
  }

  private createPotato(): Potato {
    return {
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
      size: 26 + Math.random() * 24,
      rotate: Math.random() * 360
    };
  }

  toggleMode(): void {
    this.mode = this.mode === 'confetti' ? 'potato' : 'confetti';
  }

  continue(): void {
    if (this.celebrating) {
      return;
    }
    // Pop a confetti burst out of the button, then move to the next
    // page after a 2s delay.
    this.celebrating = true;
    this.burst = Array.from({ length: 380 }, () => this.createBurstPiece());
    this.navigateTimer = setTimeout(() => {
      this.router.navigate(['/timeline']);
    }, 1500);
  }

  private createBurstPiece(): BurstPiece {
    const angle = Math.random() * Math.PI * 2;
    // Elliptical reach: horizontal spans ~half the width, vertical reaches
    // the top and bottom of the screen. sqrt() distributes pieces evenly
    // across the area (instead of clustering at the edge) so there are no
    // big gaps.
    const reachX = window.innerWidth * 0.5;
    const reachY = window.innerHeight * 0.6;
    const factor = Math.sqrt(Math.random());
    return {
      tx: Math.cos(angle) * reachX * factor,
      ty: Math.sin(angle) * reachY * factor,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      size: 16 + Math.random() * 20,
      rotate: Math.random() * 720 - 360,
      duration: 1 + Math.random() * 0.8
    };
  }
}
