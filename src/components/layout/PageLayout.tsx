import { Box, Container, Flex } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

export default function AppPageLayout({ children }: Props) {
  return (
    <Box
      as="main"
      minH="100vh"
      bg="bg.primary"
      color="text.primary"
      position="relative"
      overflowX="hidden"
      w="100%">
      {/* Background Glow */}
      <Box
        position="absolute"
        top="0"
        left="50%"
        transform="translateX(-50%)"
        w="full"
        maxW="1000px"
        h="400px"
        bgGradient="
      radial(
        circle,
        rgba(59,130,246,0.12) 0%,
        transparent 70%
      )
    "
        pointerEvents="none"
        zIndex="0"
      />

      {/* Main Layout */}
      <Flex
        direction="column"
        align="center"
        w="100%"
        position="relative"
        zIndex="1">
        <Container
          maxW="1200px"
          w="100%"
          px={{ base: "6", md: "10" }}
          py={{ base: "12", md: "20" }}
          mx="auto"
          centerContent>
          {children}
        </Container>
      </Flex>
    </Box>
  );
}
