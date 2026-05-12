import { createSystem, defaultConfig } from "@chakra-ui/react";

export const darkTheme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        gray: {
          50: { value: "#fafafa" },
          100: { value: "#f4f4f5" },
          200: { value: "#e4e4e7" },
          300: { value: "#d4d4d8" },
          400: { value: "#a1a1aa" },
          500: { value: "#71717a" },
          600: { value: "#52525b" },
          700: { value: "#3f3f46" },
          800: { value: "#27272a" },
          900: { value: "#18181b" },
          950: { value: "#09090b" },
        },

        accent: {
          blue: { value: "#0070f3" },
          purple: { value: "#8b5cf6" },
          green: { value: "#10b981" },
          orange: { value: "#f59e0b" },
          red: { value: "#ef4444" },
        },
      },
    },

    semanticTokens: {
      colors: {
        /* Backgrounds */
        "bg.primary": {
          value: "#000000",
        },

        "bg.secondary": {
          value: "#111111",
        },

        "bg.tertiary": {
          value: "#1a1a1a",
        },

        "bg.elevated": {
          value: "#18181b",
        },

        /* Text */
        "text.primary": {
          value: "#fafafa",
        },

        "text.secondary": {
          value: "#a1a1aa",
        },

        "text.muted": {
          value: "#71717a",
        },

        /* Accent */
        "accent.primary": {
          value: "#0070f3",
        },

        "accent.secondary": {
          value: "#8b5cf6",
        },

        /* Status */
        "status.success": {
          value: "#10b981",
        },

        "status.warning": {
          value: "#f59e0b",
        },

        "status.error": {
          value: "#ef4444",
        },

        /* Borders */
        "border.default": {
          value: "#27272a",
        },

        "border.subtle": {
          value: "#1f1f22",
        },

        "border.strong": {
          value: "#3f3f46",
        },
      },
    },

    slotRecipes: {
      toast: {
        slots: ["root", "title", "description", "indicator", "closeTrigger"],

        base: {
          root: {
            backdropFilter: "blur(20px)",
            bg: "rgba(17,17,17,0.92)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.45)",
            px: "16px",
            py: "14px",
            color: "#fafafa",
          },

          title: {
            fontWeight: "600",
            fontSize: "14px",
            color: "#fafafa",
            letterSpacing: "-0.01em",
          },

          description: {
            fontSize: "13px",
            color: "#a1a1aa",
            lineHeight: "1.5",
          },

          closeTrigger: {
            color: "#71717a",
          },
        },
      },
    },
  },
});
