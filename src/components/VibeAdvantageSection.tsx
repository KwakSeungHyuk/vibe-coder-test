'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const advantages = [
  {
    icon: '⚡',
    title: '빠른 속도',
    description: '전통적인 개발보다 3배 빠른 개발 속도로 시장 진입 시기를 앞당깁니다.',
    stats: '3x 빠른 개발',
    features: ['MVP 2주 완성', '빠른 프로토타이핑', '효율적인 워크플로우']
  },
  {
    icon: '💎',
    title: '최고 품질',
    description: '속도를 위해 품질을 포기하지 않습니다. 확장 가능하고 유지보수가 쉬운 코드를 제공합니다.',
    stats: '99.9% 안정성',
    features: ['클린 코드', '테스트 자동화', '확장 가능한 아키텍처']
  },
  {
    icon: '🤝',
    title: '완벽한 협업',
    description: '실시간 소통과 투명한 진행 상황 공유로 클라이언트와의 완벽한 협업을 구현합니다.',
    stats: '100% 투명성',
    features: ['실시간 업데이트', '명확한 커뮤니케이션', '유연한 대응']
  }
]

const VibeAdvantageSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-brand-bg">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-pretendard font-bold text-4xl md:text-6xl text-brand-text mb-6">
            Vibe Coding <span className="text-brand-primary">Advantage</span>
          </h2>
          <p className="font-inter text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            바이브 코딩이 다른 개발 방식과 차별화되는 핵심 요소들을 확인해보세요.
            <br />
            단순한 개발을 넘어 비즈니스 성공을 위한 파트너십을 제공합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="glass rounded-2xl p-8 h-full hover:bg-white/10 transition-all duration-300 transform group-hover:scale-105">
                {/* 아이콘 */}
                <motion.div 
                  className="text-6xl mb-6 text-center"
                  whileHover={{ 
                    scale: 1.2,
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  {advantage.icon}
                </motion.div>

                {/* 제목 */}
                <h3 className="font-pretendard font-bold text-2xl text-brand-text mb-4 text-center">
                  {advantage.title}
                </h3>

                {/* 통계 */}
                <div className="text-center mb-6">
                  <span className="text-brand-primary font-bold text-xl bg-brand-primary/20 px-4 py-2 rounded-full">
                    {advantage.stats}
                  </span>
                </div>

                {/* 설명 */}
                <p className="font-inter text-gray-300 leading-relaxed mb-6 text-center">
                  {advantage.description}
                </p>

                {/* 특징 목록 */}
                <ul className="space-y-3">
                  {advantage.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex}
                      className="flex items-center font-inter text-sm text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: (index * 0.2) + (featureIndex * 0.1) + 0.8 }}
                    >
                      <div className="w-2 h-2 bg-brand-primary rounded-full mr-3"></div>
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* 호버 효과 */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-brand-primary/30 transition-all duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA 섹션 */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="font-pretendard font-bold text-3xl text-brand-text mb-6">
            바이브 코딩의 차이를 <span className="text-brand-primary">직접 경험</span>해보세요
          </h3>
          <p className="font-inter text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            무료 컨설팅을 통해 여러분의 프로젝트에 바이브 코딩을 어떻게 적용할 수 있는지 알아보세요.
          </p>
          <motion.button 
            className="px-8 py-4 bg-brand-primary text-brand-bg font-semibold rounded-lg hover:bg-brand-primary/90 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            무료 컨설팅 신청하기
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default VibeAdvantageSection 