import { Component, ElementRef, HostListener, Inject, Injector, OnInit, ViewChild } from '@angular/core';
import { OrderCartItemDto, OrderDto } from '@shared/models/products/order.model';
import { firstValueFrom, Observable, of, first } from 'rxjs';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';
import { CartStateService } from '@shared/services/cart/cart-state/cart-state.service';
import { FavoritesStateService } from '@shared/services/favorite/favorite-state/favorites-state.service';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AutocompleteService } from '@shared/services/autocomplete/autocomplete.service';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';


// TO  DO
const LANGUAGES = [
  {
    label: 'ua',
    code: 'ua',
  },
  {
    label: 'ru',
    code: 'ru',
  },
];
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public cartValue$: Observable<string[]>;
  public favoriteValue$: Observable<Array<string>>;
  public languages = LANGUAGES;
  public searchForm: FormGroup;
  public searchResult: any;
  @ViewChild('chartContainer', { read: ElementRef }) myChartContainer:ElementRef;
  constructor(
    private readonly cartStateService: CartStateService,
    private readonly favoritesStateService: FavoritesStateService,
    private readonly localizeService: LocalizeRouterService,
    private readonly fb: FormBuilder,
    private readonly autocompleteService: AutocompleteService,
    private eRef: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
    
  ) {}


  @HostListener('document:click', ['$event'])
  clickout(event) {
    this.eRef.nativeElement
    if(!this.myChartContainer.nativeElement.contains(event.target)) {
      this.searchResult = null
    }
  }
  
  ngOnInit(): void {
    this.initSearchForm();
    this.searchForm.get('searchControl').valueChanges
      .pipe(
        tap(res => {console.log(res);
        }),
        debounceTime(1500),
        filter(res => !!res),
        switchMap((substring: string) => this.autocompleteService.getAutocompleteResult(substring)),
      ).subscribe(res => {
        this.searchResult = res;
      })
    this.cartValue$ = this.cartStateService
      .getCartStateValue()
      .pipe(map((order: OrderDto) => order?.list.map((product: OrderCartItemDto) => product?.id)));
    this.favoriteValue$ = this.favoritesStateService.getFavoritesStateValue();
  }

  public changeLang(lang: string): void {
  this.localizeService.changeLanguage(lang);
   this.router.events.pipe(
    filter(url => url instanceof NavigationEnd),
    first()
   ).subscribe(res => {
    this.document.location.reload();
   })
    // debugger
   
    // const path = this.router.url;
    // console.log(path);
    
    // this.router.navigateByUrl(path, {state})
    // this.router.navigate(['/'], queryParamsHandling: "preserve"});
  }

  public initSearchForm() {
    this.searchForm = this.fb.group({
      searchControl: this.fb.control(null),
    });
  }

  public getSearchResult(): void {
    // const value = this.searchForm.get('searchControl').value;
    // if(!value) {
    //   return 
    // }
    // this.searchResult$ = this.autocompleteService.getAutocompleteResult(value)
  }
}
