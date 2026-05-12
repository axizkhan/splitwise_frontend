import React from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";
import {
  FaUserFriends,
  FaMoneyBillWave,
  FaEnvelopeOpenText,
  FaBalanceScale,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../core/state/auth";
import AppPageLayout from "../components/layout/PageLayout";
import FinanceBackground from "@/components/animation/FinanceBackground";

// Features data with modern iconography
const features = [
  {
    icon: FaMoneyBillWave,
    title: "Expense Tracking",
    desc: "Track and split expenses easily with friends and groups.",
  },
  {
    icon: FaUserFriends,
    title: "Payment Journals",
    desc: "Maintain a clear record of who paid whom.",
  },
  {
    icon: FaEnvelopeOpenText,
    title: "Email Notifications",
    desc: "Stay updated with automated group alerts.",
  },
  {
    icon: FaBalanceScale,
    title: "Smart Balance",
    desc: "Instantly see who owes what with automatic calculations.",
  },
];

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) navigate("/dashboard", { replace: true });
  }, [isAuthenticated]);

  return (
    <AppPageLayout>
      <Box
        bg="bg.primary"
        color="text.primary"
        position="relative"
        overflow="hidden"
        minH="100vh"
        w="full">
        {/* HERO SECTION */}
        <FinanceBackground />
        <Container
          maxW="full"
          pt={{ base: "32", md: "48" }}
          pb="32"
          centerContent>
          <Stack
            gap="8"
            textAlign="center"
            alignItems="center">
            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "7xl" }}
              fontWeight="800"
              letterSpacing="-0.04em"
              lineHeight="1.1">
              Split expenses. <br />
              <Text
                as="span"
                color="text.muted">
                Zero headache.
              </Text>
            </Heading>

            <Text
              color="text.secondary"
              maxW="xl"
              fontSize="xl"
              fontWeight="400">
              The modern way for teams and roommates to track shared costs and
              settle balances without the friction.
            </Text>

            <Stack
              direction={{ base: "column", sm: "row" }}
              gap="4"
              pt="4">
              <Button
                bg="text.primary"
                color="bg.primary"
                rounded="full"
                px="10"
                size="lg"
                transition="all 0.2s"
                _hover={{
                  opacity: 0.9,
                  transform: "translateY(-2px)",
                }}
                onClick={() => navigate("/signup")}>
                Start for free
              </Button>

              <Button
                variant="outline"
                borderColor="border.subtle"
                color="text.primary"
                rounded="full"
                px="10"
                size="lg"
                _hover={{
                  bg: "bg.secondary",
                  borderColor: "border.default",
                }}
                onClick={() => navigate("/login")}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Container>

        {/* FEATURES GRID */}
        <Container
          maxW="container.xl"
          py="24">
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            gap="6"
            justifyItems="center">
            {features.map((feature) => (
              <Box
                key={feature.title}
                p="8"
                bg="bg.secondary"
                border="1px solid"
                borderColor="border.default"
                rounded="2xl"
                w="full"
                maxW="300px"
                transition="all 0.3s"
                _hover={{
                  borderColor: "border.subtle",
                  bg: "bg.tertiary",
                  transform: "translateY(-4px)",
                }}>
                <Icon
                  as={feature.icon}
                  boxSize="6"
                  color="accent.primary"
                  mb="6"
                />

                <Text
                  fontWeight="600"
                  fontSize="lg"
                  mb="2"
                  color="text.primary">
                  {feature.title}
                </Text>

                <Text
                  color="text.muted"
                  fontSize="sm"
                  lineHeight="tall">
                  {feature.desc}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>

        {/* HOW IT WORKS */}
        <Container
          maxW="5xl"
          py="24">
          <Heading
            textAlign="center"
            fontSize="3xl"
            mb="16"
            color="text.primary">
            How it works
          </Heading>

          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            gap="12"
            justifyItems="center">
            {[
              {
                step: "01",
                title: "Create a Group",
                desc: "Invite your friends or team members instantly.",
              },
              {
                step: "02",
                title: "Log Expenses",
                desc: "Snap a receipt or enter costs as they happen.",
              },
              {
                step: "03",
                title: "Settle Up",
                desc: "One-click calculations to see final balances.",
              },
            ].map((item) => (
              <Stack
                key={item.step}
                gap="4"
                w="full"
                maxW="320px"
                textAlign={{ base: "center", md: "left" }}>
                <Text
                  fontFamily="mono"
                  color="accent.secondary"
                  fontWeight="bold">
                  {item.step}
                </Text>

                <Box
                  h="1px"
                  w="full"
                  bg="border.default"
                />

                <Text
                  fontWeight="700"
                  fontSize="xl"
                  color="text.primary">
                  {item.title}
                </Text>

                <Text color="text.muted">{item.desc}</Text>
              </Stack>
            ))}
          </SimpleGrid>
        </Container>

        {/* FINAL CTA */}
        <Container
          maxW="5xl"
          py="32">
          <Flex
            direction="column"
            align="center"
            justify="center"
            p={{ base: "12", md: "20" }}
            bg="bg.secondary"
            border="1px solid"
            borderColor="border.default"
            rounded="3xl"
            textAlign="center"
            backdropFilter="blur(12px)">
            <Heading
              mb="6"
              letterSpacing="-0.02em"
              color="text.primary">
              Ready to simplify your life?
            </Heading>

            <Text
              color="text.secondary"
              mb="10"
              maxW="md">
              Join thousands of users managing expenses without the stress.
            </Text>

            <Button
              bg="accent.primary"
              color="white"
              size="lg"
              rounded="full"
              px="12"
              transition="all 0.2s"
              _hover={{
                transform: "scale(1.05)",
                opacity: 0.9,
              }}
              onClick={() => navigate("/signup")}>
              Get Splitly Free
            </Button>
          </Flex>
        </Container>
      </Box>
    </AppPageLayout>
  );
};

export default LandingPage;
