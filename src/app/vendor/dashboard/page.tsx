import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { Package, ShoppingBag, Banknote, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/shared/navbar";

const STAT_CARDS = [
  { label: "Total Products", value: "0", icon: Package, color: "blue" },
  { label: "Pending Orders", value: "0", icon: ShoppingBag, color: "orange" },
  { label: "Revenue (RWF)", value: "0", icon: Banknote, color: "green" },
  { label: "This Week", value: "0", icon: TrendingUp, color: "purple" },
];

const QUICK_LINKS = [
  { label: "Add Product", href: "/vendor/products/new", emoji: "➕" },
  { label: "View Orders", href: "/vendor/orders", emoji: "📦" },
  { label: "My Products", href: "/vendor/products", emoji: "🛍️" },
  { label: "Shop Settings", href: "/vendor/settings", emoji: "⚙️" },
];

export default function VendorDashboardPage() {
  return (
    <Box minH="100vh" bg="bg">
      <Navbar />
      <Box maxW="5xl" mx="auto" px={{ base: 4, md: 8 }} py={8}>
        <VStack align="start" gap={1} mb={8}>
          <Heading size="xl">Vendor Dashboard</Heading>
          <Text color="fg.muted">Manage your shop and orders</Text>
        </VStack>

        {/* Stats */}
        <SimpleGrid columns={{ base: 2, md: 4 }} gap={4} mb={8}>
          {STAT_CARDS.map((stat) => (
            <Box key={stat.label} p={5} borderWidth="1px" borderRadius="xl" bg="bg.subtle">
              <HStack gap={3} mb={3}>
                <Box color={`${stat.color}.500`}>
                  <stat.icon size={20} />
                </Box>
                <Text fontSize="xs" color="fg.muted">{stat.label}</Text>
              </HStack>
              <Text fontSize="2xl" fontWeight="bold">{stat.value}</Text>
            </Box>
          ))}
        </SimpleGrid>

        {/* Quick Links */}
        <Heading size="md" mb={4}>Quick Actions</Heading>
        <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
          {QUICK_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <Box
                p={5}
                borderWidth="1px"
                borderRadius="xl"
                bg="bg.subtle"
                textAlign="center"
                _hover={{ borderColor: "green.400", shadow: "sm" }}
                transition="all 0.2s"
                cursor="pointer"
              >
                <Text fontSize="2xl" mb={2}>{link.emoji}</Text>
                <Text fontSize="sm" fontWeight="medium">{link.label}</Text>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
