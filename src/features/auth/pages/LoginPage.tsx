import {
  Box,
  Heading,
  Field,
  Input,
  Button,
  Text,
  VStack,
  HStack,
  Image,
  InputGroup,
  IconButton,
} from "@chakra-ui/react";

import { RiArrowRightLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useLogin } from "../hooks";
import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useToast } from "@/shared/toastService";

function LoginPage() {
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          const firstName = data.user?.firstName || "User";
          toast.success("Login Successful", `Welcome back, ${firstName}!`);
          navigate("/dashboard");
        },
        onError: (error: any) => {
          const errorMessage =
            error.message || "Login failed. Please try again.";
          toast.error("Login Failed", errorMessage);
        },
      },
    );
  };

  return (
    <Box
      minH="100vh"
      bg="bg.primary"
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={8}
      px={4}>
      <VStack
        width="100%"
        maxW="420px"
        gap={8}>
        {/* Header */}
        <VStack
          gap={6}
          width="100%">
          <VStack gap={3}>
            <Box
              bg="linear-gradient(135deg, rgba(16,185,129,0.1), rgba(59,130,246,0.1))"
              p={4}
              borderRadius="2xl"
              border="1px solid"
              borderColor="slate.700">
              <Image
                src="/image.png"
                alt="Splitly Logo"
                height="64px"
                width="64px"
                objectFit="contain"
              />
            </Box>

            <VStack gap={1}>
              <Heading
                size="2xl"
                color="text.primary"
                fontWeight="800">
                Splitly
              </Heading>

              <Text
                color="text.secondary"
                fontSize="sm">
                Track shared expenses with ease
              </Text>
            </VStack>
          </VStack>

          <VStack
            gap={2}
            width="100%">
            <Heading
              size="lg"
              color="text.primary">
              Welcome Back
            </Heading>

            <Text
              color="text.muted"
              fontSize="sm">
              Login to continue managing your groups
            </Text>
          </VStack>
        </VStack>

        {/* Form */}
        <Box
          as="form"
          onSubmit={handleSubmit}
          width="100%"
          display="flex"
          flexDirection="column"
          gap={5}>
          {/* Email */}
          <Field.Root required>
            <Field.Label fontWeight="600">Email Address</Field.Label>

            <Input
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="bg.secondary"
              borderColor="slate.700"
              px={2}
              height="44px"
              fontSize="sm"
            />

            <Field.HelperText fontSize="xs">
              We'll never share your email.
            </Field.HelperText>
          </Field.Root>

          {/* Password */}
          <Field.Root required>
            <Field.Label fontWeight="600">Password</Field.Label>

            <InputGroup
              endElement={
                <IconButton
                  size="sm"
                  variant="ghost"
                  aria-label="toggle password"
                  color="gray.400"
                  _hover={{ color: "gray.200", bg: "transparent" }}
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                </IconButton>
              }>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg="bg.secondary"
                borderColor="slate.700"
                px={2}
                height="44px"
                fontSize="sm"
              />
            </InputGroup>
          </Field.Root>

          {/* Login button */}
          <Button
            type="submit"
            width="100%"
            bg="teal.500"
            color="white"
            height="44px"
            fontSize="sm"
            fontWeight="600"
            disabled={isPending}
            gap={2}>
            {isPending ? "Logging in..." : "Log In"}
            <RiArrowRightLine />
          </Button>
        </Box>

        {/* Footer */}
        <VStack
          gap={4}
          width="100%">
          <Box
            width="100%"
            height="1px"
            bg="linear-gradient(90deg, transparent, slate.700, transparent)"
          />

          <HStack gap={1}>
            <Text fontSize="sm">Don't have an account?</Text>

            <RouterLink to="/signup">
              <Text
                as="span"
                color="teal.400"
                fontWeight="600"
                _hover={{ textDecoration: "underline" }}>
                Sign up
              </Text>
            </RouterLink>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
}

export default LoginPage;
