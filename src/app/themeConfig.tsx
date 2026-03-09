import { createSystem, defaultConfig } from "@chakra-ui/react";

export const darkTheme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        slate: {
          50: { value: "#f8fafc" },
          100: { value: "#f1f5f9" },
          200: { value: "#e2e8f0" },
          300: { value: "#cbd5e1" },
          400: { value: "#94a3b8" },
          500: { value: "#64748b" },
          600: { value: "#475569" },
          700: { value: "#334155" },
          800: { value: "#1e293b" },
          900: { value: "#0f172a" },
        },
        vibrant: {
          blue: { value: "#3b82f6" },
          purple: { value: "#a78bfa" },
          pink: { value: "#f472b6" },
          green: { value: "#34d399" },
          orange: { value: "#fb923c" },
          cyan: { value: "#22d3ee" },
        },
      },
    },

    semanticTokens: {
      colors: {
        "bg.primary": { value: "#0f172a" },
        "bg.secondary": { value: "#1e293b" },
        "bg.tertiary": { value: "#334155" },

        "text.primary": { value: "#f1f5f9" },
        "text.secondary": { value: "#cbd5e1" },
        "text.muted": { value: "#94a3b8" },

        "accent.primary": { value: "#3b82f6" },
        "accent.secondary": { value: "#a78bfa" },

        "status.success": { value: "#34d399" },
        "status.warning": { value: "#fb923c" },
        "status.error": { value: "#f87171" },

        "border.default": { value: "#334155" },
        "border.subtle": { value: "#475569" },
      },
    },

    slotRecipes: {
      toast: {
        slots: ["root", "title", "description", "indicator", "closeTrigger"],

        base: {
          root: {
            backdropFilter: "blur(16px)",
            bg: "rgba(15, 23, 42, 0.75)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "14px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            px: "16px",
            py: "12px",
            color: "white",
          },

          title: {
            fontWeight: "600",
            fontSize: "14px",
          },

          description: {
            fontSize: "13px",
            color: "#cbd5e1",
          },
        },
      },
    },
  },
});
