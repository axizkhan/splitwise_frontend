import httpClient from "@/core/http/httpClient";

export const reminderRepository = {
  async notifyMember(
    groupId: string,
    memberId: string,
  ): Promise<{ message: string }> {
    const response = await httpClient.post(
      `/api/auth/reminder/${groupId}/${memberId}`,
    );

    return response.data;
  },
};
