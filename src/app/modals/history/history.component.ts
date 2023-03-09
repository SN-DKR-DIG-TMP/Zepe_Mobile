import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { PaymentService } from "../../services/payment/payment.service";
import { Payment } from "../../models/payment.model";
import { PaymentGrouped } from "../../models/paymentGrouped.model";
import {DatePipe, formatDate} from '@angular/common';
import { JetonService } from "src/app/services/jeton/jeton.service";


@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.scss"],
})
export class HistoryComponent implements OnInit {
  constructor(
    private modalController: ModalController,
    private jetonService: JetonService,
    private paymentService: PaymentService
  ) {

    this.date = new Date();
    this.firstDay = formatDate(new Date(this.date.getFullYear(), this.date.getMonth(), 1), 'yyyy-MM-dd', 'en-US');;
    this.lastDay = formatDate(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0), 'yyyy-MM-dd', 'en-US');
    
  }

  public payments: any[];
  public totalOfPayments: number;
  public total: number;
  public paymentGroupedByDate: PaymentGrouped[] = null;
  public paymentGroupedByMonth: any[] = null;
  date: Date;
  history: Payment[] = null;
  cashments: any;
  firstDay: any;
  lastDay: any;

  ngOnInit() {
    this.paymentService.getHistoryObservable().subscribe((data) => {
      this.history = data;
      
    });

    this.paymentService
    .getAmountByUser(this.paymentService.paymentTokenDTO.userMatricule)
      .subscribe((data) => {     
        this.cashments = data.reverse();
      });    
  }

  ionViewWillEnter() {
    this.date = new Date();
    this.totalOfPayments = 0;
    this.total = 0;
    this.getListOfPayment();
  }

  private getListOfPayment() {
    const result = this.history;

    const paymentByDate = result.reduce((paymentByDate, day) => {
      let date: any;
      date = day.date.toString().split("T")[0];
      if (!paymentByDate[date]) {
        paymentByDate[date] = [];
      }
      paymentByDate[date].push(day);
      return paymentByDate;
    }, []);

    // Edit: to add it in the array format instead
    this.paymentGroupedByDate = Object.keys(paymentByDate).map((date) => {
      return {
        date,
        partners: paymentByDate[date].reduce(
          (paymentByDateAndByPartner, payment) => {
            let partName: any;
            partName = payment.trade.name;
            if (!paymentByDateAndByPartner[partName]) {
              paymentByDateAndByPartner[partName] = [];
            }
            paymentByDateAndByPartner[partName].push(payment);
            return paymentByDateAndByPartner;
          },
          []
        ),
      };
    });

    const paymentByMonth = this.paymentGroupedByDate.reduce(
      (paymentByMonth, day) => {
        let date: any;
        date = day.date.toString().slice(0, 7);
        if (!paymentByMonth[date]) {
          paymentByMonth[date] = [];
        }
        paymentByMonth[date].push(day);
        return paymentByMonth;
      },
      []
    );

    this.paymentGroupedByMonth = Object.keys(paymentByMonth).map((date) => {
      return {
        date,
        partners: paymentByMonth[date],
        total: this.totalMonth(paymentByMonth[date], date),
      };
    });
  }

  totalTickets(partners: any) {
    let total = 0;
    Object.keys(partners).map((partner) => {
      total += partners[partner].length;
    });

    return total;
  }

  totalMonth(paymentByMonth: any[], date: string): number {
    let total = 0;
    paymentByMonth.forEach((bydate) => {
      Object.keys(bydate.partners).forEach((key) => {        
        total += bydate.partners[key].length;
      });
    });
    return total;
  }

  onCancel() {
    this.modalController.dismiss(null, "cancel");
  }
}
