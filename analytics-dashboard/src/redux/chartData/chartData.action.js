import axios from "axios"
import { GET_CHART_DATA_ERROR, GET_CHART_DATA_LOADING, GET_CHART_DATA_SUCCESS, GET_TOP_SELLING_ERROR, GET_TOP_SELLING_LOADING, GET_TOP_SELLING_SUCCESS } from "./chartData.actionTypes";

export const getData = (year) => async (dispatch) => {
    dispatch({ type: GET_CHART_DATA_LOADING })
    try {
        let res = await axios.get(`${process.env.REACT_APP_BASE_URL}/data?year=${year}`);
        dispatch({ type: GET_CHART_DATA_SUCCESS, payload: res.data })

    } catch (error) {
        console.log(error);
        dispatch({ type: GET_CHART_DATA_ERROR })
    }
}

export const getTopSelling = (year) => async (dispatch) => {
    dispatch({ type: GET_TOP_SELLING_LOADING })
    try {
        let res = await axios.get(`${process.env.REACT_APP_BASE_URL}/topSellingProducts?year=${year}`);
        dispatch({ type: GET_TOP_SELLING_SUCCESS, payload: res.data })

    } catch (error) {
        console.log(error);
        dispatch({ type: GET_TOP_SELLING_ERROR })
    }
}