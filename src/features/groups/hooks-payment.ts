import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentRepository } from "@/infrastructure/api/payment.repository";
import { QUERY_KEYS } from "@/shared/queryKeys";

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentRepository.createPayment,
    onSuccess: (data, variables) => {
      // Invalidate all related queries to ensure fresh data
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP_DETAILS, variables.groupId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.JOURNAL],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EXPENSES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PAYMENTS],
      });
      // Refetch immediately to show updated balance
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GROUP_DETAILS, variables.groupId],
      });

      return data;
    },
  });
}
