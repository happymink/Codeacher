// 캐릭터 ID별 이미지 매핑
export const CHARACTER_IMAGES: Record<string, string> = {
  cody: '/characters/cody_bot_portrait.jpg',
  owl: '/characters/prof_owl_portrait.jpg',
  debuggy: '/characters/debuggy_portrait.jpg',
  speedy: '/characters/speedy_portrait.jpg',
  coco: '/characters/coco_portrait.jpg',
  cube: '/characters/prof_cube_portrait.jpg',
};

// 캐릭터 ID로 이미지 경로 가져오기
export const getCharacterImage = (characterId: string): string => {
  return CHARACTER_IMAGES[characterId] || '';
};

