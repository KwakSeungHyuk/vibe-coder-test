'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const techStacks = [
  {
    category: 'Frontend',
    color: 'from-blue-500 to-purple-600',
    technologies: [
      { name: 'React/Next.js', icon: '⚛️', proficiency: 95 },
      { name: 'TypeScript', icon: '🔷', proficiency: 90 },
      { name: 'Tailwind CSS', icon: '🎨', proficiency: 88 },
      { name: 'Framer Motion', icon: '✨', proficiency: 85 }
    ]
  },
  {
    category: 'Backend',
    color: 'from-green-500 to-teal-600',
    technologies: [
      { name: 'Node.js/Express', icon: '🟢', proficiency: 92 },
      { name: 'Python/Django', icon: '🐍', proficiency: 88 },
      { name: 'GraphQL/REST', icon: '🔗', proficiency: 90 },
      { name: 'Socket.io', icon: '⚡', proficiency: 85 }
    ]
  },
  {
    category: 'Database',
    color: 'from-orange-500 to-red-600',
    technologies: [
      { name: 'PostgreSQL', icon: '🐘', proficiency: 90 },
      { name: 'MongoDB', icon: '🍃', proficiency: 88 },
      { name: 'Redis', icon: '🔴', proficiency: 85 },
      { name: 'Prisma/Mongoose', icon: '💾', proficiency: 87 }
    ]
  },
  {
    category: 'Cloud & DevOps',
    color: 'from-purple-500 to-pink-600',
    technologies: [
      { name: 'AWS/Vercel', icon: '☁️', proficiency: 88 },
      { name: 'Docker/K8s', icon: '🐳', proficiency: 82 },
      { name: 'GitHub Actions', icon: '🔄', proficiency: 85 },
      { name: 'Monitoring/Logs', icon: '📊', proficiency: 80 }
    ]
  }
]

const developmentProcess = [
  {
    step: 1,
    title: 'Discovery & Planning',
    description: '요구사항 분석 및 기술 스택 선정',
    duration: '1-2일',
    icon: '🔍'
  },
  {
    step: 2,
    title: 'Design & Prototyping',
    description: 'UI/UX 디자인 및 프로토타입 제작',
    duration: '2-3일',
    icon: '🎨'
  },
  {
    step: 3,
    title: 'Development Sprint',
    description: '핵심 기능 개발 및 반복 구현',
    duration: '1-3주',
    icon: '⚡'
  },
  {
    step: 4,
    title: 'Testing & QA',
    description: '테스트 자동화 및 품질 보증',
    duration: '2-3일',
    icon: '🧪'
  },
  {
    step: 5,
    title: 'Deployment & Launch',
    description: '배포 및 런칭 지원',
    duration: '1-2일',
    icon: '🚀'
  }
]

const TechStackSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const processRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-gradient-to-b from-brand-bg to-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-pretendard font-bold text-4xl md:text-6xl text-brand-text mb-6">
            Tech Stack & <span className="text-brand-primary">Process</span>
          </h2>
          <p className="font-inter text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            최신 기술 스택과 체계적인 개발 프로세스로 안정적이고 확장 가능한 솔루션을 제공합니다.
          </p>
        </motion.div>

        {/* 기술 스택 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {techStacks.map((stack, stackIndex) => (
            <motion.div
              key={stack.category}
              className="glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: stackIndex * 0.1 }}
            >
              <div className={`text-center mb-6 p-4 rounded-xl bg-gradient-to-r ${stack.color} bg-opacity-20`}>
                <h3 className="font-pretendard font-bold text-2xl text-brand-text">
                  {stack.category}
                </h3>
              </div>

              <div className="space-y-4">
                {stack.technologies.map((tech, techIndex) => (
                  <motion.div
                    key={tech.name}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: (stackIndex * 0.1) + (techIndex * 0.05) + 0.3 }}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{tech.icon}</span>
                      <span className="font-inter text-brand-text font-medium">
                        {tech.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${stack.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${tech.proficiency}%` } : {}}
                          transition={{ duration: 1, delay: (stackIndex * 0.1) + (techIndex * 0.05) + 0.5 }}
                        />
                      </div>
                      <span className="text-brand-primary font-semibold text-sm">
                        {tech.proficiency}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 개발 프로세스 */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="font-pretendard font-bold text-3xl md:text-4xl text-brand-text mb-4">
            Development <span className="text-brand-primary">Process</span>
          </h3>
          <p className="font-inter text-lg text-gray-300 max-w-2xl mx-auto">
            체계적이고 투명한 개발 프로세스로 프로젝트의 성공을 보장합니다.
          </p>
        </motion.div>

        <div ref={processRef} className="relative">
          {/* 프로세스 연결 라인 */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-primary via-brand-primary to-brand-primary transform -translate-y-1/2 opacity-30"></div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {developmentProcess.map((process, index) => (
              <motion.div
                key={process.step}
                className="relative text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                {/* 프로세스 아이콘 */}
                <motion.div 
                  className="relative z-10 w-20 h-20 mx-auto mb-4 bg-brand-primary rounded-full flex items-center justify-center text-3xl border-4 border-brand-bg"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {process.icon}
                </motion.div>

                {/* 단계 번호 */}
                <div className="text-brand-primary font-bold text-sm mb-2">
                  STEP {process.step}
                </div>

                {/* 제목 */}
                <h4 className="font-pretendard font-semibold text-brand-text mb-2 text-sm md:text-base">
                  {process.title}
                </h4>

                {/* 설명 */}
                <p className="font-inter text-gray-300 text-xs md:text-sm leading-relaxed mb-2">
                  {process.description}
                </p>

                {/* 소요 시간 */}
                <div className="text-brand-primary text-xs font-medium bg-brand-primary/20 px-3 py-1 rounded-full inline-block">
                  {process.duration}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA 섹션 */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="glass rounded-2xl p-8 md:p-12">
            <h3 className="font-pretendard font-bold text-3xl text-brand-text mb-6">
              당신의 프로젝트에 <span className="text-brand-primary">최적화된 기술 스택</span>을 제안해드립니다
            </h3>
            <p className="font-inter text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              프로젝트 규모와 요구사항에 맞는 맞춤형 기술 스택과 개발 계획을 제공합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="px-8 py-4 bg-brand-primary text-brand-bg font-semibold rounded-lg hover:bg-brand-primary/90 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                기술 상담 받기
              </motion.button>
              <motion.button 
                className="px-8 py-4 border border-brand-primary text-brand-primary font-semibold rounded-lg hover:bg-brand-primary hover:text-brand-bg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                프로세스 자료 받기
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TechStackSection 