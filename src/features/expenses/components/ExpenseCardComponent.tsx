import {
  Button,
  Card,
  HStack,
  Text,
  VStack,
  Heading,
  Icon,
  Box,
  Menu,
  IconButton,
  Dialog,
  Input,
  Field,
  Portal,
  CloseButton,
} from "@chakra-ui/react";

import { MdOutlineCurrencyRupee } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import type { Expense } from "@/infrastructure/api/expense.repository";
import { useState } from "react";
import {
  useEditExpense,
  useDeleteExpense,
} from "@/features/groups/hooks-expense";
import { useToast } from "@/shared/toastService";

interface ExpenseCardProps {
  expense: Expense;
}

function ExpenseCardComponent({ expense }: ExpenseCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editAmount, setEditAmount] = useState(expense.amount.toString());

  const toast = useToast();
  const { mutate: editExpense, isPending: isEditPending } = useEditExpense();
  const { mutate: deleteExpense, isPending: isDeletePending } =
    useDeleteExpense();

  const createdDate = new Date(expense.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleEditSubmit = () => {
    const newAmount = parseFloat(editAmount);
    if (newAmount > 0) {
      editExpense(
        { expenseId: expense._id, newExpenseAmount: newAmount },
        {
          onSuccess: () => {
            toast.success("Expense updated successfully");
            setIsEditOpen(false);
          },
          onError: () => {
            toast.error("Failed to update expense");
          },
        },
      );
    } else {
      toast.error("Amount must be greater than 0");
    }
  };

  const handleDeleteConfirm = () => {
    deleteExpense(expense._id, {
      onSuccess: () => {
        toast.success("Expense deleted successfully");
        setIsDeleteOpen(false);
      },
      onError: () => {
        toast.error("Failed to delete expense");
      },
    });
  };

  return (
    <Card.Root
      bg="bg.secondary"
      borderRadius="2xl"
      border="1px solid"
      borderColor="border.default"
      boxShadow="0 4px 12px rgba(0,0,0,0.3)"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      cursor="pointer"
      _hover={{
        boxShadow: "0 8px 20px rgba(59,130,246,0.15)",
        transform: "translateY(-6px)",
        borderColor: "accent.primary",
        zIndex: 2,
      }}>
      <Card.Body p={{ base: 5, md: 6 }}>
        <HStack
          justify="space-between"
          align="start">
          <VStack
            align="start"
            gap={3}
            flex={1}>
            <Heading
              size="md"
              color="text.primary"
              fontWeight="700">
              {expense.title}
            </Heading>

            <VStack
              align="start"
              gap={2}
              w="full">
              <HStack gap={2}>
                <Box
                  px={2}
                  py={1}
                  bg="rgba(52,211,153,0.1)"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="rgba(52,211,153,0.2)">
                  <Text
                    fontSize="xs"
                    color="status.success"
                    fontWeight="600">
                    Paid by{" "}
                    {typeof expense.paidBy === "object"
                      ? `${expense.paidBy.name.firstName} ${expense.paidBy.name.lastName}`
                      : expense.paidBy}
                  </Text>
                </Box>

                <Text
                  fontSize="xs"
                  color="text.muted">
                  {createdDate}
                </Text>
              </HStack>

              {expense.description && (
                <Text
                  fontSize="sm"
                  color="text.secondary"
                  lineHeight="1.5">
                  {expense.description}
                </Text>
              )}
            </VStack>
          </VStack>

          <VStack
            align="end"
            gap={3}>
            {/* Amount */}
            <Box
              bg="rgba(52,211,153,0.08)"
              px={4}
              py={3}
              borderRadius="xl"
              border="1px solid"
              borderColor="rgba(52,211,153,0.2)">
              <HStack gap={1}>
                <Icon
                  color="status.success"
                  boxSize={5}>
                  <MdOutlineCurrencyRupee />
                </Icon>

                <Heading
                  size="md"
                  color="status.success"
                  fontWeight="800">
                  {expense.amount}
                </Heading>
              </HStack>
            </Box>

            {/* Menu */}
            <Menu.Root>
              <Menu.Trigger asChild>
                <IconButton
                  size="sm"
                  variant="ghost"
                  color="text.muted"
                  transition="all 0.2s ease"
                  _hover={{
                    bg: "bg.tertiary",
                    color: "text.primary",
                  }}
                  _active={{
                    bg: "bg.secondary",
                  }}>
                  <BsThreeDotsVertical />
                </IconButton>
              </Menu.Trigger>

              <Menu.Positioner>
                <Menu.Content
                  minW="180px"
                  p="6px"
                  bg="bg.secondary"
                  backdropFilter="blur(12px)"
                  border="1px solid"
                  borderColor="border.default"
                  borderRadius="lg"
                  boxShadow="0 10px 30px rgba(0,0,0,0.45)"
                  zIndex={1000}>
                  {/* Edit */}
                  <Menu.Item
                    value="edit"
                    borderRadius="md"
                    px="3"
                    py="2"
                    fontSize="sm"
                    fontWeight="500"
                    color="text.secondary"
                    transition="all 0.15s ease"
                    _hover={{
                      bg: "bg.tertiary",
                      color: "text.primary",
                    }}
                    onClick={() => setIsEditOpen(true)}>
                    Edit Expense
                  </Menu.Item>

                  {/* Delete */}
                  <Menu.Item
                    value="delete"
                    mt="4px"
                    borderRadius="md"
                    px="3"
                    py="2"
                    fontSize="sm"
                    fontWeight="500"
                    color="status.error"
                    transition="all 0.15s ease"
                    _hover={{
                      bg: "rgba(248,113,113,0.12)",
                    }}
                    onClick={() => setIsDeleteOpen(true)}>
                    Delete Expense
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Menu.Root>
          </VStack>
        </HStack>
      </Card.Body>

      {/* EDIT DIALOG */}
      <Dialog.Root
        size={{ base: "lg", md: "md" }}
        placement="center"
        open={isEditOpen}
        onOpenChange={(e) => setIsEditOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop
            zIndex={1400}
            backdropFilter="blur(6px)"
            bg="blackAlpha.600"
          />

          <Dialog.Positioner zIndex={1400}>
            <Dialog.Content
              p={{ base: 5, md: 7 }}
              bg="bg.secondary"
              border="1px solid"
              borderColor="border.default"
              borderRadius="2xl"
              boxShadow="0 20px 60px rgba(0,0,0,0.65)">
              <Dialog.Header mb={4}>
                <VStack
                  align="start"
                  gap={1}>
                  <Dialog.Title
                    fontSize="xl"
                    fontWeight="700"
                    color="text.primary">
                    Edit Expense
                  </Dialog.Title>

                  <Text
                    fontSize="sm"
                    color="text.muted">
                    Update the expense amount
                  </Text>
                </VStack>
              </Dialog.Header>

              <Dialog.Body pb={6}>
                <Box
                  bg="bg.tertiary"
                  border="1px solid"
                  borderColor="border.subtle"
                  borderRadius="lg"
                  p={4}>
                  <Field.Root required>
                    <Field.Label
                      color="text.secondary"
                      fontWeight="500"
                      mb={2}>
                      Expense Amount
                    </Field.Label>

                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      step="0.01"
                      min="0"
                      size="lg"
                      bg="bg.secondary"
                      borderColor="border.default"
                      color="text.primary"
                      _hover={{
                        borderColor: "border.subtle",
                      }}
                      _focusVisible={{
                        borderColor: "accent.primary",
                        boxShadow:
                          "0 0 0 1px var(--chakra-colors-accent-primary)",
                      }}
                      _placeholder={{
                        color: "text.muted",
                      }}
                    />
                  </Field.Root>
                </Box>
              </Dialog.Body>

              <Dialog.Footer
                borderTop="1px solid"
                borderColor="border.default"
                pt={4}
                gap={3}>
                <Button
                  variant="ghost"
                  onClick={() => setIsEditOpen(false)}
                  color="text.secondary"
                  _hover={{
                    bg: "bg.tertiary",
                    color: "text.primary",
                  }}>
                  Cancel
                </Button>

                <Button
                  bg="accent.primary"
                  color="white"
                  fontWeight="600"
                  onClick={handleEditSubmit}
                  loading={isEditPending}
                  loadingText="Updating..."
                  px={{ mdDown: 2, md: 3 }}>
                  Update Expense
                </Button>
              </Dialog.Footer>

              <Dialog.CloseTrigger asChild>
                <CloseButton
                  size="sm"
                  color="text.muted"
                  _hover={{
                    color: "text.primary",
                  }}
                />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Card.Root>
  );
}

export default ExpenseCardComponent;
