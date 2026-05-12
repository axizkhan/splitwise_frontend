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
        mb={8}
        flexWrap="wrap"
        gap={4}>
        <VStack
          align="flex-start"
          gap={1}>
          <Heading
            size="lg"
            color="text.primary"
            fontWeight="800"
            letterSpacing="-0.03em">
            Your Groups
          </Heading>

          <Text
            color="text.muted"
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
        {/* Groups Section */}
        <Box gridColumn={{ base: "span 1", lg: "span 3" }}>
          <HStack
            justify="space-between"
            mb={4}>
            <Heading
              size="md"
              color="text.primary"
              fontWeight="700">
              Groups ({validGroups.length})
            </Heading>
          </HStack>

          {/* Loading */}
          {isLoading ? (
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              gap={6}>
              {[1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  height="180px"
                  borderRadius="2xl"
                />
              ))}
            </SimpleGrid>
          ) : validGroups.length === 0 ? (
            /* Empty State */
            <Center
              p={12}
              borderWidth="1px"
              borderStyle="dashed"
              borderRadius="2xl"
              borderColor="border.subtle"
              bg="bg.secondary">
              <VStack gap={3}>
                <Text
                  color="text.primary"
                  fontWeight="600">
                  No groups yet
                </Text>

                <Text
                  color="text.muted"
                  fontSize="sm"
                  textAlign="center">
                  Create your first group to start tracking shared expenses
                </Text>
              </VStack>
            </Center>
          ) : (
            /* Groups Grid */
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
            rounded="2xl"
            borderWidth="1px"
            borderColor="border.default"
            bg="bg.secondary"
            backdropFilter="blur(10px)"
            boxShadow="0 4px 12px rgba(0,0,0,0.2)"
            transition="all 0.2s"
            _hover={{
              borderColor: "accent.primary",
              transform: "translateY(-2px)",
            }}>
            <HStack
              justify="space-between"
              mb={3}>
              <Text
                fontSize="xs"
                color="text.muted"
                textTransform="uppercase"
                fontWeight="700"
                letterSpacing="0.08em">
                Active Groups
              </Text>

              <Box color="accent.primary">
                <MdGroups size={18} />
              </Box>
            </HStack>

            <Heading
              size="2xl"
              color="accent.primary"
              fontWeight="800">
              {validGroups.length}
            </Heading>
          </Box>
        </VStack>
      </SimpleGrid>
    </AppPageLayout>
  );
}

export default GroupList;
