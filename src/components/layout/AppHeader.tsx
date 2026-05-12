import React from "react";
import {
  Box,
  Flex,
  Button,
  Avatar,
  Text,
  VStack,
  IconButton,
  HStack,
  Portal,
} from "@chakra-ui/react";
import { MdLogout, MdMenu, MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AppBranding from "../common/AppBranding";
import { useAuth } from "../../core/state/auth";

const AppHeader: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const onClose = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    onClose();
  };

  return (
    <>
      {/* HEADER */}
      <Box
        as="header"
        position="sticky"
        top="0"
        zIndex="100"
        bg="rgba(15,23,42,0.45)"
        borderBottom="1px solid"
        borderColor="rgba(255,255,255,0.08)"
        backdropFilter="blur(18px) saturate(180%)"
        boxShadow="0 8px 32px rgba(0,0,0,0.18)"
        w="100%">
        <Flex
          maxW="1200px"
          mx="auto"
          px="6"
          h="64px"
          align="center"
          justify="space-between">
          <AppBranding />

          <IconButton
            aria-label="Open menu"
            rounded="xl"
            bg="rgba(255,255,255,0.06)"
            border="1px solid rgba(255,255,255,0.08)"
            color="white"
            backdropFilter="blur(12px)"
            transition="all 0.25s ease"
            _hover={{
              bg: "rgba(255,255,255,0.12)",
              transform: "translateY(-1px)",
              boxShadow: "0 8px 24px rgba(255,255,255,0.08)",
            }}
            onClick={toggleMenu}>
            <MdMenu size={24} />
          </IconButton>
        </Flex>
      </Box>

      {/* MOBILE DRAWER / OVERLAY SYSTEM */}
      <Portal>
        {/* BACKDROP */}
        <Box
          position="fixed"
          inset="0"
          bg="rgba(2,6,23,0.45)"
          backdropFilter="blur(10px)"
          opacity={isOpen ? 1 : 0}
          pointerEvents={isOpen ? "auto" : "none"}
          transition="all 0.25s ease"
          zIndex="1500"
          onClick={onClose}
        />

        {/* DRAWER */}
        <Box
          position="fixed"
          top="0"
          right="0"
          w={{ base: "80vw", md: "380px" }}
          h="100vh"
          bg="rgba(15,23,42,0.55)"
          backdropFilter="blur(24px) saturate(180%)"
          borderLeft="1px solid rgba(255,255,255,0.08)"
          zIndex="2000"
          transform={isOpen ? "translateX(0)" : "translateX(100%)"}
          transition="transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
          boxShadow="
        -10px 0 40px rgba(0,0,0,0.35),
        inset 1px 0 rgba(255,255,255,0.05)
      "
          display="flex"
          flexDirection="column"
          overflow="hidden">
          {/* TOP LIGHT GLOW */}
          <Box
            position="absolute"
            top="-120px"
            right="-120px"
            w="240px"
            h="240px"
            bg="rgba(59,130,246,0.18)"
            filter="blur(90px)"
            borderRadius="full"
            pointerEvents="none"
          />

          {/* HEADER */}
          <Flex
            align="center"
            justify="space-between"
            p="6"
            borderBottom="1px solid"
            borderColor="rgba(255,255,255,0.06)"
            mb="4"
            position="relative"
            zIndex="2">
            <Text
              fontWeight="700"
              fontSize="xs"
              letterSpacing="widest"
              color="rgba(255,255,255,0.6)"
              textTransform="uppercase">
              Menu
            </Text>

            <IconButton
              aria-label="Close"
              rounded="xl"
              bg="rgba(255,255,255,0.06)"
              border="1px solid rgba(255,255,255,0.08)"
              color="white"
              backdropFilter="blur(12px)"
              transition="all 0.25s ease"
              _hover={{
                bg: "rgba(255,255,255,0.12)",
                transform: "rotate(90deg)",
              }}
              onClick={onClose}>
              <MdClose size={20} />
            </IconButton>
          </Flex>

          {/* USER INFO */}
          {isAuthenticated && user && (
            <Box
              px="6"
              py="4"
              position="relative"
              zIndex="2">
              <HStack
                gap="4"
                p="4"
                rounded="2xl"
                bg="rgba(255,255,255,0.04)"
                border="1px solid rgba(255,255,255,0.06)"
                backdropFilter="blur(14px)">
                <Avatar.Root size="md">
                  <Avatar.Fallback
                    name={`${user.firstName} ${user.lastName}`}
                    bg="rgba(59,130,246,0.85)"
                    color="white"
                  />

                  <Avatar.Image src={user.image} />
                </Avatar.Root>

                <VStack
                  align="start"
                  gap="0">
                  <Text
                    fontWeight="600"
                    color="white"
                    fontSize="md">
                    {user.firstName} {user.lastName}
                  </Text>

                  <Text
                    fontSize="xs"
                    color="rgba(255,255,255,0.6)"
                    fontFamily="mono">
                    {user.email}
                  </Text>
                </VStack>
              </HStack>
            </Box>
          )}

          {/* NAV LINKS */}
          <VStack
            flex="1"
            p="6"
            gap="4"
            align="stretch"
            position="relative"
            zIndex="2">
            {!isAuthenticated ? (
              <>
                <Button
                  h="12"
                  rounded="xl"
                  color="white"
                  bg="rgba(59,130,246,0.8)"
                  border="1px solid rgba(255,255,255,0.08)"
                  backdropFilter="blur(12px)"
                  transition="all 0.25s ease"
                  _hover={{
                    bg: "rgba(59,130,246,1)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 30px rgba(59,130,246,0.35)",
                  }}
                  onClick={() => {
                    navigate("/signup");
                    onClose();
                  }}>
                  Create Account
                </Button>

                <Button
                  h="12"
                  rounded="xl"
                  bg="rgba(255,255,255,0.05)"
                  border="1px solid rgba(255,255,255,0.08)"
                  color="white"
                  backdropFilter="blur(12px)"
                  transition="all 0.25s ease"
                  _hover={{
                    bg: "rgba(255,255,255,0.1)",
                    transform: "translateY(-2px)",
                  }}
                  onClick={() => {
                    navigate("/login");
                    onClose();
                  }}>
                  Sign In
                </Button>
              </>
            ) : (
              <Box>{/* Dashboard links */}</Box>
            )}
          </VStack>

          {/* LOGOUT */}
          {isAuthenticated && (
            <Box
              p="6"
              borderTop="1px solid rgba(255,255,255,0.06)"
              position="relative"
              zIndex="2">
              <Button
                w="full"
                justifyContent="start"
                gap="3"
                rounded="xl"
                bg="rgba(248,113,113,0.08)"
                border="1px solid rgba(248,113,113,0.12)"
                color="#f87171"
                backdropFilter="blur(12px)"
                transition="all 0.25s ease"
                _hover={{
                  bg: "rgba(248,113,113,0.14)",
                  transform: "translateY(-2px)",
                }}
                onClick={handleLogout}>
                <MdLogout size={18} />
                Log out
              </Button>
            </Box>
          )}
        </Box>
      </Portal>
    </>
  );
};

export default AppHeader;
