import { useAuthStore } from "@/core/state/auth.store";
import { HStack, Box, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function AppBranding() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <HStack
      justify="flex-start"
      align="center"
      gap={2}
      cursor="pointer"
      onClick={() => (isAuthenticated ? navigate("/dashboard") : navigate("/"))}
      transition="all 0.2s"
      _hover={{
        opacity: 0.9,
      }}>
      <Box
        // bg="bg.secondary"
        p={1.5}
        // borderRadius="md"
        // border="1px solid"
        // borderColor="border.default"
        // boxShadow="0 4px 12px rgba(0,0,0,0.15)"
      >
        <Image
          src="/logo.svg"
          alt="Splitly Logo"
          height="30px"
          width="30px"
          objectFit="contain"
        />
      </Box>

      <Text
        color="text.primary"
        fontSize="sm"
        fontWeight="700"
        letterSpacing="-0.02em">
        Splitly
      </Text>
    </HStack>
  );
}
