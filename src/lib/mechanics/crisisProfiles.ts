/**
 * Crisis Profile mechanics loader
 * Reads and parses crisis profile markdown files from crisis_profiles/
 */

import { join } from 'path'
import { CrisisProfile } from './types'
import { parseMarkdown, readMarkdownFiles } from './markdown-parser'

const CRISIS_PROFILES_DIR = join(process.cwd(), 'crisis_profiles')

let crisisProfilesCache: CrisisProfile[] | null = null

/**
 * Load and parse all crisis profiles from markdown files
 */
function loadCrisisProfiles(): CrisisProfile[] {
  if (crisisProfilesCache) {
    return crisisProfilesCache
  }

  const crisisProfiles: CrisisProfile[] = []
  const files = readMarkdownFiles(CRISIS_PROFILES_DIR)

  for (const [slug, content] of files) {
    const parsed = parseMarkdown(content)

    // Extract Original Text section
    const originalText = parsed.sections['Original Text (from Volume 3: Crisis Profiles & Behavior Engines)'] || ''

    // Extract threshold sections
    const activationThreshold = parsed.sections['Activation Threshold'] || ''
    const escalationThreshold = parsed.sections['Escalation Threshold'] || ''
    const breakingThreshold = parsed.sections['Breaking Threshold'] || ''

    // Extract full section text for Spiral and Resilience paths
    const spiralPath = parsed.sections['Spiral Path (Mechanical Effects)'] || ''
    const resiliencePath = parsed.sections['Resilience Path (Mechanical Effects)'] || ''
    const groupImpact = parsed.sections['Group Impact'] || ''

    crisisProfiles.push({
      slug,
      name: parsed.title,
      originalText,
      activationThreshold,
      escalationThreshold,
      breakingThreshold,
      spiralPath,
      resiliencePath,
      groupImpact
    })
  }

  crisisProfilesCache = crisisProfiles
  return crisisProfiles
}

/**
 * Get all crisis profiles
 */
export function getAllCrisisProfiles(): CrisisProfile[] {
  return loadCrisisProfiles()
}

/**
 * Get a crisis profile by slug
 */
export function getCrisisProfileBySlug(slug: string): CrisisProfile | undefined {
  return loadCrisisProfiles().find(cp => cp.slug === slug)
}

/**
 * Search crisis profiles by name or slug
 */
export function searchCrisisProfiles(query: string): CrisisProfile[] {
  const lowerQuery = query.toLowerCase()
  return loadCrisisProfiles().filter(cp =>
    cp.name.toLowerCase().includes(lowerQuery) ||
    cp.slug.toLowerCase().includes(lowerQuery)
  )
}

/**
 * Get crisis profiles that match specific behavioral patterns
 * Uses keyword matching in originalText
 */
export function getCrisisProfilesByBehavior(keyword: string): CrisisProfile[] {
  const lowerKeyword = keyword.toLowerCase()
  return loadCrisisProfiles().filter(cp =>
    cp.originalText.toLowerCase().includes(lowerKeyword)
  )
}
