# Fractured Mechanics Library

Unified mechanics module for the Fractured game system. Provides typed access to traits, flaws, and crisis profiles parsed from markdown source files.

## Overview

This module reads and parses markdown files from:
- `traits/` - Character traits with trigger conditions and evolution paths
- `flaws/` - Character flaws with mechanical effects
- `crisis_profiles/` - Behavioral archetypes under stress

## Usage

### Import the module

```typescript
import {
  getAllTraits,
  getTraitBySlug,
  getAllFlaws,
  getFlawBySlug,
  getAllCrisisProfiles,
  getCrisisProfileBySlug
} from './lib/mechanics'
```

### Working with Traits

```typescript
// Get all traits
const traits = getAllTraits()

// Get a specific trait
const adaptive = getTraitBySlug('adaptive-thinker')

// Search traits
const combatTraits = searchTraits('combat')

// Filter by type
const coreTraits = getTraitsByType('core')
```

### Working with Flaws

```typescript
// Get all flaws
const flaws = getAllFlaws()

// Get a specific flaw
const abandonment = getFlawBySlug('abandonment-wound')

// Search flaws
const emotionalFlaws = searchFlaws('emotional')
```

### Working with Crisis Profiles

```typescript
// Get all crisis profiles
const profiles = getAllCrisisProfiles()

// Get a specific profile
const ghost = getCrisisProfileBySlug('the-ghost')

// Search by behavior
const withdrawal = getCrisisProfilesByBehavior('withdrawal')
```

## Data Structure

### Trait

```typescript
interface Trait {
  slug: string              // Filename-based identifier
  name: string              // Display name
  originalText: string      // Original description from Volume 2
  type: string              // Trait type (Core, Conditional, etc.)
  triggerCondition: string  // When this trait activates
  triggerRoll: string       // How to roll for this trait
  spiralPath: string        // Negative evolution mechanics
  resiliencePath: string    // Positive evolution mechanics
  groupEffect: string       // Impact on party (once per scene)
}
```

### Flaw

```typescript
interface Flaw {
  slug: string              // Filename-based identifier
  name: string              // Display name
  originalText: string      // Original description from Volume 2
  type: string              // Flaw type (Emotional, Behavioral, etc.)
  triggerCondition: string  // When this flaw interferes
  triggerRoll: string       // How to roll against this flaw
  spiralPath: string        // Worsening mechanics
  resiliencePath: string    // Growth/transformation mechanics
}
```

### Crisis Profile

```typescript
interface CrisisProfile {
  slug: string                 // Filename-based identifier
  name: string                 // Display name
  originalText: string         // Original description from Volume 3
  activationThreshold: string  // When profile begins
  escalationThreshold: string  // Intensification mechanics
  breakingThreshold: string    // Critical point mechanics
  spiralPath: string           // Full crisis mechanics
  resiliencePath: string       // Breakthrough mechanics
  groupImpact: string          // Effect on group dynamic
}
```

## Caching

All loaders use in-memory caching. The markdown files are read once on first access, then cached for subsequent calls. To force a reload (e.g., in development), restart the Node process.

## File Structure

```
src/lib/mechanics/
  ├── index.ts              # Main export file
  ├── types.ts              # TypeScript interfaces
  ├── traits.ts             # Trait loader
  ├── flaws.ts              # Flaw loader
  ├── crisisProfiles.ts     # Crisis profile loader
  ├── markdown-parser.ts    # Markdown parsing utilities
  └── README.md             # This file
```

## Dependencies

- Node.js `fs` and `path` modules (built-in)
- No external dependencies required

## Future Integration

This module is designed to be imported by:
- Character creation systems
- Game state managers
- Digital character sheets
- GM reference tools
- Random generators

The mechanics remain in markdown for easy editing while providing typed programmatic access.
