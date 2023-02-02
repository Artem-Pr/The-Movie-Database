import type {RootState} from '../../store/rootReducer';

export const getSearchString = (state: RootState) => state.sessionReducer.searchString;
