'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

const HeroSection = () => {
  const backgroundRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 초기 상태 설정 (깜빡임 방지)
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 50
    })

    // GSAP 애니메이션 설정
    const tl = gsap.timeline({ delay: 0.2 })
    
    tl.to(titleRef.current, {
      duration: 1,
      y: 0,
      opacity: 1,
      ease: "power3.out"
    })
    .to(subtitleRef.current, {
      duration: 0.8,
      y: 0,
      opacity: 1,
      ease: "power3.out"
    }, "-=0.5")
    .to(ctaRef.current, {
      duration: 0.6,
      y: 0,
      opacity: 1,
      ease: "power3.out"
    }, "-=0.3")

    // 배경 패럴랙스 효과
    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrolled = window.pageYOffset
        const parallax = scrolled * 0.3
        backgroundRef.current.style.transform = `translateY(${parallax}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 배경 그라데이션 */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-brand-bg via-gray-900 to-brand-bg"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary/10 via-transparent to-transparent"></div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 
          ref={titleRef}
          className="font-pretendard font-bold text-5xl md:text-7xl lg:text-8xl mb-6 text-brand-text opacity-0"
          style={{ transform: 'translateY(50px)' }}
        >
          Build Your Product
          <br />
          <span className="text-brand-primary">with Vibe</span>
        </h1>

        <p 
          ref={subtitleRef}
          className="font-inter text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed opacity-0"
          style={{ transform: 'translateY(50px)' }}
        >
          빠르게, 감각적으로
          <br />
          당신의 아이디어를 현실로 만들어보세요
        </p>

        <div 
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0"
          style={{ transform: 'translateY(50px)' }}
        >
          <button className="px-8 py-4 bg-brand-primary text-brand-bg font-semibold rounded-lg hover:bg-brand-primary/90 transition-all duration-300 transform hover:scale-105">
            프로젝트 시작하기
          </button>
          <button className="px-8 py-4 border border-brand-primary text-brand-primary font-semibold rounded-lg hover:bg-brand-primary hover:text-brand-bg transition-all duration-300">
            포트폴리오 보기
          </button>
        </div>

        {/* 스크롤 인디케이터 */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-brand-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-brand-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </motion.div>
      </div>

      {/* 배경 파티클 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-brand-primary rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSection 