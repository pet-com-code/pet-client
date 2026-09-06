// 사용자가 브라우저 주소창에 입력한 URL을 해석해서, 그에 맞는 화면(페이지 컴포넌트)을 찾아준다
// 인코딩된 한글 URL(%ED%8F%B0...) 및 영문 Alias 경로를 정문화된 한글 키로 정규화한 뒤,
// ROUTE_MAP에서 해당 컴포넌트 노드를 찾아주는 핸들러 함수입니다.

// 한글 주소: https://펫.닷컴/쇼핑/용품
// 영문 주소: https://펫.닷컴/shop/goods
// 인코딩된 주소 (SNS에 공유될 때): https://펫.닷컴/%EC%8A%88%ED%95%91/...

import { ROUTE_MAP, ALIAS_MAP, type RouteConfig } from "@/lib/routes/routeMap";

export function resolveRoute(
    slugParam: string | undefined
): RouteConfig | null {
    // slugParam: 사용자가 요청한 주소 경로

    if (!slugParam) {
        return ROUTE_MAP.default;
    } // 메인 페이지 처리 (`/`), 비어 있거나, UNDEFINED

    // URL 디코딩 및 Alias 변환
    const segments = slugParam
        .split("/") // "shop/goods" -> ['shop', 'goods']
        .filter(Boolean)
        .map((segment) => {
            // 깨진 한글 글자를 깨끗하게 복원한다. 소문자 일괄 변환
            const decoded = decodeURIComponent(segment).toLowerCase();
            // 영문 주소가 들어왔다면 대응하는 한글 단어로 바꾼다.
            // ALIAS_MAP['shop']을 찾아서 영문 'shop'이면 한글인 '쇼핑'으로 바꿔치기
            // 만약 이미 한글('쇼핑')로 입력되었다면 ALIAS_MAP['쇼핑']은 없으므로 원래 단어인 '쇼핑'을 그대로 유지
            return ALIAS_MAP[decoded] || decoded;
        });

    let current: any = ROUTE_MAP;

    // 세그먼트를 따라 트리 탐색
    // 한글 단어 순서대로 지도(ROUTE_MAP)를 따라가서 보여줄 화면을 찾아낸다.
    for (const segment of segments) {
        // segments :  // "shop/food" -> ['쇼핑', '음식']
        if (current && typeof current === "object" && segment in current) {
            current = current[segment];
        } else {
            return null; // 경로 불일치 (404)
        }
    }

    // 최종 노드 검증
    if (current && typeof current === "object") {
        if ("view" in current) {
            return current as RouteConfig;
        }
        // 중간 노드(예: /finder 또는 /finder/dog)로 접근 시 DEFAULT 노드 반환
        if ("DEFAULT" in current) {
            return current.DEFAULT as RouteConfig;
        }
    }

    return null;
}
