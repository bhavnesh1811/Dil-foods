import { GET_CHART_DATA_ERROR, GET_CHART_DATA_LOADING, GET_CHART_DATA_SUCCESS } from "./chartData.actionTypes";

const initialState = {
    chartData: [],
    loading: false,
    error: false
}

export const chartReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_CHART_DATA_LOADING: {
            return {
                ...state,
                loading: true,
                error: false,
            }
        }
        case GET_CHART_DATA_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: false,
                chartData: payload
            }
        }
        case GET_CHART_DATA_ERROR: {
            return {
                ...state,
                loading: false,
                error: true,
            }
        }

        default: {
            return initialState;
        }

    }
}