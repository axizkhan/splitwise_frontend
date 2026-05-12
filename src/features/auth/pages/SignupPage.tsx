import {
  Box,
  Heading,
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
import { useState } from "react";
import { useSignup } from "@/features/auth/hooks";
import { Link as RouterLink } from "react-router-dom";
import { useToast } from "@/shared/toastService";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNumber: "",
    upiId: "",
  });

  const [emailSent, setEmailSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useSignup();
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: () => {
        setEmailSent(true);
        toast.success("Verification Email Sent", "Check your email.");
      },
      onError: (error) => {
        toast.error("Signup Failed", error?.message || "Try again.");
      },
    });
  };

  if (emailSent) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="bg.primary"
        px={4}
        position="relative"
        overflow="hidden">
        {/* Glow */}
        <Box
          position="absolute"
          top="-120px"
          left="-120px"
          w="320px"
          h="320px"
          bg="accent.primary"
          filter="blur(140px)"
          opacity="0.12"
        />

        {/* Card */}
        <VStack
          position="relative"
          zIndex={1}
          bg="bg.secondary"
          backdropFilter="blur(20px)"
          p={{ base: 8, md: 10 }}
          rounded="2xl"
          border="1px solid"
          borderColor="border.default"
          boxShadow="0 20px 50px rgba(0,0,0,0.45)"
          gap={6}
          textAlign="center"
          maxW="420px"
          w="full">
          {/* Icon */}
          <Box
            p={4}
            rounded="full"
            bg="rgba(59,130,246,0.1)"
            border="1px solid"
            borderColor="rgba(59,130,246,0.2)">
            <Text fontSize="3xl">📩</Text>
          </Box>

          {/* Heading */}
          <VStack gap={2}>
            <Heading
              color="text.primary"
              fontWeight="800"
              letterSpacing="-0.03em">
              Check your email
            </Heading>

            <Text
              color="text.muted"
              fontSize="sm">
              We've sent a verification link to
            </Text>

            <Text
              color="accent.primary"
              fontWeight="600"
              fontSize="sm">
              {formData.email}
            </Text>
          </VStack>

          {/* Action */}
          <Box
            as="a"
            ref="https://mail.google.com"
            // target="_blank"
            rel="noopener noreferrer"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            bg="accent.primary"
            color="white"
            w="full"
            fontWeight="600"
            borderRadius="md"
            height="44px"
            fontSize="sm"
            transition="all 0.2s"
            _hover={{
              opacity: 0.92,
              transform: "translateY(-1px)",
              textDecoration: "none",
            }}
            _active={{
              transform: "scale(0.98)",
            }}>
            Open Gmail
          </Box>
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      minH="100vh"
      bg="bg.primary"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      px={4}
      overflow="hidden">
      {/* Glow */}
      <Box
        position="absolute"
        top="-120px"
        left="-120px"
        w="350px"
        h="350px"
        bg="accent.primary"
        filter="blur(140px)"
        opacity="0.12"
      />

      <VStack
        maxW="520px"
        w="full"
        gap={8}
        position="relative"
        zIndex="1">
        {/* Header */}
        <VStack
          gap={3}
          textAlign="center">
          <Box
            // bg="bg.secondary"
            p={4}
            rounded="2xl"
            // border="1px solid"
            // borderColor="border.default"
            // boxShadow="0 10px 40px rgba(0,0,0,0.25)"
          >
            <Image
              src="/logo.svg"
              h="80px"
            />
          </Box>

          <Heading
            color="text.primary"
            fontWeight="800"
            letterSpacing="-0.03em">
            Splitly
          </Heading>

          <Text
            color="text.muted"
            fontSize="sm">
            Smart expense splitting made simple
          </Text>
        </VStack>

        {/* Form Card */}
        <Box
          w="full"
          p={8}
          // bg="bg.secondary"
          // backdropFilter="blur(20px)"
          // // rounded="2xl"
          // // border="1px solid"
          // // borderColor="border.default"
          // boxShadow="0 10px 40px rgba(0,0,0,0.4)"
        >
          <Box
            as="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            gap={5}>
            <HStack gap={4}>
              <Input
                name="firstName"
                placeholder="First name"
                onChange={handleChange}
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

              <Input
                name="lastName"
                placeholder="Last name"
                onChange={handleChange}
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
            </HStack>

            <Input
              name="email"
              placeholder="Email"
              onChange={handleChange}
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

            <InputGroup
              endElement={
                <IconButton
                  variant="ghost"
                  color="text.secondary"
                  _hover={{
                    bg: "transparent",
                    color: "text.primary",
                  }}
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                </IconButton>
              }>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
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

            <HStack gap={4}>
              <Input
                name="mobileNumber"
                placeholder="Mobile"
                onChange={handleChange}
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

              <Input
                name="upiId"
                placeholder="UPI ID"
                onChange={handleChange}
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
            </HStack>

            <Button
              type="submit"
              bg="accent.primary"
              color="white"
              h="50px"
              fontWeight="bold"
              transition="all 0.2s"
              _hover={{
                transform: "translateY(-2px)",
                opacity: 0.92,
                boxShadow: "0 8px 30px rgba(59,130,246,0.4)",
              }}
              _active={{
                transform: "scale(0.97)",
              }}>
              {isPending ? "Creating..." : "Create Account"}
              <RiArrowRightLine />
            </Button>
          </Box>
        </Box>

        {/* Footer */}
        <HStack>
          <Text color="text.muted">Already have an account?</Text>

          <RouterLink to="/login">
            <Text
              color="accent.primary"
              fontWeight="bold"
              _hover={{
                textDecoration: "underline",
              }}>
              Login
            </Text>
          </RouterLink>
        </HStack>
      </VStack>
    </Box>
  );
}

export default Signup;
