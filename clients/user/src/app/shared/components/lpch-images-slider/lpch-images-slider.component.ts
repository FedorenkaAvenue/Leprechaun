import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { ProductImageI } from '@shared/models';
import { environment } from 'environments/environment.global';
import KeenSlider, { KeenSliderInstance, KeenSliderPlugin } from 'keen-slider';

function ThumbnailPlugin(main: KeenSliderInstance): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove('active');
      });
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add('active');
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
          main.moveToIdx(idx);
        });
      });
    }

    slider.on('created', () => { 
      addActive(slider.track.details.rel);
      addClickEvents();
      main.on('animationStarted', (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

@Component({
  selector: 'lpch-images-slider',
  templateUrl: './lpch-images-slider.component.html',
  styleUrls: [
    './lpch-images-slider.component.scss',
    '../../../../../node_modules/keen-slider/keen-slider.min.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LpchImagesSliderComponent implements OnInit, OnChanges {
  slider: KeenSliderInstance = null;
  thumbnailSlider: KeenSliderInstance = null;
  public mediaEndpoint = environment.mediaEndpoint;
  doResize: boolean = false

  ngOnChanges(changes: SimpleChanges): void{
    if(changes?.images?.currentValue)
    this.doResize = true
  }
  constructor() {}

  @Input() images: Array<ProductImageI>
  @ViewChild('sliderRef') sliderRef: ElementRef<HTMLElement>;
  @ViewChild('thumbnailRef') thumbnailRef: ElementRef<HTMLElement>;

  ngOnInit(): void {}

  ngAfterViewChecked(): void{
    if(this.doResize) {
      this.slider = new KeenSlider(this.sliderRef.nativeElement);
    this.thumbnailSlider = new KeenSlider(
      this.thumbnailRef.nativeElement,
      {
        initial: 0,
        slides: {
          perView: () => this.images.length > 8 ? 'auto' : 8,
          spacing: () => this.images.length > 5 ? 12 : 10
        },
      },
      [ThumbnailPlugin(this.slider)],
    );
      this.doResize = false;
      this.slider.update()
    } 
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
    if (this.thumbnailSlider) this.thumbnailSlider.destroy();
  }
}
