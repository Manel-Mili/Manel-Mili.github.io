"use client";

import {
  For,
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Link,
  Separator,
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

export default function Page() {
  return (
    <Container maxW="container.xl" py={8}>
      <Flex direction={{ base: "column", md: "row" }} gap={8}>
        <Sidebar />

        <Box w={{ base: "full", md: "3/4" }}>
          <Hero />
          {/* Main Content */}
          
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

// Reusable Section Component
const Section = ({ data, stub }: { data: any; stub: string }) => {
  const baseMx = 4;
  const isPub = PUB_STUBS.includes(stub);

  return (
    <Box py={8} fontSize={{ base: "sm", md: "md" }} lineHeight={1.2}>
      <Box>
        <Heading
          as="h3"
          size="xl"
          fontWeight="bold"
          ml={{ base: 0, md: baseMx }}
          display="flex"
          alignItems="center"
          gap={2}
        >
          {data.title}
        </Heading>
      </Box>
      <Separator mb={4} mt={2} />

      {isPub ? (
        <Box>
          {(() => {
            const prefix = PREFIX[stub];
            const itemsWithIndex = data.items.map((item: any, idx: number) => ({
              ...item,
              _originalIndex: idx,
            }));
            const years = [
              ...new Set(itemsWithIndex.map((item: any) => item.year)),
            ].sort((a: string, b: string) => parseInt(b) - parseInt(a));
            return years.map((year: string) => {
              const yearItems = itemsWithIndex.filter(
                (item: any) => item.year === year
              );
              return (
                <Box key={year} mb={baseMx}>
                  <Heading as="h4" size="md" mb={2} ml={{ base: 0, md: baseMx }}>
                    {year}
                  </Heading>
                  <Box
                    as="ul"
                    listStyleType="none"
                    pl={{ base: 0, md: 1 * baseMx }}
                  >
                    {yearItems.map((item: any, idx: number) => (
                      <Flex as="li" key={idx} mb={4} alignItems="start">
                        <Box
                          minW="2.5em"
                          textAlign="right"
                          mr={2}
                          ml={{ base: 0, md: 0.5 * baseMx }}
                        >
                          [{prefix}
                          {data.items.length - item._originalIndex}]
                        </Box>
                        <Box>
                          <Box>
                            {item.link ? (
                              <Link href={item.link} target="_blank">
                                {item.title}
                              </Link>
                            ) : (
                              item.title
                            )}
                          </Box>
                          <Text mt={1}>
                            {renderAuthors(item.authors || "")}{" "}
                            {item.venue && (
                              <em style={{ fontStyle: "italic" }}>
                                {item.venue}
                              </em>
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
            });
          })()}
        </Box>
      ) : (
        <For each={data.items}>
          {(item: any, idx: number) => (
            <Box key={idx} mb={{ base: 4, md: baseMx }}>
              <Heading as="h4" size="lg" mb={1} ml={{ base: 0, md: 2 * baseMx }}>
                <Box display={{ base: "inline", md: "none" }}>
                  {item.instshort ? item.instshort : item.institution}
                </Box>
                <Box display={{ base: "none", md: "inline" }}>
                  {item.institution}
                </Box>
              </Heading>
              <For each={item.details}>
                {(detail: any, i: number) => (
                  <Text key={i} mb={1} ml={{ base: baseMx, md: 3 * baseMx }}>
                    {detail}
                  </Text>
                )}
              </For>
            </Box>
          )}
        </For>
      )}
    </Box>
  );
};
