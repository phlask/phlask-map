import { TOOLBAR_MODAL_NONE, type ToolbarModalType } from 'actions/actions';
import { createSlice } from '@reduxjs/toolkit';

type ToolbarReducer = {
  toolbarModal: ToolbarModalType;
};

const initialState: ToolbarReducer = {
  toolbarModal: TOOLBAR_MODAL_NONE
};

const toolbarSlice = createSlice({
  name: 'toolbar',
  initialState,
  reducers: create => ({
    setToolbarModal: create.reducer<ToolbarModalType>((state, action) => {
      state.toolbarModal = action.payload;
    })
  }),
  selectors: {
    getToolbarModal: state => state.toolbarModal
  }
});

const { actions, selectors } = toolbarSlice;
export const { setToolbarModal } = actions;
export const { getToolbarModal } = selectors;

export default toolbarSlice.reducer;
