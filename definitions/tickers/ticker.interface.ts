export interface ITicker {
    symbol: string;
    open: string;
    low: string;
    high: string;
    close: string;
    quantity: string;
    amount: string;
    tradeCount: number;
    startTime: number;
    closeTime: number;
    displayName: string;
    dailyChange: string;
    bid: string;
    bidQuantity: string;
    ask: string;
    askQuantity: string;
    ts: number;
    markPrice: string;
}
