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

  const userName = user?.firstName || "User";

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
          borderColor="slate.700"
          color="slate.300"
          _hover={{ bg: "slate.800" }}
          gap={2}
          w="fit-content">
          <IoArrowBack />
        </Button>

        {/* Between Users */}

        <HStack gap={2}>
          <Text
            color="slate.400"
            fontSize="sm">
            Between
          </Text>

          <Badge
            colorPalette="green"
            px={2}>
            You
          </Badge>

          <Text color="slate.500">and</Text>

          <Badge
            colorPalette="blue"
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
              bg="linear-gradient(135deg, rgba(34,197,94,0.2), rgba(34,197,94,0.1))"
              borderRadius="xl"
              border="1px solid"
              borderColor="rgba(34,197,94,0.3)">
              <Icon
                boxSize={8}
                color="green.400">
                <FaUser />
              </Icon>
            </Box>

            <VStack
              align="start"
              gap={0}>
              <Heading
                size="lg"
                color="slate.100">
                {fullMemberName}
              </Heading>

              <Text
                fontSize="sm"
                color="slate.400">
                Transaction history with {fullMemberName}
              </Text>
            </VStack>
          </HStack>

          {/* Cards */}

          <HStack gap={4}>
            {/* Balance Card */}

            <Card.Root
              bg="rgba(30,41,59,0.6)"
              border="1px solid"
              borderColor="slate.700"
              px={6}
              py={4}>
              <Card.Body>
                <Text
                  fontSize="xs"
                  color="slate.400"
                  textTransform="uppercase">
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
                  color="slate.400">
                  {balanceText}
                </Text>
              </Card.Body>
            </Card.Root>

            {/* Transactions Card */}

            <Card.Root
              bg="linear-gradient(135deg, rgba(34,197,94,0.1), rgba(16,185,129,0.05))"
              border="1px solid"
              borderColor="rgba(34,197,94,0.3)"
              px={6}
              py={4}>
              <Card.Body>
                <Text
                  fontSize="xs"
                  fontWeight="700"
                  color="slate.400"
                  textTransform="uppercase">
                  Transactions
                </Text>

                <Heading
                  size="md"
                  mt={2}
                  color="green.300">
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
              color="slate.100">
              Transaction History
            </Heading>

            {isLoading ? (
              <VStack gap={4}>
                {[1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    height="100px"
                    borderRadius="xl"
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
                    borderColor="green.500"
                    color="green.400"
                    _hover={{
                      bg: "rgba(34,197,94,0.1)",
                      borderColor: "green.400",
                    }}
                    onClick={() => setPageNumber(pageNumber + 1)}>
                    Load More Transactions
                  </Button>
                )}
              </>
            ) : (
              <Card.Root
                border="1px dashed"
                borderColor="slate.700">
                <Card.Body
                  textAlign="center"
                  py={8}>
                  <Text color="slate.400">No transactions yet</Text>
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
            borderColor="slate.700"
            borderRadius="xl"
            bg="rgba(30,41,59,0.5)"
            alignSelf="start"
            position="sticky"
            top="100px">
            <Heading
              size="md"
              color="slate.100">
              Quick Actions
            </Heading>

            <Button
              variant="outline"
              borderColor="green.500"
              color="green.400"
              _hover={{
                bg: "rgba(34,197,94,0.1)",
                borderColor: "green.400",
              }}
              onClick={() => setIsPaymentOpen(true)}>
              Make Payment
            </Button>

            <Button
              variant="outline"
              borderColor="yellow.500"
              color="yellow.400"
              _hover={{
                bg: "rgba(250,204,21,0.1)",
                borderColor: "yellow.400",
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
