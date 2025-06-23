'use client'

import React, { useState, useEffect } from 'react'
import { supabase, type ContactForm } from '@/lib/supabase'

interface AdminPageProps {}

const AdminPage: React.FC<AdminPageProps> = () => {
  const [contacts, setContacts] = useState<ContactForm[]>([])
  const [localContacts, setLocalContacts] = useState<ContactForm[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'supabase' | 'local'>('supabase')

  // Supabase에서 데이터 로드
  const loadSupabaseContacts = async () => {
    try {
      if (!supabase) {
        console.log('Supabase 클라이언트가 없습니다 (서버 사이드 렌더링)')
        return
      }

      const { data, error } = await supabase
        .from('contact_forms')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Supabase 조회 오류:', error)
        return
      }

      setContacts(data || [])
    } catch (error) {
      console.error('Supabase 연결 실패:', error)
    }
  }

  // 로컬 스토리지에서 데이터 로드
  const loadLocalContacts = () => {
    try {
      const existingData = localStorage.getItem('vibe_contact_forms')
      if (existingData) {
        const parsed = JSON.parse(existingData)
        setLocalContacts(parsed.reverse()) // 최신순으로 정렬
      }
    } catch (error) {
      console.error('로컬 스토리지 조회 실패:', error)
    }
  }

  useEffect(() => {
    const initData = async () => {
      setIsLoading(true)
      await loadSupabaseContacts()
      loadLocalContacts()
      setIsLoading(false)
    }

    initData()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const ContactCard = ({ contact }: { contact: ContactForm }) => (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-brand-primary">{contact.name}</h3>
        <span className="text-sm text-gray-400">
          {contact.created_at ? formatDate(contact.created_at) : '날짜 없음'}
        </span>
      </div>
      
      <div className="mb-4">
        <span className="text-sm text-gray-400">이메일: </span>
        <a href={`mailto:${contact.email}`} className="text-brand-primary hover:underline">
          {contact.email}
        </a>
      </div>
      
      <div className="mb-4">
        <span className="text-sm text-gray-400">문의 내용:</span>
        <p className="text-white mt-2 whitespace-pre-wrap">{contact.message}</p>
      </div>
      
      <div className="text-xs text-gray-500">
        ID: {contact.id}
      </div>
    </div>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="text-brand-primary text-xl">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-bg text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-brand-primary mb-8 text-center">
          📨 문의 관리 대시보드
        </h1>

        {/* 탭 네비게이션 */}
        <div className="flex mb-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('supabase')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'supabase'
                ? 'text-brand-primary border-b-2 border-brand-primary'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Supabase 문의 ({contacts.length})
          </button>
          <button
            onClick={() => setActiveTab('local')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'local'
                ? 'text-brand-primary border-b-2 border-brand-primary'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            로컬 스토리지 문의 ({localContacts.length})
          </button>
        </div>

        {/* 새로고침 버튼 */}
        <div className="mb-6 text-center">
          <button
            onClick={async () => {
              setIsLoading(true)
              await loadSupabaseContacts()
              loadLocalContacts()
              setIsLoading(false)
            }}
            className="px-6 py-2 bg-brand-primary text-brand-bg rounded-lg hover:bg-brand-primary/90 transition-colors"
          >
            🔄 데이터 새로고침
          </button>
        </div>

        {/* 문의 목록 */}
        {activeTab === 'supabase' && (
          <div>
            {contacts.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                아직 Supabase에 저장된 문의가 없습니다.
              </div>
            ) : (
              contacts.map(contact => (
                <ContactCard key={contact.id} contact={contact} />
              ))
            )}
          </div>
        )}

        {activeTab === 'local' && (
          <div>
            {localContacts.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                아직 로컬 스토리지에 저장된 문의가 없습니다.
              </div>
            ) : (
              localContacts.map(contact => (
                <ContactCard key={contact.id} contact={contact} />
              ))
            )}
          </div>
        )}

        {/* 안내 메시지 */}
        <div className="mt-12 p-6 bg-gray-800 border border-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold text-brand-primary mb-4">💡 사용 안내</h3>
          <ul className="text-gray-300 space-y-2">
            <li>• <strong>Supabase 문의:</strong> 실제 데이터베이스에 저장된 문의</li>
            <li>• <strong>로컬 스토리지 문의:</strong> Supabase 연결 실패 시 브라우저에 임시 저장된 문의</li>
            <li>• 문의자 이메일 클릭으로 바로 답변 메일 작성 가능</li>
            <li>• 새로고침 버튼으로 최신 데이터 확인</li>
          </ul>
        </div>

        {/* 홈으로 돌아가기 */}
        <div className="text-center mt-8">
          <a 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            ← 홈으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  )
}

export default AdminPage 