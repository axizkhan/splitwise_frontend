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
      borderRadius="24px"
      border="1px solid"
      borderColor="border.default"
      backdropFilter="blur(20px)"
      overflow="hidden"
      position="relative"
      boxShadow="0 8px 32px rgba(0,0,0,0.45)"
      transition="all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
      cursor="pointer"
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        bg: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 100%)",
        pointerEvents: "none",
      }}
      _hover={{
        transform: "translateY(-4px)",
        borderColor: "border.strong",
        bg: "bg.elevated",
        boxShadow:
          "0 20px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,112,243,0.15)",
      }}>
      <Card.Body p={{ base: 5, md: 6 }}>
        <HStack
          justify="space-between"
          align="start"
          gap={4}>
          {/* LEFT */}
          <VStack
            align="start"
            gap={4}
            flex={1}>
            <Heading
              size="md"
              color="text.primary"
              fontWeight="700"
              letterSpacing="-0.02em">
              {expense.title}
            </Heading>

            <VStack
              align="start"
              gap={3}
              w="full">
              <HStack
                gap={2}
                flexWrap="wrap">
                {/* PAID BY BADGE */}
                <Box
                  px="10px"
                  py="6px"
                  bg="rgba(16,185,129,0.08)"
                  border="1px solid"
                  borderColor="rgba(16,185,129,0.18)"
                  borderRadius="full"
                  backdropFilter="blur(10px)">
                  <Text
                    fontSize="11px"
                    color="status.success"
                    fontWeight="600"
                    letterSpacing="0.02em">
                    Paid by{" "}
                    {typeof expense.paidBy === "object"
                      ? `${expense.paidBy.name.firstName} ${expense.paidBy.name.lastName}`
                      : expense.paidBy}
                  </Text>
                </Box>

                <Text
                  fontSize="12px"
                  color="text.muted"
                  fontWeight="500">
                  {createdDate}
                </Text>
              </HStack>

              {expense.description && (
                <Text
                  fontSize="sm"
                  color="text.secondary"
                  lineHeight="1.7"
                  maxW="95%">
                  {expense.description}
                </Text>
              )}
            </VStack>
          </VStack>

          {/* RIGHT */}
          <VStack
            align="end"
            gap={3}>
            {/* AMOUNT */}
            <Box
              px={4}
              py={3}
              borderRadius="20px"
              bg="linear-gradient(135deg, rgba(16,185,129,0.16) 0%, rgba(16,185,129,0.04) 100%)"
              border="1px solid"
              borderColor="rgba(16,185,129,0.22)"
              backdropFilter="blur(14px)"
              boxShadow="inset 0 1px 0 rgba(255,255,255,0.04)">
              <HStack gap={1}>
                <Icon
                  color="status.success"
                  boxSize={5}>
                  <MdOutlineCurrencyRupee />
                </Icon>

                <Heading
                  size="md"
                  color="text.primary"
                  fontWeight="800"
                  letterSpacing="-0.03em">
                  {expense.amount}
                </Heading>
              </HStack>
            </Box>

            {/* MENU */}
            <Menu.Root>
              <Menu.Trigger asChild>
                <IconButton
                  size="sm"
                  variant="ghost"
                  borderRadius="full"
                  color="text.muted"
                  transition="all 0.2s ease"
                  _hover={{
                    bg: "bg.tertiary",
                    color: "text.primary",
                  }}
                  _active={{
                    transform: "scale(0.96)",
                  }}>
                  <BsThreeDotsVertical />
                </IconButton>
              </Menu.Trigger>

              <Menu.Positioner>
                <Menu.Content
                  minW="180px"
                  p="6px"
                  bg="rgba(17,17,17,0.96)"
                  backdropFilter="blur(24px)"
                  border="1px solid"
                  borderColor="border.default"
                  borderRadius="16px"
                  boxShadow="0 24px 48px rgba(0,0,0,0.6)"
                  overflow="hidden"
                  zIndex={1000}>
                  {/* EDIT */}
                  <Menu.Item
                    value="edit"
                    borderRadius="12px"
                    px="3"
                    py="2.5"
                    fontSize="sm"
                    fontWeight="600"
                    color="text.secondary"
                    transition="all 0.15s ease"
                    _hover={{
                      bg: "bg.tertiary",
                      color: "text.primary",
                    }}
                    _active={{
                      bg: "bg.elevated",
                    }}
                    onClick={() => setIsEditOpen(true)}>
                    Edit Expense
                  </Menu.Item>

                  {/* DELETE */}
                  <Menu.Item
                    value="delete"
                    mt="4px"
                    borderRadius="12px"
                    px="3"
                    py="2.5"
                    fontSize="sm"
                    fontWeight="600"
                    color="status.error"
                    transition="all 0.15s ease"
                    _hover={{
                      bg: "rgba(239,68,68,0.12)",
                      color: "#ff6b6b",
                    }}
                    _active={{
                      bg: "rgba(239,68,68,0.18)",
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
            bg="rgba(0,0,0,0.72)"
            backdropFilter="blur(10px)"
          />

          <Dialog.Positioner zIndex={1400}>
            <Dialog.Content
              bg="bg.secondary"
              border="1px solid"
              borderColor="border.default"
              borderRadius="28px"
              overflow="hidden"
              boxShadow="0 32px 80px rgba(0,0,0,0.75)"
              p={{ base: 5, md: 7 }}>
              {/* HEADER */}
              <Dialog.Header mb={5}>
                <VStack
                  align="start"
                  gap={1}>
                  <Dialog.Title
                    color="text.primary"
                    fontWeight="700"
                    fontSize="xl"
                    letterSpacing="-0.03em">
                    Edit Expense
                  </Dialog.Title>

                  <Text
                    fontSize="sm"
                    color="text.secondary">
                    Update the expense amount
                  </Text>
                </VStack>
              </Dialog.Header>

              {/* BODY */}
              <Dialog.Body pb={6}>
                <Box
                  bg="bg.tertiary"
                  border="1px solid"
                  borderColor="border.subtle"
                  borderRadius="20px"
                  p={4}>
                  <Field.Root required>
                    <Field.Label
                      color="text.secondary"
                      fontWeight="600"
                      mb={2}>
                      Expense Amount
                    </Field.Label>

                    <Input
                      type="number"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      placeholder="Enter amount"
                      step="0.01"
                      min="0"
                      size="lg"
                      bg="bg.primary"
                      color="text.primary"
                      border="1px solid"
                      borderColor="border.default"
                      borderRadius="14px"
                      _placeholder={{
                        color: "text.muted",
                      }}
                      _hover={{
                        borderColor: "border.strong",
                      }}
                      _focus={{
                        borderColor: "accent.primary",
                        boxShadow: "0 0 0 4px rgba(0,112,243,0.18)",
                      }}
                    />
                  </Field.Root>
                </Box>
              </Dialog.Body>

              {/* FOOTER */}
              <Dialog.Footer
                pt={5}
                gap={3}
                borderTop="1px solid"
                borderColor="border.subtle">
                <Button
                  variant="ghost"
                  color="text.secondary"
                  borderRadius="14px"
                  _hover={{
                    bg: "bg.tertiary",
                    color: "text.primary",
                  }}
                  onClick={() => setIsEditOpen(false)}>
                  Cancel
                </Button>

                <Button
                  bg="accent.primary"
                  color="white"
                  borderRadius="14px"
                  fontWeight="700"
                  transition="all 0.2s ease"
                  _hover={{
                    bg: "#0062d6",
                    transform: "translateY(-1px)",
                    boxShadow: "0 10px 24px rgba(0,112,243,0.35)",
                  }}
                  onClick={handleEditSubmit}
                  loading={isEditPending}
                  loadingText="Updating...">
                  Update Expense
                </Button>
              </Dialog.Footer>

              <Dialog.CloseTrigger asChild>
                <CloseButton
                  size="sm"
                  color="text.muted"
                  borderRadius="full"
                  _hover={{
                    bg: "bg.tertiary",
                    color: "text.primary",
                  }}
                />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {/* DELETE DIALOG */}
      <Dialog.Root
        size={{ base: "lg", md: "md" }}
        placement="center"
        open={isDeleteOpen}
        onOpenChange={(e) => setIsDeleteOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop
            zIndex={1400}
            bg="rgba(0,0,0,0.72)"
            backdropFilter="blur(10px)"
          />

          <Dialog.Positioner zIndex={1400}>
            <Dialog.Content
              bg="bg.secondary"
              border="1px solid"
              borderColor="border.default"
              borderRadius="28px"
              overflow="hidden"
              boxShadow="0 32px 80px rgba(0,0,0,0.75)"
              p={{ base: 5, md: 7 }}>
              {/* HEADER */}
              <Dialog.Header mb={4}>
                <Dialog.Title
                  color="status.error"
                  fontWeight="700"
                  fontSize="xl"
                  letterSpacing="-0.03em">
                  Delete Expense
                </Dialog.Title>
              </Dialog.Header>

              {/* BODY */}
              <Dialog.Body pb={6}>
                <Box
                  bg="rgba(239,68,68,0.08)"
                  border="1px solid"
                  borderColor="rgba(239,68,68,0.18)"
                  borderRadius="20px"
                  p={4}
                  mb={5}>
                  <Text
                    fontSize="sm"
                    fontWeight="700"
                    color="status.error"
                    mb={1}>
                    This action cannot be undone
                  </Text>

                  <Text
                    fontSize="sm"
                    color="text.secondary"
                    lineHeight="1.6">
                    Are you sure you want to permanently delete this expense?
                  </Text>
                </Box>

                {/* INFO CARD */}
                <Box
                  bg="bg.tertiary"
                  border="1px solid"
                  borderColor="border.subtle"
                  borderRadius="20px"
                  p={4}>
                  <VStack
                    align="start"
                    gap={4}>
                    <Box>
                      <Text
                        fontSize="11px"
                        textTransform="uppercase"
                        letterSpacing="0.08em"
                        color="text.muted"
                        mb={1}>
                        Expense
                      </Text>

                      <Text
                        color="text.primary"
                        fontWeight="600">
                        {expense.title}
                      </Text>
                    </Box>

                    <Box>
                      <Text
                        fontSize="11px"
                        textTransform="uppercase"
                        letterSpacing="0.08em"
                        color="text.muted"
                        mb={1}>
                        Amount
                      </Text>

                      <Text
                        color="text.primary"
                        fontWeight="700">
                        ₹{expense.amount}
                      </Text>
                    </Box>
                  </VStack>
                </Box>
              </Dialog.Body>

              {/* FOOTER */}
              <Dialog.Footer
                pt={5}
                gap={3}
                borderTop="1px solid"
                borderColor="border.subtle">
                <Button
                  variant="ghost"
                  color="text.secondary"
                  borderRadius="14px"
                  _hover={{
                    bg: "bg.tertiary",
                    color: "text.primary",
                  }}
                  onClick={() => setIsDeleteOpen(false)}>
                  Cancel
                </Button>

                <Button
                  bg="status.error"
                  color="white"
                  borderRadius="14px"
                  fontWeight="700"
                  transition="all 0.2s ease"
                  _hover={{
                    bg: "#dc2626",
                    transform: "translateY(-1px)",
                    boxShadow: "0 10px 24px rgba(239,68,68,0.28)",
                  }}
                  onClick={handleDeleteConfirm}
                  loading={isDeletePending}
                  loadingText="Deleting...">
                  Delete Expense
                </Button>
              </Dialog.Footer>

              <Dialog.CloseTrigger asChild>
                <CloseButton
                  size="sm"
                  color="text.muted"
                  borderRadius="full"
                  _hover={{
                    bg: "bg.tertiary",
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
