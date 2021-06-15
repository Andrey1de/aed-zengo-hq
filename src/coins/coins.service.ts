import axios, { AxiosResponse } from 'axios';


 export interface IHistoryResult {
	coin: string;
	old_value: number;
	 now_value: number;
	 percent: number;
	 date_str: string;

 }
export class CoinsService {

	readonly CRYPTO_KEY = 'daf40b45803e3c225fd74c85ff4243c80206579695293777a19ec55ce710462e';
	readonly BaseUrl: string;
	public aggregate : number = 7
	constructor() {
		this.BaseUrl = `https://min-api.cryptocompare.com/data/exchange/symbol/histoday?`
			+ `api_key=${this.CRYPTO_KEY}&e=Coinbase&limit=1`
			+ `&aggregate=${this.aggregate}&tsym=USD`; 
	}
	private urlFactory(coin: string, date: Date): string {
		const dtDate = Math.round((+date) / 1000);
		const url = this.BaseUrl + `&fsym=${coin}&toTs=${dtDate}`;
		return url;

	}

 	//https://min-api.cryptocompare.com/data/exchange/symbol/histoday?&api_key=daf40b45803e3c225fd74c85ff4243c80206579695293777a19ec55ce710462e&e=Coinbase&limit=1&aggregate=7&tsym=USD&fsym=BTC&toTs=1452680400
  	//	{
	//		"Type": 100,
	//		"Message": "Got the data",
	//		"Data": [
	//			{
	//				"time": 1451520000,
	//				"volumeto": 0,
	//				"volumefrom": 15802941.24,
	//				"volumetotal": 15802941.24
	//			},
	//			{
	//				"time": 1452124800,
	//				"volumeto": 0,
	//				"volumefrom": 25529898.9,
	//				"volumetotal": 25529898.9
	//			}
	//		],
	//		"TimeFrom": 1451520000,
	//		"TimeTo": 1452643200,
	//		"FirstValueInArray": true,
	//		"ConversionType": "direct",
	//		"RateLimit": {

	//		},
	//		"HasWarning": false
	//	}


	public async getCoinVolumeByDate$(coin: string, dateFrom: Date): Promise<number> {
		const url = this.urlFactory(coin, dateFrom);
		let res: AxiosResponse<any> = await axios.get<any>(url);
		var data = res?.data?.Data;
		let result: number = (data?.length > 1 && data[1]?.volumetotal >= 0) ?
			data[1].volumetotal : -1;
		return result;

	}
	public async getHistoryResult$(coin: string, dateFrom : Date): Promise<IHistoryResult> {
		const [oldValue, nowValue] = await Promise.all<number, number>([
			this.getCoinVolumeByDate$(coin, dateFrom),
			this.getCoinVolumeByDate$(coin, new Date())]);
		let _percent = 0;
		if (oldValue > 0 ) {
			_percent = Math.round(100 * ((nowValue - oldValue) / oldValue));
		}


		const dateStr: string =  dateFrom.toISOString().split('T')[0];
		return {
			coin: coin,
			old_value: oldValue,
			now_value: nowValue,
			percent: _percent,
			date_str: dateStr
		};
	}

	public static OldHistory: IHistoryResult[] = [];

	async getCoinsHistory$(coins: string[], dateFrom: Date): Promise<IHistoryResult[]> {

		CoinsService.OldHistory = [];
	
		let strRet: string = '';
		for (var i = 0; i < coins.length; i++) {
			let history = await this.getHistoryResult$(coins[i], dateFrom);
			if (!!history) {
				CoinsService.OldHistory.push(history);
				console.dir(history);
			}
		}
	
		return CoinsService.OldHistory;
	}

	static decodeResult(arrHistory: IHistoryResult[]): string {
		let strRet: string = '';
		arrHistory.forEach(history => {
			let _percent = Math.round( history.percent);
			if (strRet.length > 2) strRet += ',';
			strRet += `${history.coin}:${_percent}%`;

		});
		return strRet;

	}


}

//const url = `https://min-api.cryptocompare.com/data/exchange/symbol/histoday?`
//	+ `&api_key=daf40b45803e3c225fd74c85ff4243c80206579695293777a19ec55ce710462e`
//	+ `&e=Coinbase&limit=1&aggregate=7&tsym=USD&fsym=BTC&toTs=1452680400`;
//const urlT = `https://min-api.cryptocompare.com/data/exchange/symbol/histoday?`
//	+ `&api_key=daf40b45803e3c225fd74c85ff4243c80206579695293777a19ec55ce710462e`
//	+ `&e=Coinbase&limit=1&aggregate=7&tsym=USD&fsym=BTC&toTs=1452680400`;
//{
//	"BTC": {
//		"USD": 40158.55
//	},
//	"ETH": {
//		"USD": 2573.79
//	}
//}
