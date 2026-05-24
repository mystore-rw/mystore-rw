"use client";

import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
  IconButton,
  Separator,
} from "@chakra-ui/react";
import { Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/shared/navbar";
import { useCartStore } from "@/store/cart";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) {
    return (
      <Box minH="100vh" bg="bg">
        <Navbar />
        <VStack gap={4} py={24} textAlign="center">
          <ShoppingBag size={64} strokeWidth={1} />
          <Heading size="lg">Your cart is empty</Heading>
          <Text color="fg.muted">Add products from your neighborhood to get started.</Text>
          <Link href="/">
            <Button colorPalette="green">Browse neighborhoods</Button>
          </Link>
        </VStack>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="bg">
      <Navbar />
      <Box maxW="2xl" mx="auto" px={{ base: 4, md: 8 }} py={8}>
        <Heading size="xl" mb={6}>Your Cart</Heading>

        <VStack gap={4} align="stretch" mb={6}>
          {items.map((item) => (
            <HStack key={item.productId} gap={4} p={4} borderWidth="1px" borderRadius="xl" bg="bg.subtle">
              <Box w={16} h={16} borderRadius="lg" overflow="hidden" bg="gray.100" flexShrink={0}>
                {item.image ? (
                  <Image src={item.image} alt={item.name} width={64} height={64} style={{ objectFit: "cover" }} />
                ) : (
                  <Box w="full" h="full" display="flex" alignItems="center" justifyContent="center">🛍️</Box>
                )}
              </Box>

              <VStack align="start" gap={0} flex={1}>
                <Text fontWeight="medium" fontSize="sm">{item.name}</Text>
                <Text color="green.500" fontWeight="bold" fontSize="sm">
                  {item.price.toLocaleString()} RWF
                </Text>
              </VStack>

              <HStack gap={2}>
                <Button size="xs" variant="outline" onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}>−</Button>
                <Text fontSize="sm" minW={6} textAlign="center">{item.quantity}</Text>
                <Button size="xs" variant="outline" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</Button>
              </HStack>

              <IconButton aria-label="Remove" size="sm" variant="ghost" colorPalette="red" onClick={() => removeItem(item.productId)}>
                <Trash2 size={14} />
              </IconButton>
            </HStack>
          ))}
        </VStack>

        <Separator mb={4} />

        <HStack justify="space-between" mb={6}>
          <Text fontWeight="bold" fontSize="lg">Total</Text>
          <Text fontWeight="bold" fontSize="lg" color="green.500">
            {total().toLocaleString()} RWF
          </Text>
        </HStack>

        <Link href="/checkout">
          <Button colorPalette="green" w="full" size="lg">
            Proceed to Checkout
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
