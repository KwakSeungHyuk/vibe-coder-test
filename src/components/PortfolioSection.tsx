'use client'

import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const portfolioData = [
  {
    id: 1,
    title: 'AI 스타트업 MVP',
    category: 'MVP Development',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop',
    description: '3주 만에 완성된 AI 기반 데이터 분석 플랫폼',
    tags: ['React', 'Python', 'TensorFlow', 'AWS'],
    timeline: '3주',
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    id: 2,
    title: 'E-commerce 플랫폼',
    category: 'Full Stack',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    description: '확장 가능한 온라인 쇼핑몰 솔루션',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
    timeline: '6주',
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    id: 3,
    title: '실시간 채팅 앱',
    category: 'Real-time App',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    description: '5000+ 동시 접속자 지원하는 채팅 플랫폼',
    tags: ['React', 'Socket.io', 'Redis', 'Docker'],
    timeline: '4주',
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    id: 4,
    title: '헬스케어 대시보드',
    category: 'Data Visualization',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
    description: '의료진을 위한 환자 데이터 시각화 솔루션',
    tags: ['Vue.js', 'D3.js', 'MongoDB', 'Express'],
    timeline: '5주',
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    id: 5,
    title: 'IoT 모니터링 시스템',
    category: 'IoT Solution',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&h=400&fit=crop',
    description: '실시간 IoT 디바이스 모니터링 및 제어',
    tags: ['React', 'MQTT', 'InfluxDB', 'Grafana'],
    timeline: '7주',
    github: 'https://github.com',
    demo: 'https://demo.com'
  },
  {
    id: 6,
    title: 'AI 챗봇 플랫폼',
    category: 'AI/ML',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    description: '자연어 처리 기반 고객 서비스 챗봇',
    tags: ['Python', 'OpenAI', 'FastAPI', 'React'],
    timeline: '8주',
    github: 'https://github.com',
    demo: 'https://demo.com'
  }
]

const categories = ['All', 'MVP Development', 'Full Stack', 'Real-time App', 'Data Visualization', 'IoT Solution', 'AI/ML']

const PortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const filteredProjects = selectedCategory === 'All' 
    ? portfolioData 
    : portfolioData.filter(project => project.category === selectedCategory)

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-pretendard font-bold text-4xl md:text-6xl text-brand-text mb-6">
            Portfolio <span className="text-brand-primary">Gallery</span>
          </h2>
          <p className="font-inter text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            실제 프로젝트를 통해 입증된 바이브 코딩의 효과를 확인해보세요.
            <br />
            각 프로젝트는 클라이언트의 실제 비즈니스 문제를 해결했습니다.
          </p>
        </motion.div>

        {/* 카테고리 필터 */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-brand-primary text-brand-bg'
                  : 'bg-transparent border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-bg'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* 포트폴리오 그리드 */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative overflow-hidden rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => setSelectedProject(project)}
            >
              {/* 프로젝트 이미지 */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* 호버 오버레이 */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-4">
                    <a 
                      href={project.github}
                      className="p-3 bg-brand-primary rounded-full text-brand-bg hover:bg-brand-primary/90 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                    </a>
                    <a 
                      href={project.demo}
                      className="p-3 bg-brand-primary rounded-full text-brand-bg hover:bg-brand-primary/90 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* 프로젝트 정보 */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-brand-primary text-sm font-medium">{project.category}</span>
                  <span className="text-gray-400 text-sm">{project.timeline}</span>
                </div>
                
                <h3 className="font-pretendard font-semibold text-xl text-brand-text mb-3">
                  {project.title}
                </h3>
                
                <p className="font-inter text-gray-300 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-brand-primary/20 text-brand-primary text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 프로젝트 상세 모달 */}
        {selectedProject && (
          <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-brand-primary font-medium">{selectedProject.category}</span>
                  <span className="text-gray-400">{selectedProject.timeline}</span>
                </div>
                
                <h3 className="font-pretendard font-bold text-3xl text-brand-text mb-4">
                  {selectedProject.title}
                </h3>
                
                <p className="font-inter text-gray-300 leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag: string) => (
                    <span 
                      key={tag}
                      className="px-4 py-2 bg-brand-primary/20 text-brand-primary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a 
                    href={selectedProject.github}
                    className="flex-1 py-3 bg-gray-700 text-center text-brand-text font-medium rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    GitHub 보기
                  </a>
                  <a 
                    href={selectedProject.demo}
                    className="flex-1 py-3 bg-brand-primary text-center text-brand-bg font-medium rounded-lg hover:bg-brand-primary/90 transition-colors"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default PortfolioSection 