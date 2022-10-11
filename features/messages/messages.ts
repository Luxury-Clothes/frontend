import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IMessage } from '../../types';

interface IState {
  messages: IMessage[];
  selectedMessage: IMessage | null;
  selectedSubject: null | string;
  isEditable: boolean;
  message: string;
  loading: boolean;
}

const initialState: IState = {
  messages: [],
  selectedMessage: null,
  selectedSubject: null,
  isEditable: false,
  loading: false,
  message: '',
};

export const getMessages = createAsyncThunk(
  'messages/getMessages',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get<IMessage[]>('/messages/');
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.errors);
    }
  }
);

export const deleteMessage = createAsyncThunk(
  'messages/deleteMessage',
  async (id: string, thunkAPI) => {
    try {
      await axios.delete('/messages/' + id);
      return id;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.errors);
    }
  }
);

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async (
    {
      subject,
      message,
      is_send,
    }: { subject: string; message: string; is_send: boolean },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.post<IMessage>('/messages/', {
        subject,
        message,
        isSend: is_send,
      });
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.errors);
    }
  }
);

export const updateMessage = createAsyncThunk(
  'messages/updateMessage',
  async (
    {
      subject,
      message,
      is_send,
      id,
    }: { subject: string; message: string; is_send: boolean; id: string },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.patch<IMessage>('/messages/' + id, {
        subject,
        message,
        isSend: is_send,
      });
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.response?.data?.errors);
    }
  }
);

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.selectedMessage = null;
      state.message = '';
    },
    setSelectedMessage: (state, action: PayloadAction<IMessage>) => {
      state.selectedMessage = action.payload;
      state.message = action.payload.message;
      state.selectedSubject = action.payload.subject;
      state.isEditable = !action.payload.is_send;
    },
    setSelectedSubject: (state, action: PayloadAction<string>) => {
      state.selectedSubject = action.payload;
    },
    setIsEditable: (state, action: PayloadAction<boolean>) => {
      state.isEditable = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getMessages.fulfilled,
        (state, action: PayloadAction<IMessage[]>) => {
          state.messages = action.payload.sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          );
          state.loading = false;
        }
      )
      .addCase(getMessages.rejected, (state) => {
        state.loading = false;
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        sendMessage.fulfilled,
        (state, action: PayloadAction<IMessage>) => {
          state.messages.unshift(action.payload);
          state.loading = false;
        }
      )
      .addCase(sendMessage.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateMessage.fulfilled,
        (state, action: PayloadAction<IMessage>) => {
          state.messages = state.messages.map((m) =>
            m.id === action.payload.id ? action.payload : m
          );
          state.loading = false;
        }
      )
      .addCase(updateMessage.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteMessage.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.messages = state.messages.filter(
            (message) => message.id !== action.payload
          );
          state.selectedMessage = null;
          state.selectedSubject = '';
          state.message = '';
          state.loading = false;
        }
      )
      .addCase(deleteMessage.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setSelectedMessage,
  setSelectedSubject,
  setIsEditable,
  setMessage,
  resetMessage,
} = messagesSlice.actions;

export default messagesSlice.reducer;
