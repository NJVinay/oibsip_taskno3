import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchAccounts = createAsyncThunk(
    'account/fetchAccounts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/accounts/my-accounts');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch accounts');
        }
    }
);

export const fetchBalance = createAsyncThunk(
    'account/fetchBalance',
    async (accountNumber, { rejectWithValue }) => {
        try {
            const response = await api.get(`/accounts/${accountNumber}/balance`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch balance');
        }
    }
);

export const deposit = createAsyncThunk(
    'account/deposit',
    async (depositData, { rejectWithValue }) => {
        try {
            const response = await api.post('/accounts/deposit', depositData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Deposit failed');
        }
    }
);

export const withdraw = createAsyncThunk(
    'account/withdraw',
    async (withdrawData, { rejectWithValue }) => {
        try {
            const response = await api.post('/accounts/withdraw', withdrawData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Withdrawal failed');
        }
    }
);

export const transfer = createAsyncThunk(
    'account/transfer',
    async (transferData, { rejectWithValue }) => {
        try {
            const response = await api.post('/accounts/transfer', transferData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Transfer failed');
        }
    }
);

export const fetchTransactions = createAsyncThunk(
    'account/fetchTransactions',
    async (accountNumber, { rejectWithValue }) => {
        try {
            const response = await api.get(`/accounts/${accountNumber}/transactions`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch transactions');
        }
    }
);

export const createAccount = createAsyncThunk(
    'account/createAccount',
    async (accountData, { rejectWithValue }) => {
        try {
            const response = await api.post('/accounts/create', accountData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to create account');
        }
    }
);

export const deleteAccount = createAsyncThunk(
    'account/deleteAccount',
    async (accountNumber, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/accounts/${accountNumber}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to delete account');
        }
    }
);

export const addBalance = createAsyncThunk(
    'account/addBalance',
    async (balanceData, { rejectWithValue }) => {
        try {
            const response = await api.post('/accounts/add-balance', balanceData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to add balance');
        }
    }
);

const initialState = {
    accounts: [],
    selectedAccount: null,
    transactions: [],
    loading: false,
    error: null,
    success: null,
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setSelectedAccount: (state, action) => {
            state.selectedAccount = action.payload;
        },
        selectAccount: (state, action) => {
            state.selectedAccount = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccounts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAccounts.fulfilled, (state, action) => {
                state.loading = false;
                state.accounts = action.payload;
                if (action.payload.length > 0 && !state.selectedAccount) {
                    state.selectedAccount = action.payload[0];
                }
            })
            .addCase(fetchAccounts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchBalance.fulfilled, (state, action) => {
                state.selectedAccount = action.payload;
            })
            .addCase(deposit.fulfilled, (state, action) => {
                state.success = 'Deposit successful';
            })
            .addCase(deposit.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(withdraw.fulfilled, (state, action) => {
                state.success = 'Withdrawal successful';
            })
            .addCase(withdraw.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(transfer.fulfilled, (state, action) => {
                state.success = 'Transfer successful';
            })
            .addCase(transfer.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.transactions = action.payload;
            })
            .addCase(createAccount.fulfilled, (state, action) => {
                state.success = 'Account created successfully';
            })
            .addCase(createAccount.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteAccount.fulfilled, (state, action) => {
                state.success = 'Account deleted successfully';
            })
            .addCase(deleteAccount.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(addBalance.fulfilled, (state, action) => {
                state.success = 'Balance added successfully';
            })
            .addCase(addBalance.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { setSelectedAccount, selectAccount, clearError, clearSuccess } = accountSlice.actions;
export default accountSlice.reducer;
