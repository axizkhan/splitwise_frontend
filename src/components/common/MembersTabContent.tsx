import {
  Box,
  HStack,
  VStack,
  Heading,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { AddMemberDialog } from "@/features/groups/components";
import { GroupMemberCard } from "@/features/groups/components";
import { PaymentDialog } from "@/features/payments/components";

export default function MembersTabContent({
  groupId,
  balances,
  paymentOpen,
  setPaymentOpen,
  selectedPayment,
  setSelectedPayment,
}: {
  groupId: string;
  balances: any[];
  paymentOpen: boolean;
  setPaymentOpen: (open: boolean) => void;
  selectedPayment: any;
  setSelectedPayment: (payment: any) => void;
}) {
  return (
    <Box>
      <HStack
        justify="space-between"
        mb={8}
        align="center">
        <VStack
          align="start"
          gap={1}>
          <Heading
            size="md"
            color="text.primary"
            fontWeight="700">
            Group Members
          </Heading>

          <Box
            h="1px"
            w="20"
            bg="linear-gradient(90deg, var(--chakra-colors-accent-primary), transparent)"
          />
        </VStack>

        <AddMemberDialog groupId={groupId} />
      </HStack>

      {balances && balances.length > 0 ? (
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={6}>
          {balances.map((balance: any, i: number) => {
            const memberName = balance.memberdetails?.name
              ? `${balance.memberdetails.name.firstName} ${balance.memberdetails.name.lastName}`
              : "Unknown Member";

            const memberAmount = balance.memberAmount || 0;

            const isOwing = memberAmount < 0;

            const displayAmount = Math.abs(memberAmount);

            return (
              <Box
                key={i}
                transition="all 0.2s"
                _hover={{
                  transform: "translateY(-2px)",
                }}>
                <GroupMemberCard
                  i={i}
                  member={{
                    name: memberName,
                    amount: `₹${displayAmount}`,
                    status: isOwing ? "Owes You" : "You Owe",
                    color: isOwing ? "status.success" : "status.error",
                  }}
                  memberId={balance.memberdetails?._id}
                  memberName={memberName}
                  groupId={groupId}
                  balance={displayAmount}
                />

                {displayAmount > 0 && (
                  <PaymentDialog
                    memberId={balance.memberdetails?._id}
                    memberName={memberName}
                    groupId={groupId}
                    balance={displayAmount}
                    isOpen={
                      paymentOpen &&
                      selectedPayment?.memberId === balance.memberdetails?._id
                    }
                    onOpenChange={(open) => {
                      setPaymentOpen(open);

                      if (open) {
                        setSelectedPayment({
                          memberId: balance.memberdetails?._id,
                          memberName: memberName,
                          balance: displayAmount,
                        });
                      }
                    }}
                  />
                )}
              </Box>
            );
          })}
        </SimpleGrid>
      ) : (
        <Box
          py={12}
          textAlign="center"
          border="1px dashed"
          borderColor="border.subtle"
          rounded="2xl"
          bg="bg.secondary">
          <Text
            color="text.muted"
            fontSize="sm">
            No members available
          </Text>
        </Box>
      )}
    </Box>
  );
}
