import { Request, Response, NextFunction } from "express";
import { chains } from "../constants/constant";
import { StatusCodes } from "http-status-codes";
import {error as errorResponse ,success as successResponse,postRequest,getRequest} from "../utils/common"


export const getChains =async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        successResponse.data=chains
        res.status(StatusCodes.OK).json(successResponse);
    } catch (error: any) {
        errorResponse.error = error
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

export const getTokens = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const addressHash=req.params.address
        let response= await postRequest("addon/763/rest/addresses/token-balances",addressHash)
        successResponse.data=response
        res.status(StatusCodes.OK).json(successResponse);
    } catch (error: any) {
        errorResponse.error = error
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
};

export const getNfts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const addressHash=req.params.address
        let result= await postRequest("addon/763/rest/addresses/nft",addressHash,"","ERC-721,ERC-404,ERC-1155")
        successResponse.data=result
        res.status(StatusCodes.OK).json(successResponse);
    } catch (error: any) {
        errorResponse.error = error
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
};

export const getTransactionHistory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const addressHash=req.params.address
        let response= await postRequest("addon/763/rest/addresses/transactions",addressHash,"to | from","")
        successResponse.data=response
        res.status(StatusCodes.OK).json(successResponse);
    } catch (error: any) {
        errorResponse.error = error
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
};

interface trendingcoinsResponse{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    image:string,
    is_new: boolean,
    is_active: boolean,
    type: string
}
export const getTrendingCoins= async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        let response= await getRequest("addon/748/v1/coins")
        let trendingCoins: Array<trendingcoinsResponse> = []
        response.slice(0, 10).forEach((coin:any)=>{
            trendingCoins.push({
                id: coin.id,
                name: coin.name,
                symbol:coin.symbol,
                rank: coin.rank,
                image:`https://static.coinpaprika.com/coin/${coin.id}/logo.png`,
                is_new: coin.is_new,
                is_active: coin.is_active,
                type: coin.type
            })
        })
        successResponse.data=trendingCoins
        res.status(StatusCodes.OK).json(successResponse);
    } catch (error: any) {
        errorResponse.error = error
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
};

export const getCoinByID=async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const assert_id=req.params.id
        let response= await getRequest(`addon/748/v1/coins/${assert_id}`)
        successResponse.data=response
        res.status(StatusCodes.OK).json(successResponse);
    } catch (error: any) {
        errorResponse.error = error
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}