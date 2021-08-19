
export interface CustomOverlayConfig {
  overlayPointerEvents?: boolean;
  disableCloseBtn?: boolean;
  preventBackdropClick?: boolean;
}

export interface LeChModalConfig {
  hasBackdrop: boolean,
  panelClass: string[] | string;
  backdropClass: string;
}

export interface OverlayCloseEvent<R> {
  type: 'backdropClick' | 'close';
  data: R;
}