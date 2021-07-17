import { useContext } from "react";

import {
  LoginUserContext,
  LoginUserContextType
} from "../providers/LonginUserProvider";

export const useLoginUser = (): LoginUserContextType =>
  useContext(LoginUserContext);
