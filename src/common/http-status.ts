import { StatusCodes } from 'http-status-codes';
export const  OK = StatusCodes.OK;
export const  ACCEPTED = StatusCodes.ACCEPTED;//202
export const  BAD_REQUEST = StatusCodes.BAD_REQUEST;//400
export const  CREATED = StatusCodes.CREATED;//201
export const  CONFLICT = StatusCodes.CONFLICT;///409
export const  NOT_FOUND = StatusCodes.NOT_FOUND;//404
export const  NOT_IMPLEMENTED = StatusCodes.NOT_IMPLEMENTED; //501
export const NOT_MODIFIED = StatusCodes.NOT_MODIFIED;//304 NOT_MODIFIED
export const  NO_CONTENT = StatusCodes.NO_CONTENT;//204
export const  IM_A_TEAPOT = StatusCodes.IM_A_TEAPOT;//418
export const PRECONDITION_FAILED = 412;//StatusCodes.PRECONDITION_FAILED;
export const ROW_CONFLICT = 233;
export const APPLICATION_ERROR = 234;
export const PARAMETERS_ERROR = 235;

export function StrStatus(status: number) {
	switch (status) {
		case OK:			return 'OK';
		case ACCEPTED:		return 'ACCEPTED';
		case CREATED:		return 'CREATED';
		case BAD_REQUEST:	return 'BAD_REQUEST';
		case CREATED:		return 'CREATED';
		case CONFLICT:		return 'CONFLICT';
		case NOT_FOUND:		return 'NOT_FOUND';
		case NOT_IMPLEMENTED:
							return 'NOT_IMPLEMENTED';
		case NOT_MODIFIED:	return 'NOT_MODIFIED';
		case NO_CONTENT:	return 'NO_CONTENT';
		case IM_A_TEAPOT:	return 'IM_A_TEAPOT';
		case PRECONDITION_FAILED:
							return 'PRECONDITION_FAILED';
		case APPLICATION_ERROR :   
							return 'APPLICATION_ERROR';
		case PARAMETERS_ERROR :   
							return 'PARAMETERS_ERROR';
		default:			return 'UNKNOWN';
	}
}

