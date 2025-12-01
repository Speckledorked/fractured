/**
 * Example usage of the Fractured mechanics library
 * Run with: npm test or ts-node src/lib/mechanics/example.ts
 */

import {
  getAllTraits,
  getTraitBySlug,
  getAllFlaws,
  getFlawBySlug,
  getAllCrisisProfiles,
  getCrisisProfileBySlug,
  searchTraits,
  searchFlaws
} from './index'

console.log('=== Fractured Mechanics Library Example ===\n')

// Example 1: Load all traits
console.log('📋 Loading all traits...')
const traits = getAllTraits()
console.log(`Found ${traits.length} traits\n`)

// Example 2: Get specific trait
console.log('🎯 Getting "Adaptive Thinker" trait...')
const adaptive = getTraitBySlug('adaptive-thinker')
if (adaptive) {
  console.log(`Name: ${adaptive.name}`)
  console.log(`Type: ${adaptive.type}`)
  console.log(`Trigger: ${adaptive.triggerCondition.substring(0, 80)}...\n`)
}

// Example 3: Search traits
console.log('🔍 Searching for combat-related traits...')
const combatTraits = searchTraits('combat')
console.log(`Found ${combatTraits.length} combat-related traits:`)
combatTraits.slice(0, 3).forEach(t => console.log(`  - ${t.name}`))
console.log()

// Example 4: Load all flaws
console.log('💔 Loading all flaws...')
const flaws = getAllFlaws()
console.log(`Found ${flaws.length} flaws\n`)

// Example 5: Get specific flaw
console.log('🎯 Getting "Abandonment Wound" flaw...')
const abandonment = getFlawBySlug('abandonment-wound')
if (abandonment) {
  console.log(`Name: ${abandonment.name}`)
  console.log(`Type: ${abandonment.type}`)
  console.log(`Trigger: ${abandonment.triggerCondition.substring(0, 80)}...\n`)
}

// Example 6: Search flaws
console.log('🔍 Searching for emotional flaws...')
const emotionalFlaws = searchFlaws('emotional')
console.log(`Found ${emotionalFlaws.length} emotional flaws:`)
emotionalFlaws.slice(0, 3).forEach(f => console.log(`  - ${f.name}`))
console.log()

// Example 7: Load all crisis profiles
console.log('⚠️  Loading all crisis profiles...')
const profiles = getAllCrisisProfiles()
console.log(`Found ${profiles.length} crisis profiles\n`)

// Example 8: Get specific crisis profile
console.log('🎯 Getting "The Ghost" crisis profile...')
const ghost = getCrisisProfileBySlug('the-ghost')
if (ghost) {
  console.log(`Name: ${ghost.name}`)
  console.log(`Original: ${ghost.originalText.substring(0, 100)}...\n`)
}

console.log('✅ Mechanics library loaded successfully!')
