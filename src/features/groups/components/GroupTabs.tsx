import { HStack, Button } from "@chakra-ui/react";

export default function GroupTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: "members" | "expenses";
  setActiveTab: (tab: "members" | "expenses") => void;
}) {
  return (
    <HStack
      gap={0}
      borderBottomWidth="1px"
      borderBottomColor="border.default"
      mb={8}>
      <Button
        variant="ghost"
        size="lg"
        onClick={() => setActiveTab("members")}
        px={4}
        py={3}
        borderBottomWidth={activeTab === "members" ? "3px" : "0px"}
        borderBottomColor={
          activeTab === "members" ? "accent.primary" : "transparent"
        }
        borderRadius="0"
        color={activeTab === "members" ? "text.primary" : "text.muted"}
        fontWeight={activeTab === "members" ? "700" : "500"}
        fontSize="lg"
        transition="all 0.2s"
        _hover={{
          color: "text.primary",
          bg: "transparent",
        }}>
        Members
      </Button>

      <Button
        variant="ghost"
        size="lg"
        onClick={() => setActiveTab("expenses")}
        px={4}
        py={3}
        borderBottomWidth={activeTab === "expenses" ? "3px" : "0px"}
        borderBottomColor={
          activeTab === "expenses" ? "accent.primary" : "transparent"
        }
        borderRadius="0"
        color={activeTab === "expenses" ? "text.primary" : "text.muted"}
        fontWeight={activeTab === "expenses" ? "700" : "500"}
        fontSize="lg"
        transition="all 0.2s"
        _hover={{
          color: "text.primary",
          bg: "transparent",
        }}>
        Expenses
      </Button>
    </HStack>
  );
}
