export class MetaTags {
    constructor(
      public readonly title: string,
      public readonly description: string,
      public readonly keywords: string | null,
      public readonly oTitle: string,
      public readonly oDescription: string,
      public readonly oImage: string,
    ) { }
  }
  
  export class RouterDataMetaTags {
    constructor(
      public readonly title: string,
      public readonly description: string | null,
      public readonly keywords: string | null,
      public readonly image: string | null,
    ) { }
  }