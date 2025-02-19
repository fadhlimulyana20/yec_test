import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IAddressGeo {
    lat: string;
    lng: string;
}

export interface IAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: IAddressGeo;
}

export interface ICompany {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
    address: IAddress;
    company: ICompany;
}

export interface IUserFilterParam {
    q?: string
}

export interface IUserState {
    users: Array<IUser>
    filter: IUserFilterParam
    isUsersFetched: boolean
}

const initialState: IUserState = {
    users: [],
    filter: {},
    isUsersFetched: false
}

export const userSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<Array<IUser>>) => {
        state.users = action.payload
    },
    setFilter: (state, action: PayloadAction<IUserFilterParam>) => {
        state.filter = action.payload
    },
    setIsUserFetched: (state, action: PayloadAction<boolean>) => {
        state.isUsersFetched = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUsers, setFilter, setIsUserFetched } = userSlice.actions

export default userSlice.reducer