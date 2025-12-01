/**
 * Trait mechanics loader
 * Reads and parses trait markdown files from traits/
 */

import { join } from 'path'
import { Trait } from './types'
import { parseMarkdown, readMarkdownFiles, extractSubsection } from './markdown-parser'

const TRAITS_DIR = join(process.cwd(), 'traits')

let traitsCache: Trait[] | null = null

/**
 * Load and parse all traits from markdown files
 */
function loadTraits(): Trait[] {
  if (traitsCache) {
    return traitsCache
  }

  const traits: Trait[] = []
  const files = readMarkdownFiles(TRAITS_DIR)

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
    const groupEffect = parsed.sections['Group Effect (Once per Scene)'] || ''

    traits.push({
      slug,
      name: parsed.title,
      originalText,
      type,
      triggerCondition,
      triggerRoll,
      spiralPath,
      resiliencePath,
      groupEffect
    })
  }

  traitsCache = traits
  return traits
}

/**
 * Get all traits
 */
export function getAllTraits(): Trait[] {
  return loadTraits()
}

/**
 * Get a trait by slug
 */
export function getTraitBySlug(slug: string): Trait | undefined {
  return loadTraits().find(t => t.slug === slug)
}

/**
 * Get traits by type
 */
export function getTraitsByType(type: string): Trait[] {
  return loadTraits().filter(t => t.type.toLowerCase().includes(type.toLowerCase()))
}

/**
 * Search traits by name or slug
 */
export function searchTraits(query: string): Trait[] {
  const lowerQuery = query.toLowerCase()
  return loadTraits().filter(t =>
    t.name.toLowerCase().includes(lowerQuery) ||
    t.slug.toLowerCase().includes(lowerQuery)
  )
}
