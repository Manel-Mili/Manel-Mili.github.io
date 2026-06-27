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
} from "@chakra-ui/react";

import { Tooltip } from "../../components/ui/tooltip";

import {
  FaGoogleScholar,
  FaLinkedinIn,
  FaOrcid,
  FaGithub,
  FaDownload,
} from "react-icons/fa";

import { withBase } from "../../src/utils/basePath";

export default function Sidebar() {
  return (
    <Box
      w={{ base: "full", md: "320px" }}
      position={{ md: "sticky" }}
      top="90px"
      h="fit-content"
      bg="white"
      p={8}
      borderRadius="2xl"
      boxShadow="xl"
      border="1px solid"
      borderColor="gray.100"
    >
      <VStack gap={4}>
        {/* Photo */}
        <Image
          src={withBase("/manel-mili.webp")}
          alt="Manel Mili"
          boxSize="180px"
          objectFit="cover"
          rounded="full"
          border="5px solid"
          borderColor="blue.100"
          boxShadow="lg"
        />

        {/* Name */}
        <Heading
          as="h1"
          size="2xl"
          textAlign="center"
        >
          Manel Mili
        </Heading>

        {/* Title */}
        <Text
          fontSize="lg"
          color="blue.500"
          fontWeight="bold"
          textAlign="center"
        >
          AI Researcher & PhD Candidate
        </Text>

        {/* Research statement */}
        <Text
          color="gray.600"
          textAlign="center"
          fontSize="sm"
          mt={2}
        >
          Developing explainable and multimodal AI methods for medical
          image analysis and precision oncology.
        </Text>

        {/* Badges */}
        <HStack wrap="wrap" justify="center" mt={2}>
          <Badge colorScheme="blue">Medical AI</Badge>
          <Badge colorScheme="green">Deep Learning</Badge>
          <Badge colorScheme="purple">Computer Vision</Badge>
          <Badge colorScheme="orange">Explainable AI</Badge>
        </HStack>

        {/* Information */}
        <VStack gap={1} mt={5}>
          <Text fontWeight="bold">
            Laboratory of Medical Technologies and Imaging
          </Text>

          <Text>
            University of Monastir
          </Text>

          <Text color="gray.500">
            Monastir, Tunisia
          </Text>
        </VStack>

        {/* Email */}
        <Link
          href="mailto:manel.mili@isimm.u-monastir.tn"
          color="blue.500"
          mt={4}
        >
          manel.mili@isimm.u-monastir.tn
        </Link>

        {/* Phone */}
        <Text color="gray.500">
          +216 58 621 270
        </Text>

        {/* Download CV */}
        <Button
          mt={5}
          colorScheme="blue"
          leftIcon={<FaDownload />}
          as="a"
          href={withBase("/CV_Manel_Mili.pdf")}
          target="_blank"
          size="md"
          borderRadius="full"
        >
          Download CV
        </Button>

        {/* Social Icons */}
        <Stack
          mt={6}
          direction="row"
          gap={3}
          flexWrap="wrap"
          justifyContent="center"
        >
          <Tooltip content="Google Scholar">
            <Link
              href="https://scholar.google.com/citations?user=-kB49IMAAAAJ"
              target="_blank"
            >
              <IconButton
                aria-label="Google Scholar"
                borderRadius="full"
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
                borderRadius="full"
              >
                <FaLinkedinIn />
              </IconButton>
            </Link>
          </Tooltip>

          <Tooltip content="ORCID">
            <Link
              href="https://orcid.org/0000-0003-3892-8579"
              target="_blank"
            >
              <IconButton
                aria-label="ORCID"
                borderRadius="full"
              >
                <FaOrcid />
              </IconButton>
            </Link>
          </Tooltip>

          <Tooltip content="GitHub">
            <Link
              href="https://github.com/Manel-Mili"
              target="_blank"
            >
              <IconButton
                aria-label="GitHub"
                borderRadius="full"
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
