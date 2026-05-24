import {
  Box,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { MapPin, ArrowRight, Search, MessageCircle, Handshake, Store } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/shared/navbar";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

const NEIGHBORHOODS = [
  { slug: "kimironko", name: "Kimironko", emoji: "🛒", description: "Kigali's biggest market hub", tag: "Most popular" },
  { slug: "remera", name: "Remera", emoji: "🏙️", description: "Fashion, lifestyle & boutiques" },
  { slug: "nyabugogo", name: "Nyabugogo", emoji: "🥬", description: "Fresh produce every morning" },
  { slug: "gikondo", name: "Gikondo", emoji: "⚡", description: "Electronics & tech goods" },
  { slug: "kacyiru", name: "Kacyiru", emoji: "🏛️", description: "Premium shops & services" },
  { slug: "muhima", name: "Muhima", emoji: "🍢", description: "Street food & everyday essentials" },
];

const STEPS = [
  {
    icon: Search,
    step: "01",
    title: "Browse your neighborhood",
    desc: "Find products and shops near you. Photos, descriptions, vendor info — all in one feed.",
  },
  {
    icon: MessageCircle,
    step: "02",
    title: 'Tap "Chat on WhatsApp"',
    desc: "One tap opens a pre-written WhatsApp message to the vendor. No account needed.",
  },
  {
    icon: Handshake,
    step: "03",
    title: "Deal directly, your way",
    desc: "Discuss price, quantity, and delivery straight with the vendor. Pay how you like.",
  },
];

const STATS = [
  { value: "6", label: "Neighborhoods" },
  { value: "500+", label: "Local vendors" },
  { value: "0", label: "Commission fees" },
  { value: "1 tap", label: "To connect" },
];

export default function HomePage() {
  return (
    <Box minH="100vh" bg="#FAFAF7" fontFamily="var(--font-roboto)">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-7px); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1);    }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }
        .fade-up   { animation: fadeUp 0.65s ease both; }
        .fade-up-1 { animation: fadeUp 0.65s 0.1s ease both; }
        .fade-up-2 { animation: fadeUp 0.65s 0.2s ease both; }
        .fade-up-3 { animation: fadeUp 0.65s 0.32s ease both; }
        .fade-up-4 { animation: fadeUp 0.65s 0.44s ease both; }
        .float     { animation: float 3.5s ease-in-out infinite; }
        .pulse-dot { animation: pulseDot 1.6s ease-in-out infinite; }

        .n-card { transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease; }
        .n-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(0,0,0,0.08); border-color: #16a34a !important; }
        .n-card:hover .n-arrow { transform: translateX(4px); }
        .n-arrow { transition: transform 0.2s ease; display: inline-flex; align-items: center; }

        .wa-pill { transition: all 0.18s ease; }
        .wa-pill:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(37,211,102,0.3); }
      `}</style>

      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <Box
        position="relative"
        overflow="hidden"
        pt={{ base: 14, md: 22 }}
        pb={{ base: 18, md: 26 }}
        px={{ base: 5, md: 10 }}
      >
        {/* dot grid background */}
        <Box
          position="absolute"
          top={0} right={0} bottom={0} left={0}
          opacity={0.04}
          backgroundImage="radial-gradient(circle, #16a34a 1px, transparent 1px)"
          backgroundSize="28px 28px"
          pointerEvents="none"
        />
        {/* green glow top-right */}
        <Box
          position="absolute"
          top="-120px" right="-100px"
          w="480px" h="480px"
          borderRadius="full"
          bg="green.400"
          opacity={0.07}
          filter="blur(90px)"
          pointerEvents="none"
        />

        <Box maxW="6xl" mx="auto" position="relative">
          <Flex direction={{ base: "column", lg: "row" }} align="center" gap={{ base: 14, lg: 10 }}>

            {/* Left */}
            <VStack align="start" gap={7} flex={1}>

              {/* live badge */}
              <Flex
                align="center" gap={2}
                px={3} py={1.5}
                bg="green.50"
                borderWidth="1px" borderColor="green.200"
                borderRadius="full"
                className="fade-up"
              >
                <Box w={2} h={2} borderRadius="full" bg="green.500" className="pulse-dot" />
                <Text fontSize="xs" fontWeight="700" color="green.700" letterSpacing="0.08em" textTransform="uppercase">
                  Live in Kigali · Rwanda 🇷🇼
                </Text>
              </Flex>

              {/* headline */}
              <Heading
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight="900"
                lineHeight="1.08"
                color="#111827"
                className="fade-up-1"
              >
                Browse Local.{" "}
                <Text as="span" color="green.600">Buy on</Text>{" "}
                <Flex as="span" align="center" gap={2} display="inline-flex" flexWrap="wrap">
                  <Text as="span" color="#25D366">WhatsApp.</Text>
                </Flex>
              </Heading>

              {/* sub */}
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="#4b5563"
                maxW="md"
                lineHeight="1.75"
                className="fade-up-2"
              >
                Discover products from trusted vendors in your Kigali neighborhood.
                One tap connects you directly — no accounts, no apps, no middleman.
              </Text>

              {/* CTAs */}
              <HStack gap={3} flexWrap="wrap" className="fade-up-3">
                <Link href="#neighborhoods">
                  <Flex
                    align="center" gap={2}
                    px={6} py={3}
                    bg="green.600"
                    color="white"
                    borderRadius="xl"
                    fontWeight="700"
                    fontSize="sm"
                    _hover={{ bg: "green.700" }}
                    transition="all 0.18s"
                    cursor="pointer"
                  >
                    <MapPin size={15} />
                    <Text>Browse neighborhoods</Text>
                  </Flex>
                </Link>
                <Link href="/vendor/onboarding">
                  <Flex
                    align="center" gap={2}
                    px={6} py={3}
                    bg="white"
                    color="#111827"
                    borderWidth="1.5px"
                    borderColor="#e5e7eb"
                    borderRadius="xl"
                    fontWeight="700"
                    fontSize="sm"
                    _hover={{ borderColor: "green.400" }}
                    transition="all 0.18s"
                    cursor="pointer"
                    shadow="sm"
                  >
                    <Store size={15} />
                    <Text>List your shop</Text>
                  </Flex>
                </Link>
              </HStack>
            </VStack>

            {/* Right — phone mockup */}
            <Box
              flex="0 0 auto"
              w={{ base: "full", sm: "320px", lg: "360px" }}
              mx={{ base: "auto", lg: 0 }}
              className="fade-up-4"
            >
              <Box position="relative">
                {/* product card */}
                <Box
                  bg="white"
                  borderRadius="2xl"
                  shadow="2xl"
                  overflow="hidden"
                  borderWidth="1px"
                  borderColor="#f0f0f0"
                  className="float"
                >
                  <Box
                    h="180px"
                    bgGradient="to-br"
                    gradientFrom="green.100"
                    gradientTo="emerald.50"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="5xl"
                    position="relative"
                  >
                    🥦
                    <Badge
                      position="absolute"
                      top={3} left={3}
                      bg="#25D366"
                      color="white"
                      borderRadius="full"
                      fontSize="xs"
                      fontWeight="700"
                      px={2} py={0.5}
                    >
                      Available
                    </Badge>
                  </Box>
                  <Box p={4}>
                    <Text fontWeight="700" fontSize="md" color="#111827" mb={0.5}>
                      Fresh Vegetables · Mixed basket
                    </Text>
                    <Text fontSize="sm" color="#6b7280" mb={4}>
                      Mama Joselyne · Kimironko Market
                    </Text>
                    {/* WhatsApp button */}
                    <a href="#" style={{ display: "block", width: "100%", textDecoration: "none" }}>
                      <Flex
                        align="center"
                        justify="center"
                        gap={2}
                        w="full"
                        py={3}
                        bg="#25D366"
                        color="white"
                        borderRadius="xl"
                        fontWeight="700"
                        fontSize="sm"
                        cursor="pointer"
                      >
                        <WhatsAppIcon size={16} color="white" />
                        Chat on WhatsApp
                      </Flex>
                    </a>
                  </Box>
                </Box>

                {/* floating badge — vendor replied */}
                <Box
                  position="absolute"
                  top="-14px" right="-14px"
                  bg="white"
                  borderRadius="xl"
                  shadow="lg"
                  p={3}
                  borderWidth="1px"
                  borderColor="#f0f0f0"
                >
                  <HStack gap={2}>
                    <Box
                      w={8} h={8}
                      bg="#dcfce7"
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="sm"
                    >
                      💬
                    </Box>
                    <VStack align="start" gap={0}>
                      <Text fontSize="xs" fontWeight="700" color="#111827">Vendor replied!</Text>
                      <Text fontSize="xs" color="#6b7280">2 min ago</Text>
                    </VStack>
                  </HStack>
                </Box>

                {/* floating no-middleman badge */}
                <Box
                  position="absolute"
                  bottom="-10px" left="-14px"
                  bg="#111827"
                  borderRadius="xl"
                  shadow="md"
                  px={3} py={2}
                >
                  <HStack gap={1.5}>
                    <Text fontSize="sm">🤝</Text>
                    <VStack align="start" gap={0}>
                      <Text fontSize="xs" fontWeight="700" color="white">No middleman</Text>
                      <Text fontSize="xs" color="rgba(255,255,255,0.5)">Deal direct</Text>
                    </VStack>
                  </HStack>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>

      {/* ── STATS BAR ──────────────────────────────────── */}
      <Box bg="white" borderTopWidth="1px" borderBottomWidth="1px" borderColor="#f3f4f6" py={8} px={{ base: 5, md: 10 }}>
        <SimpleGrid columns={{ base: 2, md: 4 }} maxW="4xl" mx="auto">
          {STATS.map((s, i) => (
            <Box
              key={s.label}
              textAlign="center"
              py={4}
              borderRightWidth={{ base: i % 2 === 0 ? "1px" : "0", md: i < 3 ? "1px" : "0" }}
              borderColor="#f3f4f6"
            >
              <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="900" color="green.600">
                {s.value}
              </Text>
              <Text fontSize="sm" color="#9ca3af" mt={0.5}>{s.label}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* ── HOW IT WORKS ───────────────────────────────── */}
      <Box bg="#111827" py={{ base: 16, md: 24 }} px={{ base: 5, md: 10 }}>
        <Box maxW="6xl" mx="auto">
          <VStack gap={3} mb={14} textAlign="center">
            <Badge colorPalette="green" variant="subtle" fontSize="xs" px={3} py={1} borderRadius="full">
              How it works
            </Badge>
            <Heading fontSize={{ base: "3xl", md: "4xl" }} fontWeight="900" color="white">
              No apps. No accounts. Just WhatsApp.
            </Heading>
            <Text color="rgba(255,255,255,0.5)" fontSize="md" maxW="md">
              We connect you with vendors — the rest happens on WhatsApp, the way you already shop.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={5}>
            {STEPS.map((step, i) => (
              <Box
                key={step.step}
                p={8}
                borderRadius="2xl"
                borderWidth="1px"
                borderColor="rgba(255,255,255,0.07)"
                bg="rgba(255,255,255,0.03)"
                position="relative"
                overflow="hidden"
                _hover={{ bg: "rgba(255,255,255,0.06)" }}
                transition="background 0.2s"
              >
                <Text
                  fontSize="8xl"
                  fontWeight="900"
                  color="rgba(255,255,255,0.03)"
                  position="absolute"
                  top="-16px" right="12px"
                  lineHeight="1"
                  userSelect="none"
                  pointerEvents="none"
                >
                  {step.step}
                </Text>

                <Box
                  w={12} h={12}
                  bg={i === 1 ? "rgba(37,211,102,0.15)" : "rgba(22,163,74,0.12)"}
                  borderRadius="xl"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb={5}
                >
                  {i === 1
                    ? <WhatsAppIcon size={22} color="#25D366" />
                    : <step.icon size={22} color="#4ade80" />
                  }
                </Box>

                <Text fontSize="xl" fontWeight="700" color="white" mb={3} lineHeight="1.3">
                  {step.title}
                </Text>
                <Text fontSize="sm" color="rgba(255,255,255,0.45)" lineHeight="1.75">
                  {step.desc}
                </Text>

                {i < 2 && (
                  <Box
                    display={{ base: "none", md: "flex" }}
                    position="absolute"
                    right="-20px" top="50%"
                    transform="translateY(-50%)"
                    zIndex={1}
                    color="rgba(255,255,255,0.15)"
                    pointerEvents="none"
                  >
                    <ArrowRight size={20} />
                  </Box>
                )}
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      {/* ── NEIGHBORHOODS ──────────────────────────────── */}
      <Box id="neighborhoods" py={{ base: 16, md: 24 }} px={{ base: 5, md: 10 }} bg="#FAFAF7">
        <Box maxW="6xl" mx="auto">
          <Flex
            direction={{ base: "column", md: "row" }}
            align={{ base: "start", md: "end" }}
            justify="space-between"
            mb={10} gap={4}
          >
            <VStack align="start" gap={2}>
              <HStack color="#9ca3af">
                <MapPin size={14} />
                <Text fontSize="xs" fontWeight="700" textTransform="uppercase" letterSpacing="0.1em">
                  Kigali, Rwanda
                </Text>
              </HStack>
              <Heading fontSize={{ base: "3xl", md: "4xl" }} fontWeight="900" color="#111827">
                Where are you shopping?
              </Heading>
            </VStack>
            <Text fontSize="sm" color="#6b7280" maxW="xs" textAlign={{ base: "left", md: "right" }}>
              Pick your neighborhood to browse local shops and connect with vendors on WhatsApp.
            </Text>
          </Flex>

          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={5}>
            {NEIGHBORHOODS.map((n) => (
              <Link key={n.slug} href={`/${n.slug}`}>
                <Box
                  className="n-card"
                  p={6}
                  bg="white"
                  borderRadius="2xl"
                  borderWidth="1.5px"
                  borderColor="#e5e7eb"
                  cursor="pointer"
                  position="relative"
                  overflow="hidden"
                  h="full"
                >
                  {n.tag && (
                    <Badge
                      position="absolute" top={4} right={4}
                      colorPalette="green" variant="subtle"
                      fontSize="xs" borderRadius="full"
                    >
                      {n.tag}
                    </Badge>
                  )}
                  <Text fontSize="3xl" mb={4}>{n.emoji}</Text>
                  <Heading fontSize="xl" fontWeight="700" color="#111827" mb={2}>
                    {n.name}
                  </Heading>
                  <Text fontSize="sm" color="#6b7280" mb={5} lineHeight="1.6">
                    {n.description}
                  </Text>
                  <HStack color="green.600" fontSize="sm" fontWeight="700">
                    <Text>Browse vendors</Text>
                    <Box className="n-arrow"><ArrowRight size={14} /></Box>
                  </HStack>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      {/* ── VENDOR CTA ─────────────────────────────────── */}
      <Box py={{ base: 12, md: 16 }} px={{ base: 5, md: 10 }} bg="#FAFAF7">
        <Box maxW="6xl" mx="auto">
          <Box
            bg="#111827"
            borderRadius="3xl"
            px={{ base: 8, md: 16 }}
            py={{ base: 12, md: 16 }}
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              top={0} right={0} bottom={0} left={0}
              opacity={0.04}
              backgroundImage="radial-gradient(circle, white 1px, transparent 1px)"
              backgroundSize="22px 22px"
              pointerEvents="none"
            />
            <Box
              position="absolute"
              bottom="-80px" right="-80px"
              w="300px" h="300px"
              borderRadius="full"
              bg="#25D366"
              opacity={0.08}
              filter="blur(80px)"
              pointerEvents="none"
            />

            <Flex
              direction={{ base: "column", md: "row" }}
              align="center"
              justify="space-between"
              gap={8}
              position="relative"
            >
              <VStack align={{ base: "center", md: "start" }} gap={3} textAlign={{ base: "center", md: "left" }}>
                <Flex
                  align="center" gap={2}
                  px={3} py={1}
                  bg="rgba(255,255,255,0.08)"
                  borderRadius="full"
                  w="fit-content"
                >
                  <WhatsAppIcon size={13} color="#25D366" />
                  <Text fontSize="xs" color="rgba(255,255,255,0.7)" fontWeight="700" textTransform="uppercase" letterSpacing="0.08em">
                    For vendors
                  </Text>
                </Flex>
                <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="900" color="white" lineHeight="1.2">
                  Your customers are already
                  <br />
                  on WhatsApp. Meet them there.
                </Heading>
                <Text color="rgba(255,255,255,0.5)" fontSize="md" maxW="sm">
                  List your products with photos. Buyers discover you. They chat you directly.
                  Simple as that.
                </Text>
              </VStack>

              <Link href="/vendor/onboarding">
                <Flex
                  align="center" gap={2.5}
                  px={7} py={4}
                  bg="#25D366"
                  color="white"
                  fontWeight="800"
                  fontSize="md"
                  borderRadius="2xl"
                  cursor="pointer"
                  whiteSpace="nowrap"
                  shadow="lg"
                  _hover={{ bg: "#20b958" }}
                  transition="all 0.18s"
                >
                  <WhatsAppIcon size={18} color="white" />
                  List your shop free
                </Flex>
              </Link>
            </Flex>
          </Box>
        </Box>
      </Box>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <Box bg="#111827" py={10} px={{ base: 5, md: 10 }}>
        <Box maxW="6xl" mx="auto">
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            gap={4}
          >
            <HStack gap={2}>
              <WhatsAppIcon size={18} color="#4ade80" />
              <Text fontWeight="900" fontSize="lg" color="white">
                MyStore<Text as="span" color="#25D366">RW</Text>
              </Text>
            </HStack>
            <Text fontSize="sm" color="rgba(255,255,255,0.3)" textAlign="center">
              Browse local. Buy on WhatsApp. · Kigali, Rwanda 🇷🇼
            </Text>
            <Text fontSize="xs" color="rgba(255,255,255,0.18)">
              © 2026 MyStore RW
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
