///
///	IMportANT ALL THE EXportS IS READONY FOR APPLICATION
/// RESULT AS SNAPSHOT FOR process.env ,  goal - decouple 
/// PROCESS ENV AND APPLICATION !!!!
///
import  * as pg  from 'pg';
import * as dotenv from 'dotenv';
const VERSION = '1.0.0';
const DESCRIPTION = "2021-06-14: created for Zengo HQ LTD."
function isTrue(str: string) {
	str = str?.toUpperCase() || '';
	return str === 'YES' || str === '1' || str === 'TRUE';
}



class EnviroClass {
	get VERSION(): string { return VERSION;}
	get DESCRIPTION(): string { return DESCRIPTION;}
	get PORT(): string { return process.env.PORT; }
	//get DB_SCHEMA() : string  {return process.env.DB_SCHEMA ; }
	
	//get DB_CONNECTION_STRING(): string { return process.env.DB_CONNECTION_STRING ; }
	//get IS_HEROKU() : boolean  {return isTrue(process.env.IS_HEROKU) ; }
	////bit 4
	//get LOG_RESPONSE() : boolean  {return isTrue(process.env.LOG_RESPONSE) ;}
	
	////bit 2
	//get LOG_RESPONSE_DATA() : boolean 
	//	{ return isTrue(process.env.LOG_RESPONSE_DATA);}
	////bit 1
	//get LOG_SQL() : boolean { return isTrue(process.env.LOG_SQL);}
	//get RESP_UPSERT_BODY() : boolean { return isTrue(process.env.RESP_UPSERT_BODY);}
	//get Pool() : pg.Pool {return this._Pool;}
	//protected _Pool: pg.Pool = undefined;


	constructor() {
	}

	config(){
	
		const env = process.env;
		env.VERSION = this.VERSION;
		//env.LOG_RESPONSE = 'YES';
		//env.LOG_RESPONSE_DATA = 'YES';
		//env.RESP_UPSERT_BODY = 'NO';
		//env.LOG_SQL = 'YES';
		dotenv.config();
		//}

		//console.log('//BEG ===== ENVIROMENT VARIAVLES  =======================');
		//console.log(this.dump());
		//console.log('//END ===== ENVIROMENT VARIAVLES  =======================');

	}

	dump(): string {
		  const env = process.env;
		let str =
`
VERSION = ${this.VERSION}
DESCRIPTION = ${this.DESCRIPTION}
PORT = ${this.PORT}
` ;
		return str;
	}


	
}
 export const Enviro = new EnviroClass()




