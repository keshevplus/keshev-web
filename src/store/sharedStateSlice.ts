import { createSlice, PayloadAction } from '@reduxjs/toolkit'; // Ensure @reduxjs/toolkit is installed

interface SharedState {
  isHomePage: boolean;
  isScrolled: boolean;
  isMenuOpen: boolean;
}

const initialState: SharedState = {
  isHomePage: false,
  isScrolled: false,
  isMenuOpen: false,
};

const sharedStateSlice = createSlice({
  name: 'sharedState',
  initialState,
  reducers: {
    setIsHomePage(state, action: PayloadAction<boolean>) {
      state.isHomePage = action.payload;
    },
    setIsScrolled(state, action: PayloadAction<boolean>) {
      state.isScrolled = action.payload;
    },
    setIsMenuOpen(state, action: PayloadAction<boolean>) {
      state.isMenuOpen = action.payload;
    },
  },
});

export const { setIsHomePage, setIsScrolled, setIsMenuOpen } =
  sharedStateSlice.actions;

export default sharedStateSlice.reducer;
