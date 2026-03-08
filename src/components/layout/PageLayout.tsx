import { Box } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

export default function AppPageLayout({ children }: Props) {
  return (
    <Box
      minH="100vh"
      bg="bg.primary"
      px={{ base: 4, md: 6, lg: 8 }}
      py={{ base: 6, md: 8 }}>
      <Box
        maxW="1200px"
        mx="auto"
        w="full">
        {children}
      </Box>
    </Box>
  );
}
