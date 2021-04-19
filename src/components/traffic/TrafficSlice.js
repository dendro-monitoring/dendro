// import { userAPI } from "../../../../../stats/src/userAPI";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const trafficAdapter = createEntityAdapter({
  selectId: (traffic) => traffic.TIME,
  sortComparer: (a, b) => b.TIME - a.TIME,
});

export const fetchTraffic = createAsyncThunk(
  "traffic/fetchAllTrafficStatus",
  async (arg, thunkAPI) => {
    const response = await userAPI.getAllTraffic();
    const data = await response.json();
    return data;
  }
);

const addTrafficToEndpoints = (state, action) => {
  let endpoints = {};

  for (let i = 0; i < action.payload.length; i++) {
    const traffic = action.payload[i];
    const id = endpoints[traffic.ID];

    if (id) {
      id.push(traffic);
    } else {
      endpoints[traffic.ID] = [];
      endpoints[traffic.ID].push(traffic);
    }
  }

  Object.keys(endpoints).forEach((key) =>
    endpoints[key].sort((a, b) => b.TIME - a.TIME)
  );

  state.endpoints = endpoints;
};

const trafficSlice = createSlice({
  name: "traffic",
  initialState: trafficAdapter.getInitialState({ status: "idle", error: null, endpoints: {} }),
  reducers: {},
  extraReducers: {
    [fetchTraffic.fulfilled]: (state, action) => {
      trafficAdapter.addMany(state, action.payload);
      addTrafficToEndpoints(state, action);
      state.status = "done";
    },
    [fetchTraffic.pending]: (state, action) => {
      state.status = "pending";
    },
    [fetchTraffic.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default trafficSlice.reducer;

export const { selectAll: selectAllTraffic } = trafficAdapter.getSelectors(
  (state) => state.traffic
);
