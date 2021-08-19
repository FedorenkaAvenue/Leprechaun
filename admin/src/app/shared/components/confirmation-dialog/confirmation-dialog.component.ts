import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CustomOverlayRef } from '../../modules/modal/classes/custom-overlay-ref';
import { MODAL_DATA } from '../../modules/modal/classes/modal.data';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit, OnChanges {


  @Input() data: any;

  constructor(
    @Inject(MODAL_DATA) private readonly modalData: any,
    @Inject(CustomOverlayRef) private readonly overlayRef: CustomOverlayRef,
  ) { }

  ngOnInit(): void {
    console.log(this.modalData);
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    
  }

  public confirm() {
    this.overlayRef.close(true);
  }

  public reject() {
    this.overlayRef.close(false);
  }
}
