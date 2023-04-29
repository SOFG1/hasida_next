import { RootStateType } from "../store";

export const userTokenSelector = (state: RootStateType): string | null => state.user.token