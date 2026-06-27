"use client";

import {
  For,
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Link,
  SimpleGrid,
} from "@chakra-ui/react";
import Hero from "./components/Hero";
import Sidebar from "./components/Sidebar";
import researchData from "../src/data/research.json";
import pubsData from "../src/data/pubs.json";
import procsData from "../src/data/procs.json";
import booksData from "../src/data/books.json";
import projectsData from "../src/data/projects.json";
import edusData from "../src/data/edus.json";
import expsData from "../src/data/exps.json";
import serviceData from "../src/data/service.json";
import skillsData from "../src/data/skills.json";
import certsData from "../src/data/certs.json";

const OWNER = "Mili, M.";
const PUB_STUBS = ["pubs", "procs", "books"];
const PREFIX: Record<string, string> = { pubs: "J", procs: "C", books: "B" };

// short clinical codes shown in the mono header strip per section
const CODE: Record<string, string> = {
  research: "RES",
  projects: "PRJ",
  edus: "EDU",
  exps: "EXP",
  service: "SVC",
  skills: "SKL",
  certs: "CRT",
};

const INK = "#0E2A2E";
const INK2 = "#143A40";
const AMBER = "#E8A23D";
const MONO = "'JetBrains Mono', 'SF Mono', 'Roboto Mono', monospace";

// faint scan-line texture as a CSS gradient (no asset needed)
const SCANLINES =
  "repeating-linear-gradient(0deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 4px)";

export default function Page() {
  return (
    <Container maxW="container.xl" py={8}>
      <Flex direction={{ base: "column", md: "row" }} gap={8}>
        <Sidebar />

        <Box w={{ base: "full", md: "3/4" }}>
          <Hero />

          <For
            each={[
              "research",
              "pubs",
              "procs",
              "books",
              "projects",
              "edus",
              "exps",
              "service",
              "skills",
              "certs",
            ]}
          >
            {(stub) => {
              const data = (() => {
                switch (stub) {
                  case "research":
                    return researchData;
                  case "pubs":
                    return pubsData;
                  case "procs":
                    return procsData;
                  case "books":
                    return booksData;
                  case "projects":
                    return projectsData;
                  case "edus":
                    return edusData;
                  case "exps":
                    return expsData;
                  case "service":
                    return serviceData;
                  case "skills":
                    return skillsData;
                  case "certs":
                    return certsData;
                  default:
                    return null;
                }
              })();
              return data ? <Section key={stub} data={data} stub={stub} /> : <></>;
            }}
          </For>
        </Box>
      </Flex>
    </Container>
  );
}

// Bold the owner's name within an author string
const renderAuthors = (authors: string) => {
  if (!authors.includes(OWNER)) return authors;
  const segments = authors.split(OWNER);
  return segments.map((segment: string, i: number) => (
    <span key={i}>
      {segment}
      {i < segments.length - 1 && <strong>{OWNER}</strong>}
    </span>
  ));
};

/* ── Section header: clinical readout style ───────────── */
const SectionHeader = ({ title, code }: { title: string; code?: string }) => (
  <Flex align="center" gap={3} mb={6}>
    {code && (
      <Box
        fontFamily={MONO}
        fontSize="11px"
        fontWeight="bold"
        letterSpacing="0.1em"
        color="white"
        bg={INK}
        px={2.5}
        py={1}
        borderRadius="md"
      >
        {code}
      </Box>
    )}
    <Heading as="h3" size="xl" fontWeight="bold" color={INK} letterSpacing="-0.02em">
      {title}
    </Heading>
    {/* dashed clinical rule */}
    <Box
      flex="1"
      h="0"
      borderTop="1px dashed"
      borderColor="blackAlpha.300"
    />
  </Flex>
);

// Reusable Section Component
const Section = ({ data, stub }: { data: any; stub: string }) => {
  const isPub = PUB_STUBS.includes(stub);

  return (
    <Box py={8}>
      <SectionHeader title={data.title} code={CODE[stub]} />

      {isPub ? (
        <PublicationList data={data} stub={stub} />
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
          <For each={data.items}>
            {(item: any, idx: number) => (
              <SpecimenPlate
                key={idx}
                code={CODE[stub] || "ITM"}
                index={idx + 1}
                total={data.items.length}
                heading={item.institution || item.title || item.name}
                marker={item.year || item.date || item.period}
                details={item.details}
              />
            )}
          </For>
        </SimpleGrid>
      )}
    </Box>
  );
};

/* ════════════════════════════════════════════════════════
   SPECIMEN PLATE — ink panel, scan-lines, mono data header
   ════════════════════════════════════════════════════════ */
const SpecimenPlate = ({
  code,
  index,
  total,
  heading,
  marker,
  details,
}: {
  code: string;
  index: number;
  total: number;
  heading: string;
  marker?: string;
  details?: any[];
}) => {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <Box
      position="relative"
      borderRadius="xl"
      overflow="hidden"
      bg={INK}
      color="white"
      border="1px solid"
      borderColor="blackAlpha.400"
      transition="all 0.2s ease"
      _hover={{
        transform: "translateY(-3px)",
        boxShadow: "0 18px 36px -18px rgba(14,42,46,0.7)",
      }}
    >
      {/* scan-line overlay */}
      <Box
        position="absolute"
        inset={0}
        bg={SCANLINES}
        pointerEvents="none"
        opacity={0.6}
      />
      {/* amber corner crosshair */}
      <Box
        position="absolute"
        top="10px"
        right="10px"
        w="14px"
        h="14px"
        pointerEvents="none"
      >
        <Box position="absolute" top="6px" left={0} right={0} h="1px" bg={AMBER} opacity={0.8} />
        <Box position="absolute" left="6px" top={0} bottom={0} w="1px" bg={AMBER} opacity={0.8} />
      </Box>

      {/* mono data header strip */}
      <Flex
        position="relative"
        align="center"
        justify="space-between"
        px={4}
        py={2}
        borderBottom="1px solid"
        borderColor="whiteAlpha.200"
        bg={INK2}
        fontFamily={MONO}
        fontSize="10px"
        letterSpacing="0.08em"
        color="whiteAlpha.700"
      >
        <Text>
          {code}-{pad(index)} / {pad(total)}
        </Text>
        {marker && <Text color={AMBER}>{marker}</Text>}
      </Flex>

      {/* body */}
      <Box position="relative" p={5}>
        <Heading as="h4" size="md" color="white" lineHeight="1.3" mb={3}>
          {heading}
        </Heading>

        <Box as="ul" listStyleType="none" m={0} p={0}>
          <For each={details || []}>
            {(detail: any, i: number) => (
              <Flex as="li" key={i} gap={2.5} mb={2} align="start">
                <Text
                  fontFamily={MONO}
                  fontSize="10px"
                  color={AMBER}
                  mt="3px"
                  flexShrink={0}
                >
                  ▸
                </Text>
                <Text fontSize="sm" color="whiteAlpha.850" lineHeight="1.55">
                  {detail}
                </Text>
              </Flex>
            )}
          </For>
        </Box>
      </Box>
    </Box>
  );
};

/* ════════════════════════════════════════════════════════
   PUBLICATIONS — clinical readout list
   ════════════════════════════════════════════════════════ */
const PublicationList = ({ data, stub }: { data: any; stub: string }) => {
  const prefix = PREFIX[stub];
  const itemsWithIndex = data.items.map((item: any, idx: number) => ({
    ...item,
    _originalIndex: idx,
  }));
  const years = [...new Set(itemsWithIndex.map((item: any) => item.year))].sort(
    (a: any, b: any) => parseInt(b) - parseInt(a)
  );

  return (
    <Box>
      {years.map((year: any) => {
        const yearItems = itemsWithIndex.filter((item: any) => item.year === year);
        return (
          <Box key={year} mb={6}>
            <Text
              fontFamily={MONO}
              fontSize="11px"
              fontWeight="bold"
              letterSpacing="0.12em"
              color="gray.400"
              mb={3}
            >
              ── {year}
            </Text>
            <Box display="flex" flexDirection="column" gap={3}>
              {yearItems.map((item: any, idx: number) => (
                <Flex
                  key={idx}
                  bg="white"
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor="gray.100"
                  borderLeft="3px solid"
                  borderLeftColor={AMBER}
                  p={4}
                  gap={3}
                  align="start"
                  transition="all 0.15s ease"
                  _hover={{ borderColor: "gray.200", borderLeftColor: AMBER, boxShadow: "sm" }}
                >
                  <Box
                    minW="3em"
                    fontFamily={MONO}
                    fontSize="sm"
                    fontWeight="bold"
                    color={INK}
                  >
                    [{prefix}
                    {data.items.length - item._originalIndex}]
                  </Box>
                  <Box>
                    <Box fontWeight="semibold" color={INK} lineHeight="1.4">
                      {item.link ? (
                        <Link href={item.link} target="_blank" color={INK}>
                          {item.title}
                        </Link>
                      ) : (
                        item.title
                      )}
                    </Box>
                    <Text mt={1} fontSize="sm" color="gray.600" lineHeight="1.5">
                      {renderAuthors(item.authors || "")}{" "}
                      {item.venue && (
                        <Box as="em" fontStyle="italic">
                          {item.venue}
                        </Box>
                      )}
                      {item.volume ? `, ${item.volume}` : ""}
                      {item.number ? `(${item.number})` : ""}
                      {item.pages ? `: ${item.pages}` : ""}
                      {item.venue ? "." : ""}
                      {item.note ? ` (${item.note})` : ""}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
