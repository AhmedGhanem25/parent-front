import {Component, OnInit} from '@angular/core';
import {ParentsService} from './services/parents.service';
import {PaymentStatuses} from './enums/PaymentStatuses';
import {Currencies} from './enums/Currencies';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public paymentStatuses = PaymentStatuses;
  public currenciesEnum = Currencies;
  isLoadingData = false;
  fetchingData = false;
  title = 'parent-frontend';
  parents = [];
  dataProviders = [];
  statuses = [];
  currencies = [];
  filters = {
    offset: 0,
    limit: 50,
    statusCode: '',
    provider: '',
    currency: '',
    balanceMin: null,
    balanceMax: null
  };
  constructor(
    private parentsService: ParentsService,
  ) {
  }
  ngOnInit() {
    this.dataProviders = [
      {
        id: 1,
        name: 'DataProviderX'
      },
      {
        id: 2,
        name: 'DataProviderY'
      }
    ];
    this.statuses = [
      {
        id: 1,
        name: this.paymentStatuses.AUTHORIZED
      },
      {
        id: 2,
        name: this.paymentStatuses.DECLINE
      },
      {
        id: 3,
        name: this.paymentStatuses.REFUNDED
      }
    ];
    this.currencies = [
      {
        id: 1,
        name: this.currenciesEnum.USD
      },
      {
        id: 2,
        name: this.currenciesEnum.AED
      }
    ];
    this.getParents();
  }

  getParents() {
    if (this.filters.balanceMin === null) {
      delete this.filters.balanceMin;
    }
    if (this.filters.balanceMax === null) {
      delete this.filters.balanceMax;
    }
    this.isLoadingData = true;
    this.parentsService.getParents(this.filters).subscribe(res => {
      this.parents = res['data'];
      this.isLoadingData = false;
      this.fetchingData = false;
    }, err => {

    });
  }
  emitFilters() {
   this.filters.offset = 0;
   this.getParents();
  }
  loadMoreParents() {
    this.fetchingData = true;
    this.filters.offset += this.filters.limit;
    this.getParents();
  }
}
