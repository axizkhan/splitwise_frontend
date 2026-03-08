import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaUsers, FaReceipt } from "react-icons/fa";
import FinanceBackground from "../components/animation/FinanceBackground";
import {
  FaUserFriends,
  FaMoneyBillWave,
  FaEnvelopeOpenText,
  FaBalanceScale,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../core/state/auth";
import AppPageLayout from "../components/layout/PageLayout";

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
    desc: "Automatically notify group members when expenses are added.",
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
        minH="100vh"
        display="flex"
        flexDir="column"
        alignItems="center"
        position="relative">
        <FinanceBackground />
        <Container
          maxW="6xl"
          py="32">
          <Stack
            gap="8"
            textAlign="center">
            <Heading
              fontSize={{ base: "4xl", md: "6xl" }}
              bgGradient="linear(to-r, teal.300, cyan.400)"
              bgClip="text">
              Split Expenses
              <br />
              Without the Headache
            </Heading>

            <Text
              color="gray.400"
              maxW="2xl"
              mx="auto"
              fontSize="lg">
              Splitly helps friends, roommates and teams track shared expenses
              and settle balances instantly.
            </Text>

            <Stack
              direction="row"
              justify="center"
              gap="4">
              <Button
                variant="outline"
                borderColor="teal.500"
                color="teal.400"
                px="8"
                size="lg"
                _hover={{
                  bg: "rgba(20,184,166,0.1)",
                  borderColor: "teal.400",
                }}
                onClick={() => navigate("/signup")}>
                Get Started
              </Button>

              <Button
                variant="outline"
                borderColor="blue.500"
                color="blue.400"
                px="8"
                size="lg"
                _hover={{
                  bg: "rgba(59,130,246,0.1)",
                  borderColor: "blue.400",
                }}
                onClick={() => navigate("/login")}>
                Login
              </Button>
            </Stack>
          </Stack>
        </Container>

        {/* FEATURES */}
        <Container
          maxW="6xl"
          py="20">
          <Heading
            textAlign="center"
            mb="16"
            color="white">
            Powerful Features
          </Heading>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            gap="8">
            {features.map((feature) => (
              <Box
                key={feature.title}
                p="8"
                borderRadius="xl"
                bg="rgba(15,23,42,0.6)"
                border="1px solid"
                borderColor="whiteAlpha.200"
                backdropFilter="blur(14px)"
                transition="all .25s"
                _hover={{
                  transform: "translateY(-6px)",
                  borderColor: "teal.300",
                }}>
                <Icon
                  as={feature.icon}
                  boxSize="8"
                  color="teal.300"
                  mb="4"
                />

                <Text
                  fontWeight="bold"
                  color="white"
                  mb="2">
                  {feature.title}
                </Text>

                <Text color="gray.400">{feature.desc}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>

        {/* HOW IT WORKS */}
        <Container
          maxW="6xl"
          py="24">
          <Stack gap="16">
            <Stack
              gap="4"
              textAlign="center">
              <Heading color="white">How It Works</Heading>

              <Text
                color="gray.400"
                maxW="2xl"
                mx="auto">
                Manage shared expenses effortlessly with Splitly in three simple
                steps.
              </Text>
            </Stack>

            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap="10">
              {[
                {
                  title: "Create a Group",
                  desc: "Start a group with friends, roommates, or teammates.",
                  icon: FaUsers,
                },
                {
                  title: "Add Expenses",
                  desc: "Record shared costs and choose who paid.",
                  icon: FaReceipt,
                },
                {
                  title: "Settle Balances",
                  desc: "See who owes what and settle instantly.",
                  icon: FaBalanceScale,
                },
              ].map((step) => (
                <Box
                  key={step.title}
                  p="10"
                  borderRadius="2xl"
                  bg="rgba(15,23,42,0.65)"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  backdropFilter="blur(16px)"
                  textAlign="center"
                  transition="all .25s ease"
                  _hover={{
                    transform: "translateY(-6px)",
                    borderColor: "teal.300",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                  }}>
                  {/* Step number badge */}
                  <Box
                    w="42px"
                    h="42px"
                    mx="auto"
                    mb="5"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="lg"
                    bgGradient="linear(to-r, teal.400, cyan.400)"
                    color="black"
                    fontWeight="bold"></Box>

                  {/* Icon */}
                  <Box mb="4">
                    <Icon
                      as={step.icon}
                      boxSize="7"
                      color="teal.300"
                    />
                  </Box>

                  {/* Title */}
                  <Text
                    fontWeight="bold"
                    color="white"
                    fontSize="lg">
                    {step.title}
                  </Text>

                  {/* Description */}
                  <Text
                    mt="2"
                    color="gray.400"
                    fontSize="sm">
                    {step.desc}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>

        {/* CTA */}
        <Container
          maxW="5xl"
          py="28">
          <Box
            textAlign="center"
            p={{ base: "10", md: "16" }}
            borderRadius="2xl"
            bg="rgba(15,23,42,0.75)"
            border="1px solid"
            borderColor="whiteAlpha.200"
            backdropFilter="blur(16px)"
            position="relative"
            overflow="hidden"
            transition="all .25s"
            _hover={{
              borderColor: "teal.300",
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
            }}>
            {/* subtle gradient glow */}
            <Box
              position="absolute"
              top="-40%"
              left="-20%"
              w="140%"
              h="200%"
              bgGradient="radial(teal.500 0%, transparent 70%)"
              opacity="0.08"
              pointerEvents="none"
            />

            <Stack gap="6">
              <Heading
                color="white"
                fontSize={{ base: "2xl", md: "3xl" }}>
                Start Managing Shared Expenses Today
              </Heading>

              <Text
                color="gray.400"
                maxW="420px"
                mx="auto">
                Create a group, add expenses, and settle balances with your
                friends in seconds.
              </Text>

              <Stack
                direction={{ base: "column", sm: "row" }}
                justify="center"
                gap="4"
                pt="4">
                <Button
                  variant="outline"
                  borderColor="teal.500"
                  color="teal.400"
                  size="lg"
                  px="8"
                  _hover={{
                    bg: "rgba(20,184,166,0.1)",
                    borderColor: "teal.400",
                    boxShadow: "0 0 12px rgba(20,184,166,0.35)",
                  }}
                  onClick={() => navigate("/signup")}>
                  Sign Up
                </Button>

                <Button
                  variant="outline"
                  borderColor="blue.500"
                  color="blue.400"
                  size="lg"
                  px="8"
                  _hover={{
                    bg: "rgba(59,130,246,0.1)",
                    borderColor: "blue.400",
                    boxShadow: "0 0 12px rgba(59,130,246,0.35)",
                  }}
                  onClick={() => navigate("/login")}>
                  Login
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Box>
    </AppPageLayout>
  );
};

export default LandingPage;
