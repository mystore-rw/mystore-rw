"use client";

import { ClientOnly, IconButton, Skeleton } from "@chakra-ui/react";
import { ThemeProvider, useTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ColorModeProvider(props: ThemeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  );
}

export function ColorModeToggle() {
  const { theme, setTheme } = useTheme();
  const toggleColorMode = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton
        aria-label="Toggle color mode"
        variant="ghost"
        size="sm"
        onClick={toggleColorMode}
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </IconButton>
    </ClientOnly>
  );
}
