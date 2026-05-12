import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from "@chakra-ui/react";

export const toaster = createToaster({
  placement: "top",
  pauseOnPageIdle: true,
});

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster
        toaster={toaster}
        insetInline={{ mdDown: "4" }}>
        {(toast) => (
          <Toast.Root
            width={{ md: "sm" }}
            bg="bg.secondary"
            border="1px solid"
            borderColor="border.default"
            color="text.primary"
            backdropFilter="blur(16px)"
            boxShadow="0 20px 40px rgba(0,0,0,0.45)"
            rounded="xl">
            {toast.type === "loading" ? (
              <Spinner
                size="sm"
                color="accent.primary"
              />
            ) : (
              <Toast.Indicator
                color={
                  toast.type === "success"
                    ? "status.success"
                    : toast.type === "error"
                      ? "status.error"
                      : "accent.primary"
                }
              />
            )}

            <Stack
              gap="1"
              flex="1"
              maxWidth="100%">
              {toast.title && (
                <Toast.Title
                  color="text.primary"
                  fontWeight="600">
                  {toast.title}
                </Toast.Title>
              )}

              {toast.description && (
                <Toast.Description
                  color="text.secondary"
                  fontSize="sm">
                  {toast.description}
                </Toast.Description>
              )}
            </Stack>

            {toast.action && (
              <Toast.ActionTrigger
                color="accent.primary"
                fontWeight="600"
                _hover={{
                  opacity: 0.9,
                }}>
                {toast.action.label}
              </Toast.ActionTrigger>
            )}

            {toast.closable && (
              <Toast.CloseTrigger
                color="text.muted"
                _hover={{
                  color: "text.primary",
                  bg: "bg.tertiary",
                }}
              />
            )}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
};
