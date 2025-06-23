import { createClient } from '@supabase/supabase-js'

// 브라우저 환경에서만 Supabase 클라이언트 생성
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 환경 변수가 설정되어 있고 유효한 경우에만 실제 연결 시도
const isValidSupabaseConfig = supabaseUrl && 
  supabaseKey && 
  supabaseUrl.startsWith('https://') && 
  !supabaseUrl.includes('demo.supabase.co') &&
  supabaseKey !== 'demo-key'

export const supabase = typeof window !== 'undefined' && isValidSupabaseConfig
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
  console.log('🔄 문의 저장 시도 중...', { 
    hasValidConfig: isValidSupabaseConfig,
    supabaseUrl: supabaseUrl || '설정되지 않음',
    hasKey: !!supabaseKey 
  })
  
  // 유효한 Supabase 설정이 없으면 바로 로컬 스토리지로 저장
  if (!isValidSupabaseConfig || !supabase) {
    console.log('ℹ️ Supabase 설정이 없어 로컬 스토리지에 저장합니다')
    return saveToLocalStorage(formData)
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
      
      // Supabase 오류 시 로컬 스토리지로 폴백
      console.log('⚠️ Supabase 오류로 로컬 스토리지에 저장합니다')
      return saveToLocalStorage(formData)
    }

    console.log('✅ Supabase 저장 성공:', data)
    return { success: true, data }
  } catch (error) {
    console.error('❌ Supabase 연결/저장 실패:', error)
    console.log('⚠️ 연결 실패로 로컬 스토리지에 저장합니다')
    return saveToLocalStorage(formData)
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
    console.error('❌ 로컬 스토리지 저장 실패:', error)
    return { success: false, error }
  }
} 