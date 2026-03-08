import { useMutation } from "@tanstack/react-query";
import { reminderRepository } from "@/infrastructure/api/reminder.repository";

export function useNotifyMember() {
  return useMutation({
    mutationFn: ({
      groupId,
      memberId,
    }: {
      groupId: string;
      memberId: string;
    }) => reminderRepository.notifyMember(groupId, memberId),
  });
}
