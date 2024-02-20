import axios from "axios"
import { GET_CHART_DATA_ERROR, GET_CHART_DATA_LOADING, GET_CHART_DATA_SUCCESS } from "./chartData.actionTypes";

export const getData = (year) => async (dispatch) => {
    dispatch({ type: GET_CHART_DATA_LOADING })
    try {
        let res = await axios.get(`https://dil-foods.onrender.com/data?year=${year}`);
        dispatch({ type: GET_CHART_DATA_SUCCESS, payload: res.data })

    } catch (error) {
        console.log(error);
        dispatch({ type: GET_CHART_DATA_ERROR })
    }
}