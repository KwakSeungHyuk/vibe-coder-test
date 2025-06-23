'use client'

import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FeaturedVideoSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // YouTube 비디오 ID (실제 프로젝트에서는 실제 영상 ID로 교체)
  const videoId = 'dQw4w9WgXcQ'
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

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
            바이브 코딩 <span className="text-brand-primary">Process</span>
          </h2>
          <p className="font-inter text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            실제 프로젝트 개발 과정을 영상으로 확인해보세요.
            <br />
            아이디어부터 배포까지의 전 과정을 투명하게 공개합니다.
          </p>
        </motion.div>

        <motion.div 
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* 비디오 썸네일 */}
          <div className="relative group cursor-pointer" onClick={() => setIsVideoOpen(true)}>
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={thumbnailUrl}
                alt="Vibe Coding Process Video"
                className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* 오버레이 그라데이션 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 group-hover:from-black/40 transition-all duration-300"></div>
              
              {/* 플레이 버튼 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center group-hover:bg-brand-primary/90 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg 
                    className="w-8 h-8 text-brand-bg ml-1" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </motion.div>
              </div>

              {/* 비디오 정보 */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-pretendard font-bold text-2xl text-white mb-2">
                  바이브 코딩으로 MVP 3주 만에 완성하기
                </h3>
                <p className="font-inter text-gray-200 text-sm">
                  실제 스타트업 프로젝트의 전체 개발 과정 • 15분
                </p>
              </div>

              {/* 라이브 뱃지 */}
              <div className="absolute top-6 right-6">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  FEATURED
                </span>
              </div>
            </div>
          </div>

          {/* 추가 비디오 목록 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: '바이브 코딩 소개',
                duration: '5분',
                thumbnail: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=225&fit=crop'
              },
              {
                title: '클라이언트 인터뷰',
                duration: '8분',
                thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=225&fit=crop'
              },
              {
                title: '기술 스택 설명',
                duration: '12분',
                thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop'
              }
            ].map((video, index) => (
              <motion.div 
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setIsVideoOpen(true)}
              >
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <img 
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {video.duration}
                    </span>
                  </div>
                </div>
                <h4 className="font-inter font-medium text-brand-text group-hover:text-brand-primary transition-colors duration-300">
                  {video.title}
                </h4>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 비디오 모달 */}
        {isVideoOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div 
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="absolute -top-12 right-0 text-white hover:text-brand-primary transition-colors text-2xl"
              >
                ✕
              </button>
              
              <div className="relative w-full h-0 pb-[56.25%] bg-black rounded-lg overflow-hidden">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  title="Vibe Coding Process Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* CTA 섹션 */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="font-pretendard font-bold text-3xl text-brand-text mb-6">
            더 많은 <span className="text-brand-primary">개발 과정</span>이 궁금하신가요?
          </h3>
          <p className="font-inter text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            유튜브 채널에서 더 다양한 프로젝트 개발 과정과 기술 팁을 확인하실 수 있습니다.
          </p>
          <motion.a 
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            유튜브 채널 구독하기
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedVideoSection 