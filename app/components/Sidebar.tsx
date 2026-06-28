import {
  Box,
  VStack,
  Image,
  Heading,
  Link,
  Stack,
  IconButton,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";

import { Tooltip } from "../../components/ui/tooltip";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FaGoogleScholar, FaOrcid, FaArrowDown } from "react-icons/fa6";

import { withBase } from "../../src/utils/basePath";

const INK = "#0E2A2E"; // deep clinical teal-ink
const AMBER = "#E8A23D"; // warm amber accent
const PAPER = "#FBF7EF"; // warm paper

const RESEARCH_AREAS = [
  "Medical AI",
  "Deep Learning",
  "Computer Vision",
  "Explainable AI",
];

const PROFILES = [
  {
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?user=-kB49IMAAAAJ",
    icon: FaGoogleScholar,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/manel-mili-574b76414/",
    icon: FaLinkedinIn,
  },
  {
    label: "ORCID",
    href: "https://orcid.org/0000-0003-3892-8579",
    icon: FaOrcid,
  },
  {
    label: "GitHub",
    href: "https://github.com/Manel-Mili",
    icon: FaGithub,
  },
];

export default function Sidebar() {
  return (
    <Box
      as="aside"
      w={{ base: "full", md: "340px" }}
      position={{ md: "sticky" }}
      top="96px"
      h="fit-content"
      bg={PAPER}
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="0 1px 2px rgba(14,42,46,0.08), 0 24px 48px -20px rgba(14,42,46,0.45)"
    >
      {/* ── Ink header ───────────────────────────── */}
      <Box bg={INK} pt={9} pb={8} px={8} position="relative">
        {/* amber hairline at the very top */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          h="4px"
          bg={AMBER}
        />

        <VStack gap={5}>
          <Box position="relative">
            <Image
              src={withBase("/manel-mili.webp")}
              alt="Manel Mili"
              boxSize="150px"
              objectFit="cover"
              rounded="full"
              border="3px solid"
              borderColor={AMBER}
              boxShadow="0 10px 30px -8px rgba(0,0,0,0.55)"
            />
          </Box>

          <VStack gap={2}>
            <Heading
              as="h1"
              textAlign="center"
              color="white"
              fontWeight="bold"
              letterSpacing="-0.03em"
              lineHeight="1"
              fontSize="34px"
            >
              Manel Mili
            </Heading>

            {/* amber rule */}
            <Box w="40px" h="2px" bg={AMBER} borderRadius="full" />

            <Text
              color="whiteAlpha.800"
              fontSize="xs"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="0.18em"
              textAlign="center"
            >
              AI Researcher · PhD Candidate
            </Text>
          </VStack>
        </VStack>
      </Box>

      {/* ── Paper body ───────────────────────────── */}
      <VStack gap={0} align="stretch" px={8} pt={7} pb={9}>
        {/* Research statement */}
        <Text
          color={INK}
          textAlign="center"
          fontSize="sm"
          lineHeight="1.7"
          fontStyle="italic"
        >
          Building explainable, multimodal AI for medical imaging — with a focus
          on precision oncology.
        </Text>

        {/* Research areas */}
        <HStack flexWrap="wrap" justify="center" gap={2} mt={6}>
          {RESEARCH_AREAS.map((area) => (
            <Box
              key={area}
              px={3}
              py={1}
              borderRadius="full"
              border="1px solid"
              borderColor="blackAlpha.200"
              fontSize="11px"
              fontWeight="semibold"
              letterSpacing="0.02em"
              color={INK}
            >
              {area}
            </Box>
          ))}
        </HStack>

        {/* Divider label */}
        <SectionLabel>Affiliation</SectionLabel>

        <VStack gap={0.5} align="center">
          <Text fontWeight="bold" textAlign="center" lineHeight="1.4" color={INK}>
            Laboratory of Medical Technologies &amp; Imaging
          </Text>
          <Text color="gray.600" fontSize="sm">
            University of Monastir
          </Text>
          <Text color="gray.500" fontSize="sm">
            Monastir, Tunisia
          </Text>
        </VStack>

        <SectionLabel>Contact</SectionLabel>

        <VStack gap={1} align="center">
          <Link
            href="mailto:manel.mili@isimm.u-monastir.tn"
            fontSize="sm"
            fontWeight="semibold"
            color={INK}
            _hover={{ color: AMBER }}
          >
            manel.mili@isimm.u-monastir.tn
            milimanel62@gmail.com
          </Link>
        </VStack>

        {/* CV button */}
        <Link
          href={withBase("/CV_Manel_Mili.pdf")}
          target="_blank"
          textDecoration="none"
          mt={7}
        >
          <Button
            w="full"
            size="lg"
            borderRadius="full"
            bg={INK}
            color="white"
            fontWeight="semibold"
            _hover={{ bg: "#143A40" }}
          >
            <HStack gap={2}>
              <FaArrowDown />
              <Text>Download CV</Text>
            </HStack>
          </Button>
        </Link>

        {/* Profiles */}
        <Stack direction="row" gap={2} justify="center" mt={6}>
          {PROFILES.map(({ label, href, icon: Icon }) => (
            <Tooltip key={label} content={label}>
              <Link href={href} target="_blank">
                <IconButton
                  aria-label={label}
                  variant="outline"
                  borderRadius="full"
                  size="sm"
                  borderColor="blackAlpha.200"
                  color={INK}
                  _hover={{ bg: INK, color: "white", borderColor: INK }}
                >
                  <Icon />
                </IconButton>
              </Link>
            </Tooltip>
          ))}
        </Stack>
      </VStack>
    </Box>
  );
}

/* Small caps section label with amber tick */
function SectionLabel({ children }) {
  return (
    <HStack justify="center" gap={2} mt={7} mb={3}>
      <Box w="6px" h="6px" bg={AMBER} borderRadius="full" />
      <Text
        fontSize="xs"
        textTransform="uppercase"
        letterSpacing="0.16em"
        color="gray.500"
        fontWeight="bold"
      >
        {children}
      </Text>
    </HStack>
  );
}
