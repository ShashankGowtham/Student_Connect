import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError
} from './complainSlice';

const BASE_URL = 'http://localhost:5000';

export const getAllComplains = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${BASE_URL}/${address}List/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        console.error('Error fetching complains:', error);
        dispatch(getError(error));
    }
}