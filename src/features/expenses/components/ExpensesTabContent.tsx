import {
  Box,
  HStack,
  VStack,
  Heading,
  Badge,
  SimpleGrid,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { CreateExpenseDialog } from "@/features/expenses/components";
import { ExpenseCardComponent } from "@/features/expenses/components";

export default function ExpensesTabContent({
  expenses,
  expenseLoading,
  totalExpenseAmount,
}: {
  expenses: any[];
  expenseLoading: boolean;
  totalExpenseAmount: number;
}) {
  return (
    <Box>
      <HStack
        justify="space-between"
        align="center"
        mb={6}>
        <VStack
          align="start"
          gap={2}>
          <Heading
            size="md"
            color="text.primary"
            fontWeight="700">
            Group Expenses
          </Heading>

          <Badge
            bg="rgba(52,211,153,0.1)"
            color="status.success"
            border="1px solid"
            borderColor="rgba(52,211,153,0.2)"
            fontSize="sm"
            px={3}
            py={1}
            borderRadius="lg"
            fontWeight="700">
            Total: ₹{totalExpenseAmount}
          </Badge>
        </VStack>

        <CreateExpenseDialog />
      </HStack>

      {expenseLoading ? (
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={6}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              height="200px"
              borderRadius="2xl"
            />
          ))}
        </SimpleGrid>
      ) : expenses.length > 0 ? (
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={6}>
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
          py={12}
          px={6}
          bg="bg.secondary"
          borderRadius="2xl"
          border="1px dashed"
          borderColor="border.subtle">
          <VStack gap={3}>
            <Text fontSize="2xl">✨</Text>

            <Heading
              size="sm"
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
