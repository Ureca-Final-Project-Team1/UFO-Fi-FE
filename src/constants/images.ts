export const IMAGE_PATHS = {
  AL_SAD: '/images/alien-sad.png',
  AL_HAPPY: '/images/alien-happy.png',
  AL_ONBOARDING: '/images/alien-onboarding.png',
  AL_SELL: '/images/alien-sell.png',
  AL_REPORTED: '/images/alien-sad-reported.png',
  AL_BULK_PURCHASE: '/images/alien-bulk.png',
  AL_COMPLETE: '/images/alien-serious-reported.svg',
  AL_SOWHAT: '/images/alien-sowhat.svg',
  AL_SUCCESS: '/images/alien-success.svg',
  AL_FAIL: '/images/alien-fail.svg',
  AL_PW_WRONG: '/images/alien-wrong.svg',
  NEXT_BTN_ONBOARDING: '/images/next-btn.png',
  FIRE_BTN_ONBOARDING: '/images/fire-btn.png',
  BG_ONBOARDING: '/images/background-onboarding.png',
  BG_LOGIN: '/images/background-login.png',
  BG_BASIC: '/images/background-basic.png',
  BLACKHOLE_REAL: '/images/blackhole-real.png',
  NOT_FOUND: '/images/not-found.png',
  WARNING: '/images/warning.png',
  MAIN: '/images/main.png',
  PACKAGE_A: '/images/package-a.png',
  PACKAGE_B: '/images/package-b.png',
  PACKAGE_C: '/images/package-c.png',
  PACKAGE_D: '/images/package-d.png',
  PACKAGE_E: '/images/package-e.png',
  BANK_KAKAO: '/images/bank-kakao.png',
  BANK_WOORI: '/images/bank-woori.png',
  BANK_TOSS: '/images/bank-toss.png',
  BANK_KB: '/images/bank-kb.png',
  BANK_MG: '/images/bank-mg.png',
  BANK_SINHAN: '/images/bank-sinhan.png',
  BANK_K: '/images/bank-k.png',
  BANK_IBK: '/images/bank-ibk.png',
  BANK_HANA: '/images/bank-hana.png',
  KAKAO_LOGIN_BUTTON: '/images/kakao-login-button.png',
  UFO_LOGIN: '/images/ufo-login.png',
  PAYMENT_CHECK: '/images/check-primary.svg',
  AVATAR: '/images/avatar.svg',
  QR: '/images/QR.png',
  IC: '/images/IC.png',
  UFO_LOGO: '/images/ufo-logo.svg',
  PURCHASE_COIN: '/images/purchase-coin.svg',
  DATA_CUBE: '/images/data-cube.svg',
  PURCHASE_COMPLETED: '/images/purchase-completed.svg',
  BADGES_LOCKED: '/icons/badges/locked.svg',
} as const;

type BadgeKey = `lv${1 | 2 | 3 | 4}-${1 | 2 | 3}`;

export const BADGE_ICONS: Record<BadgeKey, string> = (() => {
  const icons = {} as Record<BadgeKey, string>;
  [1, 2, 3, 4].forEach((lv) => {
    [1, 2, 3].forEach((i) => {
      icons[`lv${lv}-${i}` as BadgeKey] = `/icons/badges/lv${lv}-${i}.svg`;
    });
  });
  return icons;
})();
