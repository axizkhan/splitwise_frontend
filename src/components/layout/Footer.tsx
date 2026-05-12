import {
  Box,
  Container,
  Flex,
  Stack,
  Text,
  Link,
  IconButton,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaGithub, FaXTwitter } from "react-icons/fa6"; // Updated to X icon
import AppBranding from "../common/AppBranding";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleNav = (path: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(path);
  };

  return (
    <Box
      as="footer"
      borderTop="1px solid"
      borderColor="border.default"
      bg="bg.primary"
      mt="20"
      w="100%">
      <Container
        maxW="1200px"
        mx="auto"
        px="6"
        py="16">
        {/* Top Section */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 4 }}
          gap="12"
          alignItems="start">
          {/* Brand */}
          <Stack
            gap="6"
            gridColumn={{ md: "span 2" }}>
            <AppBranding />

            <Text
              color="text.muted"
              fontSize="sm"
              maxW="320px"
              lineHeight="tall">
              Building the future of shared financial clarity. Effortless
              expense sharing for modern teams and roommates.
            </Text>
          </Stack>

          {/* Navigation */}
          <Stack gap="4">
            <Text
              fontWeight="700"
              color="text.primary"
              fontSize="xs"
              letterSpacing="widest"
              textTransform="uppercase">
              Platform
            </Text>

            {[
              { label: "Dashboard", path: "/dashboard" },
              { label: "Sign In", path: "/login" },
              { label: "Create Account", path: "/signup" },
            ].map((item) => (
              <Link
                key={item.label}
                color="text.muted"
                fontSize="sm"
                variant="plain"
                _hover={{
                  color: "text.primary",
                  textDecoration: "none",
                }}
                onClick={() => handleNav(item.path)}>
                {item.label}
              </Link>
            ))}
          </Stack>

          {/* Social */}
          <Stack gap="4">
            <Text
              fontWeight="700"
              color="text.primary"
              fontSize="xs"
              letterSpacing="widest"
              textTransform="uppercase">
              Social
            </Text>

            <Flex gap="3">
              <IconButton
                asChild
                aria-label="GitHub"
                variant="ghost"
                size="sm"
                rounded="md"
                color="text.muted"
                _hover={{
                  bg: "bg.secondary",
                  color: "text.primary",
                }}>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer">
                  <FaGithub size={18} />
                </a>
              </IconButton>

              <IconButton
                asChild
                aria-label="Twitter"
                variant="ghost"
                size="sm"
                rounded="md"
                color="text.muted"
                _hover={{
                  bg: "bg.secondary",
                  color: "text.primary",
                }}>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer">
                  <FaXTwitter size={18} />
                </a>
              </IconButton>
            </Flex>
          </Stack>
        </SimpleGrid>

        {/* Bottom */}
        <Flex
          mt="16"
          pt="8"
          borderTop="1px solid"
          borderColor="border.subtle"
          justify="space-between"
          align="center"
          flexDir={{ base: "column", md: "row" }}
          gap="6">
          <Text
            fontSize="xs"
            fontFamily="mono"
            color="text.muted">
            © {new Date().getFullYear()} Splitly Labs.
          </Text>

          <Flex gap="8">
            <Link
              href="#"
              color="text.muted"
              fontSize="xs"
              _hover={{
                color: "text.primary",
                textDecoration: "none",
              }}>
              Privacy Policy
            </Link>

            <Link
              href="#"
              color="text.muted"
              fontSize="xs"
              _hover={{
                color: "text.primary",
                textDecoration: "none",
              }}>
              Terms of Service
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
