import { combineReducers } from "@reduxjs/toolkit"
import { baseApi } from "./api/baseApi"
import authReducer from "./features/auth/authSlice"
import medicineReducer from "./features/medicine/medicineSlice"
import customersReducer from "./features/customers/customersSlice"
import salesReducer from "./features/sales/salesSlice"
export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  medicine: medicineReducer,
  customers: customersReducer,
  sales: salesReducer,
})