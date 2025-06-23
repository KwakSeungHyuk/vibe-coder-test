'use client'

import React, { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'

const timelineData = [
  {
    year: '2018',
    title: '개발 여정 시작',
    description: '프로그래밍의 세계에 첫 발을 내딛으며 웹 개발 기초를 다지기 시작했습니다.'
  },
  {
    year: '2020',
    title: '풀스택 개발자 전환',
    description: '프론트엔드부터 백엔드까지 전체 스택을 다루며 종합적인 개발 역량을 키웠습니다.'
  },
  {
    year: '2022',
    title: '바이브 코딩 방법론 개발',
    description: '빠르고 효율적인 개발을 위한 독창적인 바이브 코딩 방법론을 완성했습니다.'
  },
  {
    year: '2024',
    title: '50+ 프로젝트 완성',
    description: '스타트업부터 대기업까지 다양한 규모의 프로젝트를 성공적으로 론칭했습니다.'
  }
]

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView && timelineRef.current) {
      const items = timelineRef.current.querySelectorAll('.timeline-item')
      
      gsap.fromTo(items, 
        {
          x: -50,
          opacity: 0,
          scale: 0.9
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out"
        }
      )
    }
  }, [isInView])

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
            About <span className="text-brand-primary">Vibe Coder</span>
          </h2>
          <p className="font-inter text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            단순한 코딩을 넘어, 감각적이고 효율적인 개발 경험을 제공합니다.
            <br />
            여러분의 비전을 현실로 만드는 것이 저의 미션입니다.
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* 타임라인 라인 */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-primary transform md:-translate-x-1/2"></div>

          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              className={`timeline-item relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* 타임라인 포인트 */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-brand-primary rounded-full transform -translate-x-1/2 z-10 border-4 border-brand-bg"></div>

              {/* 콘텐츠 카드 */}
              <div className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                <motion.div 
                  className="glass rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="text-brand-primary font-bold text-2xl mb-2">{item.year}</div>
                  <h3 className="font-pretendard font-semibold text-xl text-brand-text mb-3">
                    {item.title}
                  </h3>
                  <p className="font-inter text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 스킬 섹션 */}
        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="font-pretendard font-bold text-3xl text-brand-text mb-8">
            Core <span className="text-brand-primary">Skills</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              'React/Next.js',
              'TypeScript',
              'Node.js/Express',
              'Python/Django',
              'AWS/Vercel',
              'MongoDB/PostgreSQL',
              'Docker/K8s',
              'GraphQL/REST'
            ].map((skill, index) => (
              <motion.div
                key={skill}
                className="glass rounded-lg p-4 hover:bg-brand-primary/10 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="font-inter font-medium text-brand-text">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection 