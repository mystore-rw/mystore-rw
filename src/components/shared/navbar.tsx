"use client";

import { Box, Flex, Text, HStack } from "@chakra-ui/react";
import { Store } from "lucide-react";
import Link from "next/link";
import { ColorModeToggle } from "@/components/ui/color-mode";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

export function Navbar() {
  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex={100}
      bg="white"
      borderBottomWidth="1px"
      borderColor="#f3f4f6"
      px={{ base: 5, md: 10 }}
      py={3}
    >
      <Flex maxW="6xl" mx="auto" align="center" justify="space-between">
        <Link href="/">
          <HStack gap={2}>
            <Store size={20} color="#16a34a" />
            <Text fontWeight="900" fontSize="lg" color="#111827">
              MyStore<Text as="span" color="#25D366">RW</Text>
            </Text>
          </HStack>
        </Link>

        <HStack gap={3}>
          <ColorModeToggle />

          <Link href="/vendor/onboarding">
            <Flex
              align="center"
              gap={1.5}
              px={4}
              py={2}
              bg="#25D366"
              color="white"
              borderRadius="lg"
              fontSize="sm"
              fontWeight="700"
              _hover={{ bg: "#20b958" }}
              transition="background 0.18s"
              cursor="pointer"
            >
              <WhatsAppIcon size={14} color="white" />
              <Text>List your shop</Text>
            </Flex>
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
}
