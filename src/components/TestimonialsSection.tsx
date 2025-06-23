'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'

const testimonials = [
  {
    name: '김민수',
    company: 'TechStart Inc.',
    role: 'CEO',
    content: '바이브 코딩 덕분에 우리 스타트업의 MVP를 3주 만에 완성할 수 있었습니다. 놀라운 속도와 품질에 정말 만족합니다.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    name: '박서연',
    company: 'Digital Solutions',
    role: 'CTO',
    content: '복잡한 데이터 분석 플랫폼을 예상보다 훨씬 빠르게 구축해주셨어요. 기술력과 소통 능력 모두 최고입니다.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b9fd1b7c?w=100&h=100&fit=crop&crop=face'
  },
  {
    name: '이준호',
    company: 'E-commerce Plus',
    role: '사업 총괄',
    content: '온라인 쇼핑몰 구축 프로젝트에서 예산과 일정을 모두 맞춰주셨습니다. 런칭 후 매출도 기대 이상으로 증가했어요.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    name: '최지은',
    company: 'HealthTech Korea',
    role: '프로덕트 매니저',
    content: '의료진을 위한 대시보드 프로젝트에서 사용자 경험까지 고려한 완벽한 솔루션을 제공해주셨습니다.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  }
]

const metrics = [
  { label: '완료된 프로젝트', value: 50, suffix: '+' },
  { label: '클라이언트 만족도', value: 99, suffix: '%' },
  { label: '평균 개발 기간 단축', value: 60, suffix: '%' },
  { label: '재의뢰율', value: 95, suffix: '%' }
]

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView && metricsRef.current) {
      const numbers = metricsRef.current.querySelectorAll('.metric-number')
      
      numbers.forEach((number, index) => {
        const target = metrics[index].value
        gsap.fromTo(number, 
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            delay: index * 0.2,
            ease: "power2.out",
            snap: { textContent: 1 },
            onUpdate: function() {
              number.textContent = Math.ceil(number.textContent)
            }
          }
        )
      })
    }
  }, [isInView])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-gradient-to-b from-gray-900 to-brand-bg">
      <div className="max-w-6xl mx-auto">
        {/* 메트릭스 섹션 */}
        <motion.div 
          ref={metricsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {metrics.map((metric, index) => (
            <motion.div 
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-brand-primary mb-2">
                <span className="metric-number">0</span>
                <span>{metric.suffix}</span>
              </div>
              <div className="font-inter text-gray-300 text-sm md:text-base">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="font-pretendard font-bold text-4xl md:text-6xl text-brand-text mb-6">
            Client <span className="text-brand-primary">Testimonials</span>
          </h2>
          <p className="font-inter text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            실제 클라이언트들의 생생한 후기를 통해 바이브 코딩의 가치를 확인해보세요.
          </p>
        </motion.div>

        {/* 증언 슬라이더 */}
        <div className="relative max-w-4xl mx-auto">
          <motion.div 
            className="glass rounded-2xl p-8 md:p-12 text-center min-h-[300px] flex flex-col justify-center"
            key={currentTestimonial}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            {/* 별점 */}
            <div className="flex justify-center mb-6">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <motion.span 
                  key={i}
                  className="text-brand-primary text-2xl"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  ★
                </motion.span>
              ))}
            </div>

            {/* 증언 내용 */}
            <blockquote className="font-inter text-xl md:text-2xl text-gray-200 leading-relaxed mb-8 italic">
              "{testimonials[currentTestimonial].content}"
            </blockquote>

            {/* 프로필 */}
            <div className="flex items-center justify-center space-x-4">
              <img 
                src={testimonials[currentTestimonial].image}
                alt={testimonials[currentTestimonial].name}
                className="w-16 h-16 rounded-full object-cover border-2 border-brand-primary"
              />
              <div className="text-left">
                <div className="font-pretendard font-semibold text-brand-text text-lg">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="font-inter text-brand-primary text-sm">
                  {testimonials[currentTestimonial].role}
                </div>
                <div className="font-inter text-gray-400 text-sm">
                  {testimonials[currentTestimonial].company}
                </div>
              </div>
            </div>
          </motion.div>

          {/* 네비게이션 도트 */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-brand-primary' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 클라이언트 로고 섹션 */}
        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="font-pretendard font-semibold text-2xl text-gray-300 mb-8">
            신뢰하는 파트너사들
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['TechStart', 'Digital Solutions', 'E-commerce Plus', 'HealthTech Korea', 'AI Venture'].map((company, index) => (
              <motion.div 
                key={company}
                className="glass px-6 py-3 rounded-lg font-inter font-medium text-gray-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 0.6, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection 