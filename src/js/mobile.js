window.onload = function() {
    maleSilhouette = document.getElementById("male_silhouette");
    femaleSilhouette = document.getElementById("female_silhouette");
    var hashSex = hash.get("sex");
    var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
    if (document.attachEvent) //if IE (and Opera depending on user setting)
        document.attachEvent("on"+mousewheelevt, scrollZoom);
    else if (document.addEventListener) //WC3 browsers
        document.addEventListener(mousewheelevt, scrollZoom, false)
    c = new Character();
    if (hashSex === "m"){
        selectMale();
    } else if (hashSex === "f") {
        selectFemale();
    } else {
    maleSilhouette.addEventListener('click', selectMale, false);
    femaleSilhouette.addEventListener('click', selectFemale, false);
    }
};
function scrollZoom(e) {
    var svgViewBox = document.querySelector("#svg1");
    var event = window.event || e;
    var delta = event.detail? event.detail*(-120) : event.wheelDelta //check for detail first so Opera uses that instead of wheelDelta
    var zoomLevel = document.querySelector("#zoomLevel").value;
    var zoom = document.querySelector("#zoomLevel");
    //document.getElementById("wheelvalue").innerHTML=delta //delta returns +120 when wheel is scrolled up, -120 when down
    if (delta > 0 ){
        zoomLevel = zoomLevel + 1;
        if (zoomLevel > 3) {
             zoomLevel = 3;
        }
        document.querySelector("#zoomLevel").value = zoomLevel;
        document.querySelector("#zoomLevel").onchange();
    } else {
        zoomLevel = zoomLevel - 1;
        if (zoomLevel < 0) {
             zoomLevel = 0;
        }
        document.querySelector("#zoomLevel").value = zoomLevel;
        document.querySelector("#zoomLevel").onchange();
    }
}
function launch(layers, layerDirectory) {
    var maleForm1 = {
    'Body_head' : ['default', 'diamond', 'heart', 'oblong', 'oval', 'round', 'square', 'triangle'],
    'Ears' : ['default', 'pointed'],
    'Iris' : ['neutral'],
    'Pupils' : ['human', 'lizard'],
    'Nose' : ['default', 'roman', 'syrid'],
    'Facialhair': ['','beard_boxed', 'beard_ducktail', 'beard_guru', 'beard_intelectual', 'beard_rap', 'chinpuff', 'goatee', 'moustache', 'moustache_thick', 'muttonchops', 'muttonchops_friendly', 'soulpatch', 'winnfield'],
    'Hair': ['', 'balding', 'balding_crazy', 'short', 'gelled', 'wavy', 'manga', 'mohawk', 'crewcut'],
    'Age' : ['', 'lines'],
    'Emotion': ['neutral', 'alertness', 'amusement', 'anger', 'anxiety', 'betrayal', 'caged', 'cruel', 'eeww', 'horror', 'melancholy', 'omg', 'outrage']
    };
    var maleForm2 = {
    'Pipe' : ['', 'subgenius'],
    'Earings': ['', 'gold_rings', 'gold_ring_right', 'gold_ring_left'],
    'Hat': ['','baseball','berret', 'cap', 'cowboy', 'fedora', 'top','motorcycle', 'police', 'scumbag', 'helmet_vietnam', 'tuque', 'strainer', 'magritte'],
    'Horns': ['', 'devil'],
    'Mask': ['', 'guy_fawkes', 'robin', 'horse', 'stormtrooper', 'jason', 'cat'],
    'Glasses': ['', 'designer', 'fpv', 'goggles', 'google', 'hipster', 'oakley', 'rayban', 'round', 'wayrafer'],
    'Eyepatch': ['', 'left', 'right'],
    'Headband': ['', 'medium'],
    'Earpiece': ['', 'microphone']
    };
    var maleForm3 = {
    'Shirt': ['', 'tanktop', 'colar', 'tshirt', 'turtleneck'],
    'Tie': ['', 'neck', 'bolo', 'bow'],
    'Vest': ['', 'vest'],
    'Holster' : ['', 'revolver_chest'],
    'Shoulderpads' : ['', 'general', 'artillery'],
    'Scarf' : ['', 'parisian_knot', 'twice_around', 'four_in_hand', 'reverse_drape_cross', 'reverse_drape_tuck', 'fake_knot', 'reverse_drape', 'chest_warmer', 'overhand', 'once_around', 'drape']
    };
    var maleForm4 = {
    'Body': ['athletic'],
    'Scar': ['', 'horizontal_neck', 'horizontal_nose', 'vertical_heart' , 'vertical_left', 'vertical_right'],
    'Tatoo': ['', 'aum_chest', 'aum_left', 'aum_right', 'chaos_chest', 'chaos_left', 'chaos_right'],
    'Suit': ['', 'wetsuit'],
    'Jacket': ['', 'suit'],
    'Coat': ['', 'lab', 'trench', 'snowboard'],
    'Cloak': ['', 'default'],
    'Gloves': ['', 'lab', 'motorcycle'],
    'Wings' : ['', 'angel', 'devil'],
    'Pet': ['', 'feline', 'raven', 'rat', 'canine', 'siamese_cat', 'gerbil', 'chicken', 'fox', 'vulture', 'parrot', 'doge']
    };
    var maleForm5 = {
    'Underwear': ['plain', 'boxers'],
    'Pants': ['', 'suit', 'jeans', 'leather', 'snowboard'],
    'Belt': ['', 'straps', 'utility']
    };
    var maleForm6 = {
    'Socks': ['','socks'],
    'Shoes': ['','hightops', 'leather', 'flip-flops']
    };
    var layersMale = [
    'wings_angel', 'wings_devil',
    'pet_doge','pet_vulture','pet_parrot','pet_feline','pet_raven','pet_rat','pet_canine','pet_siamese_cat','pet_gerbil','pet_chicken','pet_fox',
    'hat_helmet_vietnam_2_of_2','hat_strainer_2_of_2','hat_fedora_2_of_2',
    'headband_medium_2_of_2',
    'hair_manga_2_of_2',
    'coat_trench_2_of_2',
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
    'shirt_colar_2_of_2','shirt_turtleneck',
    'tie_bolo','tie_bow_2_of_2','tie_neck',
    'shirt_colar_1_of_2',
    'tie_bow_1_of_2',
    'vest_vest',
    'pants_jeans','pants_leather','pants_suit','pants_snowboard',
    'shirt_tshirt',
    'belt_straps',
    'holster_revolver_chest',
    'jacket_suit',
    'belt_utility',
    'coat_lab','coat_trench_1_of_2','coat_snowboard',
    'gloves_lab','gloves_motorcycle',
    'shoulderpads_general',
    'scarf_parisian_knot','scarf_twice_around','scarf_four_in_hand','scarf_reverse_drape_cross','scarf_reverse_drape_tuck','scarf_fake_knot','scarf_reverse_drape','scarf_chest_warmer','scarf_overhand','scarf_once_around','scarf_drape',
    'shoulderpads_artillery',
    'body_head_default','body_head_square','body_head_diamond','body_head_heart','body_head_oblong','body_head_oval','body_head_round','body_head_triangle',
    'ears_default','ears_pointed',
    'age_lines',
    'earings_gold_rings','earings_gold_ring_left','earings_gold_ring_right',
    'scar_horizontal_nose','scar_vertical_left','scar_vertical_right',
    'sockets_neutral',
    'eyes_neutral','eyes_sterness','eyes_indignation','eyes_anger', 'eyes_rage', 'eyes_disdain', 'eyes_aversion', 'eyes_disgust', 'eyes_revulsion', 'eyes_concern', 'eyes_anxiety', 'eyes_fear', 'eyes_terror', 'eyes_satisfaction', 'eyes_amusement', 'eyes_joy', 'eyes_laughing', 'eyes_dejection', 'eyes_alertness', 'eyes_betrayal', 'eyes_caged', 'eyes_cruel', 'eyes_desperation', 'eyes_eeww', 'eyes_horror', 'eyes_melancholy', 'eyes_omg', 'eyes_outrage',
    'iris_neutral','iris_sterness','iris_indignation','iris_anger', 'iris_rage', 'iris_disdain', 'iris_aversion', 'iris_disgust', 'iris_revulsion', 'iris_concern', 'iris_anxiety', 'iris_fear', 'iris_terror', 'iris_satisfaction', 'iris_amusement', 'iris_joy', 'iris_laughing', 'iris_dejection', 'iris_alertness', 'iris_betrayal', 'iris_caged', 'iris_cruel','iris_desperation', 'iris_eeww', 'iris_horror', 'iris_melancholy', 'iris_omg', 'iris_outrage',
    'pupils_human_neutral', 'pupils_human_sterness',  'pupils_human_indignation','pupils_human_anger', 'pupils_human_rage', 'pupils_human_disdain', 'pupils_human_aversion', 'pupils_human_disgust', 'pupils_human_revulsion', 'pupils_human_concern', 'pupils_human_anxiety', 'pupils_human_fear', 'pupils_human_terror', 'pupils_human_satisfaction', 'pupils_human_amusement', 'pupils_human_joy', 'pupils_human_laughing', 'pupils_human_dejection', 'pupils_human_alertness', 'pupils_human_betrayal', 'pupils_human_caged', 'pupils_human_cruel', 'pupils_human_desperation', 'pupils_human_eeww', 'pupils_human_horror', 'pupils_human_melancholy', 'pupils_human_omg', 'pupils_human_outrage',
    'brows_neutral','brows_alertness','brows_anxiety','brows_amusement','brows_anger','brows_anxiety','brows_aversion','brows_betrayal','brows_caged','brows_concern','brows_cruel','brows_dejection','brows_desperation','brows_disdain','brows_disgust','brows_eeww','brows_fear','brows_grief','brows_horror','brows_indignation','brows_joy','brows_laughing','brows_melancholy','brows_omg','brows_outrage','brows_pain','brows_rage','brows_revulsion','brows_sadness','brows_satisfaction','brows_shock','brows_sterness','brows_surprise','brows_terror','brows_wonder','brows_wtf',
    'mouth_neutral', 'mouth_amusement', 'mouth_anger', 'mouth_alertness', 'mouth_anxiety', 'mouth_betrayal', 'mouth_caged', 'mouth_cruel', 'mouth_desperation', 'mouth_eeww', 'mouth_horror', 'mouth_melancholy', 'mouth_omg', 'mouth_outrage',
    'nose_default', 'nose_roman', 'nose_syrid',
    'facialhair_beard_boxed','facialhair_beard_ducktail','facialhair_beard_guru','facialhair_beard_intelectual','facialhair_beard_rap','facialhair_chinpuff','facialhair_goatee','facialhair_moustache','facialhair_moustache_thick','facialhair_muttonchops','facialhair_muttonchops_friendly','facialhair_soulpatch','facialhair_winnfield',
    'mask_robin',
    'eyepatch_left','eyepatch_right',
    'hair_balding','hair_balding_crazy','hair_gelled','hair_manga_1_of_2','hair_mohawk','hair_short','hair_wavy','hair_crewcut',
    'headband_medium_1_of_2',
    'mask_guy_fawkes',
    'glasses_designer','glasses_fpv','glasses_goggles','glasses_google','glasses_hipster','glasses_oakley','glasses_rayban','glasses_round','glasses_wayrafer',
    'hat_baseball','hat_berret','hat_cap','hat_tuque','hat_cowboy','hat_fedora_1_of_2','hat_top','hat_magritte','hat_police','hat_scumbag','hat_strainer_1_of_2','hat_helmet_vietnam_1_of_2','hat_motorcycle',
    'jewelry_chain','jewelry_earings','jewelry_nosering','jewelry_watch',
    'mask_horse','mask_stormtrooper','mask_jason','mask_cat',
    'horns_devil',
    'pipe_subgenius',
    'earpiece_microphone'
    ];
    var femaleForm1 = {
    'Body_head' : ['default', 'heart', 'oblong', 'oval', 'round', 'square', 'diamond', 'triangle'],
    'Ears' : ['default', 'pointed'],
    'Iris' : ['neutral'],
    'Nose' : ['default'],
    'Emotion': ['neutral', 'alertness', 'amusement', 'anger', 'aversion', 'dejection', 'disdain', 'disgust', 'grief', 'indignation', 'joy', 'laughter', 'melancholy', 'rage', 'sadness', 'sterness', 'surprise', 'shock', 'wonder'],
    'Hair': ['','afro', 'down', 'manga', 'mohawk', 'ponytail', 'short', 'bangs', 'odango', 'emo', 'spider', 'wreckingball']
    };
    var femaleForm2 = {
    'Pipe' : ['', 'subgenius'],
    'Makeup': ['', 'frekles', 'gothic_eyeliner', 'warpaint'],
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
    'Necklace' : ['', 'perl', 'princess'],
    'Bra': ['', 'bow'],
    'Shoulderpads' : ['', 'artillery', 'general'],
    'Scarf' : ['', 'chest_warmer', 'parisian_knot', 'twice_around', 'four_in_hand', 'reverse_drape_cross', 'reverse_drape_tuck', 'fake_knot', 'reverse_drape','overhand', 'once_around', 'drape']
    };
    var femaleForm4 = {
    'Body': ['athletic'],
    'Tatoo': ['', 'chaos_chest', 'chaos_left', 'chaos_right', 'tribal_face', 'archeopteryx_left'],
    'Nails': ['short', 'long', 'claws'],
    'Suit': ['', 'wetsuit'],
    'Dress': ['','casual','corset', 'suit', 'waitress', 'short', 'cheerleader', 'japanese_pleat', 'parisian_fall', 'german_expression'],
    'Coat' : ['', 'winter_furcollar'],
    'Bracelet' : ['','rings'],
    'Pet': ['', 'feline', 'raven', 'rat', 'canine', 'siamese_cat', 'gerbil', 'chicken', 'fox', 'vulture', 'parrot', 'doge'],
    'Wings' : ['', 'devil', 'angel']
    };
    var femaleForm5 = {
    'Underwear': ['', 'plain', 'string'],
    'Shorts' : ['', 'short'],
    'Leggings': ['', 'regular', 'torn'],
    'Pants' : ['','yoga', 'yoga_torn', 'jeans', 'jeans_torn', 'jeans_bellbottoms'],
    'Belt' : ['','utility']
    };
    var femaleForm6 = {
    'Shoes': ['','hightops', 'highheels', 'sandals_roman', 'plateforms', 'flip-flops']
    };
    var layersFemale = [
    'wings_devil','wings_angel',
    'pet_doge','pet_vulture','pet_parrot','pet_feline','pet_raven','pet_rat','pet_canine','pet_siamese_cat','pet_gerbil','pet_chicken','pet_fox',
    'hat_helmet_vietnam_2_of_2','hat_strainer_2_of_2',
    'headband_medium_2_of_2',
    'coat_winter_furcollar_3_of_3',
    'veil_shayla_2_of_2',
    'hair_down_3_of_3','hair_manga_2_of_2',
    'shoes_flip-flops_2_of_2',
    'body_athletic',
    'tatoo_chaos_chest','tatoo_chaos_left','tatoo_chaos_right','tatoo_archeopteryx_left',
    'underwear_plain','underwear_string',
    'leggings_regular', 'leggings_torn',
    'bra_bow',
    'suit_wetsuit',
    'necklace_perl','necklace_princess',
    'shoes_hightops','shoes_highheels','shoes_plateforms','shoes_sandals_roman', 'shoes_flip-flops_1_of_2',
    'pants_yoga', 'pants_yoga_torn', 'pants_jeans', 'pants_jeans_torn','pants_jeans_bellbottoms',
    'shorts_short',
    'dress_casual','dress_corset','dress_suit','dress_short','dress_waitress','dress_cheerleader','dress_japanese_pleat','dress_german_expression','dress_parisian_fall',
    'veil_al-amira_2_of_2', 'veil_khimar_2_of_2',
    'bracelet_rings',
    'coat_winter_furcollar_2_of_3',
    'shoulderpads_general',
    'scarf_chest_warmer','scarf_parisian_knot','scarf_twice_around','scarf_four_in_hand','scarf_reverse_drape_cross','scarf_reverse_drape_tuck','scarf_fake_knot','scarf_reverse_drape','scarf_overhand','scarf_once_around','scarf_drape',
    'hair_down_2_of_3',
    'body_head_default','body_head_square','body_head_diamond','body_head_heart','body_head_oblong','body_head_oval','body_head_round','body_head_triangle',
    'ears_default','ears_pointed',
    'nose_default',
    'tatoo_tribal_face',
    'earings_perl','earings_gold_rings','earings_gold_ring_left','earings_gold_ring_right','earings_death_drop',
    'sockets_neutral',
    'makeup_frekles','makeup_warpaint','makeup_gothic_eyeliner',
    'eyes_neutral', 'eyes_sterness', 'eyes_indignation', 'eyes_anger', 'eyes_rage', 'eyes_disdain', 'eyes_aversion', 'eyes_disgust', 'eyes_amusement', 'eyes_joy', 'eyes_laughter', 'eyes_dejection', 'eyes_melancholy', 'eyes_sadness', 'eyes_grief', 'eyes_alertness', 'eyes_wonder', 'eyes_surprise', 'eyes_shock',
    'iris_neutral', 'iris_sterness', 'iris_indignation', 'iris_anger', 'iris_rage', 'iris_disdain', 'iris_aversion', 'iris_disgust', 'iris_amusement', 'iris_joy', 'iris_laughter', 'iris_dejection', 'iris_melancholy','iris_alertness', 'iris_wonder', 'iris_surprise', 'iris_shock',
    'pupils_human_neutral', 'pupils_human_sterness', 'pupils_human_indignation', 'pupils_human_anger', 'pupils_human_rage', 'pupils_human_disdain', 'pupils_human_aversion', 'pupils_human_disgust', 'pupils_human_amusement', 'pupils_human_joy', 'pupils_human_laughter', 'pupils_human_dejection', 'pupils_human_melancholy', 'pupils_human_alertness', 'pupils_human_wonder', 'pupils_human_surprise', 'pupils_human_shock',
    'lashes_neutral', 'lashes_sterness', 'lashes_indignation', 'lashes_anger', 'lashes_rage', 'lashes_disdain', 'lashes_aversion', 'lashes_disgust', 'lashes_amusement', 'lashes_joy', 'lashes_laughter', 'lashes_dejection', 'lashes_melancholy', 'lashes_sadness', 'lashes_grief', 'lashes_alertness', 'lashes_wonder', 'lashes_surprise', 'lashes_shock',
    'mouth_neutral', 'mouth_sterness', 'mouth_indignation', 'mouth_anger', 'mouth_rage', 'mouth_disdain', 'mouth_aversion', 'mouth_disgust', 'mouth_amusement', 'mouth_joy', 'mouth_laughter', 'mouth_dejection', 'mouth_melancholy', 'mouth_sadness', 'mouth_grief', 'mouth_alertness', 'mouth_wonder', 'mouth_surprise', 'mouth_shock',
    'brows_neutral', 'brows_sterness', 'brows_indignation', 'brows_anger', 'brows_rage', 'brows_disdain', 'brows_aversion', 'brows_disgust', 'brows_amusement', 'brows_joy', 'brows_laughter', 'brows_dejection', 'brows_melancholy', 'brows_sadness', 'brows_grief', 'brows_alertness', 'brows_wonder', 'brows_surprise', 'brows_shock',
    'eyepatch_left','eyepatch_right',
    'mask_guy_fawkes',
    'tie_bow',
    'hair_short','hair_afro','hair_mohawk','hair_bangs','hair_ponytail','hair_odango','hair_emo','hair_spider','hair_wreckingball','hair_down_1_of_3','hair_manga_1_of_2',
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
    var multiLayerFemale = [['hair_manga', 2], ['hair_down', 3], ['hat_strainer', 2], ['hat_helmet_vietnam', 2], ['headband_medium', 2], ['coat_winter_furcollar', 3], ['veil_al-amira', 2], ['veil_khimar', 2], ['veil_shayla', 2], ['shoes_flip-flops', 2]];
    var multiLayerMale = [['body_athletic', 2],['hair_manga', 2], ['coat_trench', 2], ['hat_fedora', 2], ['headband_medium', 2], ['shirt_colar', 2], ['shirt_tanktop', 2], ['hat_strainer', 2], ['hat_helmet_vietnam', 2], ['tie_bow', 2], ['shoes_flip-flops', 2]];
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
    'age_lines', 'sockets_neutral', 'wings_devil',
    'mouth_neutral', 'mouth_amusement', 'mouth_anger', 'mouth_alertness', 'mouth_anxiety', 'mouth_betrayal', 'mouth_caged', 'mouth_cruel', 'mouth_desperation', 'mouth_eeww', 'mouth_horror', 'mouth_melancholy', 'mouth_omg', 'mouth_outrage' ];
    hairLayers = ['facialhair_beard_boxed', 'facialhair_beard_ducktail', 'facialhair_beard_guru', 'facialhair_beard_intelectual', 'facialhair_beard_rap', 'facialhair_chinpuff', 'facialhair_goatee', 'facialhair_moustache', 'facialhair_moustache_thick', 'facialhair_muttonchops', 'facialhair_muttonchops_friendly', 'facialhair_soulpatch', 'facialhair_winnfield',
    'hair_balding', 'hair_balding_crazy', 'hair_short', 'hair_gelled', 'hair_wavy', 'hair_manga_1_of_2', 'hair_manga_2_of_2', 'hair_mohawk', 'hair_down_1_of_3', 'hair_down_2_of_3', 'hair_down_3_of_3', 'hair_afro', 'hair_ponytail', 'hair_bangs', 'hair_odango', 'hair_emo', 'hair_spider', 'hair_wreckingball', 'hair_crewcut',
    'eyelashes_neutral',
    'brows_neutral','brows_alertness','brows_anxiety','brows_amusement','brows_anger','brows_anxiety','brows_aversion','brows_betrayal','brows_caged','brows_concern','brows_cruel','brows_dejection','brows_desperation','brows_disdain','brows_disgust','brows_eeww','brows_fear','brows_grief','brows_horror','brows_indignation','brows_joy','brows_laughing','brows_melancholy','brows_omg','brows_outrage','brows_pain','brows_rage','brows_revulsion','brows_sadness','brows_satisfaction','brows_shock','brows_sterness','brows_surprise','brows_terror','brows_wonder','brows_wtf',
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
    window.forms = forms;
    window.multiLayer = multiLayer;
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
         showForm();
    } else {
        var skinTones = ['#FFDFC4', '#F0D5BE', '#EECEB3', '#E1B899', '#E5C298', '#FFDCB2', '#E5B887', '#E5A073', '#E79E6D', '#DB9065', '#CE967C', '#C67856', '#BA6C49', '#A57257', '#F0C8C9', '#DDA8A0', '#B97C6D', '#A8756C', '#AD6452', '#5C3836', '#CB8442', '#BD723C', '#704139', '#A3866A']
        var gmenu = document.getElementById("gmenu");
        gmenu.style["height"] = "12%";
        for (color in skinTones) {
            var newColor = skinTones[color];
            var node = document.createElement("LI");
            node.className = "skin-tone";
            node.style.cssText = "background-color:" + newColor + ";";
            gmenu.appendChild(node);
            node.onclick = colorCutout;
            node.onmouseover = colorOnHover;
        };
        TweenMax.staggerFrom(".skin-tone", 0.5, {scale:0.5, opacity:0, delay:0.5, ease:Elastic.easeOut, force3D:true}, 0.05);
    }
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
    TweenMax.to(malePath, 0.5, {css:{color: newTone}, ease:Power2.easeOut}, 0.05);
    TweenMax.to(femalePath, 0.5, {css:{color: newTone}, ease:Power2.easeOut}, 0.05);
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
    var tl = new TimelineLite({onComplete: showForm});
    var gmenu = document.getElementById("gmenu");
    tl.to(gmenu, 0.5, { bottom:'-100px'})
    .to(femaleSilhouette, 0.5, {attr:{color: newColor, stroke: newColor}, ease:Elastic.easeOut} )
    .to(maleSilhouette, 0.5, {attr:{color: newColor, stroke: newColor}, ease:Elastic.easeOut} )
    .staggerTo(lg, 0.5, {opacity:0.5, delay:0.5}, 0.05)
    .to(gmenu, 0.5, {attr:{height: 0}, ease:Elastic.easeOut});
    hash.add(obj);
}

function showForm() {
    launch();
}

function selectMale(event) {
    window.sex = "m";
    var maleSilhouette = document.querySelector("#male_silhouette");
    var femaleSilhouette = document.querySelector("#female_silhouette");
    maleSilhouette.removeEventListener('click', selectMale, false);
    hash.add({ sex: 'm' });
    var malePath = document.getElementById("path_male");
    malePath.className.baseVal = "path template";
    var tl = new TimelineLite({onComplete: displayPallette});
    tl.to(malePath, 0.3, {attr:{'fill-opacity': 1}, ease:Linear.easeNone}, "select_male")
    .to(femaleSilhouette, 0.3, {opacity:0}, "select_male")
    .to(malePath, 1.5, {x:0, ease:SlowMo.easeIn}, "select_male");
}

function selectFemale(event) {
    window.sex = "f";
    var maleSilhouette = document.querySelector("#male_silhouette");
    var femaleSilhouette = document.querySelector("#female_silhouette");
    femaleSilhouette.removeEventListener('click', selectFemale, false);
    hash.add({ sex: 'f' });
    var femaleSilhouette = document.getElementById("female_silhouette");
    var femalePath = document.getElementById("path_female")
    femalePath.className.baseVal = "path template";
    var tl = new TimelineLite({onComplete: displayPallette});
    tl.to(femalePath, 0.3, {attr:{'fill-opacity': 1}, ease:Linear.easeNone}, "select_female")
    .to(maleSilhouette, 0.3, {opacity:0}, "select_female")
    .to(femalePath, 1.5, {x:-0, ease:SlowMo.easeIn}, "select_female");
}

