import {
  call,
  put,
  delay,
  all,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { userActions } from "./userSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { useFetch } from "../../hooks/useFetch";
import { API_URI } from "src/api/auth";

// import type { AppState } from "../store";
// import { selects } from "../hooks";

export function* userAllMembersHandler(
  action: PayloadAction<{
    results: number;
    url: string;
  }>
): Generator<any, any, any> {
  console.warn("allMembers", action);

  try {
    const url = action.payload.url;
    const data = yield call(useFetch, url, "GET", "");
    yield put(userActions.setAllMembers(data.results));
  } catch (err) {
  } finally {
  }
}

export function* userPendingUsersHandler(
  action: PayloadAction<{
    accessToken: string;
    page_size: number;
    page: number;
    role: string;
  }>
): Generator<any, any, any> {
  try {
    const { page_size, page, role, accessToken } = action.payload;
    yield put(userActions.setDataLoading(true));
    const url = `${API_URI}api/v1/users/pending?page_size=${page_size}&page=${page}&role=${role}`;
    const headers = {
      "Content-Type": "text/plain",
      Authorization: `Bearer ${accessToken}`,
    };
    const options: RequestInit = {
      method: "GET",
      headers: headers,
    };
    const response = yield fetch(url, options);
    const data = yield response.json();

    if (response.ok) {
      yield put(userActions.setPendingUsers(data.pending_users));
      yield put(userActions.setDataLoading(false));
    } else {
      yield put(userActions.setDataLoading(false));
    }
  } catch (err) {
    yield put(userActions.setDataLoading(false));
  }
}

export function* userStorerDetailHandler(
  action: PayloadAction<{
    results: number;
    url: string;
    token: string;
  }>
): Generator<any, any, any> {
  console.warn("storeDetail", action);

  try {
    const { url, token } = action.payload;
    yield put(userActions.setDataLoading(true));
    const response = yield call(useFetch, url, "GET", token);
    if (response.status === "success") {
      yield put(userActions.setStorerDetail(response.storer));
      yield put(userActions.setDataLoading(false));
    }
  } catch (err) {
    yield put(userActions.setDataLoading(false));
  } finally {
    yield put(userActions.setDataLoading(false));
  }
}

export function* userCreatorDetailHandler(
  action: PayloadAction<{
    results: number;
    url: string;
    token: string;
  }>
): Generator<any, any, any> {
  console.warn("storeDetail", action);

  try {
    const { url, token } = action.payload;
    yield put(userActions.setDataLoading(true));
    const response = yield call(useFetch, url, "GET", token);
    if (response.status === "success") {
      yield put(userActions.setCreatorDetail(response.creator));
      yield put(userActions.setDataLoading(false));
    }
  } catch (err) {
    yield put(userActions.setDataLoading(false));
  } finally {
    yield put(userActions.setDataLoading(false));
  }
}

export function* createBountyHandler(
  action: PayloadAction<{
    accessToken: string;
    formData: FormData;
  }>
): Generator<any, any, any> {
  try {
    const { accessToken, formData } = action.payload;
    yield put(userActions.setDataLoading(true));
    const url = `${API_URI}api/v1/bounty/create`;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const options: RequestInit = {
      method: "POST",
      headers: headers,
      body: formData,
    };

    const response = yield call(fetch, url, options);
    const data = yield response.json();

    if (response.ok) {
      yield put(userActions.setCreateBounty(data.id));
      yield put(userActions.setDataLoading(false));
    } else {
      alert(data.messages);
      yield put(userActions.setDataLoading(false));
    }
  } catch (err) {
    yield put(userActions.setDataLoading(false));
  }
}

export function* getStorersHandler(
  action: PayloadAction<{
    token: string;
  }>
): Generator<any, any, any> {
  console.warn("getStorers", action);
  const endpoint = `${API_URI}api/v1/user/get_storers_page_in_category`;
  try {
    yield put(userActions.setDataLoading(true));

    const { token } = action.payload;
    const response = yield call(useFetch, endpoint, "GET", token);
    const { result } = yield response;
    console.log(result);
    yield put(userActions.setStorers(result));
    yield put(userActions.setDataLoading(false));
  } catch (err) {
    console.log(err);
    yield put(userActions.setDataLoading(false));
  } finally {
    yield put(userActions.setDataLoading(false));
  }
}

export function* getCreatorsHandler(
  action: PayloadAction<{
    token: string;
  }>
): Generator<any, any, any> {
  console.warn("getCreators", action);
  const endpoint = `${API_URI}api/v1/user/get_creators_page_in_category `;
  try {
    yield put(userActions.setDataLoading(true));

    const { token } = action.payload;
    const response = yield call(useFetch, endpoint, "GET", token);
    const { result } = yield response;
    console.log(result);
    yield put(userActions.setCreators(result));
    yield put(userActions.setDataLoading(false));
  } catch (err) {
    console.log(err);
    yield put(userActions.setDataLoading(false));
  } finally {
    yield put(userActions.setDataLoading(false));
  }
}

export function* getCollectorsHandler(
  action: PayloadAction<{
    token: string;
  }>
): Generator<any, any, any> {
  console.warn("getCollectors", action);
  const endpoint = `${API_URI}api/v1/user/get_collectors_page_in_category `;
  try {
    yield put(userActions.setDataLoading(true));

    const { token } = action.payload;
    const response = yield call(useFetch, endpoint, "GET", token);
    const { result } = yield response;

    yield put(userActions.setCollectors(result));
    yield put(userActions.setDataLoading(false));
  } catch (err) {
    console.log(err);
    yield put(userActions.setDataLoading(false));
  } finally {
    yield put(userActions.setDataLoading(false));
  }
}

export function* fetchUsersHandler(
  action: PayloadAction<{
    query: string;
    query_type: string;
    role: string;
    accessToken: string;
  }>
): Generator<any, any, any> {
  try {
    const { query, query_type, role, accessToken } = action.payload;

    const url = `${API_URI}api/v1/user?query=${query}&query_type=${query_type}&role=${role}`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const options: RequestInit = {
      method: "GET",
      headers,
    };

    const response = yield call(fetch, url, options);

    if (response.ok) {
      const data = yield response.json();
      yield put(userActions.setFetchAllUsers(data));
    } else {
      console.error("Error fetching users:", response.statusText);
    }
  } catch (err) {
    console.error("Error fetching users:", err);
  }
}

export function* createProfileHandler(
  action: PayloadAction<{
    accessToken: string;
    id: string;
    data: {
      email: string;
      company_title: string;
      address: string;
      country: string;
    };
  }>
): Generator<any, any, any> {
  try {
    const { accessToken, data, id } = action.payload;
    yield put(userActions.setDataLoading(true));

    const url = `${API_URI}api/v1/creator/${id}`;
    const headers = {
      "Content-Type": "text/plain",
      Authorization: `Bearer ${accessToken}`,
    };

    const options: RequestInit = {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(data),
    };

    const response = yield fetch(url, options);
    const responseData = yield response.json();

    if (response.ok) {
      yield put(userActions.setCreateProfile(true));
      yield put(userActions.setDataLoading(false));
    } else {
      yield put(userActions.setCreateProfile(false));
      yield put(userActions.setDataLoading(false));
    }
  } catch (err) {
    yield put(userActions.setCreateProfile(false));
    yield put(userActions.setDataLoading(false));
  } finally {
    yield put(userActions.setDataLoading(false));
  }
}

export function* getAggregatedDataForUnverifiedCreatorHandler(
  action: PayloadAction<{ creatorId: string; accessToken: string }>
): Generator<any, any, any> {
  try {
    const { creatorId, accessToken } = action.payload;
    yield put(userActions.setDataLoading(true));
    const url = `${API_URI}api/v1/user/get_aggregated_data_unverified_creator/${creatorId}`;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const options: RequestInit = {
      method: "GET",
      headers,
    };

    const response = yield call(fetch, url, options);

    if (response.ok) {
      const data = yield response.json();
      yield put(userActions.setDataLoading(false));
      yield put(
        userActions.setUnverifiedCreatorData(data.result.creator_detail)
      );
    } else {
      yield put(userActions.setDataLoading(false));
    }
  } catch (err) {
    yield put(userActions.setDataLoading(false));
  }
}

export function* getAggregatedDataCollectorDetailsHandler(
  action: PayloadAction<{ id: string; accessToken: string }>
): Generator<any, any, any> {
  try {
    const { id, accessToken } = action.payload;
    yield put(userActions.setDataLoading(true));
    const url = `${API_URI}api/v1/user/get_aggregated_data_collector/${id}`;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const options: RequestInit = {
      method: "GET",
      headers,
    };

    const response = yield call(fetch, url, options);

    if (response.ok) {
      const data = yield response.json();
      yield put(userActions.setDataLoading(false));
      yield put(userActions.setAggregatedDetailsData(data.result));
    } else {
      yield put(userActions.setDataLoading(false));
    }
  } catch (err) {
    yield put(userActions.setDataLoading(false));
  }
}

export function* getAllNewStorersHandler(
  action: PayloadAction<{
    token: string;
    pageSize: number;
  }>
): Generator<any, any, any> {
  console.warn("getAllNewStorers", action);
  const { token, pageSize } = action.payload;
  const endpoint = `${API_URI}api/v1/user/get-all-new-storers?page_size=${pageSize}&page=1`;
  try {
    yield put(userActions.setNewStorers(["loading"]));

    const response = yield call(useFetch, endpoint, "GET", token);
    const { storers } = yield response;
    console.log(storers);
    yield put(userActions.setNewStorers(storers));
  } catch (err) {
    console.log(err);
    yield put(userActions.setNewStorers([]));
  }
}

export function* getAllNewCreatorsHandler(
  action: PayloadAction<{
    token: string;
    pageSize: number;
  }>
): Generator<any, any, any> {
  console.warn("getAllNewCreators", action);
  const { token, pageSize } = action.payload;
  const endpoint = `${API_URI}api/v1/user/get-all-new-creators?page_size=${pageSize}&page=1`;
  try {
    yield put(userActions.setNewCreators(["loading"]));

    const response = yield call(useFetch, endpoint, "GET", token);
    const { creators } = yield response;
    console.log(creators);
    yield put(userActions.setNewCreators(creators));
  } catch (err) {
    console.log(err);
    yield put(userActions.setNewCreators([]));
  }
}

export function* approveStorerInfoHandler(
  action: PayloadAction<{
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
  }>
): Generator<any, any, any> {
  const { id, token, storerData } = action.payload;
  const endpoint = `${API_URI}api/v1/storer/${id}`;
  try {
    yield put(userActions.setDataLoading(true));
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(storerData),
    };

    const response = yield fetch(endpoint, requestOptions);

    if (response.ok) {
      yield put(userActions.setApproveStorer(true));
      yield put(userActions.setDataLoading(false));
    } else {
      console.log('Failed to approve storer information');
      yield put(userActions.setDataLoading(false));
    }
  } catch (err) {
    console.log(err);
    yield put(userActions.setDataLoading(false));
  }
}

export function* updateProfileStatusHandler(
  action: PayloadAction<{
    id: string;
    token: string;
    profileStatusData: {
      status: string;
      status_reason: string;
    };
  }>
): Generator<any, any, any> {
  const { id, token, profileStatusData } = action.payload;
  const endpoint = `${API_URI}api/v1/user/${id}/profile`;
  try {
    yield put(userActions.setDataLoading(true));
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileStatusData),
    };

    const response = yield fetch(endpoint, requestOptions);

    if (response.ok) {
      yield put(userActions.setProfileStatus(true));
      yield put(userActions.setDataLoading(false));
    } else {
      console.log('Failed to update profile status');
      yield put(userActions.setDataLoading(false));
    }
  } catch (err) {
    console.log(err);
    yield put(userActions.setDataLoading(false));
  }
}

export default function* userWalletSaga() {
  yield all([
    takeEvery(userActions.allMembers.type, userAllMembersHandler),
    takeEvery(userActions.storerDetail.type, userStorerDetailHandler),
    takeEvery(userActions.creatorDetail.type, userCreatorDetailHandler),
    takeEvery(userActions.pendingUsers.type, userPendingUsersHandler),
    takeEvery(userActions.createBounty.type, createBountyHandler),
    takeEvery(userActions.getStorers.type, getStorersHandler),
    takeEvery(userActions.getCreators.type, getCreatorsHandler),
    takeEvery(userActions.getCollectors.type, getCollectorsHandler),
    takeEvery(userActions.fetchUsers.type, fetchUsersHandler),
    takeEvery(userActions.createProfile.type, createProfileHandler),
    takeEvery(
      userActions.unverifiedCreatorData.type,
      getAggregatedDataForUnverifiedCreatorHandler
    ),
    takeEvery(
      userActions.aggregatedDetailsData.type,
      getAggregatedDataCollectorDetailsHandler
    ),
    takeLatest(userActions.getAllNewStorers.type, getAllNewStorersHandler),
    takeLatest(userActions.getAllNewCreators.type, getAllNewCreatorsHandler),
    takeLatest(userActions.approveStorerInfo.type, approveStorerInfoHandler),
    takeLatest(userActions.updateProfileStatus.type, updateProfileStatusHandler),
  ]);
  delay(1000);
}
