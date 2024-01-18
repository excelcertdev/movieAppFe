import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices/rootReducer.js';

const Store = configureStore({
    reducer: rootReducer,
})

export default Store;