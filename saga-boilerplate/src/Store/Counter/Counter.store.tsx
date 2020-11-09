import { createAction, createReducer } from 'typesafe-actions';

export const INCREASE = 'counter/INCREASE';
export const DECREASE = 'counter/DECREASE';
export const INCREASE_BY = 'counter/INCREASE_BY';

type CounterAction = ReturnType<typeof increase> | ReturnType<typeof decrease> | ReturnType<typeof increaseBy>;

type CounterState = {
  number: number;
};

const initialState: CounterState = {
  number: 0,
};

const counter = createReducer<CounterState, CounterAction>(initialState, {
  [INCREASE]: (state:CounterState) => {
    return { number: state.number + 1 };
  },
  [DECREASE]: (state:CounterState) => ({ number: state.number - 1 }),
  [INCREASE_BY]: (state:CounterState, action:any) => ({
    ...state,
    number: state.number + action.payload,
  }),
});

export const increase = createAction(INCREASE)();
export const decrease = createAction(DECREASE)();
export const increaseBy = (payload: number) => ({ 
  type: INCREASE_BY,
  payload
})

export default counter;
