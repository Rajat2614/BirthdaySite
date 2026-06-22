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
  private readonly artIcons = [
    '🎨',
    '✏️',
    '📏',
    '🖌️',
    '📐',
    '🖍️',
    '✂️',
    '🖊️'
  ];
  
  doodles: Doodle[] = Array.from({ length: 100 }, () => ({
    icon: this.artIcons[Math.floor(Math.random() * this.artIcons.length)],
    left: Math.random() * 96 + 2,
    top: Math.random() * 85 + 5,
    size: 2.5 + Math.random() * 2.5,
    rotate: -45 + Math.random() * 90,
    delay: Math.random() * 5
  }));
}
