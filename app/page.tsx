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

const INK = "#0E2A2E";
const AMBER = "#E8A23D";

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

/* ── Section header: title + amber rule ───────────────── */
const SectionHeader = ({ title }: { title: string }) => (
  <Flex align="center" gap={3} mb={6}>
    <Box w="4px" h="22px" bg={AMBER} borderRadius="full" />
    <Heading as="h3" size="xl" fontWeight="bold" color={INK} letterSpacing="-0.02em">
      {title}
    </Heading>
    <Box flex="1" h="1px" bg="blackAlpha.200" />
  </Flex>
);

/* ── A single info card ───────────────────────────────── */
const ItemCard = ({
  heading,
  badge,
  children,
}: {
  heading: string;
  badge?: string;
  children: React.ReactNode;
}) => (
  <Box
    bg="white"
    borderRadius="2xl"
    borderWidth="1px"
    borderColor="gray.100"
    p={6}
    h="full"
    transition="all 0.18s ease"
    boxShadow="0 1px 2px rgba(14,42,46,0.04)"
    _hover={{
      borderColor: AMBER,
      boxShadow: "0 12px 28px -14px rgba(14,42,46,0.4)",
      transform: "translateY(-2px)",
    }}
  >
    <Flex justify="space-between" align="start" gap={3} mb={3}>
      <Heading as="h4" size="md" color={INK} lineHeight="1.3">
        {heading}
      </Heading>
      {badge && (
        <Box
          flexShrink={0}
          px={2.5}
          py={1}
          borderRadius="full"
          bg={INK}
          color="white"
          fontSize="11px"
          fontWeight="bold"
          letterSpacing="0.02em"
        >
          {badge}
        </Box>
      )}
    </Flex>
    {children}
  </Box>
);

// Reusable Section Component
const Section = ({ data, stub }: { data: any; stub: string }) => {
  const isPub = PUB_STUBS.includes(stub);

  return (
    <Box py={8}>
      <SectionHeader title={data.title} />

      {isPub ? (
        /* ── Publications: numbered reference list ──────── */
        <PublicationList data={data} stub={stub} />
      ) : (
        /* ── Everything else: card grid ─────────────────── */
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
          <For each={data.items}>
            {(item: any, idx: number) => (
              <ItemCard
                key={idx}
                heading={item.institution || item.title || item.name}
                badge={item.year || item.date || item.period}
              >
                <Box as="ul" listStyleType="none" m={0} p={0}>
                  <For each={item.details}>
                    {(detail: any, i: number) => (
                      <Flex as="li" key={i} gap={2} mb={1.5} align="start">
                        <Box
                          mt="7px"
                          w="5px"
                          h="5px"
                          borderRadius="full"
                          bg={AMBER}
                          flexShrink={0}
                        />
                        <Text fontSize="sm" color="gray.700" lineHeight="1.55">
                          {detail}
                        </Text>
                      </Flex>
                    )}
                  </For>
                </Box>
              </ItemCard>
            )}
          </For>
        </SimpleGrid>
      )}
    </Box>
  );
};

/* ── Publications kept as a grouped, numbered list ──────── */
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
              fontSize="xs"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="0.14em"
              color="gray.400"
              mb={3}
            >
              {year}
            </Text>
            <Box display="flex" flexDirection="column" gap={3}>
              {yearItems.map((item: any, idx: number) => (
                <Flex
                  key={idx}
                  bg="white"
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="gray.100"
                  p={4}
                  gap={3}
                  align="start"
                  transition="border-color 0.15s ease"
                  _hover={{ borderColor: AMBER }}
                >
                  <Box
                    minW="2.8em"
                    fontSize="sm"
                    fontWeight="bold"
                    color={AMBER}
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
