import * as TYPE from 'actions/types';

const initialState = {
  binance: {
    walletStatus: 'Gray',
    info24hr: {
      change: 0,
      high: 0,
      low: 0,
      volume: 0,
    },
    buy: [],
    sell: [],
    candlesticks: [],
  },

  bittrex: {
    walletStatus: 'Gray',
    info24hr: {
      change: 0,
      high: 0,
      low: 0,
      volume: 0,
    },
    buy: [],
    sell: [],
    candlesticks: [],
  },
  loaded: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.BITTREX_24:
      return {
        ...state,
        bittrex: {
          ...state.bittrex,
          info24hr: { ...action.payload },
        },
      };

    case TYPE.BINANCE_24:
      return {
        ...state,
        binance: {
          ...state.binance,
          info24hr: { ...action.payload },
        },
      };

    case TYPE.BINANCE_ORDERBOOK:
      return {
        ...state,
        binance: {
          ...state.binance,
          buy: [...action.payload.buy],
          sell: [...action.payload.sell],
        },
      };

    case TYPE.BITTREX_ORDERBOOK:
      return {
        ...state,
        bittrex: {
          ...state.bittrex,
          buy: [...action.payload.buy],
          sell: [...action.payload.sell],
        },
      };

    case TYPE.MARKET_DATA_LOADED:
      return {
        ...state,
        loaded: true,
      };

    case TYPE.BINANCE_CANDLESTICK:
      return {
        ...state,
        binance: {
          ...state.binance,
          candlesticks: [...action.payload],
        },
      };

    case TYPE.BITTREX_CANDLESTICK:
      return {
        ...state,
        bittrex: {
          ...state.bittrex,
          candlesticks: [...action.payload],
        },
      };

    case TYPE.BINANCE_WALLET_STATUS:
      return {
        ...state,
        binance: {
          ...state.binance,
          walletStatus: action.payload,
        },
      };

    case TYPE.BITTREX_WALLET_STATUS:
      return {
        ...state,
        bittrex: {
          ...state.bittrex,
          walletStatus: action.payload,
        },
      };

    case TYPE.SET_TRADEVOL:
      return {
        ...state,
        tradeVolume: action.payload,
      };

    case TYPE.SET_THRESHOLD:
      return {
        ...state,
        threshold: action.payload,
      };

    //  TODO: deprecate when we move to a new alert system
    case TYPE.SET_ALERTS:
      return {
        ...state,
        arbAlertList: action.payload,
      };

    case TYPE.REMOVE_ALERT:
      return {
        ...state,
        arbAlertList: [
          ...state.arbAlertList.slice(0, action.payload),
          ...state.arbAlertList.slice(action.payload + 1),
        ],
      };

    default:
      return state;
  }
};
