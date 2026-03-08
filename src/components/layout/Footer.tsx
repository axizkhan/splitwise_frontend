import {
  Box,
  Container,
  Flex,
  Stack,
  Text,
  Link,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import AppBranding from "../common/AppBranding";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Box
      borderTop="1px solid"
      borderColor="whiteAlpha.200"
      bg="rgba(15,23,42,0.9)"
      backdropFilter="blur(14px)"
      mt="20"
      w="100%">
      <Container
        maxW="1200px"
        mx="auto"
        px={{ base: 6, md: 8 }}
        py="12">
        {/* Top Section */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3 }}
          gap="12"
          alignItems="start">
          {/* Brand */}
          <Stack gap="4">
            <Flex
              align="center"
              gap="3">
              <AppBranding />

              <Text
                fontWeight="bold"
                fontSize="lg"
                letterSpacing="wide"
                color="white">
                Splitly
              </Text>
            </Flex>

            <Text
              color="gray.400"
              fontSize="sm"
              maxW="280px"
              lineHeight="1.6">
              Effortless expense sharing for friends, roommates, and teams.
            </Text>
          </Stack>

          {/* Navigation */}
          <Stack gap="4">
            <Text
              fontWeight="semibold"
              color="white"
              fontSize="sm"
              letterSpacing="wide"
              textTransform="uppercase">
              Navigation
            </Text>

            {[
              { label: "Groups", path: "/dashboard" },
              { label: "Login", path: "/login" },
              { label: "Sign Up", path: "/signup" },
            ].map((item) => (
              <Link
                key={item.label}
                color="gray.400"
                fontSize="sm"
                cursor="pointer"
                transition="all 0.2s ease"
                _hover={{
                  color: "teal.300",
                  transform: "translateX(4px)",
                }}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  navigate(item.path);
                }}>
                {item.label}
              </Link>
            ))}
          </Stack>

          {/* Social */}
          <Stack gap="4">
            <Text
              fontWeight="semibold"
              color="white"
              fontSize="sm"
              letterSpacing="wide"
              textTransform="uppercase">
              Connect
            </Text>

            <Flex gap="4">
              <Link
                href="https://github.com"
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="38px"
                h="38px"
                rounded="full"
                bg="whiteAlpha.100"
                transition="all 0.25s ease"
                _hover={{
                  bg: "teal.500",
                  transform: "translateY(-3px)",
                }}>
                <Icon
                  as={FaGithub}
                  boxSize="4"
                />
              </Link>

              <Link
                href="https://twitter.com"
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="38px"
                h="38px"
                rounded="full"
                bg="whiteAlpha.100"
                transition="all 0.25s ease"
                _hover={{
                  bg: "teal.500",
                  transform: "translateY(-3px)",
                }}>
                <Icon
                  as={FaTwitter}
                  boxSize="4"
                />
              </Link>
            </Flex>
          </Stack>
        </SimpleGrid>

        {/* Bottom */}
        <Flex
          mt="12"
          pt="6"
          borderTop="1px solid"
          borderColor="whiteAlpha.200"
          justify="space-between"
          align="center"
          flexDir={{ base: "column", md: "row" }}
          gap="4">
          <Text
            fontSize="sm"
            color="gray.500">
            © {new Date().getFullYear()} Splitly. All rights reserved.
          </Text>

          <Flex gap="6">
            <Link
              color="gray.500"
              fontSize="sm"
              transition="color 0.2s ease"
              _hover={{ color: "teal.300" }}>
              Privacy
            </Link>

            <Link
              color="gray.500"
              fontSize="sm"
              transition="color 0.2s ease"
              _hover={{ color: "teal.300" }}>
              Terms
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
