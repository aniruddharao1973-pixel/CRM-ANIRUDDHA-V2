// CRM-Frontend/src/features/email/emailSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/*
=====================================================
API BASE
=====================================================
*/
const API = "/api/email";

/*
=====================================================
FETCH EMAIL TEMPLATES
=====================================================
*/
export const fetchEmailTemplates = createAsyncThunk(
  "email/fetchTemplates",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/templates`);

      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch templates",
      );
    }
  },
);

/*
=====================================================
CREATE EMAIL TEMPLATE
=====================================================
*/
export const createEmailTemplate = createAsyncThunk(
  "email/createTemplate",
  async (templateData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/templates`, templateData);

      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create template",
      );
    }
  },
);

/*
=====================================================
SEND EMAIL
=====================================================
*/
export const sendEmail = createAsyncThunk(
  "email/sendEmail",
  async (emailData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/send`, emailData);

      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send email",
      );
    }
  },
);

/*
=====================================================
FETCH EMAIL LOGS
=====================================================
*/
export const fetchEmailLogs = createAsyncThunk(
  "email/fetchLogs",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams(filters).toString();

      const res = await axios.get(`${API}/logs?${params}`);

      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch email logs",
      );
    }
  },
);

/*
=====================================================
INITIAL STATE
=====================================================
*/
const initialState = {
  templates: [],
  logs: [],

  loadingTemplates: false,
  loadingLogs: false,
  sendingEmail: false,

  sendSuccess: false,

  error: null,
};

/*
=====================================================
SLICE
=====================================================
*/
const emailSlice = createSlice({
  name: "email",
  initialState,

  reducers: {
    clearEmailError: (state) => {
      state.error = null;
    },

    resetSendStatus: (state) => {
      state.sendSuccess = false;
    },
  },

  extraReducers: (builder) => {
    /*
    =====================================================
    FETCH TEMPLATES
    =====================================================
    */
    builder

      .addCase(fetchEmailTemplates.pending, (state) => {
        state.loadingTemplates = true;
      })

      .addCase(fetchEmailTemplates.fulfilled, (state, action) => {
        state.loadingTemplates = false;
        state.templates = action.payload;
      })

      .addCase(fetchEmailTemplates.rejected, (state, action) => {
        state.loadingTemplates = false;
        state.error = action.payload;
      });

    /*
    =====================================================
    CREATE TEMPLATE
    =====================================================
    */
    builder

      .addCase(createEmailTemplate.fulfilled, (state, action) => {
        state.templates.unshift(action.payload);
      })

      .addCase(createEmailTemplate.rejected, (state, action) => {
        state.error = action.payload;
      });

    /*
    =====================================================
    SEND EMAIL
    =====================================================
    */
    builder

      .addCase(sendEmail.pending, (state) => {
        state.sendingEmail = true;
        state.sendSuccess = false;
      })

      .addCase(sendEmail.fulfilled, (state) => {
        state.sendingEmail = false;
        state.sendSuccess = true;
      })

      .addCase(sendEmail.rejected, (state, action) => {
        state.sendingEmail = false;
        state.error = action.payload;
      });

    /*
    =====================================================
    FETCH EMAIL LOGS
    =====================================================
    */
    builder

      .addCase(fetchEmailLogs.pending, (state) => {
        state.loadingLogs = true;
      })

      .addCase(fetchEmailLogs.fulfilled, (state, action) => {
        state.loadingLogs = false;
        state.logs = action.payload;
      })

      .addCase(fetchEmailLogs.rejected, (state, action) => {
        state.loadingLogs = false;
        state.error = action.payload;
      });
  },
});

export const { clearEmailError, resetSendStatus } = emailSlice.actions;

export default emailSlice.reducer;
