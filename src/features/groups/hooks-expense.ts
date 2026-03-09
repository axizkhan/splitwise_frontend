import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { expenseRepository } from "@/infrastructure/api/expense.repository";
import type { ExpensePayload } from "@/infrastructure/api/expense.repository";
import { QUERY_KEYS } from "@/shared/queryKeys";

export function useGroupExpenses(groupId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.EXPENSES, groupId],
    queryFn: () => expenseRepository.getGroupExpenses(groupId),
    enabled: !!groupId,
  });
}

export function useUserExpenses(groupId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_EXPENSES, groupId],
    queryFn: () => expenseRepository.getUserExpenses(groupId),
    enabled: !!groupId,
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      payload,
      groupId,
    }: {
      payload: ExpensePayload;
      groupId: string;
    }) => expenseRepository.createExpense(payload, groupId),
    onSuccess: (_, variables) => {
      // Invalidate all related queries to refresh balance and data
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EXPENSES, variables.groupId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER_EXPENSES, variables.groupId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP_DETAILS, variables.groupId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.JOURNAL],
      });
      // Refetch immediately to show updated balance
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GROUP_DETAILS, variables.groupId],
      });
    },
  });
}

export function useEditExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      expenseId,
      newExpenseAmount,
    }: {
      expenseId: string;
      newExpenseAmount: number;
    }) => expenseRepository.editExpense(expenseId, newExpenseAmount),
    onSuccess: () => {
      // Invalidate all related queries to refresh balance and data
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EXPENSES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER_EXPENSES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP_DETAILS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.JOURNAL],
      });
      // Refetch immediately to show updated balance
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GROUP_DETAILS],
      });
    },
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: expenseRepository.deleteExpense,
    onSuccess: () => {
      // Invalidate all related queries to refresh balance and data
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.EXPENSES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER_EXPENSES],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GROUP_DETAILS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.JOURNAL],
      });
      // Refetch immediately to show updated balance
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.GROUP_DETAILS],
      });
    },
  });
}
