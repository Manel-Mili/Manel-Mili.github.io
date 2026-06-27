"use client";

import { useState, useRef, useEffect } from "react";
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
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
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

const MBox = motion(Box);

const STUBS = [
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
] as const;

const DATA: Record<string, any> = {
  research: researchData,
  pubs: pubsData,
  procs: procsData,
  books: booksData,
  projects: projectsData,
  edus: edusData,
  exps: expsData,
  service: serviceData,
  skills: skillsData,
  certs: certsData,
};

export default function Page() {
  const [active, setActive] = useState<string>("all");

  const available = STUBS.filter((s) => DATA[s]);
  const visible = active === "all" ? available : available.filter((s) => s === active);

  return (
    <Container maxW="container.xl" py={8}>
      <Flex direction={{ base: "column", md: "row" }} gap={8}>
        <Sidebar />

        <Box w={{ base: "full", md: "3/4" }}>
          <Hero />

          {/* ── Filter bar (horizontal scroll on mobile) ── */}
          <FilterBar
            stubs={available}
            active={active}
            onSelect={setActive}
          />

          <For each={visible}>
            {(stub) => <Section key={stub} data={DATA[stub]} stub={stub} />}
          </For>
        </Box>
      </Flex>
    </Container>
  );
}

/* ════════════════════════════════════════════════════════
   FILTER BAR — sticky, swipeable pill nav
   ════════════════════════════════════════════════════════ */
const FilterBar = ({
  stubs,
  active,
  onSelect,
}: {
  stubs: readonly string[] | string[];
  active: string;
  onSelect: (s: string) => void;
}) => {
  const tabs = ["all", ...stubs];
  return (
    <Box
      position="sticky"
      top={{ base: "0", md: "80px" }}
      zIndex={5}
      mb={4}
      py={2}
      bg="rgba(255,255,255,0.85)"
      backdropFilter="blur(8px)"
      borderRadius="xl"
    >
      <Flex
        gap={2}
        overflowX="auto"
        css={{
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          WebkitOverflowScrolling: "touch",
        }}
        pb={1}
      >
        {tabs.map((t) => {
          const isActive = active === t;
          const label = t === "all" ? "All" : DATA[t]?.title ?? t;
          return (
            <Box
              as="button"
              key={t}
              onClick={() => onSelect(t)}
              flexShrink={0}
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm"
              fontWeight="semibold"
              whiteSpace="nowrap"
              cursor="pointer"
              transition="all 0.18s ease"
              bg={isActive ? INK : "transparent"}
              color={isActive ? "white" : "gray.600"}
              border="1px solid"
              borderColor={isActive ? INK : "gray.200"}
              _hover={{ borderColor: isActive ? INK : AMBER }}
            >
              {label}
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};

/* ── owner bolding ── */
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

/* ── animated count-up ── */
const CountUp = ({ end }: { end: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? end : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf: number;
    const start = performance.now();
    const dur = 900;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * end));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, reduce]);

  return <span ref={ref}>{n}</span>;
};

/* ── scroll-reveal wrapper ── */
const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  return (
    <MBox
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MBox>
  );
};

/* ── section header ── */
const SectionHeader = ({ title, count }: { title: string; count?: number }) => (
  <Flex align="center" gap={3} mb={6}>
    <Box w="4px" h="24px" bg={AMBER} borderRadius="full" />
    <Heading as="h3" size="xl" fontWeight="bold" color={INK} letterSpacing="-0.02em">
      {title}
    </Heading>
    {count != null && (
      <Box
        px={2.5}
        py={0.5}
        borderRadius="full"
        bg="blackAlpha.100"
        fontSize="sm"
        fontWeight="bold"
        color={INK}
      >
        <CountUp end={count} />
      </Box>
    )}
    <Box flex="1" h="1px" bg="blackAlpha.200" />
  </Flex>
);

/* ════════════════════════════════════════════════════════
   SECTION
   ════════════════════════════════════════════════════════ */
const Section = ({ data, stub }: { data: any; stub: string }) => {
  const isPub = PUB_STUBS.includes(stub);
  return (
    <Box py={8} scrollMarginTop="120px" id={stub}>
      <Reveal>
        <SectionHeader title={data.title} count={data.items?.length} />
      </Reveal>

      {isPub ? (
        <PublicationList data={data} stub={stub} />
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
          <For each={data.items}>
            {(item: any, idx: number) => (
              <Reveal key={idx} delay={Math.min(idx * 0.06, 0.4)}>
                <ExpandableCard
                  heading={item.institution || item.title || item.name}
                  marker={item.year || item.date || item.period}
                  details={item.details}
                />
              </Reveal>
            )}
          </For>
        </SimpleGrid>
      )}
    </Box>
  );
};

/* ════════════════════════════════════════════════════════
   EXPANDABLE CARD — tap to reveal details (touch-friendly)
   ════════════════════════════════════════════════════════ */
const ExpandableCard = ({
  heading,
  marker,
  details = [],
}: {
  heading: string;
  marker?: string;
  details?: any[];
}) => {
  const reduce = useReducedMotion();
  const hasDetails = details && details.length > 0;
  const [open, setOpen] = useState(false);

  return (
    <MBox
      whileHover={reduce ? undefined : { y: -3 }}
      transition={{ duration: 0.18 }}
      bg="white"
      borderRadius="2xl"
      borderWidth="1px"
      borderColor={open ? AMBER : "gray.100"}
      overflow="hidden"
      boxShadow={open ? "0 14px 30px -16px rgba(14,42,46,0.4)" : "0 1px 2px rgba(14,42,46,0.04)"}
      h="full"
    >
      <Flex
        as="button"
        w="full"
        textAlign="left"
        onClick={() => hasDetails && setOpen((o) => !o)}
        cursor={hasDetails ? "pointer" : "default"}
        justify="space-between"
        align="start"
        gap={3}
        p={6}
        pb={open ? 3 : 6}
      >
        <Box flex="1">
          <Heading as="h4" size="md" color={INK} lineHeight="1.3">
            {heading}
          </Heading>
        </Box>

        <Flex align="center" gap={2} flexShrink={0}>
          {marker && (
            <Box
              px={2.5}
              py={1}
              borderRadius="full"
              bg={INK}
              color="white"
              fontSize="11px"
              fontWeight="bold"
            >
              {marker}
            </Box>
          )}
          {hasDetails && (
            <MBox
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              color={AMBER}
              fontSize="lg"
              lineHeight="1"
              fontWeight="bold"
            >
              ⌄
            </MBox>
          )}
        </Flex>
      </Flex>

      <AnimatePresence initial={false}>
        {open && hasDetails && (
          <MBox
            key="body"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            overflow="hidden"
          >
            <Box as="ul" listStyleType="none" m={0} px={6} pb={6} pt={0}>
              <For each={details}>
                {(detail: any, i: number) => (
                  <Flex as="li" key={i} gap={2} mb={1.5} align="start">
                    <Box mt="7px" w="5px" h="5px" borderRadius="full" bg={AMBER} flexShrink={0} />
                    <Text fontSize="sm" color="gray.700" lineHeight="1.55">
                      {detail}
                    </Text>
                  </Flex>
                )}
              </For>
            </Box>
          </MBox>
        )}
      </AnimatePresence>
    </MBox>
  );
};

/* ════════════════════════════════════════════════════════
   PUBLICATIONS — revealed numbered list
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
            <Reveal>
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
            </Reveal>
            <Box display="flex" flexDirection="column" gap={3}>
              {yearItems.map((item: any, idx: number) => (
                <Reveal key={idx} delay={Math.min(idx * 0.05, 0.3)}>
                  <Flex
                    bg="white"
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor="gray.100"
                    borderLeft="3px solid"
                    borderLeftColor={AMBER}
                    p={4}
                    gap={3}
                    align="start"
                    transition="box-shadow 0.15s ease"
                    _hover={{ boxShadow: "md" }}
                  >
                    <Box minW="2.8em" fontSize="sm" fontWeight="bold" color={AMBER}>
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
                </Reveal>
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
