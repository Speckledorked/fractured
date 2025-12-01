/**
 * Fractured Game System - Mechanics Library
 *
 * Unified access to traits, flaws, and crisis profiles
 * Parsed from markdown files in fractured_mechanics_full/
 *
 * @example
 * ```typescript
 * import { getAllTraits, getTraitBySlug } from './lib/mechanics'
 *
 * const traits = getAllTraits()
 * const adaptive = getTraitBySlug('adaptive-thinker')
 * ```
 */

// Export types
export * from './types'

// Export trait functions
export {
  getAllTraits,
  getTraitBySlug,
  getTraitsByType,
  searchTraits
} from './traits'

// Export flaw functions
export {
  getAllFlaws,
  getFlawBySlug,
  getFlawsByType,
  searchFlaws
} from './flaws'

// Export crisis profile functions
export {
  getAllCrisisProfiles,
  getCrisisProfileBySlug,
  searchCrisisProfiles,
  getCrisisProfilesByBehavior
} from './crisisProfiles'
