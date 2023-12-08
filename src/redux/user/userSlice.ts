import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  isLoggedIn: boolean;
  user: {};
  members: [];
  isDataLoading: boolean;
  pendingUsers: any[];
  storerDetail: {};
  createBounty: {};
  creatorDetail: {};
  storers: {
    verified_storers: { result: any[] };
    top_storers: any[];
    verification_queue_storers: { result: any[] };
  };
  creators: {
    verified_creators: { result: any[] };
    top_creators: any[];
    verification_queue_creators: { result: any[] };
  };
  collectors: {
    verified_collectors: { result: any[] };
    top_collectors: any[];
    verification_queue_collectors: { result: any[] };
  };
  fetchAllUsers: any;
  selectedUser: any;
  chatselectedUser: any;
  createProfile: boolean | null;
  unverifiedCreatorData: any;
  aggregatedDetailsData: any;
  isNewUsersLoading: boolean;
  newStorers: any[];
  newCreators: any[];
  approveStorer: boolean;
  profileStatus: boolean;
}

const initialState: UserState = {
  isLoggedIn: false,
  user: {},
  members: [],
  isDataLoading: false,
  pendingUsers: [],
  storerDetail: {},
  createBounty: {},
  creatorDetail: {},
  storers: {
    verified_storers: { result: [] },
    top_storers: [],
    verification_queue_storers: { result: [] },
  },
  creators: {
    verified_creators: { result: [] },
    top_creators: [],
    verification_queue_creators: { result: [] },
  },
  collectors: {
    verified_collectors: { result: [] },
    top_collectors: [],
    verification_queue_collectors: { result: [] },
  },
  fetchAllUsers: {},
  selectedUser: {},
  chatselectedUser: {},
  createProfile: false,
  unverifiedCreatorData: {},
  aggregatedDetailsData: {},
  isNewUsersLoading: false,
  newStorers: [],
  newCreators: [],
  approveStorer: false,
  profileStatus: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
    authenticate: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    restoreAuthState: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    setAllMembers: (state, action: PayloadAction<any>) => {
      state.members = action.payload;
    },
    setDataLoading: (state, action: PayloadAction<boolean>) => {
      state.isDataLoading = action.payload;
    },
    setPendingUsers: (state, action: PayloadAction<any>) => {
      state.pendingUsers = action.payload;
    },
    setStorerDetail: (state, action: PayloadAction<any>) => {
      state.storerDetail = action.payload;
    },
    setCreateBounty: (state, action: PayloadAction<any>) => {
      state.createBounty = action.payload;
    },
    setCreatorDetail: (state, action: PayloadAction<any>) => {
      state.creatorDetail = action.payload;
    },
    setStorers: (state, action: PayloadAction<any>) => {
      state.storers = action.payload;
    },
    setCreators: (state, action: PayloadAction<any>) => {
      state.creators = action.payload;
    },
    setCollectors: (state, action: PayloadAction<any>) => {
      state.collectors = action.payload;
    },
    setFetchAllUsers: (state, action: PayloadAction<any[]>) => {
      state.fetchAllUsers = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<any>) => {
      state.selectedUser = action.payload;
    },
    setChatSelectedUser: (state, action: PayloadAction<any>) => {
      state.chatselectedUser = action.payload;
    },
    setCreateProfile: (state, action: PayloadAction<any>) => {
      state.createProfile = action.payload;
    },
    setUnverifiedCreatorData: (state, action: PayloadAction<any>) => {
      state.unverifiedCreatorData = action.payload;
    },
    setAggregatedDetailsData: (state, action: PayloadAction<any>) => {
      state.aggregatedDetailsData = action.payload;
    },
    setNewStorers: (state, action: PayloadAction<any>) => {
      state.newStorers = action.payload;
    },
    setNewCreators: (state, action: PayloadAction<any>) => {
      state.newCreators = action.payload;
    },
    setApproveStorer: (state, action: PayloadAction<any>) => {
      state.approveStorer = action.payload;
    },
    setProfileStatus: (state, action: PayloadAction<boolean>) => {
      state.profileStatus = action.payload;
    },
  },
});

export const userActions = {
  ...userSlice.actions,
  allMembers: createAction<{ url: string }>("user/allMembers"),
  storerDetail: createAction<{ url: string; token: string }>(
    "user/storerdetail"
  ),
  creatorDetail: createAction<{ url: string; token: string }>(
    "user/creatordetail"
  ),
  setDataLoading: createAction<boolean>("user/setDataLoading"),
  pendingUsers: createAction<{
    page_size: number;
    page: number;
    role: string;
    accessToken: string;
  }>("user/pendingUsers"),
  createBounty: createAction<{
    accessToken: string;
    formData: FormData;
  }>("user/createBounty"),
  getStorers: createAction<{
    token: string;
  }>("user/getStorers"),
  getCreators: createAction<{
    token: string;
  }>("user/getCreators"),
  getCollectors: createAction<{
    token: string;
  }>("user/getCollectors"),
  fetchUsers: createAction<{
    query: string;
    query_type: string;
    role: string;
    accessToken: string;
  }>("user/fetchUsers"),
  setSelectedUser: createAction<any>("user/setSelectedUser"),
  setChatSelectedUser: createAction<any>("user/setChatSelectedUser"),
  createProfile: createAction<{
    accessToken: string;
    id: string;
    data: {
      email: string;
      company_title: string;
      address: string;
      country: string;
    };
  }>("user/createProfile"),
  unverifiedCreatorData: createAction<{
    accessToken: string;
    id: string;
  }>("user/unverifiedCreatorData"),
  aggregatedDetailsData: createAction<{
    id: string;
    accessToken: string;
  }>("user/aggregatedDetailsData"),
  getAllNewStorers: createAction<{
    token: string;
    pageSize: number;
  }>("user/getAllNewStorers"),
  getAllNewCreators: createAction<{
    token: string;
    pageSize: number;
  }>("user/getAllNewCreators"),
  approveStorerInfo: createAction<{
    id: string;
    token: string;
    storerData: {
      name: string;
      address: string;
      geocode: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      city: string;
      country: string;
      worktime: string;
      storageSpace: number;
    };
  }>("user/approveStorerInfo"),
  updateProfileStatus: createAction<{
    id: string;
    token: string;
    profileStatusData: {
      status: string;
      status_reason: string;
    };
  }>("user/updateProfileStatus"),
};

export default userSlice.reducer;
