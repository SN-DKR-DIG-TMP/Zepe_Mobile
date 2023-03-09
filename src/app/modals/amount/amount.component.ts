import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.scss'],
})
export class AmountComponent implements OnInit {

  constructor(private modalController: ModalController,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.amountForm = this.formBuilder.group({
      amount: [''],
    });
   }
   amountForm: FormGroup;
   @ViewChild('amountInput') amountInput: IonInput;

   onSubmit(form: NgForm) {
   console.log(form.value.amount);
   
  }
  ngOnInit() {}

  onCancel() {
    this.modalController.dismiss(null, 'cancel');
  }
}
