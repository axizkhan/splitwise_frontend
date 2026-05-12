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
              // bg="bg.secondary"
              p={4}
              // borderRadius="2xl"
              // border="1px solid"
              // borderColor="border.default"
              // boxShadow="0 10px 40px rgba(0,0,0,0.25)"
            >
              <Image
                src="/logo.svg"
                alt="Splitly Logo"
                height="80px"
                width="80px"
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
            <Field.Label
              fontWeight="600"
              color="text.primary">
              Email Address
            </Field.Label>

            <Input
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="bg.secondary"
              borderColor="border.default"
              color="text.primary"
              px={2}
              height="44px"
              fontSize="sm"
              _placeholder={{
                color: "text.muted",
              }}
              _focusVisible={{
                borderColor: "accent.primary",
                boxShadow: "0 0 0 1px var(--chakra-colors-accent-primary)",
              }}
            />

            <Field.HelperText
              fontSize="xs"
              color="text.muted">
              We'll never share your email.
            </Field.HelperText>
          </Field.Root>

          {/* Password */}
          <Field.Root required>
            <Field.Label
              fontWeight="600"
              color="text.primary">
              Password
            </Field.Label>

            <InputGroup
              endElement={
                <IconButton
                  size="sm"
                  variant="ghost"
                  aria-label="toggle password"
                  color="text.muted"
                  _hover={{
                    color: "text.secondary",
                    bg: "transparent",
                  }}
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
                borderColor="border.default"
                color="text.primary"
                px={2}
                height="44px"
                fontSize="sm"
                _placeholder={{
                  color: "text.muted",
                }}
                _focusVisible={{
                  borderColor: "accent.primary",
                  boxShadow: "0 0 0 1px var(--chakra-colors-accent-primary)",
                }}
              />
            </InputGroup>
          </Field.Root>

          {/* Login button */}
          <Button
            type="submit"
            width="100%"
            bg="accent.primary"
            color="white"
            height="44px"
            fontSize="sm"
            fontWeight="600"
            disabled={isPending}
            gap={2}
            transition="all 0.2s"
            _hover={{
              opacity: 0.9,
              transform: "translateY(-1px)",
            }}
            _active={{
              transform: "scale(0.98)",
            }}>
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
            bg="border.default"
          />

          <HStack gap={1}>
            <Text
              fontSize="sm"
              color="text.secondary">
              Don't have an account?
            </Text>

            <RouterLink to="/signup">
              <Text
                as="span"
                color="accent.primary"
                fontWeight="600"
                _hover={{
                  textDecoration: "underline",
                }}>
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
