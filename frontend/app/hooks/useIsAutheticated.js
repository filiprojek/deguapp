import { useAuth } from "../context/AuthContext";

export function useIsAutheticated() {
  const { authState } = useAuth();
  return authState.authenticated
}
