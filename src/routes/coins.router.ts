/*
 * GET home page.
 */

import * as EX from 'express';
import { AsyncRouter } from 'express-async-router';
import * as S from '../common/http-status';
import { CoinsService, IHistoryResult} from '../coins/coins.service';

const coinsService: CoinsService = new CoinsService();


class CoinsRouteInternal{
    readonly Router : EX.Router = AsyncRouter();
    constructor() {
       
        this.createRouts();
	}
    createRouts() {
        //~coins/diff?coins=BTC,...,DOGE&date=2010-01-02
        this.Router.get('/diff', this.GetDiff$);
        this.Router.get('/wide-diff', this.GetDiffWide$);
    }
    async GetDiff$(req: EX.Request, res: EX.Response) {
        try {
            const coinsStr = req.query.list?.toString();
            const dateStr = req.query.date?.toString();
            if (coinsStr?.length <= 0) {
                res.send('Parameter coins isn\'t defined').status(S.BAD_REQUEST).end();
                return;
            }
            let dateFrom = new Date(dateStr);
            if (dateStr?.length <= 0 || isNaN(dateFrom.getMonth())) {
                res.send('Parameter date isn\'t defined').status(S.BAD_REQUEST).end();
                return;
            }
            let coinsArr = coinsStr.toUpperCase().split(',');
            //To clear array from possible errors in string eg whitespaces ...
            coinsArr = coinsArr.filter(p => p?.length > 0).map(s => s.trim());

            var historyArr: IHistoryResult[] = await coinsService.getCoinsHistory$(coinsArr, dateFrom);
            var strRet = CoinsService.decodeResult(historyArr);
            res.send(strRet).status(S.OK);

        } catch (e) {
            //res.status(S.CONFLICT);
            //TODO for debug only !!!!
            throw e;
        }

    }
    async GetDiffWide$(req: EX.Request, res: EX.Response) {
        try {
            const coinsStr = req.query.list?.toString();
            const dateStr = req.query.date?.toString();
            if (coinsStr?.length <= 0) {
                res.send('Parameter coins isn\'t defined').status(S.BAD_REQUEST).end();
                return;
            }
            let dateFrom = new Date(dateStr);
            if (dateStr?.length <= 0 || isNaN(dateFrom.getMonth())) {
                res.send('Parameter date isn\'t defined').status(S.BAD_REQUEST).end();
                return;
            }
            let coinsArr = coinsStr.toUpperCase().split(',');
            //To clear array from possible errors in string eg whitespaces ...
            coinsArr = coinsArr.filter(p => p?.length > 0).map(s => s.trim());

            var historyArr: IHistoryResult[] = await coinsService.getCoinsHistory$(coinsArr, dateFrom);
           // var strRet = CoinsService.decodeResult(historyArr);
            var strRet = JSON.stringify(historyArr, null, 2);
            res.send(strRet).status(S.OK);

        } catch (e) {
            //res.status(S.CONFLICT);
            //TODO for debug only !!!!
            throw e;
        }

    }
}


const Single: CoinsRouteInternal = new CoinsRouteInternal();

export const CoinsRouter = Single.Router; ;