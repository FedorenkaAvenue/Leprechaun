import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderDto } from '@shared/models';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartDetailsComponent implements OnInit {
  @Input() cartData: OrderDto;
  @Output() changeUserData = new EventEmitter<any>()
  userForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  private createForm() {
    this.userForm = this.fb.group({
      name: this.fb.control(null, [Validators?.required]),
      phone: this.fb.control('', [
        Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/),
        Validators.required,
      ]),
    });
  }

  public sendOrder(): void {
    this.changeUserData.emit(this.userForm.value)
  }
}
