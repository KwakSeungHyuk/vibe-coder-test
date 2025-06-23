-- ================================================
-- Vibe Coder Kwak - Contact Forms 테이블 생성
-- ================================================

-- contact_forms 테이블 생성
CREATE TABLE IF NOT EXISTS public.contact_forms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- RLS (Row Level Security) 활성화
ALTER TABLE public.contact_forms ENABLE ROW LEVEL SECURITY;

-- 공개 삽입 정책 (누구나 문의 등록 가능)
CREATE POLICY "Anyone can insert contact forms" ON public.contact_forms
    FOR INSERT WITH CHECK (true);

-- 관리자만 조회 가능한 정책 (보안)
-- 실제 운영에서는 관리자 권한 확인 로직 추가 필요
CREATE POLICY "Only authenticated users can view contact forms" ON public.contact_forms
    FOR SELECT USING (false); -- 기본적으로 조회 차단

-- 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_contact_forms_created_at ON public.contact_forms(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_forms_email ON public.contact_forms(email);

-- 자동 updated_at 업데이트를 위한 함수
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- updated_at 자동 업데이트 트리거
CREATE TRIGGER contact_forms_updated_at
    BEFORE UPDATE ON public.contact_forms
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 댓글
COMMENT ON TABLE public.contact_forms IS 'Vibe Coder Kwak 웹사이트의 문의 폼 데이터';
COMMENT ON COLUMN public.contact_forms.id IS '고유 식별자';
COMMENT ON COLUMN public.contact_forms.name IS '문의자 이름';
COMMENT ON COLUMN public.contact_forms.email IS '문의자 이메일';
COMMENT ON COLUMN public.contact_forms.message IS '문의 내용';
COMMENT ON COLUMN public.contact_forms.created_at IS '생성 일시 (UTC)';
COMMENT ON COLUMN public.contact_forms.updated_at IS '수정 일시 (UTC)';

-- ================================================
-- 사용 방법:
-- 1. Supabase Dashboard > SQL Editor에서 위 쿼리 실행
-- 2. .env.local 파일에 Supabase URL과 anon key 설정
-- 3. 웹사이트에서 문의 폼 테스트
-- ================================================ 