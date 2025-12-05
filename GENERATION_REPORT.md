# Trait & Flaw Mechanics Generation Report

## Summary

All traits and flaws from **GM Companion Guide - Volume 2: Trait & Flaw Library (Master Edition)** have been successfully converted to mechanics markdown files using the Unified Tension-Based System.

## Final Statistics

### Files Created
- **Trait files:** 127
- **Flaw files:** 66
- **Total files:** 193

### Source Document Analysis
- Total trait markers (✦) in document: 355
- Total flaw markers (☠️) in document: 230
- **Unique traits after deduplication:** 127
- **Unique flaws after deduplication:** 66

The difference between total markers and unique entries is due to:
- Pre-generated character sets that reference the same traits/flaws multiple times
- Variant descriptions (e.g., "Builder's Mind (for triage setups)" vs "Builder's Mind")
- Section headers marked with symbols

## File Locations

- Trait mechanics: `/home/user/fractured/traits/`
- Flaw mechanics: `/home/user/fractured/flaws/`

## Mechanics Format

Each file follows the standardized format:

### For Traits:
- Original text from Volume 2
- Unified Tension-Based System mechanics
- Trigger conditions and rolls (2d6 + stat)
- Three outcome tiers: 10+ (Controlled), 7-9 (Strained), 6- (Breaking)
- Spiral Path (negative escalation)
- Resilience Path (positive growth)
- Group Effect (once per scene)

### For Flaws:
- Original text from Volume 2
- Unified Tension-Based System mechanics
- Trigger conditions and rolls
- Three outcome tiers: 10+ (Resisted), 7-9 (Strained Control), 6- (Full Collapse)
- Spiral Path (mechanical consequences)
- Resilience Path (transformation opportunities)

## Generation Process

1. Parsed source document to extract all trait/flaw markers
2. Cleaned names (removed parenthetical notes and variants)
3. Generated slugified filenames
4. Created markdown files with standardized mechanics
5. Removed duplicate variants
6. Verified completeness

## Verification

✅ All unique traits from source document have mechanics files
✅ All unique flaws from source document have mechanics files
✅ No missing entries
✅ Duplicate variants removed
✅ Consistent formatting across all files

---

Generated: 2025-12-05
System: Unified Tension-Based Game Mechanics
