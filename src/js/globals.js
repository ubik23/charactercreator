var maleForm1 = {
  Body_head: ['default', 'diamond', 'heart', 'oblong', 'oval', 'round', 'square', 'triangle'],
  Ears: ['default', 'elven', 'pointed', 'outstretched', 'plugged', 'unplugged'],
  Iris: ['default'],
  Pupils: ['round', 'feline', 'star'],
  Nose: ['default', 'pointed', 'roman', 'strong', 'syrid'],
  Mouth: [''],
  Facialhair: ['', 'beard_boxed', 'beard_ducktail', 'beard_guru', 'beard_intelectual', 'beard_rap', 'beard_raw', 'chinpuff', 'goatee', 'goatee_raw', 'moustache', 'moustache_dali', 'moustache_thick', 'muttonchops', 'muttonchops_friendly', 'soulpatch', 'winnfield'],
  Hair: ['', 'afro', 'balding', 'balding_crazy', 'balding_crown', 'crewcut', 'down', 'emo', 'spider', 'gelled', 'wavy', 'manga', 'mohawk', 'wild', 'wreckingball'],
  Freckles: ['', 'medium'],
  Emotion: ['neutral', 'alertness', 'amusement', 'anger', 'anxiety', 'aversion', 'betrayal', 'caged', 'concern', 'cruel', 'dejection', 'desperation', 'disdain', 'disgust', 'eeww', 'fear', 'grief', 'horror', 'indignation', 'joy', 'laughing', 'melancholy', 'omg', 'outrage', 'pain', 'rage', 'revulsion', 'sadness', 'satisfaction', 'shock', 'sterness', 'surprise', 'terror', 'wonder', 'wtf']
}
var maleForm2 = {
  Smoke: ['', 'blunt', 'cigar', 'cigarette', 'filter', 'pipe_subgenius'],
  Earings: ['', 'gold_rings', 'gold_ring_right', 'gold_ring_left'],
  Hat: ['', 'baseball', 'berret', 'berret_badge', 'cap', 'chinese_farmer', 'country', 'cowboy', 'fedora', 'football', 'fox-ears', 'jester', 'top', 'motorcycle', 'police', 'scumbag', 'helmet_vietnam', 'tuque', 'turban', 'strainer', 'magritte', 'xmas'],
  Horns: ['', 'devil', 'large'],
  Mask: ['', /* 'arrow', */ 'guy_fawkes', 'robin', 'horse', 'hospital', 'stormtrooper', 'jason', 'cat'],
  Glasses: ['', 'alien', 'designer', 'fpv', 'goggles', 'google', 'hipster', 'kurt', 'neon', 'oakley', 'rayban', 'round', 'visor', 'wayrafer'],
  Eyepatch: ['', 'left', 'right'],
  Headband: ['', 'medium', 'tied'],
  Necklace: ['', 'chain', 'dogtags', 'stethoscope'],
  Warpaint: ['', 'clawmarks', 'football', 'stripe'],
  Earpiece: ['', 'microphone', 'neurolink', 'scouter']
}
var maleForm3 = {
  Shirt: ['', 'tanktop', 'colar', 'kurta', 'tshirt', 'turtleneck'],
  Tie: ['', 'neck', 'bolo', 'bow'],
  Vest: ['', 'vest', 'lined', 'insulated', 'yellow'],
  Button: ['', 'heart', 'peace', 'smile'],
  Holster: ['', 'revolver_chest', 'revolver_hip'],
  Shoulderpads: ['', 'artillery', 'general', 'plated', 'spikes'],
  Scarf: ['', 'parisian_knot', 'twice_around', 'four_in_hand', 'reverse_drape_cross', 'reverse_drape_tuck', 'fake_knot', 'reverse_drape', 'chest_warmer', 'overhand', 'once_around', 'drape']
}
var maleForm4 = {
  Body: ['default', 'athletic', 'veiny', 'android-00'],
  Scar: ['', 'horizontal_neck', 'horizontal_nose', 'vertical_heart', 'vertical_left', 'vertical_right'],
  Tatoo: ['', 'aum_chest', 'aum_left', 'aum_right', 'chaos_chest', 'chaos_left', 'chaos_right'],
  Suit: ['', 'borat', 'wetsuit'],
  Jacket: ['', 'suit', 'suit_open'],
  Coat: ['', 'biker', 'fall_long', 'lab', 'trench', 'scientist', 'snowboard', 'varsity'],
  Cloak: ['', 'default', 'dracula'],
  Armband: ['', 'bandage_left', 'bandage_right'],
  Watch: ['', 'generic', 'sinn'],
  Gloves: ['', 'boxing', 'lab', 'motorcycle'],
  Wings: ['', 'angel', 'devil', 'fairy', 'skeleton'],
  Pet: ['', 'feline', 'raven', 'rat', 'canine', 'siamese_cat', 'gerbil', 'chicken', 'fox', 'vulture', 'parrot', 'doge']
}
var maleForm5 = {
  Underwear: ['', 'plain', 'boxers'],
  Pants: ['', 'cargo', 'suit', 'jeans', 'jeans_rolled', 'leather', 'snowboard'],
  Belt: ['', 'cargo', 'default', 'bullet', 'ring', 'straps', 'utility', 'leather'],
  Kneepads: ['', 'skate']
}
var maleForm6 = {
  Socks: ['', 'socks'],
  Shoes: ['', 'cowboy', 'hightops', 'leather', 'loafers', 'flip-flops', 'moon']
}

var femaleForm1 = {
  Body_head: ['default', 'heart', 'oblong', 'oval', 'round', 'square', 'diamond', 'triangle'],
  Ears: ['default', 'elven', 'pointed', 'outstretched', 'plugged', 'unplugged'],
  Iris: ['default'],
  Pupils: ['round', 'feline', 'star'],
  Nose: ['default', 'pointed', 'roman', 'strong', 'syrid'],
  Mouth: [''],
  Hair: ['', 'afro', 'bangs', 'down', 'flowing', 'manga', 'mohawk', 'pigtails', 'ponytail', 'short', 'short_slick', 'starlet', 'odango', 'emo', 'punky', 'spider', 'wreckingball'],
  Freckles: ['', 'medium'],
  Emotion: ['neutral', 'default', 'alertness', 'amusement', 'anger', 'aversion', 'dejection', 'disdain', 'disgust', 'grief', 'indignation', 'joy', 'laughter', 'melancholy', 'rage', 'sadness', 'sterness', 'surprise', 'shock', 'wonder']
}
var femaleForm2 = {
  Smoke: ['', 'blunt', 'cigar', 'cigarette', 'filter', 'pipe_subgenius'],
  Makeup: ['', 'blush', 'clawmarks', 'gothic_eyeliner', 'stripe', 'warpaint'],
  Earings: ['', 'bells', 'death_drop', 'double-drop', 'gold_rings', 'gold_ring_right', 'gold_ring_left', 'lightning', 'triangle_mobile'],
  Eyepatch: ['', 'left', 'right'],
  Glasses: ['', 'alien', 'designer', 'fpv', 'goggles', 'google', 'hipster', 'kurt', 'neon', 'oakley', 'rayban', 'round', 'visor', 'wayrafer'],
  Headband: ['', 'medium', 'tied'],
  Hat: ['', 'baseball', 'beach', 'berret_badge', 'chinese_farmer', 'country', 'cowboy', 'football', 'fox-ears', 'top', 'waitress', 'police', 'scumbag', 'helmet_vietnam', 'tiara', 'strainer', 'magritte', 'motorcycle', 'tuque', 'cap', 'xmas'],
  Mask: ['', /* 'arrow', */ 'guy_fawkes', 'horse', 'hospital', 'stormtrooper', 'jason', 'cat'],
  Horns: ['', 'devil'],
  Earpiece: ['', 'microphone', 'neurolink', 'scouter'],
  Veil: ['', 'al-amira', 'hijab', 'khimar', 'niqab', 'shayla']
}
var femaleForm3 = {
  Collar: ['', 'egyptian', 'leather', 'metal'],
  Necklace: ['', 'dogtags', 'heart', 'perl', 'princess', 'stethoscope', 'squared-circle'],
  Bra: ['', 'bow', 'grid', 'sports'],
  Top: ['', 'asymetric', 'loop', 'tank', 'tube_v'],
  Shirt: ['', 'sweat'],
  Button: ['', 'heart', 'peace', 'smile'],
  Shoulderpads: ['', 'artillery', 'general', 'plated', 'spikes'],
  Scarf: ['', 'chest_warmer', 'parisian_knot', 'twice_around', 'four_in_hand', 'reverse_drape_cross', 'reverse_drape_tuck', 'fake_knot', 'reverse_drape', 'overhand', 'once_around', 'drape']
}
var femaleForm4 = {
  Body: ['default', 'athletic', 'veiny', 'android-00'],
  Tatoo: ['', 'chaos_chest', 'chaos_left', 'chaos_right', 'tribal_face', 'archeopteryx_left'],
  Nails: ['short', 'long', 'claws'],
  Holster: ['', 'revolver_chest', 'revolver_hip', 'revolver_thigh'],
  Suit: ['', 'asymetric', 'bands', 'onepiece', 'wetsuit'],
  Blouse: ['', 'cherry'],
  Dress: ['', 'accolade', 'bobafett', 'casual', 'corset', 'chinatown', 'suit', 'waitress', 'short', 'cheerleader', 'japanese_pleat', 'parisian_fall', 'german_expression', 'zig_zag', 'zip'],
  Coat: ['', 'biker', 'lab', 'winter_furcollar', 'winter_tubecollar'],
  Armband: ['', 'bandage_left', 'bandage_right', 'egyptian_left', 'egyptian_right'],
  Bracelet: ['', 'band_right', 'band_left', 'egyptian_right', 'egyptian_left', 'ornamental_right', 'ornamental_left', 'perl_right', 'perl_left', 'rings_left', 'rings_right', 'wonder_left', 'wonder_right'],
  Gloves: ['', 'silk_fingerless_striped'],
  Pet: ['', 'feline', 'raven', 'rat', 'canine', 'siamese_cat', 'gerbil', 'chicken', 'fox', 'vulture', 'parrot', 'doge'],
  Vest: ['', 'yellow'],
  Cloak: ['', 'dracula'],
  Wings: ['', 'angel', 'devil', 'fairy', 'skeleton']
}
var femaleForm5 = {
  Underwear: ['', 'boyshorts', 'plain', 'string', 'tanga', 'thong'],
  Shorts: ['', 'bikini', 'short'],
  Skirt: ['', 'a-line', 'draped', 'school_short', 'school', 'school_long'/*, 'tube' */],
  Pants: ['', 'cargo', 'yoga', 'yoga_torn', 'jeans', 'jeans_rolled', 'jeans_torn', 'jeans_bellbottoms'],
  Belt: ['', 'bullet', 'utility', 'satchel'],
  Kneepads: ['', 'skate']
}
var femaleForm6 = {
  Leggings: ['', 'fishnet', 'regular', 'striped', 'torn'],
  Shoes: ['', 'cowboy', 'flip-flops', 'hightops', 'highheels', 'moon', 'plateforms', 'sandals_roman']
}

// Color Pallettes
var skinTones = ['#FFDFC4', '#F0D5BE', '#EECEB3', '#E1B899', '#E5C298', '#FFDCB2', '#E5B887', '#E5A073', '#E79E6D', '#DB9065', '#CE967C', '#C67856', '#BA6C49', '#A57257', '#F0C8C9', '#DDA8A0', '#B97C6D', '#A8756C', '#AD6452', '#5C3836', '#CB8442', '#BD723C', '#704139', '#A3866A']
var fabricPallette = ['#25282f', '#494a52', '#323346', '#6f7581', '#c3c3c5', '#ece9ec', '#f3e3d4', '#434d71', '#f4e2c1', '#ba855e', '#b19f92', '#9e9888']
var layerDirectoryFemale = 'layer/female/'
var layerDirectoryMale = 'layer/male/'

function countItems (list) {
  let sum = 1
  for (const r in list) {
    // filter(Boolean) filters out "" cases
    sum *= list[r].filter(Boolean).length || 1
  }
  return sum
}

var maleTotal = countItems(maleForm1) * countItems(maleForm2) * countItems(maleForm3) * countItems(maleForm4) * countItems(maleForm5) * countItems(maleForm6) * skinTones.length;
var femaleTotal = countItems(femaleForm1) * countItems(femaleForm2) * countItems(femaleForm3) * countItems(femaleForm4) * countItems(femaleForm5) * countItems(femaleForm6) * skinTones.length;
consolelog('Hey ! welcome, you have  ' + (maleTotal + femaleTotal) + ' possibilities')

window.maleFormList = [maleForm1, maleForm2, maleForm3, maleForm4, maleForm5, maleForm6]
window.femaleFormList = [femaleForm1, femaleForm2, femaleForm3, femaleForm4, femaleForm5, femaleForm6]
