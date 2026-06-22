import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Photo {
  image?: string;
  paper: string;  // soft interior-design paper tint, unique-ish per frame
  aspect: 'portrait' | 'landscape' | 'square';
  left: number;   // %
  top: number;    // %
  width: number;  // vw
  rotate: number; // deg
  z: number;
  tear: 1 | 2 | 3; // which torn-edge variant
}

interface Doodle {
  icon: string;   // art/stationery emoji
  left: number;   // %
  top: number;    // %
  size: number;   // rem
  rotate: number; // deg
  delay: number;  // s, staggers the gentle float
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './timeline.html',
  styleUrl: './timeline.css'
})
export class Timeline {
  // Scattered, overlapping scrapbook of recent photos that blankets the screen.
  // Each frame gets its own soft interior-design paper tint so no two
  // neighbours feel the same.
  photos: Photo[] = [
    // Row 1
    { image: '/timeline/Image-1.jpg',    paper: '#fbf7ef', aspect: 'portrait',  left: 1,  top: 1,  width: 23, rotate: -6, z: 2, tear: 1 },
    { image: '/timeline/Image-2.jpg',    paper: '#f0e2cd', aspect: 'landscape', left: 26, top: 1,  width: 26, rotate: 4,  z: 4, tear: 2 },
    { image: '/timeline/Image-3.jpg',    paper: '#e8ecdf', aspect: 'square',    left: 52, top: 2,  width: 21, rotate: -3, z: 3, tear: 3 },
    { image: '/timeline/Image-4.jpg', paper: '#f6e2d4', aspect: 'portrait',  left: 75, top: 0,  width: 22, rotate: 6,  z: 5, tear: 1 },
    // Row 2
    { image: '/timeline/Image-5.jpg',    paper: '#e4ebef', aspect: 'landscape', left: 3,  top: 17, width: 25, rotate: 5,  z: 6, tear: 2 },
    { image: '/timeline/Image-6.jpg',    paper: '#f3e4e3', aspect: 'square',    left: 30, top: 16, width: 21, rotate: -5, z: 7, tear: 3 },
    { image: '/timeline/Image-7.jpg',    paper: '#eee0d4', aspect: 'portrait',  left: 53, top: 17, width: 22, rotate: 4,  z: 6, tear: 1 },
    { image: '/timeline/Image-8.jpg', paper: '#eae9d6', aspect: 'landscape', left: 73, top: 18, width: 26, rotate: -4, z: 5, tear: 2 },
    // Row 3
    { image: '/timeline/Image-9.jpg',    paper: '#ece7f0', aspect: 'portrait',    left: 2,  top: 33, width: 22, rotate: -4, z: 4, tear: 3 },
    { image: '/timeline/Image-10.jpg',    paper: '#e1ebe5', aspect: 'landscape', left: 26, top: 34, width: 26, rotate: 5,  z: 6, tear: 1 },
    { image: '/timeline/Image-11.jpg',    paper: '#f7e8db', aspect: 'square',  left: 55, top: 33, width: 22, rotate: -6, z: 7, tear: 2 },
    { image: '/timeline/Image-12.jpg', paper: '#f5efe6', aspect: 'landscape',    left: 76, top: 34, width: 23, rotate: 4,  z: 8, tear: 3 },
    // Row 4
    { image: '/timeline/Image-13.jpg',    paper: '#f0e2cd', aspect: 'portrait',  left: 1,  top: 49, width: 23, rotate: -5, z: 3, tear: 1 },
    { image: '/timeline/Image-14.jpg',    paper: '#e8ecdf', aspect: 'landscape', left: 27, top: 50, width: 26, rotate: 3,  z: 5, tear: 2 },
    { image: '/timeline/Image-15.jpg',    paper: '#f3e4e3', aspect: 'square',    left: 52, top: 49, width: 21, rotate: -4, z: 4, tear: 3 },
    { image: '/timeline/Image-16.jpg', paper: '#e4ebef', aspect: 'portrait',  left: 74, top: 50, width: 22, rotate: 5,  z: 6, tear: 1 },
    // Row 5
    { image: '/timeline/Image-17.jpg',    paper: '#f6e2d4', aspect: 'landscape', left: 3,  top: 65, width: 25, rotate: 4,  z: 5, tear: 2 },
    { image: '/timeline/Image-18.jpg',    paper: '#eae9d6', aspect: 'square',    left: 29, top: 66, width: 21, rotate: -6, z: 7, tear: 3 },
    { image: '/timeline/Image-19.jpg',    paper: '#ece7f0', aspect: 'portrait',  left: 54, top: 65, width: 22, rotate: 5,  z: 6, tear: 1 },
    { image: '/timeline/Image-20.jpg', paper: '#eee0d4', aspect: 'landscape', left: 73, top: 66, width: 26, rotate: -3, z: 5, tear: 2 },
    // Row 6
    { image: '/timeline/Image-21.jpg',    paper: '#e1ebe5', aspect: 'portrait',    left: 2,  top: 81, width: 22, rotate: -4, z: 4, tear: 3 },
    { image: '/timeline/Image-22.jpg',    paper: '#fbf7ef', aspect: 'square', left: 26, top: 82, width: 26, rotate: 5,  z: 6, tear: 1 },
    { image: '/timeline/Image-23.jpg',    paper: '#f7e8db', aspect: 'square',  left: 55, top: 81, width: 22, rotate: -6, z: 7, tear: 2 },
    { image: '/timeline/Image-24.jpg', paper: '#f5efe6', aspect: 'portrait',    left: 76, top: 82, width: 23, rotate: 4,  z: 8, tear: 3 },
  ];

  // Art & stationery doodles drifting in the background behind the photos.
  doodles: Doodle[] = [
    { icon: '🎨', left: 8,  top: 4,  size: 3.2, rotate: -12, delay: 0   },
    { icon: '✏️', left: 44, top: 7,  size: 2.6, rotate: 28,  delay: 1.1 },
    { icon: '📏', left: 88, top: 5,  size: 3.0, rotate: -18, delay: 2.0 },
    { icon: '🖌️', left: 18, top: 15, size: 2.8, rotate: 16,  delay: 0.6 },
    { icon: '📐', left: 64, top: 13, size: 3.1, rotate: -24, delay: 1.7 },
    { icon: '🖍️', left: 92, top: 20, size: 2.5, rotate: 20,  delay: 2.6 },
    { icon: '✂️', left: 5,  top: 27, size: 2.7, rotate: -14, delay: 0.3 },
    { icon: '🖊️', left: 38, top: 24, size: 2.4, rotate: 30,  delay: 1.4 },
    { icon: '🎨', left: 70, top: 28, size: 3.0, rotate: 12,  delay: 2.2 },
    { icon: '📏', left: 22, top: 38, size: 2.9, rotate: 22,  delay: 0.9 },
    { icon: '🖌️', left: 84, top: 36, size: 2.8, rotate: -20, delay: 1.9 },
    { icon: '✏️', left: 50, top: 42, size: 2.6, rotate: -10, delay: 2.8 },
    { icon: '🖍️', left: 10, top: 50, size: 2.7, rotate: 18,  delay: 0.5 },
    { icon: '📐', left: 40, top: 55, size: 3.1, rotate: 14,  delay: 1.6 },
    { icon: '🎨', left: 90, top: 52, size: 2.9, rotate: -16, delay: 2.4 },
    { icon: '🖊️', left: 28, top: 62, size: 2.5, rotate: 26,  delay: 0.8 },
    { icon: '✂️', left: 60, top: 64, size: 2.7, rotate: -22, delay: 1.8 },
    { icon: '📏', left: 6,  top: 70, size: 3.0, rotate: 12,  delay: 2.7 },
    { icon: '✏️', left: 46, top: 74, size: 2.6, rotate: -28, delay: 0.4 },
    { icon: '🖌️', left: 82, top: 72, size: 2.8, rotate: 20,  delay: 1.5 },
    { icon: '🖍️', left: 16, top: 82, size: 2.7, rotate: -14, delay: 2.3 },
    { icon: '🎨', left: 54, top: 86, size: 3.1, rotate: 16,  delay: 0.7 },
    { icon: '📐', left: 90, top: 84, size: 2.9, rotate: -18, delay: 1.3 },
    { icon: '🖊️', left: 34, top: 92, size: 2.5, rotate: 24,  delay: 2.5 },
  ];
}
