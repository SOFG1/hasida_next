import { RootStateType } from "../store";
import { AlertType } from "./types";

export const appAlertSelector = (state: RootStateType): AlertType | null => state.app.alert