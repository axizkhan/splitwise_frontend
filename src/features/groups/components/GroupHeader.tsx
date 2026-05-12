import { HStack, VStack, Heading, Text } from "@chakra-ui/react";

export default function GroupHeader({ groupName }: { groupName: string }) {
  return (
    <HStack
      gap={3}
      mb={5}
      align="center">
      <VStack
        align="start"
        gap={1}>
        <Heading
          size="lg"
          color="text.primary"
          fontWeight="800"
          letterSpacing="-0.03em">
          {groupName}
        </Heading>

        <Text
          color="text.muted"
          fontSize="sm">
          Financial Details
        </Text>
      </VStack>
    </HStack>
  );
}
