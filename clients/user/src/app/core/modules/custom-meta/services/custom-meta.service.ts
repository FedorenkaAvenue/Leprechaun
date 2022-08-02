import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { translate } from '@ngneat/transloco';
import { MetaService } from '@ngx-meta/core';
import { MetaTags, RouterDataMetaTags } from '../models/meta-tags.model';

// TODO
const oImg = '';

@Injectable({
  providedIn: 'root'
})
export class CustomMetaService {

  constructor(
    private readonly meta: MetaService,
    private readonly title: Title,
    @Inject(DOCUMENT) private readonly document: Document,
  ) { }

  public updateStaticRouteMetatags(meta: RouterDataMetaTags, currentUrl: string | null = null) {
    const seo = new MetaTags(
      meta && meta.title ? translate(meta.title) : 'Student apply',
      meta && meta.description ? translate(meta.description) : '',
      meta && meta.keywords ? translate(meta.keywords) : '',
      meta && meta.title ? translate(meta.title) : 'Student apply',
      meta && meta.description ? translate(meta.description) : '',
      meta && meta.image ? meta.image : oImg,
    );
    this.updateTags(seo, currentUrl);
  }

  public updateTags(tags: MetaTags, currentUrl: string | null = null): void {
    this.meta.setTitle(tags.title);
    this.updateMetaTag('description', tags.description);
    this.updateMetaTag('keywords', tags?.keywords ? tags.keywords : '');
    this.updateMetaTag('og:title', tags.oTitle);
    this.updateMetaTag('og:description', tags.oDescription);
    this.updateMetaTag('og:image', tags.oImage);

    // if (currentUrl) {
    //   const baseUrl = environment.baseUrl;
    //   const url = `${baseUrl}${currentUrl}`.replace(/(https?:\/\/)|(\/)+/g, '$1$2').replace(/\/$/g, '');
    //   this.updateMetaTag('og:url', url ? url : '/');
    // } else {
    //   this.updateMetaTag('og:url', this.getCurrentFullUrl());
    // }
  }

  private updateMetaTag(property: string, content: string): void {
    this.meta.setTag(property, content);
  }

  public setNoIndexPage(): void {
    this.meta.setTag('robots', 'noindex, nofollow');
  }

  private removeMetaTag(property: string): void {
    this.meta.removeTag(`property='${property}'`);
  }
}
