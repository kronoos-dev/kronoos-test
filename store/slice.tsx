import { createSlice } from "@reduxjs/toolkit";

const initialState: State = {
  contracts: [],
  filter: {
    page: 1,
    limit: 50,
    filter: "",
  },
};

export const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    addContracts: (state, action) => {
      const newContracts: Contract[] = action.payload;

      const updatedContracts = state.contracts.map((existingContract) => {
        const matchingContract = newContracts.find(
          (newContract) => newContract.id === existingContract.id
        );
        return matchingContract
          ? { ...existingContract, ...matchingContract }
          : existingContract;
      });

      const nonExistingContracts = newContracts.filter(
        (newContract) =>
          !updatedContracts.some((contract) => contract.id === newContract.id)
      );

      const mergedContracts = [...updatedContracts, ...nonExistingContracts];

      state.contracts = mergedContracts;
    },
    incrementPage: (state) => {
      state.filter.page++;
    },
  },
});

export const { addContracts, incrementPage } = contractSlice.actions;

export default contractSlice.reducer;
