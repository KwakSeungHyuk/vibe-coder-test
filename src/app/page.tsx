'use client'

import React from 'react'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import PortfolioSection from '@/components/PortfolioSection'
import VibeAdvantageSection from '@/components/VibeAdvantageSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import FeaturedVideoSection from '@/components/FeaturedVideoSection'
import TechStackSection from '@/components/TechStackSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <VibeAdvantageSection />
      <TestimonialsSection />
      <FeaturedVideoSection />
      <TechStackSection />
      <ContactSection />
    </main>
  )
} 