import { Box, SimpleGrid, Skeleton, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import AppPageLayout from "../../../components/layout/PageLayout";

import { GroupHeader } from "@/features/groups/components";
import { GroupSummaryCards } from "@/features/groups/components";
import { GroupTabs } from "@/features/groups/components";
import { MembersTabContent } from "@/components/common";
import { ExpensesTabContent } from "@/features/expenses/components";
import { DeleteGroupDialog } from "@/features/groups/components";

import { useGroupDetails } from "@/features/groups/hooks";
import { useGroupExpenses } from "@/features/groups/hooks-expense";

function GroupDetailsPage() {
  const { groupId } = useParams<{ groupId: string }>();

  const [activeTab, setActiveTab] = useState<"members" | "expenses">("members");

  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  const { data: groupDetails, isLoading: groupLoading } = useGroupDetails(
    groupId || "",
  );

  const { data: expenses = [], isLoading: expenseLoading } = useGroupExpenses(
    groupId || "",
  );

  if (groupLoading) {
    return (
      <AppPageLayout>
        <Skeleton
          height="40px"
          mb={6}
        />

        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 3 }}
          gap={6}
          mb={8}>
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              height="150px"
              borderRadius="xl"
            />
          ))}
        </SimpleGrid>

        <Skeleton
          height="300px"
          borderRadius="xl"
        />
      </AppPageLayout>
    );
  }

  if (!groupDetails) {
    return (
      <AppPageLayout>
        <Text>Group not found</Text>
      </AppPageLayout>
    );
  }

  const summaryCards = [
    {
      title: "Total Spent",
      amount: groupDetails.userData?.totalSpent || 0,
      badge: "All time",
      color: "green",
    },
    {
      title: "You Owe",
      amount: groupDetails.userData?.youOwe || 0,
      badge: "Pending payments",
      color: "red",
    },
    {
      title: "You Will Receive",
      amount: groupDetails.userData?.youWillReceive || 0,
      badge: "From members",
      color: "teal",
    },
  ];

  const totalExpenseAmount = expenses.reduce(
    (sum: number, expense: any) => sum + expense.amount,
    0,
  );

  return (
    <AppPageLayout>
      <VStack
        align="stretch"
        gap={8}>
        {/* Header */}
        <Box>
          <GroupHeader groupName={groupDetails.group?.name || ""} />

          <DeleteGroupDialog
            groupId={groupId || ""}
            groupName={groupDetails.group?.name || ""}
            createdBy={groupDetails.group?.createdBy || ""}
          />
        </Box>

        {/* Summary Cards */}
        <GroupSummaryCards summaryCards={summaryCards} />

        {/* Tabs */}
        <GroupTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Content */}
        <Box>
          {activeTab === "members" && (
            <MembersTabContent
              groupId={groupId || ""}
              balances={groupDetails.balances || []}
              paymentOpen={paymentOpen}
              setPaymentOpen={setPaymentOpen}
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
            />
          )}

          {activeTab === "expenses" && (
            <ExpensesTabContent
              expenses={expenses}
              expenseLoading={expenseLoading}
              totalExpenseAmount={totalExpenseAmount}
            />
          )}
        </Box>
      </VStack>
    </AppPageLayout>
  );
}

export default GroupDetailsPage;
