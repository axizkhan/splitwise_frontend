import {
  Box,
  Button,
  HStack,
  SimpleGrid,
  VStack,
  Heading,
  Text,
  Badge,
  Skeleton,
} from "@chakra-ui/react";
import { IoArrowBack } from "react-icons/io5";
import { ExpenseCardComponent } from "@/features/expenses/components";
import { useParams, useNavigate } from "react-router-dom";
import { CreateExpenseDialog } from "@/features/expenses/components";
import { useGroupExpenses } from "@/features/groups/hooks-expense";

function ExpenseList() {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const { data: expenses = [], isLoading } = useGroupExpenses(groupId || "");

  const totalAmount = expenses.reduce(
    (sum: number, expense: any) => sum + expense.amount,
    0,
  );

  return (
    <Box
      maxWidth="1200px"
      mx="auto"
      px={{ base: 4, md: 6 }}
      py={{ base: 8, md: 12 }}>
      {/* Header */}
      <HStack
        maxWidth="1200px"
        justifyContent="space-between"
        align="center"
        mb={{ base: 8, md: 10 }}>
        {/* Back Button */}
        <Button
          variant="outline"
          borderColor="border.subtle"
          color="text.primary"
          bg="bg.secondary"
          transition="all 0.2s"
          _hover={{
            bg: "bg.tertiary",
            borderColor: "accent.primary",
          }}
          onClick={() => navigate(-1)}>
          <IoArrowBack />
        </Button>

        {/* Title */}
        <VStack
          align="center"
          gap={1}>
          <Heading
            color="text.primary"
            fontWeight="800"
            letterSpacing="-0.03em">
            Expenses
          </Heading>

          <Text
            color="text.muted"
            fontSize="sm">
            All Expenses
          </Text>

          <Badge
            bg="rgba(52,211,153,0.1)"
            color="status.success"
            border="1px solid"
            borderColor="rgba(52,211,153,0.2)"
            px={3}
            py={1}
            rounded="full"
            fontWeight="700"
            fontSize="sm">
            ₹{totalAmount}
          </Badge>
        </VStack>

        {/* Create Expense */}
        <CreateExpenseDialog />
      </HStack>

      {/* Main Content */}
      {isLoading ? (
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={{ base: 4, md: 6 }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              height="200px"
              borderRadius="2xl"
              // startColor="bg.secondary"
              // endColor="bg.tertiary"
            />
          ))}
        </SimpleGrid>
      ) : expenses.length > 0 ? (
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={{ base: 4, md: 6 }}>
          {expenses.map((expense: any) => (
            <ExpenseCardComponent
              key={expense._id}
              expense={expense}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Box
          textAlign="center"
          py={16}
          px={6}
          border="1px dashed"
          borderColor="border.subtle"
          rounded="2xl"
          bg="bg.secondary">
          <VStack gap={3}>
            <Heading
              size="md"
              color="text.primary">
              No expenses yet
            </Heading>

            <Text
              color="text.muted"
              fontSize="sm"
              maxW="sm">
              Create your first expense to start tracking shared group spending.
            </Text>
          </VStack>
        </Box>
      )}
    </Box>
  );
}

export default ExpenseList;
