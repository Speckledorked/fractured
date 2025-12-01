/**
 * Simple markdown parser for extracting sections from mechanics files
 */

import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

export interface ParsedMarkdown {
  title: string
  sections: Record<string, string>
}

/**
 * Parse markdown file and extract title and sections
 */
export function parseMarkdown(content: string): ParsedMarkdown {
  const lines = content.split('\n')
  let title = ''
  const sections: Record<string, string> = {}
  let currentSection = ''
  let currentContent: string[] = []

  for (const line of lines) {
    // Extract main title (# Heading)
    if (line.startsWith('# ') && !title) {
      title = line.substring(2).trim()
      continue
    }

    // Extract section headings (## Heading or ### Heading)
    if (line.startsWith('## ') || line.startsWith('### ')) {
      // Save previous section
      if (currentSection) {
        sections[currentSection] = currentContent.join('\n').trim()
      }

      // Start new section
      const headerMatch = line.match(/^#{2,3}\s+(.+)/)
      if (headerMatch) {
        currentSection = headerMatch[1].trim()
        currentContent = []
      }
      continue
    }

    // Accumulate content for current section
    if (currentSection) {
      currentContent.push(line)
    }
  }

  // Save last section
  if (currentSection) {
    sections[currentSection] = currentContent.join('\n').trim()
  }

  return { title, sections }
}

/**
 * Extract a specific subsection from content
 */
export function extractSubsection(content: string, heading: string): string {
  const lines = content.split('\n')
  let collecting = false
  const result: string[] = []

  for (const line of lines) {
    // Check if this is the target heading
    if (line.trim() === `**${heading}:**` || line.trim().startsWith(`**${heading}:**`)) {
      collecting = true
      // Include the content after the colon if present
      const afterColon = line.substring(line.indexOf(':**') + 3).trim()
      if (afterColon) {
        result.push(afterColon)
      }
      continue
    }

    // Stop collecting when we hit another bold heading or section marker
    if (collecting && (line.startsWith('**') || line.startsWith('###') || line.startsWith('---'))) {
      break
    }

    if (collecting) {
      result.push(line)
    }
  }

  return result.join('\n').trim()
}

/**
 * Read all markdown files from a directory
 */
export function readMarkdownFiles(dirPath: string): Map<string, string> {
  const files = new Map<string, string>()

  try {
    const entries = readdirSync(dirPath)

    for (const entry of entries) {
      if (entry.endsWith('.md')) {
        const slug = entry.replace('.md', '')
        const fullPath = join(dirPath, entry)
        const content = readFileSync(fullPath, 'utf-8')
        files.set(slug, content)
      }
    }
  } catch (error) {
    console.error(`Error reading markdown files from ${dirPath}:`, error)
  }

  return files
}
