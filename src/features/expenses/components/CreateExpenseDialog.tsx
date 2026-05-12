import {
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  VStack,
  Textarea,
  Text,
  HStack,
  Button,
  InputGroup,
} from "@chakra-ui/react";
import { HiOutlinePlus } from "react-icons/hi";
import { useCreateExpense } from "@/features/groups/hooks-expense";
import { useToast } from "@/shared/toastService";
import { useResponsive } from "@/shared/hooks";
import { useState } from "react";
import { useParams } from "react-router-dom";

function CreateExpenseDialog() {
  const { groupId } = useParams<{ groupId: string }>();
  const { isSmallScreen } = useResponsive();
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    description: "",
  });

  const { mutate, isPending } = useCreateExpense();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.amount) return;

    mutate(
      {
        payload: {
          title: formData.title,
          amount: parseFloat(formData.amount),
          description: formData.description,
        },
        groupId: groupId || "",
      },
      {
        onSuccess: () => {
          toast.success("Expense Created", `${formData.title} has been added`);
          setFormData({ title: "", amount: "", description: "" });
          setIsOpen(false);
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to create expense";
          toast.error("Error", errorMessage);
        },
      },
    );
  };

  return (
    <Dialog.Root
      size={{ base: "lg", md: "md" }}
      placement="center"
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}>
      {/* Trigger */}
      <Dialog.Trigger asChild>
        <Button
          variant="outline"
          borderColor="border.subtle"
          color="text.primary"
          bg="bg.secondary"
          size="sm"
          display="flex"
          alignItems="center"
          px={{ mdDown: 2, md: 3 }}
          gap="2"
          transition="all 0.2s"
          _hover={{
            bg: "bg.tertiary",
            borderColor: "accent.primary",
          }}>
          {!isSmallScreen && <HiOutlinePlus />}
          {isSmallScreen ? "+" : "Create Expense"}
        </Button>
      </Dialog.Trigger>

      <Portal>
        {/* Backdrop */}
        <Dialog.Backdrop
          bg="blackAlpha.700"
          backdropFilter="blur(8px)"
        />

        <Dialog.Positioner>
          <Dialog.Content
            p={{ base: 5, md: 6 }}
            borderRadius="2xl"
            bg="bg.secondary"
            border="1px solid"
            borderColor="border.default"
            boxShadow="0 25px 50px rgba(0,0,0,0.6)">
            {/* Header */}
            <Dialog.Header pb={3}>
              <VStack
                align="start"
                gap="1">
                <Dialog.Title
                  fontSize="lg"
                  fontWeight="semibold"
                  color="text.primary">
                  Add New Expense
                </Dialog.Title>

                <Text
                  fontSize="sm"
                  color="text.muted">
                  Record a shared expense
                </Text>
              </VStack>
            </Dialog.Header>

            {/* Body */}
            <Dialog.Body py={6}>
              <VStack
                align="stretch"
                gap={6}>
                {/* Title */}
                <Field.Root required>
                  <Field.Label color="text.secondary">
                    Title <Field.RequiredIndicator />
                  </Field.Label>

                  <Input
                    placeholder="e.g., Groceries, Movie tickets"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    bg="bg.tertiary"
                    borderColor="border.subtle"
                    color="text.primary"
                    px={2}
                    _placeholder={{
                      color: "text.muted",
                    }}
                    _focusVisible={{
                      borderColor: "accent.primary",
                      boxShadow:
                        "0 0 0 1px var(--chakra-colors-accent-primary)",
                    }}
                  />
                </Field.Root>

                {/* Amount */}
                <Field.Root required>
                  <Field.Label color="text.secondary">
                    Amount <Field.RequiredIndicator />
                  </Field.Label>

                  <InputGroup
                    startElement={
                      <Text
                        color="text.muted"
                        fontSize="sm">
                        ₹
                      </Text>
                    }>
                    <Input
                      placeholder="0.00"
                      px={2}
                      name="amount"
                      type="number"
                      step="0.01"
                      value={formData.amount}
                      onChange={handleChange}
                      bg="bg.tertiary"
                      borderColor="border.subtle"
                      color="text.primary"
                      _placeholder={{
                        color: "text.muted",
                      }}
                      _focusVisible={{
                        borderColor: "accent.primary",
                        boxShadow:
                          "0 0 0 1px var(--chakra-colors-accent-primary)",
                      }}
                    />
                  </InputGroup>
                </Field.Root>

                {/* Description */}
                <Field.Root>
                  <Field.Label color="text.secondary">Description</Field.Label>

                  <Textarea
                    placeholder="Add description (optional)"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    px={2}
                    py={1}
                    rows={3}
                    resize="none"
                    bg="bg.tertiary"
                    borderColor="border.subtle"
                    color="text.primary"
                    _placeholder={{
                      color: "text.muted",
                    }}
                    _focusVisible={{
                      borderColor: "accent.primary",
                      boxShadow:
                        "0 0 0 1px var(--chakra-colors-accent-primary)",
                    }}
                  />
                </Field.Root>
              </VStack>
            </Dialog.Body>

            {/* Footer */}
            <Dialog.Footer pt={4}>
              <HStack
                justify="flex-end"
                w="full"
                gap="3">
                <Dialog.ActionTrigger asChild>
                  <Button
                    variant="ghost"
                    color="text.secondary"
                    _hover={{
                      bg: "bg.tertiary",
                    }}>
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>

                <Button
                  bg="accent.primary"
                  color="white"
                  onClick={handleSubmit}
                  loading={isPending}
                  px={{ md: 2, mdDown: 3 }}
                  loadingText="Creating..."
                  transition="all 0.2s"
                  _hover={{
                    opacity: 0.92,
                    transform: "translateY(-1px)",
                  }}>
                  Create Expense
                </Button>
              </HStack>
            </Dialog.Footer>

            {/* Close */}
            <Dialog.CloseTrigger asChild>
              <CloseButton
                size="sm"
                color="text.muted"
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

export default CreateExpenseDialog;
