import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private numberOfRectangles: number = 6;
  private paddingBetweenRectangles: number = 5;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.createRectangles();
  }

  createRectangles(): void {
    const container = this.el.nativeElement.querySelector('#stackAnimation');
    
    for (let i = 0; i < this.numberOfRectangles; i++) {
      const rect = this.renderer.createElement('div');
      this.renderer.addClass(rect, 'rectangle');
      this.renderer.setStyle(rect, 'animation', `drop${i} 1s ease-out forwards`); // Speed up animation
      this.renderer.appendChild(container, rect);

      // Adjust position for padding
      const topPosition = (230 - (40 + this.paddingBetweenRectangles) * i);
      
      const keyframes = `
        @keyframes drop${i} {
          0% { top: -20px; }
          100% { top: ${topPosition}px; }
        }
      `;
      const style = this.renderer.createElement('style');
      this.renderer.setProperty(style, 'type', 'text/css');
      this.renderer.setProperty(style, 'innerHTML', keyframes);
      this.renderer.appendChild(document.head, style);

      // Delay each rectangle's start slightly to stagger their entrance
      this.renderer.setStyle(rect, 'animation-delay', `${(500 / 2) * i}ms`); // Speed up delay as well
    }
  }
}
