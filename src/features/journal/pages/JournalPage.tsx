import {
  Box,
  Heading,
  HStack,
  Text,
  VStack,
  Card,
  Badge,
  SimpleGrid,
  Button,
  Icon,
  Stack,
  Skeleton,
} from "@chakra-ui/react";

import { MdNotificationsActive } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

import { useUserToUserJournalEntries } from "@/features/journal/hooks";
import { useNotifyMember } from "@/features/journal/hooks";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/core/state/auth";
import { useState } from "react";

import { JournalEntryCard } from "@/features/journal/components";
import { PaymentDialog } from "@/features/payments/components";
import { useToast } from "@/shared/toastService";

import AppPageLayout from "../../../components/layout/PageLayout";

function Journel() {
  const { groupId, memberId } = useParams<{
    groupId: string;
    memberId: string;
  }>();

  const navigate = useNavigate();
  const { user } = useAuth();
  const [pageNumber, setPageNumber] = useState(1);
  const toast = useToast();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const { data: journalData, isLoading } = useUserToUserJournalEntries(
    groupId || "",
    memberId || "",
    pageNumber,
  );

  const { mutate: notifyMember, isPending } = useNotifyMember();

  const otherMember = journalData?.entries?.[0]?.users?.find(
    (u: any) => u._id !== user?.id,
  );

  const fullMemberName =
    `${otherMember?.name?.firstName ?? ""} ${otherMember?.name?.lastName ?? ""}`.trim();

  const balance =
    journalData?.entries?.reduce((sum: number, journal: any) => {
      return (
        sum +
        (journal.entryArray?.reduce((entrySum: number, entry: any) => {
          if (entry.type === "EXPENSE") {
            return (
              entrySum +
              (entry.lenderId === memberId ? -entry.amount : entry.amount)
            );
          }
          return entrySum;
        }, 0) || 0)
      );
    }, 0) || 0;

  const balanceAbs = Math.abs(balance);

  const balanceText =
    balance === 0
      ? "You are settled up"
      : balance > 0
        ? `${fullMemberName} owes you`
        : `You owe ${fullMemberName}`;

  const balanceColor =
    balance === 0 ? "gray.400" : balance > 0 ? "green.400" : "red.400";

  const onReminderAlert = () => {
    if (groupId && memberId) {
      notifyMember(
        { groupId, memberId },
        {
          onSuccess: () => {
            toast.success("Reminder sent successfully via email");
          },
          onError: (error: any) => {
            toast.error("Notification Failed", error?.message || "Error");
          },
        },
      );
    }
  };

  const totalEntries =
    journalData?.entries?.reduce(
      (sum: number, j: any) => sum + (j.entryArray?.length || 0),
      0,
    ) || 0;

  return (
    <AppPageLayout>
      <VStack
        align="stretch"
        gap={8}>
        {/* Back Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/group/${groupId}`)}
          borderColor="border.subtle"
          color="text.secondary"
          bg="bg.secondary"
          _hover={{
            bg: "bg.tertiary",
            borderColor: "accent.primary",
            color: "text.primary",
          }}
          gap={2}
          w="fit-content">
          <IoArrowBack />
        </Button>

        {/* Between Users */}
        <HStack gap={2}>
          <Text
            color="text.muted"
            fontSize="sm">
            Between
          </Text>

          <Badge
            bg="rgba(52,211,153,0.12)"
            color="status.success"
            border="1px solid"
            borderColor="rgba(52,211,153,0.2)"
            px={2}>
            You
          </Badge>

          <Text color="text.muted">and</Text>

          <Badge
            bg="rgba(59,130,246,0.12)"
            color="accent.primary"
            border="1px solid"
            borderColor="rgba(59,130,246,0.2)"
            px={2}>
            {fullMemberName}
          </Badge>
        </HStack>

        {/* Header */}
        <Stack
          direction={{ base: "column", lg: "row" }}
          justify="space-between"
          align={{ base: "flex-start", lg: "center" }}
          gap={6}>
          {/* User */}
          <HStack gap={4}>
            <Box
              p={3}
              bg="rgba(59,130,246,0.1)"
              borderRadius="xl"
              border="1px solid"
              borderColor="rgba(59,130,246,0.2)">
              <Icon
                boxSize={8}
                color="accent.primary">
                <FaUser />
              </Icon>
            </Box>

            <VStack
              align="start"
              gap={0}>
              <Heading
                size="lg"
                color="text.primary"
                fontWeight="800">
                {fullMemberName}
              </Heading>

              <Text
                fontSize="sm"
                color="text.muted">
                Transaction history with {fullMemberName}
              </Text>
            </VStack>
          </HStack>

          {/* Summary Cards */}
          <HStack gap={4}>
            {/* Balance */}
            <Card.Root
              bg="bg.secondary"
              border="1px solid"
              borderColor="border.default"
              px={6}
              py={4}
              boxShadow="0 4px 12px rgba(0,0,0,0.2)">
              <Card.Body>
                <Text
                  fontSize="xs"
                  color="text.muted"
                  textTransform="uppercase"
                  fontWeight="700"
                  letterSpacing="0.06em">
                  Balance
                </Text>

                <Heading
                  size="md"
                  color={balanceColor}
                  mt={1}>
                  ₹{balanceAbs}
                </Heading>

                <Text
                  fontSize="sm"
                  color="text.secondary">
                  {balanceText}
                </Text>
              </Card.Body>
            </Card.Root>

            {/* Transactions */}
            <Card.Root
              bg="bg.secondary"
              border="1px solid"
              borderColor="border.default"
              px={6}
              py={4}
              boxShadow="0 4px 12px rgba(0,0,0,0.2)">
              <Card.Body>
                <Text
                  fontSize="xs"
                  fontWeight="700"
                  color="text.muted"
                  textTransform="uppercase"
                  letterSpacing="0.06em">
                  Transactions
                </Text>

                <Heading
                  size="md"
                  mt={2}
                  color="accent.primary">
                  {totalEntries}
                </Heading>
              </Card.Body>
            </Card.Root>
          </HStack>
        </Stack>

        {/* Main Layout */}
        <SimpleGrid
          columns={{ base: 1, lg: 3 }}
          gap={8}
          alignItems="start">
          {/* Transactions */}
          <VStack
            align="stretch"
            gap={6}
            gridColumn={{ lg: "span 2" }}>
            <Heading
              size="md"
              color="text.primary"
              fontWeight="700">
              Transaction History
            </Heading>

            {isLoading ? (
              <VStack gap={4}>
                {[1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    height="100px"
                    borderRadius="2xl"
                  />
                ))}
              </VStack>
            ) : journalData?.entries?.length ? (
              <>
                {journalData.entries.flatMap((journal: any) =>
                  journal.entryArray?.map((entry: any, idx: number) => (
                    <JournalEntryCard
                      key={`${journal._id}-${idx}`}
                      entry={entry}
                      journalId={journal._id}
                      idx={idx}
                    />
                  )),
                )}

                {journalData.totalEntryCount > 10 && (
                  <Button
                    variant="outline"
                    borderColor="accent.primary"
                    color="accent.primary"
                    _hover={{
                      bg: "rgba(59,130,246,0.1)",
                      borderColor: "accent.primary",
                    }}
                    onClick={() => setPageNumber(pageNumber + 1)}>
                    Load More Transactions
                  </Button>
                )}
              </>
            ) : (
              <Card.Root
                border="1px dashed"
                borderColor="border.subtle"
                bg="bg.secondary">
                <Card.Body
                  textAlign="center"
                  py={8}>
                  <Text color="text.muted">No transactions yet</Text>
                </Card.Body>
              </Card.Root>
            )}
          </VStack>

          {/* Sidebar */}
          <VStack
            align="stretch"
            gap={4}
            p={6}
            border="1px solid"
            borderColor="border.default"
            borderRadius="2xl"
            bg="bg.secondary"
            alignSelf="start"
            position="sticky"
            top="100px"
            boxShadow="0 4px 12px rgba(0,0,0,0.2)">
            <Heading
              size="md"
              color="text.primary">
              Quick Actions
            </Heading>

            <Button
              variant="outline"
              borderColor="accent.primary"
              color="accent.primary"
              _hover={{
                bg: "rgba(59,130,246,0.1)",
                borderColor: "accent.primary",
              }}
              onClick={() => setIsPaymentOpen(true)}>
              Make Payment
            </Button>

            <Button
              variant="outline"
              borderColor="status.warning"
              color="status.warning"
              _hover={{
                bg: "rgba(251,146,60,0.1)",
              }}
              loading={isPending}
              onClick={onReminderAlert}
              gap={2}>
              <MdNotificationsActive />
              Notify Member
            </Button>

            {memberId && (
              <PaymentDialog
                memberId={memberId}
                memberName={fullMemberName}
                groupId={groupId || ""}
                balance={balanceAbs}
                isOpen={isPaymentOpen}
                onOpenChange={setIsPaymentOpen}
              />
            )}
          </VStack>
        </SimpleGrid>
      </VStack>
    </AppPageLayout>
  );
}

export default Journel;
