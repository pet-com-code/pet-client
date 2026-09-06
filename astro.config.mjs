// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
    output: "server", // 또는 'hybrid' (SSR 환경인 경우)
    adapter: cloudflare({
        // 로컬과 서버 런타임을 명시적으로 분리 지정합니다.
        imageService: {
            build: "compile", // 빌드 시점(정적 페이지)에는 이미지를 미리 컴파일
            runtime: "cloudflare-binding", // SSR/런타임 시점에는 클라우드플레어 바인딩 사용
            // runtime: "passthrough",  ⚠ 무료 플랜에서 이미지 깨짐을 방지하는 마법의 옵션
        },
    }),
    // 사이트 설정 (배포 시 도메인 주소 등)
    site: "https://XN--TE8B.XN--MK1BU44C/",
    // 통합 추가
    integrations: [sitemap()],
});
