import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  coins: Coin[] = [];
  tittles: string[] = ['#', 'Coin', 'Price', 'price Change', '24h Volume'];
  searchText = '';
  filteredCoins: Coin[] = [];
  url: string =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Coin[]>(this.url).subscribe(
      (res) => {
        console.log(res);
        this.coins = res;
        this.filteredCoins = res;
      },
      (err) => console.log(err)
    );
  }

  searchCoin() {
    this.filteredCoins = this.coins.filter(
      (coin) =>
        coin.name
          .toLocaleLowerCase()
          .includes(this.searchText.toLocaleLowerCase()) ||
        coin.symbol
          .toLocaleLowerCase()
          .includes(this.searchText.toLocaleLowerCase())
    );
  }
}
