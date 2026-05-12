import {
  Badge,
  Box,
  Heading,
  HStack,
  IconButton,
  Menu,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { PaymentDialog } from "@/features/payments/components";

interface GroupMemberCardProps {
  i: number;
  member: { name: string; amount: string; color: string; status: string };
  memberId?: string;
  memberName?: string;
  groupId?: string;
  balance?: number;
  onPaymentClick?: (
    memberId: string,
    memberName: string,
    balance: number,
  ) => void;
}

function GroupMemberCard({
  i,
  member,
  memberId,
  memberName,
  groupId,
  balance,
}: GroupMemberCardProps) {
  const navigate = useNavigate();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const handleMenuSelect = (value: string) => {
    if (value === "journal" && groupId && memberId) {
      navigate(`/group/${groupId}/journal/${memberId}`);
    } else if (value === "payment") {
      setIsPaymentOpen(true);
    }
  };

  return (
    <Box
      key={i}
      p={{ base: 5, md: 6 }}
      bg="bg.secondary"
      borderRadius="2xl"
      border="1px solid"
      borderColor="border.default"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        transform: "translateY(-6px)",
        borderColor: "accent.primary",
        boxShadow: "0 8px 20px rgba(59,130,246,0.15)",
      }}>
      <HStack
        justify="space-between"
        align="start">
        {/* Member Info */}
        <VStack
          align="start"
          gap={2}>
          <Heading
            size="sm"
            color="text.primary"
            fontWeight="700">
            {member.name}
          </Heading>

          <Badge
            bg={
              member.color === "status.success"
                ? "rgba(52,211,153,0.12)"
                : "rgba(248,113,113,0.12)"
            }
            color={member.color}
            border="1px solid"
            borderColor={
              member.color === "status.success"
                ? "rgba(52,211,153,0.2)"
                : "rgba(248,113,113,0.2)"
            }
            fontSize="xs"
            fontWeight="600"
            px={{ mdDown: 1, md: 2 }}
            py="1"
            rounded="md">
            {member.status}
          </Badge>
        </VStack>

        {/* Menu */}
        <Menu.Root>
          <Menu.Trigger asChild>
            <IconButton
              size="sm"
              variant="ghost"
              color="text.secondary"
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
              minW="190px"
              p="6px"
              bg="bg.secondary"
              backdropFilter="blur(14px)"
              border="1px solid"
              borderColor="border.default"
              borderRadius="lg"
              boxShadow="0 12px 32px rgba(0,0,0,0.45)"
              zIndex={1000}>
              {/* Journal */}
              <Menu.Item
                value="journal"
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
                _active={{
                  bg: "bg.secondary",
                }}
                onClick={() => handleMenuSelect("journal")}>
                <HStack gap="2">
                  <Text>Journal</Text>
                </HStack>
              </Menu.Item>

              {/* Payment */}
              <Menu.Item
                value="payment"
                mt="4px"
                borderRadius="md"
                px="3"
                py="2"
                fontSize="sm"
                fontWeight="600"
                color="status.success"
                transition="all 0.15s ease"
                _hover={{
                  bg: "rgba(52,211,153,0.12)",
                }}
                _active={{
                  bg: "rgba(52,211,153,0.18)",
                }}
                onClick={() => handleMenuSelect("payment")}>
                <HStack gap="2">
                  <Text>Payment</Text>
                </HStack>
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </HStack>

      {/* Amount */}
      <Text
        mt={5}
        fontSize="2xl"
        fontWeight="800"
        color={
          member.color === "status.success" ? "status.success" : "status.error"
        }
        letterSpacing="-0.03em">
        {member.amount}
      </Text>

      {/* Payment Dialog */}
      {memberId && memberName !== undefined && balance !== undefined && (
        <PaymentDialog
          memberId={memberId}
          memberName={memberName}
          groupId={groupId || ""}
          balance={balance}
          isOpen={isPaymentOpen}
          onOpenChange={setIsPaymentOpen}
        />
      )}
    </Box>
  );
}

export default GroupMemberCard;
