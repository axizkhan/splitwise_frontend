import {
  Heading,
  Text,
  SimpleGrid,
  Box,
  VStack,
  HStack,
  Skeleton,
  Center,
} from "@chakra-ui/react";

import { MdGroups } from "react-icons/md";

import { CreateGroupDialog } from "@/features/groups/components";
import { GroupCardComponents } from "@/features/groups/components";
import { useGroups } from "@/features/groups/hooks";

import AppPageLayout from "../../../components/layout/PageLayout";

function GroupList() {
  const { data: groups = [], isLoading } = useGroups();
  const validGroups = Array.isArray(groups) ? groups : [];

  return (
    <AppPageLayout>
      {/* Header */}
      <HStack
        justify="space-between"
        align="center"
        mb={8}>
        <VStack
          align="flex-start"
          gap={1}>
          <Heading
            size="lg"
            color="slate.100"
            fontWeight="800">
            Your Groups
          </Heading>

          <Text
            color="slate.400"
            fontSize="sm">
            Manage and track shared expenses
          </Text>
        </VStack>

        <CreateGroupDialog />
      </HStack>

      {/* Main Layout */}
      <SimpleGrid
        columns={{ base: 1, lg: 4 }}
        gap={6}>
        {/* Groups */}
        <Box gridColumn={{ base: "span 1", lg: "span 3" }}>
          <HStack
            justify="space-between"
            mb={4}>
            <Heading
              size="md"
              color="slate.100">
              Groups ({validGroups.length})
            </Heading>
          </HStack>

          {isLoading ? (
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              gap={6}>
              {[1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  height="180px"
                  borderRadius="xl"
                />
              ))}
            </SimpleGrid>
          ) : validGroups.length === 0 ? (
            <Center
              p={12}
              borderWidth="2px"
              borderStyle="dashed"
              borderRadius="xl"
              borderColor="slate.700">
              <VStack gap={2}>
                <Text color="slate.400">No groups yet</Text>
                <Text
                  color="slate.500"
                  fontSize="sm">
                  Create your first group
                </Text>
              </VStack>
            </Center>
          ) : (
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              gap={6}>
              {validGroups.map((group: any) => (
                <GroupCardComponents
                  key={group._id}
                  group={group}
                />
              ))}
            </SimpleGrid>
          )}
        </Box>

        {/* Sidebar */}
        <VStack
          align="stretch"
          gap={6}>
          <Box
            p={6}
            rounded="xl"
            borderWidth="1px"
            borderColor="slate.700"
            bg="rgba(30,41,59,0.4)"
            backdropFilter="blur(10px)">
            <HStack
              justify="space-between"
              mb={2}>
              <Text
                fontSize="xs"
                color="slate.400"
                textTransform="uppercase"
                fontWeight="700">
                Active Groups
              </Text>

              <MdGroups size={18} />
            </HStack>

            <Heading
              size="2xl"
              color="green.300">
              {validGroups.length}
            </Heading>
          </Box>
        </VStack>
      </SimpleGrid>
    </AppPageLayout>
  );
}

export default GroupList;
