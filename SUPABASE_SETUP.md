# 🚀 Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase 웹사이트](https://supabase.com) 방문
2. GitHub 계정으로 로그인
3. "New Project" 클릭
4. 프로젝트 설정:
   - **Organization**: Personal (또는 원하는 조직)
   - **Name**: `vibe-coder-kwak-db`
   - **Database Password**: 안전한 비밀번호 생성
   - **Region**: `Northeast Asia (Seoul)` (한국 서버)
   - **Pricing Plan**: Free tier (월 500MB, 무료)

## 2. 데이터베이스 테이블 생성

1. Supabase Dashboard → **SQL Editor** 클릭
2. `supabase-schema.sql` 파일의 내용을 복사해서 붙여넣기
3. **RUN** 버튼 클릭하여 스키마 실행

## 3. API 키 설정

1. Dashboard → **Settings** → **API** 클릭
2. 다음 정보 복사:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public key**: `eyJ...` (긴 JWT 토큰)

## 4. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일 생성:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key-here
```

## 5. 실제 환경 변수로 업데이트

`src/lib/supabase.ts` 파일에서 실제 환경 변수 사용하도록 수정:

```typescript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
```

## 6. 테스트

1. 개발 서버 재시작: `npm run dev`
2. 웹사이트 Contact Section에서 문의 작성
3. 관리자 페이지에서 확인: `http://localhost:3000/admin`

## 7. 보안 설정 (선택사항)

### RLS 정책 커스터마이징
```sql
-- 관리자만 조회 가능하도록 수정
DROP POLICY "Only authenticated users can view contact forms" ON public.contact_forms;

CREATE POLICY "Admin only access" ON public.contact_forms
    FOR SELECT USING (
        auth.jwt() ->> 'email' = 'your-admin-email@example.com'
    );
```

### 스팸 방지
```sql
-- 같은 이메일로 5분 내 중복 문의 방지
CREATE OR REPLACE FUNCTION check_spam_protection()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM public.contact_forms 
        WHERE email = NEW.email 
        AND created_at > NOW() - INTERVAL '5 minutes'
    ) THEN
        RAISE EXCEPTION 'Too many requests from this email address';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER contact_forms_spam_check
    BEFORE INSERT ON public.contact_forms
    FOR EACH ROW
    EXECUTE FUNCTION check_spam_protection();
```

## 8. 프로덕션 배포 시 주의사항

- [ ] 환경 변수를 Vercel/Netlify에 등록
- [ ] Database 백업 설정
- [ ] Rate limiting 적용
- [ ] 이메일 알림 설정 (Supabase Functions 또는 Webhook)
- [ ] 관리자 인증 시스템 구축

## 9. 모니터링

- **Dashboard**: 실시간 문의 확인
- **Logs**: 오류 및 성능 모니터링
- **Usage**: API 호출량 및 스토리지 사용량 확인

---

## 🔧 문제 해결

### 연결 실패 시
1. 환경 변수 값 확인
2. Supabase 프로젝트 상태 확인
3. 콘솔에서 오류 메시지 확인
4. 로컬 스토리지 폴백 기능으로 임시 저장됨

### 권한 오류 시
1. RLS 정책 확인
2. anon key 권한 확인
3. API 사용량 한도 확인

현재 구현에서는 Supabase 연결이 실패해도 로컬 스토리지에 문의가 저장되므로 데이터 손실이 없습니다! 🎉 