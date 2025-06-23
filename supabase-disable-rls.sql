-- ================================================
-- 개발/테스트용 RLS 완전 비활성화
-- ⚠️ 주의: 프로덕션에서는 사용하지 마세요!
-- ================================================

-- RLS 완전 비활성화
ALTER TABLE public.contact_forms DISABLE ROW LEVEL SECURITY;

-- 모든 정책 삭제
DROP POLICY IF EXISTS "Anyone can insert contact forms" ON public.contact_forms;
DROP POLICY IF EXISTS "Only authenticated users can view contact forms" ON public.contact_forms;
DROP POLICY IF EXISTS "Public insert access" ON public.contact_forms;
DROP POLICY IF EXISTS "Authenticated read access" ON public.contact_forms;

-- 확인
SELECT 
    tablename, 
    rowsecurity as "RLS Enabled"
FROM pg_tables 
WHERE tablename = 'contact_forms';

-- ================================================
-- 이제 누구나 자유롭게 데이터를 읽고 쓸 수 있습니다
-- 개발이 완료되면 RLS를 다시 활성화하세요!
-- ================================================ 