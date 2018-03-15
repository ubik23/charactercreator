window.onload = function() {
    var aboutBtn = document.querySelector("#aboutButton");
    var whoBtn = document.querySelector("#whoButton");
    var logoutBtn = document.querySelector("#logoutButton");
    var loginBtn = document.querySelector("#loginButton");
    var registerBtn = document.querySelector("#registerButton");
    var registerLink = document.querySelector(".js-register-link");
    var maleSilhouette = document.getElementById("male_silhouette");
    var femaleSilhouette = document.getElementById("female_silhouette");
    var mousewheelevt = (/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
    var rightSidebar = document.querySelector('#sidebar');
    rightSidebarClone = rightSidebar.cloneNode(true);

    if (aboutBtn && typeof showAbout === 'function') { aboutBtn.addEventListener("click", showAbout, false) }
    if (whoBtn && typeof whoami === 'function') { whoBtn.addEventListener("click", whoami, false) }
    if (logoutBtn && typeof logout === 'function') { logoutBtn.addEventListener("click", logout, false) }
    if (loginBtn && typeof loginMenu === 'function') { loginBtn.addEventListener("click", loginMenu, false) }
    if (registerBtn && typeof registerMenu === 'function') { registerBtn.addEventListener("click", registerMenu, false) }
    if (registerLink && typeof registerMenu === 'function') { registerLink.addEventListener("click", registerMenu, false) }

    // The following activates the scroll zoom.
    if (document.attachEvent) { //if IE (and Opera depending on user setting)
        document.attachEvent("on"+mousewheelevt, scrollZoom);
    } else if (document.addEventListener) {//WC3 browsers
        document.addEventListener(mousewheelevt, scrollZoom, false)
    }

    if (maleSilhouette && typeof selectMale === 'function') {maleSilhouette.addEventListener('click', selectMale, false)}
    if (femaleSilhouette && typeof selectFemale === 'function') {femaleSilhouette.addEventListener('click', selectFemale, false)}

    startup();
}

function startup() {
    var choices;
    if (currentUser && currentUser.cc && currentUser.cc.personnages && currentUser.cc.personnageActuel) {
        choices = currentUser.cc.personnages[currentUser.cc.personnageActuel];
    }
    window.c = new Character(choices);
    interpretHash();
}

function interpretHash() {
    var hashSex = hash.get("sex");
    if (hashSex === "m") {
        selectMale();
    } else if (hashSex === "f") {
        selectFemale();
    }
}

function launch() {
    var maleForm1 = {
    'Body_head' : ['default', 'diamond', 'heart', 'oblong', 'oval', 'round', 'square', 'triangle'],
    'Ears' : ['default', 'pointed', 'outstretched', 'plugged', 'unplugged'],
    'Iris' : ['neutral'],
    'Pupils' : ['human', 'lizard'],
    'Nose' : ['default', 'roman', 'syrid'],
    'Facialhair': ['','beard_boxed', 'beard_ducktail', 'beard_guru', 'beard_intelectual', 'beard_rap', 'beard_raw', 'chinpuff', 'goatee', 'goatee_raw', 'moustache', 'moustache_dali', 'moustache_thick', 'muttonchops', 'muttonchops_friendly', 'soulpatch', 'winnfield'],
    'Hair': ['', 'balding', 'balding_crazy', 'balding_crown', 'short', 'gelled', 'wavy', 'manga', 'mohawk', 'crewcut'],
    'Freckles': ['', 'medium'],
    'Age' : ['', 'lines'],
    'Emotion': ['neutral', 'alertness', 'amusement', 'anger', 'anxiety', 'aversion', 'betrayal', 'caged', 'concern', 'cruel', 'dejection', 'desperation', 'disdain', 'disgust', 'eeww', 'fear', 'grief', 'horror', 'indignation', 'joy', 'laughing', 'melancholy', 'omg', 'outrage', 'pain', 'rage', 'revulsion', 'sadness', 'satisfaction', 'shock', 'sterness', 'surprise', 'terror', 'wonder', 'wtf']
    };
    var maleForm2 = {
    'Pipe' : ['', 'subgenius'],
    'Earings': ['', 'gold_rings', 'gold_ring_right', 'gold_ring_left'],
    'Hat': ['','baseball','berret', 'cap', 'cowboy', 'fedora', 'jester', 'top','motorcycle', 'police', 'scumbag', 'helmet_vietnam', 'tuque', 'strainer', 'magritte'],
    'Horns': ['', 'devil', 'large'],
    'Mask': ['', 'guy_fawkes', 'robin', 'horse', 'stormtrooper', 'jason', 'cat'],
    'Glasses': ['', 'designer', 'fpv', 'goggles', 'google', 'hipster', 'oakley', 'rayban', 'round', 'wayrafer'],
    'Eyepatch': ['', 'left', 'right'],
    'Headband': ['', 'medium'],
    'Jewelry': ['', 'chain'],
    'Warpaint': ['', 'football'],
    'Earpiece': ['', 'microphone']
    };
    var maleForm3 = {
    'Shirt': ['', 'tanktop', 'colar', 'tshirt', 'turtleneck'],
    'Tie': ['', 'neck', 'bolo', 'bow'],
    'Vest': ['', 'vest', 'lined'],
    'Holster' : ['', 'revolver_chest', 'revolver_hip'],
    'Shoulderpads' : ['', 'general', 'artillery'],
    'Scarf' : ['', 'parisian_knot', 'twice_around', 'four_in_hand', 'reverse_drape_cross', 'reverse_drape_tuck', 'fake_knot', 'reverse_drape', 'chest_warmer', 'overhand', 'once_around', 'drape']
    };
    var maleForm4 = {
    'Body': ['athletic'],
    'Scar': ['', 'horizontal_neck', 'horizontal_nose', 'vertical_heart' , 'vertical_left', 'vertical_right'],
    'Tatoo': ['', 'aum_chest', 'aum_left', 'aum_right', 'chaos_chest', 'chaos_left', 'chaos_right'],
    'Suit': ['', 'wetsuit'],
    'Jacket': ['', 'suit'],
    'Coat': ['', 'fall_long', 'lab', 'trench', 'snowboard'],
    'Cloak': ['', 'default'],
    'Watch': ['', 'generic'],
    'Gloves': ['', 'lab', 'motorcycle'],
    'Wings' : ['', 'angel', 'devil'],
    'Pet': ['', 'feline', 'raven', 'rat', 'canine', 'siamese_cat', 'gerbil', 'chicken', 'fox', 'vulture', 'parrot', 'doge']
    };
    var maleForm5 = {
    'Underwear': ['plain', 'boxers'],
    'Pants': ['', 'suit', 'jeans', 'leather', 'snowboard'],
    'Belt': ['', 'default', 'bullet', 'straps', 'utility', 'leather']
    };
    var maleForm6 = {
    'Socks': ['','socks'],
    'Shoes': ['','hightops', 'leather', 'flip-flops']
    };
    var layersMale = [
    'wings_angel', 'wings_devil',
    'cloak_default_4_of_4',
    'coat_trench_3_of_3',
    'pet_doge','pet_vulture','pet_parrot','pet_feline','pet_raven','pet_rat','pet_canine','pet_siamese_cat','pet_gerbil','pet_chicken','pet_fox',
    'hat_helmet_vietnam_2_of_2','hat_strainer_2_of_2','hat_fedora_2_of_2',
    'headband_medium_2_of_2',
    'hair_manga_2_of_2',
    'coat_trench_2_of_3',
    'shoes_flip-flops_2_of_2',
    'body_athletic_2_of_2',
    'tatoo_aum_chest','tatoo_chaos_chest',
    'scar_vertical_heart', 'scar_horizontal_neck',
    'underwear_plain','underwear_boxers',
    'shirt_tanktop_2_of_2',
    'body_athletic_1_of_2',
    'tatoo_aum_left','tatoo_aum_right','tatoo_chaos_left','tatoo_chaos_right',
    'shirt_tanktop_1_of_2',
    'suit_wetsuit',
    'socks_socks',
    'shoes_hightops','shoes_leather', 'shoes_flip-flops_1_of_2',
    'watch_generic',
    'shirt_colar_2_of_2','shirt_turtleneck',
    'tie_bolo','tie_bow_2_of_2','tie_neck',
    'shirt_colar_1_of_2',
    'vest_vest', 'vest_lined',
    'pants_jeans_1_of_2','pants_leather','pants_suit_1_of_2','pants_snowboard',
    'belt_leather', 'belt_default', 'belt_bullet',
    'pants_jeans_2_of_2', 'pants_suit_2_of_2',
    'shirt_tshirt',
    'tie_bow_1_of_2',
    'jewelry_chain',
    'belt_straps',
    'holster_revolver_chest', 'holster_revolver_hip',
    'jacket_suit',
    'coat_fall_long_2_of_2',
    'belt_utility',
    'gloves_lab','gloves_motorcycle',
    'coat_fall_long_1_of_2', 'coat_lab','coat_trench_1_of_3','coat_snowboard',
    'cloak_default_3_of_4',
    'cloak_default_2_of_4',
    'shoulderpads_general',
    'scarf_parisian_knot','scarf_twice_around','scarf_four_in_hand','scarf_reverse_drape_cross','scarf_reverse_drape_tuck','scarf_fake_knot','scarf_reverse_drape','scarf_chest_warmer','scarf_overhand','scarf_once_around','scarf_drape',
    'shoulderpads_artillery',
    'body_head_default','body_head_square','body_head_diamond','body_head_heart','body_head_oblong','body_head_oval','body_head_round','body_head_triangle',
    'ears_default', 'ears_outstretched', 'ears_pointed', 'ears_plugged', 'ears_unplugged',
    'age_lines',
    'freckles_medium',
    'earings_gold_rings','earings_gold_ring_left','earings_gold_ring_right',
    'scar_horizontal_nose','scar_vertical_left','scar_vertical_right',
    'eyes_neutral', 'eyes_alertness', 'eyes_amusement', 'eyes_anger', 'eyes_anxiety', 'eyes_aversion', 'eyes_betrayal', 'eyes_caged', 'eyes_concern', 'eyes_cruel', 'eyes_dejection', 'eyes_desperation', 'eyes_disdain', 'eyes_disgust', 'eyes_eeww', 'eyes_fear', 'eyes_grief', 'eyes_horror', 'eyes_indignation', 'eyes_joy', 'eyes_laughing', 'eyes_melancholy', 'eyes_omg', 'eyes_outrage', 'eyes_pain', 'eyes_rage', 'eyes_revulsion', 'eyes_sadness', 'eyes_satisfaction', 'eyes_shock',  'eyes_sterness', 'eyes_surprise', 'eyes_terror', 'eyes_wonder', 'eyes_wtf',
    'iris_neutral','iris_sterness','iris_indignation','iris_anger', 'iris_rage', 'iris_disdain', 'iris_aversion', 'iris_disgust', 'iris_revulsion', 'iris_concern', 'iris_anxiety', 'iris_fear', 'iris_terror', 'iris_satisfaction', 'iris_amusement', 'iris_joy', 'iris_laughing', 'iris_dejection', 'iris_alertness', 'iris_betrayal', 'iris_caged', 'iris_cruel','iris_desperation', 'iris_eeww', 'iris_horror', 'iris_melancholy', 'iris_omg', 'iris_outrage',
    'pupils_human_neutral', 'pupils_human_sterness',  'pupils_human_indignation','pupils_human_anger', 'pupils_human_rage', 'pupils_human_disdain', 'pupils_human_aversion', 'pupils_human_disgust', 'pupils_human_revulsion', 'pupils_human_concern', 'pupils_human_anxiety', 'pupils_human_fear', 'pupils_human_terror', 'pupils_human_satisfaction', 'pupils_human_amusement', 'pupils_human_joy', 'pupils_human_laughing', 'pupils_human_dejection', 'pupils_human_alertness', 'pupils_human_betrayal', 'pupils_human_caged', 'pupils_human_cruel', 'pupils_human_desperation', 'pupils_human_eeww', 'pupils_human_horror', 'pupils_human_melancholy', 'pupils_human_omg', 'pupils_human_outrage',
    'brows_neutral', 'brows_alertness', 'brows_amusement', 'brows_anger', 'brows_anxiety', 'brows_aversion', 'brows_betrayal', 'brows_caged', 'brows_concern', 'brows_cruel', 'brows_dejection', 'brows_desperation', 'brows_disdain', 'brows_disgust', 'brows_eeww', 'brows_fear', 'brows_grief', 'brows_horror', 'brows_indignation', 'brows_joy', 'brows_laughing', 'brows_melancholy', 'brows_omg', 'brows_outrage', 'brows_pain', 'brows_rage', 'brows_revulsion', 'brows_sadness', 'brows_satisfaction', 'brows_shock', 'brows_sterness', 'brows_surprise', 'brows_terror', 'brows_wonder', 'brows_wtf',
    'mouth_neutral', 'mouth_alertness', 'mouth_amusement', 'mouth_anger', 'mouth_anxiety', 'mouth_aversion', 'mouth_betrayal', 'mouth_caged', 'mouth_concern', 'mouth_cruel', 'mouth_dejection', 'mouth_desperation', 'mouth_disdain', 'mouth_disgust', 'mouth_eeww', 'mouth_fear', 'mouth_grief', 'mouth_horror', 'mouth_indignation', 'mouth_joy', 'mouth_laughing', 'mouth_melancholy', 'mouth_omg', 'mouth_outrage', 'mouth_pain', 'mouth_rage', 'mouth_revulsion', 'mouth_sadness', 'mouth_satisfaction', 'mouth_shock', 'mouth_sterness', 'mouth_surprise', 'mouth_terror', 'mouth_wonder', 'mouth_wtf',
    'nose_default', 'nose_roman', 'nose_syrid',
    'warpaint_football',
    'facialhair_beard_boxed','facialhair_beard_ducktail','facialhair_beard_guru','facialhair_beard_intelectual','facialhair_beard_rap', 'facialhair_beard_raw',
    'facialhair_chinpuff',
    'facialhair_goatee', 'facialhair_goatee_raw',
    'facialhair_moustache','facialhair_moustache_dali','facialhair_moustache_thick','facialhair_muttonchops','facialhair_muttonchops_friendly','facialhair_soulpatch','facialhair_winnfield',
    'mask_robin',
    'eyepatch_left','eyepatch_right',
    'hair_balding','hair_balding_crazy','hair_balding_crown', 'hair_gelled','hair_manga_1_of_2','hair_mohawk','hair_short','hair_wavy','hair_crewcut',
    'headband_medium_1_of_2',
    'mask_guy_fawkes',
    'glasses_designer','glasses_fpv','glasses_goggles','glasses_google','glasses_hipster','glasses_oakley','glasses_rayban','glasses_round','glasses_wayrafer',
    'hat_baseball','hat_berret','hat_cap','hat_tuque','hat_cowboy','hat_fedora_1_of_2','hat_jester','hat_top','hat_magritte','hat_police','hat_scumbag','hat_strainer_1_of_2','hat_helmet_vietnam_1_of_2','hat_motorcycle',
    'jewelry_earings','jewelry_nosering','jewelry_watch',
    'mask_horse','mask_stormtrooper','mask_jason','mask_cat',
    'horns_devil',
    'cloak_default_1_of_4',
    'horns_large',
    'pipe_subgenius',
    'earpiece_microphone'
    ];
    var femaleForm1 = {
    'Body_head' : ['default', 'heart', 'oblong', 'oval', 'round', 'square', 'diamond', 'triangle'],
    'Ears' : ['default', 'pointed'],
    'Iris' : ['neutral'],
    'Nose' : ['default'],
    'Emotion': ['neutral', 'alertness', 'amusement', 'anger', 'aversion', 'dejection', 'disdain', 'disgust', 'grief', 'indignation', 'joy', 'laughter', 'melancholy', 'rage', 'sadness', 'sterness', 'surprise', 'shock', 'wonder'],
    'Hair': ['','afro', 'down', 'manga', 'mohawk', 'pigtails', 'ponytail', 'short', 'bangs', 'odango', 'emo', 'spider', 'wreckingball']
    };
    var femaleForm2 = {
    'Pipe' : ['', 'subgenius'],
    'Makeup': ['', 'blush', 'gothic_eyeliner', 'warpaint'],
    'Freckles': ['', 'medium'],
    'Earings': ['', 'gold_rings', 'gold_ring_right', 'gold_ring_left', 'death_drop'],
    'Eyepatch': ['', 'left', 'right'],
    'Glasses': ['', 'designer', 'fpv', 'goggles', 'google', 'hipster', 'oakley', 'rayban', 'round', 'wayrafer'],
    'Headband': ['', 'medium'],
    'Hat': ['', 'top', 'waitress', 'cowboy', 'police', 'scumbag', 'helmet_vietnam', 'tiara', 'strainer', 'magritte', 'motorcycle', 'tuque', 'cap'],
    'Mask': ['', 'guy_fawkes', 'horse', 'stormtrooper', 'jason', 'cat'],
    'Horns': ['', 'devil'],
    'Earpiece': ['', 'microphone'],
    'Veil': ['', 'al-amira', 'hijab', 'khimar', 'niqab', 'shayla']
    };
    var femaleForm3 = {
    'Collar' : ['', 'metal'],
    'Necklace' : ['', 'perl', 'princess'],
    'Bra': ['', 'bow'],
    'Top': ['', 'asymetric', 'loop', 'tank'],
    'Shoulderpads' : ['', 'artillery', 'general'],
    'Scarf' : ['', 'chest_warmer', 'parisian_knot', 'twice_around', 'four_in_hand', 'reverse_drape_cross', 'reverse_drape_tuck', 'fake_knot', 'reverse_drape','overhand', 'once_around', 'drape']
    };
    var femaleForm4 = {
    'Body': ['athletic'],
    'Tatoo': ['', 'chaos_chest', 'chaos_left', 'chaos_right', 'tribal_face', 'archeopteryx_left'],
    'Nails': ['short', 'long', 'claws'],
    'Holster': ['', 'revolver_chest', 'revolver_hip', 'revolver_thigh'],
    'Suit': ['', 'wetsuit'],
    'Dress': ['', 'accolade', 'bobafett', 'casual', 'corset', 'suit', 'waitress', 'short', 'cheerleader', 'japanese_pleat', 'parisian_fall', 'german_expression'],
    'Coat' : ['', 'winter_furcollar', 'winter_tubecollar'],
    'Bracelet' : ['','rings'],
    'Pet': ['', 'feline', 'raven', 'rat', 'canine', 'siamese_cat', 'gerbil', 'chicken', 'fox', 'vulture', 'parrot', 'doge'],
    'Wings' : ['', 'devil', 'angel']
    };
    var femaleForm5 = {
    'Underwear': ['', 'plain', 'string'],
    'Shorts' : ['', 'bikini', 'short'],
    'Leggings': ['', 'regular', 'torn'],
    'Pants' : ['','yoga', 'yoga_torn', 'jeans', 'jeans_torn', 'jeans_bellbottoms'],
    'Belt' : ['', 'bullet', 'utility', 'satchel']
    };
    var femaleForm6 = {
    'Shoes': ['','hightops', 'highheels', 'sandals_roman', 'plateforms', 'flip-flops']
    };
    var layersFemale = [
    'wings_devil', 'wings_angel',
    'pet_doge','pet_vulture','pet_parrot','pet_feline','pet_raven','pet_rat','pet_canine','pet_siamese_cat','pet_gerbil','pet_chicken','pet_fox',
    'coat_winter_tubecollar_3_of_3',
    'hat_helmet_vietnam_2_of_2','hat_strainer_2_of_2',
    'headband_medium_2_of_2',
    'coat_winter_furcollar_3_of_3',
    'veil_shayla_2_of_2',
    'hair_down_3_of_3','hair_manga_2_of_2', 'hair_pigtails_2_of_2',
    'shoes_flip-flops_2_of_2',
    'holster_revolver_thigh_2_of_2',
    'body_athletic',
    'tatoo_chaos_chest','tatoo_chaos_left','tatoo_chaos_right','tatoo_archeopteryx_left',
    'underwear_plain','underwear_string',
    'leggings_regular', 'leggings_torn',
    'bra_bow',
    'suit_wetsuit',
    'necklace_perl','necklace_princess',
    'shoes_hightops','shoes_highheels','shoes_plateforms','shoes_sandals_roman', 'shoes_flip-flops_1_of_2',
    'pants_yoga', 'pants_yoga_torn', 'pants_jeans', 'pants_jeans_torn','pants_jeans_bellbottoms',
    'shorts_bikini', 'shorts_short',
    'holster_revolver_hip', 'holster_revolver_thigh_1_of_2',
    'top_asymetric', 'top_loop', 'top_tank',
    'dress_accolade', 'dress_bobafett', 'dress_casual','dress_corset','dress_suit','dress_short','dress_waitress','dress_cheerleader','dress_japanese_pleat','dress_german_expression','dress_parisian_fall',
    'holster_revolver_chest',
    'belt_satchel', 'belt_bullet',
    'collar_metal',
    'veil_al-amira_2_of_2', 'veil_khimar_2_of_2',
    'bracelet_rings',
    'coat_winter_furcollar_2_of_3', 'coat_winter_tubecollar_1_of_3', 'coat_winter_tubecollar_2_of_3',
    'shoulderpads_general',
    'scarf_chest_warmer','scarf_parisian_knot','scarf_twice_around','scarf_four_in_hand','scarf_reverse_drape_cross','scarf_reverse_drape_tuck','scarf_fake_knot','scarf_reverse_drape','scarf_overhand','scarf_once_around','scarf_drape',
    'hair_down_2_of_3',
    'body_head_default','body_head_square','body_head_diamond','body_head_heart','body_head_oblong','body_head_oval','body_head_round','body_head_triangle',
    'ears_default','ears_pointed',
    'nose_default',
    'tatoo_tribal_face',
    'earings_perl','earings_gold_rings','earings_gold_ring_left','earings_gold_ring_right','earings_death_drop',
    'freckles_medium',
    'makeup_blush', 'makeup_warpaint','makeup_gothic_eyeliner',
    'eyes_neutral', 'eyes_sterness', 'eyes_indignation', 'eyes_anger', 'eyes_rage', 'eyes_disdain', 'eyes_aversion', 'eyes_disgust', 'eyes_amusement', 'eyes_joy', 'eyes_laughter', 'eyes_dejection', 'eyes_melancholy', 'eyes_sadness', 'eyes_grief', 'eyes_alertness', 'eyes_wonder', 'eyes_surprise', 'eyes_shock',
    'iris_neutral', 'iris_sterness', 'iris_indignation', 'iris_anger', 'iris_rage', 'iris_disdain', 'iris_aversion', 'iris_disgust', 'iris_amusement', 'iris_joy', 'iris_laughter', 'iris_dejection', 'iris_melancholy','iris_alertness', 'iris_wonder', 'iris_surprise', 'iris_shock',
    'pupils_human_neutral', 'pupils_human_sterness', 'pupils_human_indignation', 'pupils_human_anger', 'pupils_human_rage', 'pupils_human_disdain', 'pupils_human_aversion', 'pupils_human_disgust', 'pupils_human_amusement', 'pupils_human_joy', 'pupils_human_laughter', 'pupils_human_dejection', 'pupils_human_melancholy', 'pupils_human_alertness', 'pupils_human_wonder', 'pupils_human_surprise', 'pupils_human_shock',
    'lashes_neutral', 'lashes_sterness', 'lashes_indignation', 'lashes_anger', 'lashes_rage', 'lashes_disdain', 'lashes_aversion', 'lashes_disgust', 'lashes_amusement', 'lashes_joy', 'lashes_laughter', 'lashes_dejection', 'lashes_melancholy', 'lashes_sadness', 'lashes_grief', 'lashes_alertness', 'lashes_wonder', 'lashes_surprise', 'lashes_shock',
    'mouth_neutral', 'mouth_sterness', 'mouth_indignation', 'mouth_anger', 'mouth_rage', 'mouth_disdain', 'mouth_aversion', 'mouth_disgust', 'mouth_amusement', 'mouth_joy', 'mouth_laughter', 'mouth_dejection', 'mouth_melancholy', 'mouth_sadness', 'mouth_grief', 'mouth_alertness', 'mouth_wonder', 'mouth_surprise', 'mouth_shock',
    'brows_neutral', 'brows_sterness', 'brows_indignation', 'brows_anger', 'brows_rage', 'brows_disdain', 'brows_aversion', 'brows_disgust', 'brows_amusement', 'brows_joy', 'brows_laughter', 'brows_dejection', 'brows_melancholy', 'brows_sadness', 'brows_grief', 'brows_alertness', 'brows_wonder', 'brows_surprise', 'brows_shock',
    'eyepatch_left','eyepatch_right',
    'mask_guy_fawkes',
    'tie_bow',
    'hair_short','hair_afro','hair_mohawk','hair_bangs','hair_ponytail','hair_odango','hair_emo','hair_spider','hair_wreckingball','hair_down_1_of_3','hair_manga_1_of_2', 'hair_pigtails_1_of_2',
    'glasses_hipster','glasses_fpv','glasses_google','glasses_oakley','glasses_rayban','glasses_round','glasses_wayrafer','glasses_designer','glasses_goggles',
    'veil_al-amira_1_of_2', 'veil_hijab', 'veil_khimar_1_of_2', 'veil_niqab', 'veil_shayla_1_of_2',
    'headband_medium_1_of_2',
    'hat_waitress','hat_police','hat_cowboy','hat_top','hat_scumbag','hat_tiara','hat_magritte','hat_strainer_1_of_2','hat_helmet_vietnam_1_of_2','hat_tuque','hat_cap','hat_motorcycle',
    'body_hand',
    'nails_short','nails_long','nails_claws',
    'mask_horse','mask_stormtrooper','mask_jason','mask_cat',
    'horns_devil',
    'coat_winter_furcollar_1_of_3',
    'shoulderpads_artillery',
    'belt_utility',
    'pipe_subgenius',
    'earpiece_microphone'
    ];
    var layerDirectoryFemale = 'layer/female/';
    var layerDirectoryMale = 'layer/male/';
    var multiLayerFemale = [['hair_pigtails', 2], ['hair_manga', 2], ['hair_down', 3], ['hat_strainer', 2], ['hat_helmet_vietnam', 2], ['headband_medium', 2], ['coat_winter_furcollar', 3], ['coat_winter_tubecollar', 3], ['holster_revolver_thigh', 2], ['veil_al-amira', 2], ['veil_khimar', 2], ['veil_shayla', 2], ['shoes_flip-flops', 2]];
    var multiLayerMale = [['body_athletic', 2],['hair_manga', 2], ['cloak_default', 4],['coat_fall_long', 2],['coat_trench', 3], ['hat_fedora', 2], ['headband_medium', 2], ['shirt_colar', 2], ['shirt_tanktop', 2], ['hat_strainer', 2], ['hat_helmet_vietnam', 2], ['pants_jeans', 2], ['pants_suit', 2], ['tie_bow', 2], ['shoes_flip-flops', 2]];
    var size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
    skinLayers = ['age_lines', 'body_athletic', 'body_head_default', 'body_head_diamond', 'body_head_heart', 'body_head_oblong', 'body_head_oval', 'body_head_round', 'body_head_square', 'body_head_triangle', 'body_hand',
    'ears_default', 'ears_pointed',
    'nose_default', 'nose_roman', 'nose_syrid',
    'mouth_shadow',
    'age_lines', 'wings_devil',
    'mouth_neutral', 'mouth_amusement', 'mouth_anger', 'mouth_alertness', 'mouth_anxiety', 'mouth_betrayal', 'mouth_caged', 'mouth_cruel', 'mouth_desperation', 'mouth_eeww', 'mouth_horror', 'mouth_melancholy', 'mouth_omg', 'mouth_outrage'
    ];
    hairLayers = ['facialhair_beard_boxed', 'facialhair_beard_ducktail', 'facialhair_beard_guru', 'facialhair_beard_intelectual', 'facialhair_beard_rap', 'facialhair_beard_raw', 'facialhair_chinpuff', 'facialhair_goatee', 'facialhair_goatee_raw', 'facialhair_moustache', 'facialhair_moustache_dali', 'facialhair_moustache_thick', 'facialhair_muttonchops', 'facialhair_muttonchops_friendly', 'facialhair_soulpatch', 'facialhair_winnfield',
    'hair_balding', 'hair_balding_crazy', 'hair_balding_crown', 'hair_short', 'hair_gelled', 'hair_wavy', 'hair_manga_1_of_2', 'hair_manga_2_of_2', 'hair_mohawk', 'hair_pigtails_1_of_2', 'hair_pigtails_2_of_2', 'hair_down_1_of_3', 'hair_down_2_of_3', 'hair_down_3_of_3', 'hair_afro', 'hair_ponytail', 'hair_bangs', 'hair_odango', 'hair_emo', 'hair_spider', 'hair_wreckingball', 'hair_crewcut',
    'eyelashes_neutral',
    'brows_neutral', 'brows_alertness', 'brows_amusement', 'brows_anger', 'brows_anxiety', 'brows_aversion', 'brows_betrayal', 'brows_caged', 'brows_concern', 'brows_cruel', 'brows_dejection', 'brows_desperation', 'brows_disdain', 'brows_disgust', 'brows_eeww', 'brows_fear', 'brows_grief', 'brows_horror', 'brows_indignation', 'brows_joy', 'brows_laughing', 'brows_melancholy', 'brows_omg', 'brows_outrage', 'brows_pain', 'brows_rage', 'brows_revulsion', 'brows_sadness', 'brows_satisfaction', 'brows_shock', 'brows_sterness', 'brows_surprise', 'brows_terror', 'brows_wonder', 'brows_wtf'
    ];
    c.sex  = hash.get('sex');
    var sex = c.sex;
    if (sex ==='m') {
        var form1 = maleForm1;
        var form2 = maleForm2;
        var form3 = maleForm3;
        var form4 = maleForm4;
        var form5 = maleForm5;
        var form6 = maleForm6;
        var layerDirectory = layerDirectoryMale;
        var layers = layersMale;
        multiLayer = multiLayerMale;
    } else {
        var form1 = femaleForm1;
        var form2 = femaleForm2;
        var form3 = femaleForm3;
        var form4 = femaleForm4;
        var form5 = femaleForm5;
        var form6 = femaleForm6;
        var layerDirectory = layerDirectoryFemale;
        var layers = layersFemale;
        multiLayer = multiLayerFemale;
    }
    forms = [form1, form2, form3, form4, form5,form6];
    // Get all the hash key/value pairs and include them in the c.choices object
    // Go through all the forms

    parseHash(c, forms, skinLayers, hairLayers);  //Hashed elements are added in the character object

    toBeShown = choicesToLayers(c, multiLayer);
    viewport = Snap("#svg1");
    var myLoadList = layers.map(function(obj){
        return layerDirectory + obj;
    });
    viewport.loadFilesDisplayOrdered( myLoadList, onAllLoaded, onEachLoaded );
}

function displayPallette () {
    var hashSkinColor = hash.get("skinColor");
    if (hashSkinColor != undefined){
         launch();
    } else {
        chooseSkinColor();
    }
}

function chooseSkinColor() {
    //var skinTones = ['#FFDFC4', '#F0D5BE', '#EECEB3', '#E1B899', '#E5C298', '#FFDCB2', '#E5B887', '#E5A073', '#E79E6D', '#DB9065', '#CE967C', '#C67856', '#BA6C49', '#A57257', '#F0C8C9', '#DDA8A0', '#B97C6D', '#A8756C', '#AD6452', '#5C3836', '#CB8442', '#BD723C', '#704139', '#A3866A']
    var skinTones = ['#FFDFC4', '#F0D5BE', '#EECEB3', '#E1B899', '#E5C298', '#FFDCB2', '#E5B887', '#E5A073', '#E79E6D', '#DB9065', '#CE967C', '#C67856', '#BA6C49', '#A57257', '#F0C8C9', '#DDA8A0', '#B97C6D', '#A8756C', '#AD6452', '#5C3836', '#CB8442', '#BD723C', '#704139', '#A3866A']
    var gmenu = document.querySelector(".skin-color__container");
    gmenu.classList.add('skin-color__container--show');
    for (color in skinTones) {
        var newColor = skinTones[color];
        var node = document.createElement("LI");
        node.className = "skin-tone";
        node.style.cssText = "background-color:" + newColor + ";";
        gmenu.appendChild(node);
        node.onclick = colorCutout;
        node.onmouseover = colorOnHover;
    };
}

function defaultEyeColor(skinColor){
    var eyeColorDict = {
        '#ffdfc4' : "#6F918A", // Grey
        '#f0d5be' : "#FF6600", // Amber
        '#eeceb3' : "#A0892C", // Hazel
        '#e1b899' : "#784421", // Light Brown
        '#e5c298' : "#784421", // Light Brown
        '#ffdcb2' : "#784421", // Light Brown
        '#e5b887' : "#784421", // Light Brown
        '#e5a073' : "#784421", // Light Brown
        '#e79e6d' : "#784421", // Light Brown
        '#db9065' : "#784421", // Light Brown
        '#ce967c' : "#784421", // Light Brown
        '#c67856' : "#784421", // Light Brown
        '#ba6c49' : "#784421", // Light Brown
        '#a57257' : "#784421", // Light Brown
        '#f0c8c9' : "#37ABC8", // Blue
        '#dda8a0' : "#AAD400", // Green
        '#b97c6d' : "#552200", // Brown
        '#a8756c' : "#552200", // Brown
        '#ad6452' : "#552200", // Brown
        '#5c3836' : "#552200", // Brown
        '#cb8442' : "#552200", // Brown
        '#bd723c' : "#552200", // Brown
        '#704139' : "#552200", // Brown
        '#a3866a' : "#552200"  // Brown
    };
    var eyeColor = eyeColorDict[skinColor];
    hash.add({ irisColor: eyeColor });
}

function defaultHairColor(skinColor){
    var hairColorDict = {
        '#ffdfc4' : "#803300", // Light brown
        '#f0d5be' : "#803300", // Light brown
        '#eeceb3' : "#803300", // Light brown
        '#e1b899' : "#1a1a1a", // Black
        '#e5c298' : "#1a1a1a", // Black
        '#ffdcb2' : "#1a1a1a", // Black
        '#e5b887' : "#1a1a1a", // Black
        '#e5a073' : "#1a1a1a", // Black
        '#e79e6d' : "#1a1a1a", // Black
        '#db9065' : "#1a1a1a", // Black
        '#ce967c' : "#1a1a1a", // Black
        '#c67856' : "#1a1a1a", // Black
        '#ba6c49' : "#1a1a1a", // Black
        '#a57257' : "#1a1a1a", // Black
        '#f0c8c9' : "#ffcc00", // Blond
        '#dda8a0' : "#ff6600", // Red
        '#b97c6d' : "#1a1a1a", // Black
        '#a8756c' : "#1a1a1a", // Black
        '#ad6452' : "#1a1a1a", // Black
        '#5c3836' : "#1a1a1a", // Black
        '#cb8442' : "#1a1a1a", // Black
        '#bd723c' : "#1a1a1a", // Black
        '#704139' : "#1a1a1a", // Black
        '#a3866a' : "#1a1a1a"  // Black
    };
    var newHairColor = hairColorDict[skinColor];
    hash.add({ hairColor: newHairColor });
}

function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function colorOnHover() {
    var malePath = document.getElementById("path_male");
    var femalePath = document.getElementById("path_female");
    var newTone = this.style.backgroundColor;
    femalePath.style.fill = newTone;
    malePath.style.fill = newTone;
}

function colorCutout(newColor){
    var rgb = this.style.backgroundColor;
    var newColor = rgb2hex(rgb);
    var colorCards = document.getElementsByClassName(".skin-tone");
    var maleSilhouette = document.getElementById("male_silhouette");
    var femaleSilhouette = document.getElementById("female_silhouette");
    var lg = document.getElementsByClassName("lg");
    var obj = new Array();
    obj['skinColor'] =  newColor;
    var gmenu = document.querySelector(".skin-color__container");
    gmenu.classList.remove('skin-color__container--show');
    hash.add(obj);
    defaultEyeColor(newColor);
    defaultHairColor(newColor);
    setTimeout(function(){
        launch();
    }, 300);
}

function selectMale(event) {
    window.sex = "m";
    var maleRadioBtn = document.querySelector('#mButton');
    var mainSVG = document.querySelector('#svg1');
    var maleSilhouette = document.querySelector("#male_silhouette");
    var femaleSilhouette = document.querySelector("#female_silhouette");
    if (maleRadioBtn) {
        maleRadioBtn.checked = true;
    }
    if (maleSilhouette) {
        maleSilhouette.removeEventListener('click', selectMale, false);
    }
    hash.add({ sex: 'm' });
    var malePath = document.getElementById("path_male");
    mainSVG.classList.add('select-male');

    setTimeout(function(){
        displayPallette();
    }, 350);
}

function selectFemale(event) {
    window.sex = "f";
    var femaleRadioBtn = document.querySelector('#fButton');
    var mainSVG = document.querySelector('#svg1');
    var maleSilhouette = document.querySelector("#male_silhouette");
    var femaleSilhouette = document.querySelector("#female_silhouette");
    if (femaleRadioBtn) {
        femaleRadioBtn.checked = true;
    }
    if (femaleSilhouette) {
        femaleSilhouette.removeEventListener('click', selectFemale, false);
    }
    hash.add({ sex: 'f' });
    var femaleSilhouette = document.getElementById("female_silhouette");
    var femalePath = document.getElementById("path_female")
    mainSVG.classList.add('select-female');

    setTimeout(function(){
        displayPallette();
    }, 350);
}

