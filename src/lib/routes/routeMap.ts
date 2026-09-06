// 매핑 데이터 및 에이커스(Alias) 구조 설계
// 단순 문자열 비교뿐만 아니라 한글 URL과 영문 URL을 모두
// 동일한 메타데이터로 접근할 수 있도록 영문 매핑 테이블을 추가한 라우트 맵입니다.

import Home from "@/page/HomePage.astro";
import Search from "@/page/SearchPage.astro";
import Page404 from "@/page/Page404.astro";

import Sign from "@/page/auth/SignPage.astro";
import MyBoard from "@/page/auth/MyBoardPage.astro";

import Shorts from "@/page/shorts/ShortsPage.astro";

import Find from "@/page/finder/FindPage.astro";
import CatFind from "@/page/finder/CatFindPage.astro";
import DogFind from "@/page/finder/DogFindPage.astro";
import CatAdopt from "@/page/finder/CatAdoptPage.astro";
import DogAdopt from "@/page/finder/DogAdoptPage.astro";
import CatPickup from "@/page/finder/CatPickupPage.astro";
import DogPickup from "@/page/finder/DogPickupPage.astro";

import Shop from "@/page/shop/ShopPage.astro";
import Food from "@/page/shop/FoodPage.astro";
import Snack from "@/page/shop/SnackPage.astro";
import Toy from "@/page/shop/ToyPage.astro";
import Supplies from "@/page/shop/SuppliesPage.astro";
import Clothing from "@/page/shop/ClothingPage.astro";

export interface RouteConfig {
    view: any;
    title: string;
    description: string;
    isLogin?: boolean;
}

// 1. 한글 경로 <-> 영문 경로 Alias 매핑, 영문-한글 변환표
export const ALIAS_MAP: Record<string, string> = {
    // 1Depth
    auth: "인증",
    myboard: "마이보드",
    search: "검색",
    shorts: "쇼츠",
    shop: "쇼핑",
    finder: "파인더",

    // 2Depth (인증, 쇼핑, 파인더 서브)
    login: "로그인",
    signup: "회원가입",

    food: "음식",
    snack: "간식",
    toy: "장난감",
    goods: "용품",
    clothing: "의류",

    dog: "강아지",
    cat: "고양이",

    // 3Depth (파인더 액션)
    adopt: "입양",
    pickup: "보호"
};

// 2. 원본 ROUTE_MAP 데이터, 지도 데이터
export const ROUTE_MAP: Record<string, any> = {
    default: { view: Home, title: "홈", description: "홈 페이지입니다." },
    마이보드: {
        view: MyBoard,
        title: "마이보드",
        description: "마이보드 페이지입니다."
    },
    검색: {
        view: Search,
        title: "검색",
        description: "통합 검색 페이지입니다."
    },
    쇼츠: { view: Shorts, title: "쇼츠", description: "쇼츠 페이지입니다." },
    인증: {
        로그인: {
            view: Sign,
            title: "로그인",
            isLogin: true,
            description: "로그인 페이지입니다."
        },
        회원가입: {
            view: Sign,
            title: "회원가입",
            isLogin: false,
            description: "회원가입 페이지입니다."
        }
    },
    쇼핑: {
        DEFAULT: { view: Shop, title: "쇼핑", description: "쇼핑몰 메인" },
        음식: { view: Food, title: "음식", description: "사료 및 먹거리" },
        간식: { view: Snack, title: "간식", description: "수제 간식" },
        장난감: { view: Toy, title: "장난감", description: "장난감 모음" },
        용품: { view: Supplies, title: "용품", description: "필수 반려용품" },
        의류: { view: Clothing, title: "의류", description: "반려동물 의류" }
    },
    파인더: {
        DEFAULT: {
            view: Find,
            title: "애완동물 찾기, 입양, 보호",
            description: "파인더 메인"
        },
        강아지: {
            DEFAULT: {
                view: DogFind,
                title: "강아지 찾기",
                description: "강아지 통합 목록"
            },
            입양: {
                view: DogAdopt,
                title: "강아지 입양",
                description: "강아지 입양"
            },
            보호: {
                view: DogPickup,
                title: "강아지 보호",
                description: "강아지 보호"
            }
        },
        고양이: {
            DEFAULT: {
                view: CatFind,
                title: "고양이 찾기",
                description: "고양이 통합 목록"
            },
            입양: {
                view: CatAdopt,
                title: "고양이 입양",
                description: "고양이 입양"
            },
            보호: {
                view: CatPickup,
                title: "고양이 보호",
                description: "고양이 보호"
            }
        }
    }
};
