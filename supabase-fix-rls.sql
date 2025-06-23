-- ================================================
-- RLS 정책 문제 해결 스크립트
-- ================================================

-- 기존 정책들 모두 삭제
DROP POLICY IF EXISTS "Anyone can insert contact forms" ON public.contact_forms;
DROP POLICY IF EXISTS "Only authenticated users can view contact forms" ON public.contact_forms;

-- RLS 비활성화 후 재활성화 (초기화)
ALTER TABLE public.contact_forms DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_forms ENABLE ROW LEVEL SECURITY;

-- 공개 삽입 정책 (익명 사용자도 문의 등록 가능)
CREATE POLICY "Public insert access" ON public.contact_forms
    FOR INSERT 
    TO anon, authenticated 
    WITH CHECK (true);

-- 인증된 사용자만 조회 가능 (관리자용)
CREATE POLICY "Authenticated read access" ON public.contact_forms
    FOR SELECT 
    TO authenticated 
    USING (true);

-- 또는 완전 공개 정책 (테스트용)
-- CREATE POLICY "Public read access" ON public.contact_forms
--     FOR SELECT 
--     TO anon, authenticated 
--     USING (true);

-- 확인 쿼리
SELECT schemaname, tablename, policyname, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'contact_forms';

-- ================================================
-- 실행 순서:
-- 1. Supabase Dashboard > SQL Editor
-- 2. 위 스크립트 전체 복사 & 실행
-- 3. 웹사이트에서 문의 폼 다시 테스트
-- ================================================ 