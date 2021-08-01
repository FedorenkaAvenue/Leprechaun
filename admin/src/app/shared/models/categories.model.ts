export interface CategoryI {
  id: number;
  title: string;
  url: string;
  children: Array<CategoryI> | null;
  icon: string | null;
  parentCategoryId: number | null;
}

export class CategoryDto implements CategoryI{
    public id: number;
    public title: string;
    public url: string;
    public children: Array<CategoryDto> | null;
    public icon: string | null;
    public parentCategoryId: number | null;
  constructor(
    data: CategoryI
  ) {
      const {id, title, url, children, icon, parentCategoryId} = data
      this.id = id,
      this.title = title,
      this.url = url,
      this.children = children,
      this.icon = icon,
      this.parentCategoryId = parentCategoryId
  }
}
