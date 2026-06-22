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
  // Formats to try, in order, when a photo's file extension doesn't match.
  // Lets you drop in .jpg, .jpeg, .png or .webp without editing the data below.
  private readonly imgExts = ['jpg', 'jpeg', 'png', 'webp'];

  // On a 404, retry the same base filename with the next supported extension.
  onImgError(ev: Event): void {
    const img = ev.target as HTMLImageElement;
    const tried = Number(img.dataset['extIdx'] ?? 0) + 1;
    if (tried >= this.imgExts.length) {
      img.style.display = 'none'; // give up; the paper tint shows through
      return;
    }
    img.dataset['extIdx'] = String(tried);
    img.src = img.src.replace(/\.[^/.]+$/, '.' + this.imgExts[tried]);
  }

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
    { image: '/timeline/Image-5.jpg',    paper: '#e4ebef', aspect: 'portrait', left: 3,  top: 17, width: 25, rotate: 5,  z: 6, tear: 2 },
    { image: '/timeline/Image-6.jpg',    paper: '#f3e4e3', aspect: 'square',    left: 30, top: 16, width: 21, rotate: -5, z: 7, tear: 3 },
    { image: '/timeline/Image-7.jpg',    paper: '#eee0d4', aspect: 'portrait',  left: 53, top: 17, width: 22, rotate: 4,  z: 6, tear: 1 },
    { image: '/timeline/Image-8.jpg', paper: '#eae9d6', aspect: 'landscape', left: 73, top: 18, width: 26, rotate: -4, z: 5, tear: 2 },
    // Row 3
    { image: '/timeline/Image-9.jpg',    paper: '#ece7f0', aspect: 'portrait',    left: 2,  top: 33, width: 22, rotate: -4, z: 4, tear: 3 },
    { image: '/timeline/Image-10.jpg',    paper: '#e1ebe5', aspect: 'landscape', left: 26, top: 34, width: 26, rotate: 5,  z: 6, tear: 1 },
    { image: '/timeline/Image-11.jpg',    paper: '#f7e8db', aspect: 'square',  left: 55, top: 33, width: 22, rotate: -6, z: 7, tear: 2 },
    { image: '/timeline/Image-12.jpg', paper: '#f5efe6', aspect: 'portrait',    left: 76, top: 34, width: 23, rotate: 4,  z: 8, tear: 3 },
    // Row 4
    { image: '/timeline/Image-13.jpg',    paper: '#f0e2cd', aspect: 'portrait',  left: 1,  top: 49, width: 23, rotate: -5, z: 3, tear: 1 },
    { image: '/timeline/Image-14.jpg',    paper: '#e8ecdf', aspect: 'portrait', left: 27, top: 50, width: 26, rotate: 3,  z: 5, tear: 2 },
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
    // gap between row 1 & 2
    { icon: '🎨', left: 14, top: 12, size: 3.2, rotate: -12, delay: 0 },
    { icon: '✏️', left: 42, top: 11, size: 2.6, rotate: 28, delay: 1.1 },
    { icon: '📏', left: 68, top: 13, size: 3.0, rotate: -18, delay: 2.0 },
    { icon: '🖌️', left: 90, top: 12, size: 2.8, rotate: 16, delay: 0.6 },
  
    // gap between row 2 & 3
    { icon: '📐', left: 8, top: 30, size: 3.1, rotate: -24, delay: 1.7 },
    { icon: '🖍️', left: 32, top: 29, size: 2.5, rotate: 20, delay: 2.6 },
    { icon: '✂️', left: 58, top: 31, size: 2.7, rotate: -14, delay: 0.3 },
    { icon: '🖊️', left: 84, top: 30, size: 2.4, rotate: 30, delay: 1.4 },
  
    // gap between row 3 & 4
    { icon: '🎨', left: 18, top: 46, size: 3.0, rotate: 12, delay: 2.2 },
    { icon: '📏', left: 46, top: 45, size: 2.9, rotate: 22, delay: 0.9 },
    { icon: '🖌️', left: 72, top: 47, size: 2.8, rotate: -20, delay: 1.9 },
    { icon: '✏️', left: 92, top: 46, size: 2.6, rotate: -10, delay: 2.8 },
  
    // gap between row 4 & 5
    { icon: '🖍️', left: 12, top: 62, size: 2.7, rotate: 18, delay: 0.5 },
    { icon: '📐', left: 38, top: 61, size: 3.1, rotate: 14, delay: 1.6 },
    { icon: '🎨', left: 64, top: 63, size: 2.9, rotate: -16, delay: 2.4 },
    { icon: '🖊️', left: 88, top: 62, size: 2.5, rotate: 26, delay: 0.8 },
  
    // gap between row 5 & 6
    { icon: '✂️', left: 8, top: 78, size: 2.7, rotate: -22, delay: 1.8 },
    { icon: '📏', left: 30, top: 77, size: 3.0, rotate: 12, delay: 2.7 },
    { icon: '✏️', left: 56, top: 79, size: 2.6, rotate: -28, delay: 0.4 },
    { icon: '🖌️', left: 82, top: 78, size: 2.8, rotate: 20, delay: 1.5 },
  
    // bottom area
    { icon: '🖍️', left: 18, top: 96, size: 2.7, rotate: -14, delay: 2.3 },
    { icon: '🎨', left: 48, top: 95, size: 3.1, rotate: 16, delay: 0.7 },
    { icon: '📐', left: 74, top: 96, size: 2.9, rotate: -18, delay: 1.3 },
    { icon: '🖊️', left: 92, top: 95, size: 2.5, rotate: 24, delay: 2.5 }
  ];
}
