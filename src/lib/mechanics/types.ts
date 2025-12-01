/**
 * Core mechanics types for Fractured game system
 * Parsed from markdown files in fractured_mechanics_full/
 */

export interface Trait {
  slug: string
  name: string
  originalText: string
  type: string
  triggerCondition: string
  triggerRoll: string
  spiralPath: string
  resiliencePath: string
  groupEffect: string
}

export interface Flaw {
  slug: string
  name: string
  originalText: string
  type: string
  triggerCondition: string
  triggerRoll: string
  spiralPath: string
  resiliencePath: string
}

export interface CrisisProfile {
  slug: string
  name: string
  originalText: string
  activationThreshold: string
  escalationThreshold: string
  breakingThreshold: string
  spiralPath: string
  resiliencePath: string
  groupImpact: string
}
