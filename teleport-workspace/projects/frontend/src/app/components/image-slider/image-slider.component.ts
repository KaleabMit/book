import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit, OnDestroy {
  images: string[] = [
    '/assets/home1.jpg',
     '/assets/home2.jpg',
     '/assets/home3.jpg',
     '/assets/home4.jpg',
     '/assets/home5.jpg',
     '/assets/home6.jpg',
     '/assets/home7.jpg',
     '/assets/home8.jpg',
     '/assets/home9.jpg',
     '/assets/home10.jpg'];
  currentImageIndex: number = 0;
  interval: any;

  ngOnInit() {
    this.startImageSlider();
  }

  ngOnDestroy() {
    this.stopImageSlider();
  }

  startImageSlider() {
    this.interval = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 2000); // Change image every 2 seconds
  }

  stopImageSlider() {
    clearInterval(this.interval);
  }

  onDrag() {
    this.stopImageSlider();
    // Implement drag functionality if needed
  }
}
