import {
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  Text,
  VStack,
  Box,
} from "@chakra-ui/react";

import { Button } from "@chakra-ui/react";
import { useCreatePayment } from "@/features/groups/hooks-payment";
import { useToast } from "@/shared/toastService";
import { useState } from "react";

interface PaymentDialogProps {
  memberId: string;
  memberName: string;
  groupId: string;
  balance: number;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function PaymentDialog({
  memberId,
  memberName,
  groupId,
  balance,
  isOpen: controlledIsOpen,
  onOpenChange,
}: PaymentDialogProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const toast = useToast();

  const setIsOpen = (value: boolean) => {
    if (controlledIsOpen !== undefined && onOpenChange) {
      onOpenChange(value);
    } else {
      setInternalIsOpen(value);
    }
  };
  const [amount, setAmount] = useState<string>("");

  const { mutate, isPending } = useCreatePayment();

  const handleSubmit = () => {
    if (amount && parseFloat(amount) > 0) {
      mutate(
        {
          groupId,
          paidToId: memberId,
          amount: parseFloat(amount),
        } as any,
        {
          onSuccess: () => {
            setAmount("");
            setIsOpen(false);
            toast.success("Payment Successfull", "Your payment is successfull");
          },
          onError: (error) => {
            const errorMessage =
              error?.message || "Failed to process payment. Please try again.";
            toast.error("Payment Failed", errorMessage);
          },
        },
      );
    }
  };

  const isOwing = balance > 0;

  return (
    <Dialog.Root
      size={{ mdDown: "lg", md: "md" }}
      placement="center"
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}>
      <Portal>
        {/* Backdrop */}
        <Dialog.Backdrop
          zIndex={1200}
          bg="blackAlpha.700"
          backdropFilter="blur(8px)"
        />

        <Dialog.Positioner zIndex={1200}>
          <Dialog.Content
            p={{ base: 5, md: 7 }}
            bg="bg.secondary"
            border="1px solid"
            borderColor="border.default"
            borderRadius="2xl"
            boxShadow="0 20px 60px rgba(0,0,0,0.6)">
            {/* Header */}
            <Dialog.Header mb={4}>
              <VStack
                align="start"
                gap={1}>
                <Dialog.Title
                  fontSize="xl"
                  fontWeight="700"
                  color="text.primary">
                  Make Payment
                </Dialog.Title>

                <Text
                  fontSize="sm"
                  color="text.muted">
                  Pay {memberName}
                </Text>
              </VStack>
            </Dialog.Header>

            {/* Balance Card */}
            <Box
              bg={isOwing ? "rgba(248,113,113,0.1)" : "rgba(52,211,153,0.1)"}
              border="1px solid"
              borderColor={
                isOwing ? "rgba(248,113,113,0.2)" : "rgba(52,211,153,0.2)"
              }
              borderRadius="xl"
              p={4}
              mb={6}>
              <Text
                fontWeight="600"
                fontSize="sm"
                color="text.secondary"
                mb={1}>
                Current Balance
              </Text>

              <Text
                fontSize="lg"
                fontWeight="700"
                color={isOwing ? "status.error" : "status.success"}>
                {isOwing
                  ? `You owe ₹${balance}`
                  : `You are owed ₹${Math.abs(balance)}`}
              </Text>
            </Box>

            {/* Body */}
            <Dialog.Body pb={6}>
              <Field.Root required>
                <Field.Label
                  color="text.secondary"
                  fontWeight="500">
                  Amount <Field.RequiredIndicator />
                </Field.Label>

                <Input
                  placeholder="Enter amount"
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                  size="lg"
                  px={2}
                  bg="bg.tertiary"
                  borderColor="border.subtle"
                  color="text.primary"
                  _hover={{
                    borderColor: "border.default",
                  }}
                  _focusVisible={{
                    borderColor: "accent.primary",
                    boxShadow: "0 0 0 1px var(--chakra-colors-accent-primary)",
                  }}
                  _placeholder={{
                    color: "text.muted",
                  }}
                />
              </Field.Root>
            </Dialog.Body>

            {/* Footer */}
            <Dialog.Footer
              borderTop="1px solid"
              borderColor="border.default"
              pt={4}
              gap={3}>
              <Button
                variant="ghost"
                onClick={() => setIsOpen(false)}
                color="text.secondary"
                _hover={{
                  bg: "bg.tertiary",
                  color: "text.primary",
                }}>
                Cancel
              </Button>

              <Button
                bg="accent.primary"
                _hover={{
                  opacity: 0.92,
                  transform: "translateY(-1px)",
                }}
                transition="all 0.2s"
                px={{ mdDown: 2, md: 4 }}
                color="white"
                fontWeight="600"
                onClick={handleSubmit}
                loading={isPending}
                loadingText="Processing...">
                Make Payment
              </Button>
            </Dialog.Footer>

            {/* Close */}
            <Dialog.CloseTrigger asChild>
              <CloseButton
                size="sm"
                color="text.muted"
                px={2}
                py={4}
                _hover={{
                  color: "text.primary",
                  bg: "bg.tertiary",
                }}
              />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default PaymentDialog;
