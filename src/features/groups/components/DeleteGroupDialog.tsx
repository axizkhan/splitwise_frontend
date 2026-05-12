import {
  Button,
  Dialog,
  HStack,
  Text,
  VStack,
  Icon,
  Box,
  Portal,
  CloseButton,
} from "@chakra-ui/react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteGroup } from "@/features/groups/hooks";
import { useAuthStore } from "@/core/state/auth.store";
import { useToast } from "@/shared/toastService";

export default function DeleteGroupDialog({
  groupId,
  groupName,
  createdBy,
}: {
  groupId: string;
  groupName: string;
  createdBy: string;
}) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthStore();
  const { mutate: deleteGroup, isPending } = useDeleteGroup();
  const toast = useToast();

  // Wait for user to load from auth store
  if (!user) return null;

  const isCreator = user.id === createdBy;

  if (!isCreator) return null;

  const handleDelete = () => {
    deleteGroup(groupId, {
      onSuccess: () => {
        setIsOpen(false);
        toast.success("Group Deleted", "Group deleted successfully");
        navigate("/dashboard");
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message ||
          "Failed to delete group. Please try again.";
        toast.error("Deletion Failed", errorMessage);
      },
    });
  };

  return (
    <Dialog.Root
      placement="center"
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}>
      {/* Trigger */}
      <Dialog.Trigger asChild>
        <Button
          size="sm"
          bg="status.error"
          color="white"
          variant="solid"
          gap={2}
          mb={4}
          px={{ mdDown: 2, md: 3 }}
          transition="all 0.2s"
          _hover={{
            opacity: 0.92,
            transform: "translateY(-1px)",
          }}
          _active={{
            transform: "scale(0.98)",
          }}>
          <MdOutlineDeleteForever />
          Delete Group
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
            boxShadow="0 25px 50px rgba(0,0,0,0.6)"
            maxW="420px">
            {/* Header */}
            <Dialog.Header pb={3}>
              <VStack
                align="start"
                gap="1">
                <Dialog.Title
                  fontSize="lg"
                  fontWeight="semibold"
                  color="text.primary">
                  Delete Group
                </Dialog.Title>

                <Text
                  fontSize="sm"
                  color="text.muted">
                  Permanently remove this group
                </Text>
              </VStack>
            </Dialog.Header>

            {/* Body */}
            <Dialog.Body py={6}>
              <VStack
                gap={5}
                align="center"
                textAlign="center">
                {/* Icon */}
                <Box
                  bg="rgba(248,113,113,0.12)"
                  p={3}
                  borderRadius="full"
                  border="1px solid"
                  borderColor="rgba(248,113,113,0.2)">
                  <Icon
                    as={MdOutlineDeleteForever}
                    boxSize={7}
                    color="status.error"
                  />
                </Box>

                {/* Message */}
                <Text
                  fontSize="sm"
                  color="text.secondary"
                  lineHeight="1.6">
                  Are you sure you want to delete{" "}
                  <Text
                    as="span"
                    fontWeight="bold"
                    color="text.primary">
                    {groupName}
                  </Text>
                  ?
                </Text>

                {/* Warning */}
                <Box
                  bg="rgba(248,113,113,0.08)"
                  border="1px solid"
                  borderColor="rgba(248,113,113,0.15)"
                  rounded="xl"
                  px={4}
                  py={3}>
                  <Text
                    fontSize="sm"
                    color="status.error"
                    lineHeight="1.6">
                    This action cannot be undone. All expenses and payment
                    records in this group will be permanently deleted.
                  </Text>
                </Box>
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
                  bg="status.error"
                  color="white"
                  variant="solid"
                  onClick={handleDelete}
                  loading={isPending}
                  loadingText="Deleting..."
                  px={{ mdDown: 2, md: 3 }}
                  transition="all 0.2s"
                  _hover={{
                    opacity: 0.92,
                  }}>
                  Delete Group
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
