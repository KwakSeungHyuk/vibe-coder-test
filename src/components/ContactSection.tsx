'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { submitContactForm, saveToLocalStorage, type ContactForm } from '@/lib/supabase'

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // 문의 저장 시도 (Supabase 또는 로컬 스토리지)
      const result = await submitContactForm(formData as ContactForm)
      
      if (result.success) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
        console.log('✅ 문의가 성공적으로 저장되었습니다:', result.data)
      } else {
        setSubmitStatus('error')
        console.error('❌ 저장 실패:', (result as any).error)
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('❌ 예상치 못한 오류:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

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
            Let's Build <span className="text-brand-primary">Together</span>
          </h2>
          <p className="font-inter text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            아이디어가 있으시나요? 함께 현실로 만들어보세요.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {[
            { icon: '💬', title: '카카오톡', desc: '빠른 상담', link: 'https://open.kakao.com' },
            { icon: '📧', title: '이메일', desc: '자세한 문의', link: 'mailto:contact@example.com' },
            { icon: '📹', title: '화상미팅', desc: '직접 상담', link: 'https://calendly.com' }
          ].map((contact, index) => (
            <motion.a
              key={contact.title}
              href={contact.link}
              className="glass rounded-xl p-8 text-center hover:bg-white/10 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-5xl mb-4">{contact.icon}</div>
              <h3 className="font-pretendard font-bold text-xl text-brand-text mb-2 group-hover:text-brand-primary transition-colors">
                {contact.title}
              </h3>
              <p className="font-inter text-gray-300">{contact.desc}</p>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="glass rounded-2xl p-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="font-pretendard font-bold text-2xl text-brand-text mb-6 text-center">
            프로젝트 문의하기
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-inter text-sm text-gray-300 mb-2">이름</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-brand-text focus:border-brand-primary focus:outline-none transition-colors"
                placeholder="홍길동"
              />
            </div>

            <div>
              <label className="block font-inter text-sm text-gray-300 mb-2">이메일</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-brand-text focus:border-brand-primary focus:outline-none transition-colors"
                placeholder="contact@example.com"
              />
            </div>

            <div>
              <label className="block font-inter text-sm text-gray-300 mb-2">메시지</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-brand-text focus:border-brand-primary focus:outline-none transition-colors resize-vertical"
                placeholder="프로젝트에 대해 자세히 설명해주세요."
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 font-semibold rounded-lg transition-all duration-300 ${
                isSubmitting 
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                  : 'bg-brand-primary text-brand-bg hover:bg-brand-primary/90'
              }`}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? '전송 중...' : '문의 보내기'}
            </motion.button>

            {/* 상태 메시지 */}
            {submitStatus === 'success' && (
              <motion.div 
                className="mt-4 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ✅ 문의가 성공적으로 접수되었습니다! 24시간 내에 답변드리겠습니다.
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div 
                className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ❌ 문의 전송에 실패했습니다. 다시 시도해주세요.
              </motion.div>
            )}
          </form>
        </motion.div>

        <motion.footer 
          className="mt-24 pt-12 border-t border-gray-800 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h4 className="font-pretendard font-bold text-2xl text-brand-primary mb-4">
            Vibe Coder Kwak
          </h4>
          <p className="font-inter text-gray-400">
            © 2024 Vibe Coder Kwak. All rights reserved.
          </p>
        </motion.footer>
      </div>
    </section>
  )
}

export default ContactSection
