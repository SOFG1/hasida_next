import { IProfile } from "../../api/home";

export interface IHomeState {
  appliedFilters: {
    [key: string]: any;
  };
  isFetchingFeed: boolean;
  feedData: {
    data: IProfile[];
    count: number;
  };
}
