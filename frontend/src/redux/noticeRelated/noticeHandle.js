import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError
} from './noticeSlice';

const BASE_URL = 'http://localhost:5000';

export const getAllNotices = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    console.log('Fetching notices for ID:', id);

    try {
        const result = await axios.get(`${BASE_URL}/${address}List/${id}`);
        console.log('Notices API response:', result.data);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        console.error('Error fetching notices:', error);
        dispatch(getError(error));
    }
}