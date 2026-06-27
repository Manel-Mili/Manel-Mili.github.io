import {
  Box,
  VStack,
  Image,
  Heading,
  Link,
  Stack,
  IconButton,
  Text,
  Badge,
  Button,
  HStack,
  Separator,
} from "@chakra-ui/react";

import { Tooltip } from "../../components/ui/tooltip";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FaGoogleScholar, FaOrcid, FaDownload } from "react-icons/fa6";

import { withBase } from "../../src/utils/basePath";

const RESEARCH_AREAS = [
  "Medical AI",
  "Deep Learning",
  "Computer Vision",
  "Explainable AI",
];

export default function Sidebar() {
  return (
    <Box
      as="aside"
      w={{ base: "full", md: "340px" }}
      position={{ md: "sticky" }}
      top="96px"
      h="fit-content"
      bg="white"
      px={9}
      py={10}
      borderRadius="3xl"
      boxShadow="0 1px 3px rgba(15, 23, 42, 0.04), 0 12px 40px rgba(15, 23, 42, 0.06)"
      border="1px solid"
      borderColor="gray.100"
    >
      <VStack gap={0} align="stretch">
        {/* Portrait */}
        <Box position="relative" alignSelf="center" mb={6}>
          <Box
            position="absolute"
            inset="-6px"
            borderRadius="full"
            bgGradient="linear(to-br, blue.100, purple.50)"
            filter="blur(2px)"
          />
          <Image
            src={withBase("/manel-mili.webp")}
            alt="Manel Mili"
            boxSize="172px"
            objectFit="cover"
            rounded="full"
            position="relative"
            border="4px solid white"
            boxShadow="0 8px 24px rgba(15, 23, 42, 0.12)"
          />
        </Box>

        {/* Identity */}
        <VStack gap={1.5} mb={5}>
          <Heading
            as="h1"
            size="2xl"
            textAlign="center"
            letterSpacing="-0.02em"
            fontWeight="bold"
          >
            Manel Mili
          </Heading>

          <Text
            fontSize="sm"
            color="blue.600"
            fontWeight="semibold"
            textTransform="uppercase"
            letterSpacing="0.08em"
            textAlign="center"
          >
            AI Researcher · PhD Candidate
          </Text>
        </VStack>

        {/* Research focus */}
        <Text
          color="gray.600"
          textAlign="center"
          fontSize="sm"
          lineHeight="1.7"
          maxW="260px"
          alignSelf="center"
        >
          Building explainable, multimodal AI for medical imaging — with a focus
          on precision oncology.
        </Text>

        {/* Research areas */}
        <HStack flexWrap="wrap" justify="center" gap={2} mt={5}>
          {RESEARCH_AREAS.map((area) => (
            <Badge
              key={area}
              variant="subtle"
              colorPalette="gray"
              borderRadius="full"
              px={3}
              py={1}
              fontWeight="medium"
              fontSize="xs"
            >
              {area}
            </Badge>
          ))}
        </HStack>

        <Separator my={7} borderColor="gray.100" />

        {/* Affiliation */}
        <VStack gap={0.5} align="center">
          <Text
            fontSize="xs"
            textTransform="uppercase"
            letterSpacing="0.08em"
            color="gray.400"
            fontWeight="semibold"
            mb={1}
          >
            Affiliation
          </Text>
          <Text fontWeight="semibold" textAlign="center" lineHeight="1.4">
            Laboratory of Medical Technologies &amp; Imaging
          </Text>
          <Text color="gray.600" fontSize="sm">
            University of Monastir
          </Text>
          <Text color="gray.400" fontSize="sm">
            Monastir, Tunisia
          </Text>
        </VStack>

        {/* Contact */}
        <VStack gap={1} align="center" mt={5}>
          <Link
            href="mailto:manel.mili@isimm.u-monastir.tn"
            color="blue.600"
            fontSize="sm"
            fontWeight="medium"
          >
            manel.mili@isimm.u-monastir.tn
          </Link>
          <Text color="gray.400" fontSize="sm">
            +216 58 621 270
          </Text>
        </VStack>

        {/* CV */}
        <Link
          href={withBase("/CV_Manel_Mili.pdf")}
          target="_blank"
          textDecoration="none"
          mt={7}
        >
          <Button w="full" size="lg" borderRadius="xl">
            <HStack gap={2}>
              <FaDownload />
              <Text>Download CV</Text>
            </HStack>
          </Button>
        </Link>

        {/* Profiles */}
        <Stack direction="row" gap={2} justify="center" mt={6}>
          <Tooltip content="Google Scholar">
            <Link
              href="https://scholar.google.com/citations?user=-kB49IMAAAAJ"
              target="_blank"
            >
              <IconButton
                aria-label="Google Scholar"
                variant="ghost"
                borderRadius="full"
                size="sm"
              >
                <FaGoogleScholar />
              </IconButton>
            </Link>
          </Tooltip>

          <Tooltip content="LinkedIn">
            <Link
              href="https://www.linkedin.com/in/manel-mili-574b76414/"
              target="_blank"
            >
              <IconButton
                aria-label="LinkedIn"
                variant="ghost"
                borderRadius="full"
                size="sm"
              >
                <FaLinkedinIn />
              </IconButton>
            </Link>
          </Tooltip>

          <Tooltip content="ORCID">
            <Link href="https://orcid.org/0000-0003-3892-8579" target="_blank">
              <IconButton
                aria-label="ORCID"
                variant="ghost"
                borderRadius="full"
                size="sm"
              >
                <FaOrcid />
              </IconButton>
            </Link>
          </Tooltip>

          <Tooltip content="GitHub">
            <Link href="https://github.com/Manel-Mili" target="_blank">
              <IconButton
                aria-label="GitHub"
                variant="ghost"
                borderRadius="full"
                size="sm"
              >
                <FaGithub />
              </IconButton>
            </Link>
          </Tooltip>
        </Stack>
      </VStack>
    </Box>
  );
}
