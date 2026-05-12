import {
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  VStack,
  Text,
  HStack,
  Button,
} from "@chakra-ui/react";
import { IoPersonAdd } from "react-icons/io5";
import { useAddMember } from "@/features/groups/hooks";
import { useToast } from "@/shared/toastService";
import { useResponsive } from "@/shared/hooks";
import { useState } from "react";

interface AddMemberDialogProps {
  groupId: string;
}

function AddMemberDialog({ groupId }: AddMemberDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const toast = useToast();
  const { isSmallScreen } = useResponsive();
  const { mutate, isPending } = useAddMember();

  const handleSubmit = () => {
    if (!email.trim()) return;

    mutate(
      {
        groupId,
        payload: { newMemberEmail: email },
      },
      {
        onSuccess: (data) => {
          toast.success(
            "Invitation Sent",
            data?.message || `Invitation sent to ${email}`,
          );
          setEmail("");
          setIsOpen(false);
        },
        onError: (error: any) => {
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to add member";
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
          bg="accent.primary"
          color="white"
          size={isSmallScreen ? "sm" : "md"}
          display="flex"
          alignItems="center"
          gap="2"
          px={{ mdDown: 2, md: 3 }}
          alignSelf={{ base: "stretch", md: "auto" }}
          transition="all 0.2s"
          _hover={{
            opacity: 0.92,
            transform: "translateY(-1px)",
          }}
          _active={{
            transform: "scale(0.98)",
          }}>
          {!isSmallScreen && <IoPersonAdd />}
          {isSmallScreen ? "+" : "Add Member"}
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
            boxShadow="0 20px 40px rgba(0,0,0,0.6)">
            {/* Header */}
            <Dialog.Header pb={3}>
              <VStack
                align="start"
                gap="1">
                <Dialog.Title
                  fontSize="lg"
                  fontWeight="semibold"
                  color="text.primary">
                  Add Group Member
                </Dialog.Title>

                <Text
                  fontSize="sm"
                  color="text.muted">
                  Invite someone to join this group
                </Text>
              </VStack>
            </Dialog.Header>

            {/* Body */}
            <Dialog.Body py={6}>
              <VStack
                align="stretch"
                gap={5}>
                <Field.Root required>
                  <Field.Label
                    color="text.secondary"
                    fontWeight="medium">
                    Email <Field.RequiredIndicator />
                  </Field.Label>

                  <Input
                    type="email"
                    placeholder="Enter member's email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    bg="bg.tertiary"
                    px={2}
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

                  <Field.HelperText color="text.muted">
                    They will receive an invitation to join.
                  </Field.HelperText>
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
                      color: "text.primary",
                    }}>
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>

                <Button
                  bg="accent.primary"
                  color="white"
                  onClick={handleSubmit}
                  loading={isPending}
                  loadingText="Adding..."
                  px={{ mdDown: 2, md: 3 }}
                  transition="all 0.2s"
                  _hover={{
                    opacity: 0.92,
                  }}>
                  Add Member
                </Button>
              </HStack>
            </Dialog.Footer>

            {/* Close Button */}
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

export default AddMemberDialog;
