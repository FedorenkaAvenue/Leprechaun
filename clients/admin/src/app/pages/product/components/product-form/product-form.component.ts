import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CategoryDto } from 'src/app/shared/models/categories.model';
import {
  PropertiesGroupDto,
  PropertyDto,
} from 'src/app/shared/models/properties.model';
import { environment } from 'src/environments/environment.global';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Output() saveFormEvent = new EventEmitter<any>();
  @Output() changeCategoryEvent = new EventEmitter<string>();
  @Input() categories: CategoryDto[] | null;
  @Input() propertiesGroups: PropertiesGroupDto[] | null;
  @Input() mode: CategoryDto[] | null;
  @ViewChild('fileInput') fileInput: ElementRef;
  public mainForm: FormGroup;
  public propertiesForm: FormGroup;
  public imagesForm: FormGroup;
  public categoryControl = new FormControl(null, Validators.required);
  public previewImages: string[] = [];
  public languages = environment.langs.split(',');

  get propertiesGroupsArray() {
    return this.propertiesForm.controls['properties'] as FormArray;
  }

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.initPropertiesGroupsForm();
    this.initImagesForm();
    this.changeImagesValue();
    this.changeCategoryValue();
  }

  ngOnChanges(changes: SimpleChanges) {
    const propertiesGroups = this.propertiesGroups;
    if (propertiesGroups) {
      this.updatePropertiesForm(propertiesGroups);
    }
  }
  public removeProductImage(index: number): void {
    const control = this.mainForm.get('images');
    const fileList = [...control?.value];
    control?.patchValue(fileList.splice(index, 1));
    control?.updateValueAndValidity();
  }

  private initForm() {
    this.mainForm = this.fb.group({
      price_current: this.fb.control(null, Validators.required),
      price_old: this.fb.control(null),
      title: this.fb.control(null, Validators.required),
      category: this.categoryControl,
      is_public: this.fb.control(true),
      rating: this.fb.control(null),
      is_new: this.fb.control(true),
      // images: this.fb.control([], Validators.required)
    });
  }

  private initPropertiesGroupsForm() {
    this.propertiesForm = this.fb.group({
      properties: this.fb.array([]),
    });
  }

  private initImagesForm() {
    this.imagesForm = this.fb.group({
      images: this.fb.control([], Validators.required),
    });
  }

  public uploadFiles(files: any) {
    this.imagesForm.get('images')?.setValue(files);
  }

  public saveForm() {
    const data = this.mainForm.value;
    const images = this.imagesForm.value.images;
    const properties = this.propertiesForm.value?.properties.reduce(
      (total: number[], property: any) => {
        const prop = property.property;
        if (Array.isArray(prop)) {
          total.push(...prop.filter((el) => el));
        }
        return total;
      },
      []
    );

    this.saveFormEvent.emit({ ...data, properties, images});
  }

  private changeCategoryValue(): void {
    this.mainForm.get('category')?.valueChanges.subscribe((res) => {
      console.log(res);
      this.changeCategoryEvent.emit(res);
    });
  }

  private changeImagesValue(): void {
    this.imagesForm.get('images')?.valueChanges.subscribe((res) => {
      this.previewImages = [];
      const list = [...res];
      list.forEach((el: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(el);
        reader.addEventListener('load', (event) => {
          const url = event?.target?.result as string;
          this.previewImages.push(url);
        });
      });
    });
  }

  private updatePropertiesForm(propertiesGroups: PropertiesGroupDto[]): void {
    const propertiesGroupsControl = this.propertiesForm.get(
      'properties'
    ) as FormArray;
    propertiesGroupsControl.clear();
    propertiesGroups.forEach((propertygroup: PropertiesGroupDto) => {
      propertiesGroupsControl.push(
        this.fb.group({
          propertyGroup: this.fb.control(propertygroup.alt_name),
          property: this.fb.control(0),
        })
      );
    });
  }

  public getProperties(alt_name: string): Array<PropertyDto> {
    const properties =
      this.propertiesGroups?.find((el) => el.alt_name === alt_name)
        ?.properties || [];
    return properties;
  }
}
