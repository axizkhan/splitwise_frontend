import {
  Box,
  Card,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LuIndianRupee, LuDot } from "react-icons/lu";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";

interface JournalEntryProps {
  entry: {
    lenderId?: { name?: { firstName: string; lastName: string } };
    borowerId?: { name?: { firstName: string; lastName: string } };
    expenseId?: { title: string; description?: string; amount: number };
    paymentId?: { amount: number };
    type: "expense" | "payment";
    amount: number;
    updatedAt: string;
  };
  journalId: string;
  idx: number;
}

export function JournalEntryCard({ entry, journalId, idx }: JournalEntryProps) {
  const lenderName =
    entry.lenderId?.name?.firstName && entry.lenderId?.name?.lastName
      ? `${entry.lenderId.name.firstName} ${entry.lenderId.name.lastName}`
      : "Unknown";

  const borrowerName =
    entry.borowerId?.name?.firstName && entry.borowerId?.name?.lastName
      ? `${entry.borowerId.name.firstName} ${entry.borowerId.name.lastName}`
      : "Unknown";

  const title =
    entry.type === "expense" ? entry.expenseId?.title || "Expense" : "Payment";

  const description =
    entry.type === "expense"
      ? `${lenderName} paid for ${title}`
      : `Payment from ${lenderName}`;

  const isExpense = entry.type === "expense";

  return (
    <Card.Root
      key={`${journalId}-${idx}`}
      w="full"
      bg="bg.secondary"
      borderLeft="4px solid"
      borderLeftColor={isExpense ? "status.success" : "accent.primary"}
      border="1px solid"
      borderColor="border.default"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
        borderLeftColor: isExpense ? "status.success" : "accent.primary",
        borderColor: "border.subtle",
      }}>
      <Card.Body p={{ base: 4, md: 5 }}>
        <HStack
          justify="space-between"
          align="start"
          gap={4}>
          {/* Left Content */}
          <HStack
            align="start"
            gap={4}
            flex="1">
            {/* Icon */}
            <Box
              p={2}
              rounded="xl"
              bg={isExpense ? "rgba(52,211,153,0.1)" : "rgba(59,130,246,0.1)"}
              border="1px solid"
              borderColor={
                isExpense ? "rgba(52,211,153,0.18)" : "rgba(59,130,246,0.18)"
              }>
              <Icon
                boxSize={6}
                color={isExpense ? "status.success" : "accent.primary"}>
                <RiMoneyRupeeCircleLine />
              </Icon>
            </Box>

            {/* Text */}
            <VStack
              align="start"
              gap={1}
              flex="1">
              <Heading
                size="sm"
                color="text.primary"
                fontWeight="600"
                lineHeight="1.4">
                {description}
              </Heading>

              <HStack
                gap={1}
                color="text.muted"
                fontSize="xs">
                <Text>{new Date(entry.updatedAt).toLocaleDateString()}</Text>

                <LuDot />

                <Text>{borrowerName}</Text>
              </HStack>
            </VStack>
          </HStack>

          {/* Right Amount */}
          <VStack
            align="end"
            gap={2}>
            <HStack
              gap={1}
              bg={isExpense ? "rgba(52,211,153,0.1)" : "rgba(59,130,246,0.1)"}
              border="1px solid"
              borderColor={
                isExpense ? "rgba(52,211,153,0.18)" : "rgba(59,130,246,0.18)"
              }
              px={3}
              py={1}
              borderRadius="lg">
              <LuIndianRupee
                size={16}
                color="currentColor"
              />

              <Heading
                size="sm"
                color={isExpense ? "status.success" : "accent.primary"}
                fontWeight="700">
                {entry.amount}
              </Heading>
            </HStack>

            <Text
              fontSize="xs"
              fontWeight="700"
              color={isExpense ? "status.success" : "accent.primary"}
              textTransform="uppercase"
              letterSpacing="0.5px">
              {entry.type}
            </Text>
          </VStack>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}
