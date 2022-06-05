import { createAsyncThunk } from '@reduxjs/toolkit';
import { services } from 'app/services';


export const actionTypes = {
    TRIAL_ACTION: 'TRIAL_ACTION',
    TRIAL_ASYNC_ACTION: 'TRIAL_ASYNC_ACTION',
};


// normal action example
export const doTrialAction = (data) => ({
    type: actionTypes.TRIAL_ACTION,
    payload: data
});

// async action example
export const doTrialAsyncAction = createAsyncThunk(
    actionTypes.TRIAL_ASYNC_ACTION,
    async (amount) => {
      const response = await services.trialFetchData(amount);
      return response.data;
    }
);