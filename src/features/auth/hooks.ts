import { useMutation } from "@tanstack/react-query";
import { authRepository } from "@/infrastructure/api/auth.repository";
import { useAuth } from "@/core/state/auth";

export function useLogin() {
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: authRepository.login,
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
    },
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: authRepository.signup,
  });
}

export function useVerifyEmail() {
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: authRepository.verifyEmail,

    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
    },
  });
}
