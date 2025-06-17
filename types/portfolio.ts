import type React from "react"
export interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
}

export interface SocialLink {
  name: string
  url: string
  icon: React.ComponentType<{ className?: string }>
}

export interface NavItem {
  name: string
  href: string
}
