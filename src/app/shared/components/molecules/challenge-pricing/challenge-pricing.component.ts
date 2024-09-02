import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChallengePricing } from '../../../../modules/events/interfaces/challenge-payment.interface';
import { AnimationOptions } from 'ngx-lottie';
import { CurrencyType } from '../../../../core/enums/currency-type.enum';
import { ChallengeType } from '../../../../modules/events/enums/challenge-type.enum';

@Component({
  selector: 'app-challenge-pricing',
  templateUrl: './challenge-pricing.component.html',
  styleUrls: ['./challenge-pricing.component.scss'],
})
export class ChallengePricingComponent implements OnInit {
  @Input({ required: true })
  public pricing!: ChallengePricing;

  @Output()
  public selectedCurrencyEmitted = new EventEmitter<CurrencyType>();

  public CurrencyTypeEnum = CurrencyType;
  public selectedCurrency?: CurrencyType;

  public telegramStarOptions: AnimationOptions = {
    path: '/assets/lottie/star-sticker.json',
  };

  public telegramSadStarOptions: AnimationOptions = {
    path: '/assets/lottie/star-sad-sticker.json',
  };

  constructor() {}

  ngOnInit() {}

  public selectCurrency(currency: CurrencyType): void {
    this.selectedCurrency = currency;
    this.selectedCurrencyEmitted.emit(currency);
  }
}
