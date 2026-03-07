import { Box, Heading, Text, VStack, Spinner, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
// import { apiClient } from "@/infrastructure/api/apiClient";
import { useToast } from "@/shared/toastService";
import { useVerifyEmail } from "@/features/auth/hooks";

type Status = "loading" | "success" | "error";

function VerifyEmail() {
  const [status, setStatus] = useState<Status>("loading");
  const { mutate } = useVerifyEmail();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      return;
    }
    mutate(token, {
      onSuccess: () => {
        setStatus("success");
      },
      onError: () => {
        setStatus("error");
        const errorMessage = "Verification failed.";

        toast.error("Verification Failed", errorMessage);
      },
    });
  }, []);

  return (
    <Box
      minH="100vh"
      bg="bg.primary"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}>
      <VStack
        maxW="420px"
        width="100%"
        bg="bg.secondary"
        p={8}
        borderRadius="xl"
        border="1px solid"
        borderColor="slate.700"
        gap={6}
        textAlign="center">
        {status === "loading" && (
          <>
            <Spinner
              size="xl"
              color="teal.400"
            />
            <Heading
              size="md"
              color="text.primary">
              Verifying your email...
            </Heading>
            <Text color="text.muted">
              Please wait while we activate your account.
            </Text>
          </>
        )}

        {status === "success" && (
          <>
            <Heading
              size="md"
              color="teal.400">
              Email Verified 🎉
            </Heading>
            <Text color="text.muted">
              Your account has been successfully verified.
            </Text>
            <Text color="text.muted">Redirecting to dashboard...</Text>
          </>
        )}

        {status === "error" && (
          <>
            <Heading
              size="md"
              color="red.400">
              Verification Failed
            </Heading>
            <Text color="text.muted">
              The verification link may be invalid or expired.
            </Text>

            <Button
              colorScheme="teal"
              onClick={() => navigate("/login")}
              px={{ mdDown: 2, md: 3 }}>
              Go to Login
            </Button>
          </>
        )}
      </VStack>
    </Box>
  );
}

export default VerifyEmail;
