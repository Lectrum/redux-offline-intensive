// Instruments
import { CHANGE_PAGE } from './types';

export const changePage = (page) => ({
    type:    CHANGE_PAGE,
    payload: page,
});
