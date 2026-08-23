import { compileMDX } from "next-mdx-remote/rsc"

import { mdxComponents } from "@/components/mdx/components"
import { getCaseStudyBySlug } from "@/lib/case-studies"

export async function compileCaseStudy(slug: string) {
  const study = getCaseStudyBySlug(slug)

  if (!study) {
    return null
  }

  const { content } = await compileMDX({
    source: study.content,
    components: mdxComponents,
  })

  return {
    slug: study.slug,
    frontmatter: study.frontmatter,
    content,
  }
}
