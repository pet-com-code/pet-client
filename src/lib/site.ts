export const SITE_CONFIG = {
    brand: "펫.닷컴",
    description:
        "강아지, 고양이 프리미엄 반려동물 용품 쇼핑몰, 실종 반려동물 찾기, 유기동물 제보 및 입양/분양 플랫폼",
    defaultImage: "/default-og-image.png",
    theme: {
        // 브라우저 쿠키(Cookie)에 테마 이름을 저장하고 불러올 때 사용하는 식별용 이름(Key)
        cookieKey: "pet-theme",
        // 브라우저 로컬 스토리지(LocalStorage)에 테마 상태를 저장할 때 사용하는 식별용 이름(Key)
        storageKey: "pet-theme",
        // 사용자가 사이트에 처음 방문했거나 저장된 테마 정보(쿠키/로컬스토리지)가 없을 때 적용할 기본 테마 값(Value)
        defaultTheme: "dog"
    }
} as const;
