import { IProfile } from "../../api/home";
import { RootStateType } from "../store";

export const homeAppliedFiltersSelector = (state: RootStateType) => state.home.appliedFilters
export const homeIsFetchingFeedSelector = (state: RootStateType) => state.home.isFetchingFeed
export const homeFeedDataSelector = (state: RootStateType) => state.home.feedData
