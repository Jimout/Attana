import fs from "node:fs"
import path from "node:path"

import matter from "gray-matter"

const CASE_STUDIES_DIR = path.join(
  process.cwd(),
  "src",
  "content",
  "case-studies"
)
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export type CaseStudyFrontmatter = {
  title: string
  description: string
  date: string
  published?: boolean
  cover?: string
  client?: string
  role?: string
  tags?: string[]
}

export type CaseStudy = {
  slug: string
  frontmatter: CaseStudyFrontmatter
  content: string
}

function getCaseStudyPath(slug: string) {
  return path.join(CASE_STUDIES_DIR, `${slug}.mdx`)
}

function parseFrontmatter(
  slug: string,
  data: Record<string, unknown>
): CaseStudyFrontmatter {
  if (
    typeof data.title !== "string" ||
    typeof data.description !== "string" ||
    typeof data.date !== "string"
  ) {
    throw new Error(
      `Invalid frontmatter in src/content/case-studies/${slug}.mdx. Expected title, description, and date.`
    )
  }

  return {
    title: data.title,
    description: data.description,
    date: data.date,
    published: data.published === undefined ? true : Boolean(data.published),
    cover: typeof data.cover === "string" ? data.cover : undefined,
    client: typeof data.client === "string" ? data.client : undefined,
    role: typeof data.role === "string" ? data.role : undefined,
    tags: Array.isArray(data.tags)
      ? data.tags.filter((tag): tag is string => typeof tag === "string")
      : undefined,
  }
}

export function getCaseStudySlugs() {
  if (!fs.existsSync(CASE_STUDIES_DIR)) {
    return []
  }

  return fs
    .readdirSync(CASE_STUDIES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .filter((slug) => SLUG_PATTERN.test(slug))
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  if (!SLUG_PATTERN.test(slug)) {
    return null
  }

  const filePath = getCaseStudyPath(slug)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)

  return {
    slug,
    frontmatter: parseFrontmatter(slug, data),
    content,
  }
}

export function getAllCaseStudies() {
  return getCaseStudySlugs()
    .map((slug) => getCaseStudyBySlug(slug))
    .filter((study): study is CaseStudy => study !== null)
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1))
}
