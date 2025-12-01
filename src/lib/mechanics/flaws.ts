/**
 * Flaw mechanics loader
 * Reads and parses flaw markdown files from flaws/
 */

import { join } from 'path'
import { Flaw } from './types'
import { parseMarkdown, readMarkdownFiles, extractSubsection } from './markdown-parser'

const FLAWS_DIR = join(process.cwd(), 'flaws')

let flawsCache: Flaw[] | null = null

/**
 * Load and parse all flaws from markdown files
 */
function loadFlaws(): Flaw[] {
  if (flawsCache) {
    return flawsCache
  }

  const flaws: Flaw[] = []
  const files = readMarkdownFiles(FLAWS_DIR)

  for (const [slug, content] of files) {
    const parsed = parseMarkdown(content)

    // Extract Original Text section
    const originalText = parsed.sections['Original Text (from Volume 2: Trait & Flaw Library)'] || ''

    // Extract mechanics section content
    const mechanicsSection = parsed.sections['Mechanics (Unified Tension-Based System)'] || ''

    // Extract specific subsections from mechanics
    const type = extractSubsection(mechanicsSection, 'Type')
    const triggerCondition = extractSubsection(mechanicsSection, 'Trigger Condition')
    const triggerRoll = extractSubsection(mechanicsSection, 'Trigger Roll')

    // Extract full section text for Spiral and Resilience paths
    const spiralPath = parsed.sections['Spiral Path (Mechanical Effects)'] || ''
    const resiliencePath = parsed.sections['Resilience Path (Mechanical Effects)'] || ''

    flaws.push({
      slug,
      name: parsed.title,
      originalText,
      type,
      triggerCondition,
      triggerRoll,
      spiralPath,
      resiliencePath
    })
  }

  flawsCache = flaws
  return flaws
}

/**
 * Get all flaws
 */
export function getAllFlaws(): Flaw[] {
  return loadFlaws()
}

/**
 * Get a flaw by slug
 */
export function getFlawBySlug(slug: string): Flaw | undefined {
  return loadFlaws().find(f => f.slug === slug)
}

/**
 * Get flaws by type
 */
export function getFlawsByType(type: string): Flaw[] {
  return loadFlaws().filter(f => f.type.toLowerCase().includes(type.toLowerCase()))
}

/**
 * Search flaws by name or slug
 */
export function searchFlaws(query: string): Flaw[] {
  const lowerQuery = query.toLowerCase()
  return loadFlaws().filter(f =>
    f.name.toLowerCase().includes(lowerQuery) ||
    f.slug.toLowerCase().includes(lowerQuery)
  )
}
