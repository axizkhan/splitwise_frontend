import { Badge, Box, Heading, Text, VStack } from "@chakra-ui/react";

function GroupSummaryCard({
  i,
  card,
}: {
  i: number;
  card: { title: string; amount: number; badge?: string; color?: string };
}) {
  const colors = {
    green: {
      bg: "rgba(34, 197, 94, 0.1)",
      border: "rgba(34, 197, 94, 0.3)",
      text: "green.300",
      dark: "rgba(34, 197, 94, 0.05)",
    },
    red: {
      bg: "rgba(239, 68, 68, 0.1)",
      border: "rgba(239, 68, 68, 0.3)",
      text: "red.300",
      dark: "rgba(239, 68, 68, 0.05)",
    },
    teal: {
      bg: "rgba(20, 184, 166, 0.1)",
      border: "rgba(20, 184, 166, 0.3)",
      text: "cyan.300",
      dark: "rgba(20, 184, 166, 0.05)",
    },
  };

  // const colorScheme = card.color
  //   ? colors[card.color as keyof typeof colors]
  //   : colors.green;

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
      position="relative"
      overflow="hidden"
      _hover={{
        transform: "translateY(-8px)",
        borderColor:
          card.color === "green"
            ? "status.success"
            : card.color === "red"
              ? "status.error"
              : "accent.primary",
        boxShadow:
          card.color === "green"
            ? "0 8px 24px rgba(52,211,153,0.18)"
            : card.color === "red"
              ? "0 8px 24px rgba(248,113,113,0.18)"
              : "0 8px 24px rgba(59,130,246,0.18)",
      }}>
      {/* Accent Line */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        h="2px"
        bg={
          card.color === "green"
            ? "status.success"
            : card.color === "red"
              ? "status.error"
              : "accent.primary"
        }
        opacity="0.9"
      />

      <VStack
        align="start"
        gap={3}
        w="full">
        {/* Label */}
        <Text
          fontSize="xs"
          fontWeight="700"
          color="text.muted"
          textTransform="uppercase"
          letterSpacing="0.5px">
          {card.title}
        </Text>

        {/* Amount */}
        <Heading
          size="xl"
          color={
            card.color === "green"
              ? "status.success"
              : card.color === "red"
                ? "status.error"
                : "text.primary"
          }
          fontWeight="800"
          letterSpacing="-0.03em">
          ₹{card.amount}
        </Heading>

        {/* Badge */}
        {card.badge && (
          <Badge
            bg={
              card.color === "green"
                ? "rgba(52,211,153,0.12)"
                : card.color === "red"
                  ? "rgba(248,113,113,0.12)"
                  : "rgba(59,130,246,0.12)"
            }
            color={
              card.color === "green"
                ? "status.success"
                : card.color === "red"
                  ? "status.error"
                  : "accent.primary"
            }
            border="1px solid"
            borderColor={
              card.color === "green"
                ? "rgba(52,211,153,0.2)"
                : card.color === "red"
                  ? "rgba(248,113,113,0.2)"
                  : "rgba(59,130,246,0.2)"
            }
            fontSize="xs"
            px={2}
            py={1}
            borderRadius="md"
            fontWeight="600">
            {card.badge}
          </Badge>
        )}
      </VStack>
    </Box>
  );
}

export default GroupSummaryCard;
