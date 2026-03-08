import { HStack, VStack, Heading, Text } from "@chakra-ui/react";

export default function GroupHeader({ groupName }: { groupName: string }) {
  return (
    <HStack
      gap={3}
      mb={5}>
      <VStack
        align="start"
        gap={1}>
        <Heading
          size="lg"
          color="slate.100"
          fontWeight="800">
          {groupName}
        </Heading>
        <Text
          color="slate.400"
          fontSize="sm">
          Financial Details
        </Text>
      </VStack>
    </HStack>
  );
}
