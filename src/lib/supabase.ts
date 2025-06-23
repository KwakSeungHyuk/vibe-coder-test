import { createClient } from '@supabase/supabase-js'

// 브라우저 환경에서만 Supabase 클라이언트 생성
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key'

// 클라이언트 사이드에서만 실제 연결 시도
export const supabase = typeof window !== 'undefined' 
  ? createClient(supabaseUrl, supabaseKey, {
      realtime: {
        params: {
          eventsPerSecond: 2
        }
      }
    })
  : null

// 데이터베이스 타입 정의
export interface ContactForm {
  id?: string
  name: string
  email: string
  message: string
  created_at?: string
}

// 문의 등록 함수
export async function submitContactForm(formData: ContactForm) {
  console.log('🔄 Supabase 연결 시도 중...', { supabaseUrl, hasKey: !!supabaseKey })
  
  // 브라우저 환경이 아니거나 supabase 클라이언트가 없으면 에러 발생
  if (!supabase) {
    throw new Error('Supabase client not available')
  }
  
  try {
    const { data, error } = await supabase
      .from('contact_forms')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      console.error('❌ Supabase error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      })
      
      // RLS 관련 오류인 경우 특별한 처리
      if (error.code === '42501') {
        console.error('🔒 RLS 정책 문제 발생! supabase-fix-rls.sql 실행이 필요합니다.')
      }
      
      throw error
    }

    console.log('✅ Supabase 저장 성공:', data)
    return { success: true, data }
  } catch (error) {
    console.error('❌ Supabase 연결/저장 실패:', error)
    return { success: false, error }
  }
}

// 로컬 스토리지에 임시 저장하는 폴백 함수
export function saveToLocalStorage(formData: ContactForm) {
  try {
    const existingData = localStorage.getItem('vibe_contact_forms')
    const contacts = existingData ? JSON.parse(existingData) : []
    
    const newContact = {
      ...formData,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    }
    
    contacts.push(newContact)
    localStorage.setItem('vibe_contact_forms', JSON.stringify(contacts))
    
    console.log('✅ 문의가 로컬 스토리지에 저장되었습니다:', newContact)
    return { success: true, data: newContact }
  } catch (error) {
    console.error('로컬 스토리지 저장 실패:', error)
    return { success: false, error }
  }
} 