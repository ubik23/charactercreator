window.onload = function() {
    var maleSilhouette = document.getElementById("male_silhouette");
    var femaleSilhouette = document.getElementById("female_silhouette");
    maleSilhouette.addEventListener('click', selectMale, false);
    femaleSilhouette.addEventListener('click', selectFemale, false);
    c = new Character();
//var stages = ['sex', 'skin tone', 'head shape', 'eye color', 'hair style', 'hair color', 'makeup', 'accessories', 'clothinrg','hat', 'shirt', 'pants', 'belt', 'shoes', 'watch', 'pet'];
//var header = document.getElementById("header");
//var footer = document.getElementById("footer");
//var siteTitle = document.getElementById("siteTitle");
//var downloadButton = document.getElementById("downloadButton");
//var aboutButton = document.getElementById("aboutButton");
//var stepByStep = document.getElementById("step-by-step");
//var navLeft = document.getElementById("left-arrow")
};

function launch(layers, layerDirectory) {
    var maleSilhouette = document.getElementById("male_silhouette");
    var femaleSilhouette = document.getElementById("female_silhouette");
    var maleForm1 = {
    <!--'Emotion': ['neutral', 'alertness', 'amusement', 'anger', 'anxiety', 'aversion', 'betrayal', 'caged', 'concern', 'cruel', 'dejection', 'desperation', 'disdain', 'disgust', 'eeww', 'fear', 'grief', 'horror', 'indignation', 'joy', 'laughing', 'melancholy', 'omg', 'outrage', 'pain', 'rage', 'revulsion', 'sadness', 'satisfaction', 'shock', 'sterness', 'surprise', 'terror', 'wonder', 'wtf'],-->
    'Emotion': ['neutral', 'alertness', 'amusement', 'anger', 'anxiety', 'betrayal', 'caged', 'cruel', 'eeww', 'horror', 'melancholy', 'omg', 'outrage'],
    'Body': ['athletic'],
    'Underwear': ['plain', 'boxers'],
    'Scar': ['', 'horizontal_neck', 'horizontal_nose', 'vertical_heart' , 'vertical_left', 'vertical_right'],
    'Pet': ['', 'feline', 'raven', 'rat', 'canine', 'siamese_cat', 'gerbil', 'chicken', 'fox', 'vulture', 'parrot', 'doge'],
    'Tatoo': ['', 'aum_chest', 'aum_left', 'aum_right', 'chaos_chest', 'chaos_left', 'chaos_right'],
    'Age' : ['', 'lines'],
    'Wings' : ['', 'angel', 'devil']
    };
    var maleForm2 = {
    'Body_head' : ['default', 'diamond', 'heart', 'oblong', 'oval', 'round', 'square', 'triangle'],
    'Ears' : ['default', 'pointed'],
    'Iris' : ['neutral'],
    'Pupils' : ['human', 'lizard'],
    'Nose' : ['default', 'pointed', 'strong'],
    <!--'Lips' : ['neutral'],-->
    'Pipe' : ['', 'subgenius'],
    'Horns': ['', 'devil'],
    'Facialhair': ['','beard_boxed', 'beard_ducktail', 'beard_guru', 'beard_intelectual', 'beard_rap', 'chinpuff', 'goatee', 'moustache', 'moustache_thick', 'muttonchops', 'muttonchops_friendly', 'soulpatch', 'winnfield'],
    'Earings': ['', 'gold_rings', 'gold_ring_right', 'gold_ring_left'],
    'Hair': ['', 'balding', 'balding_crazy', 'short', 'gelled', 'wavy', 'manga', 'mohawk', 'crewcut'],
    'Hat': ['','baseball','berret', 'cap', 'cowboy', 'fedora', 'top', 'police', 'scumbag', 'helmet_vietnam', 'tuque', 'strainer', 'magritte'],
    'Mask': ['', 'guy_fawkes', 'robin', 'horse', 'stormtrooper', 'jason', 'cat'],
    'Glasses': ['', 'designer', 'goggles', 'google', 'hipster', 'oakley', 'rayban', 'round', 'wayrafer'],
    'Eyepatch': ['', 'left', 'right'],
    'Earpiece': ['', 'microphone']
    };
    var maleForm3 = {
    'Suit': ['', 'wetsuit'],
    'Shirt': ['', 'tanktop', 'colar', 'tshirt', 'turtleneck'],
    'Tie': ['', 'neck', 'bolo', 'bow'],
    'Gloves': ['', 'lab', 'motorcycle'],
    'Vest': ['', 'vest'],
    'Holster' : ['', 'revolver_chest'],
    'Jacket': ['', 'suit'],
    'Scarf' : ['', 'parisian_knot', 'twice_around', 'four_in_hand', 'reverse_drape_cross', 'reverse_drape_tuck', 'fake_knot', 'reverse_drape', 'chest_warmer', 'overhand', 'once_around', 'drape'],
    'Belt': ['', 'straps', 'utility'],
    'Shoulderpads' : ['', 'general', 'artillery'],
    'Pants': ['', 'suit', 'jeans', 'leather'],
    'Coat': ['', 'lab', 'trench'],
    'Socks': ['','socks'],
    'Shoes': ['','hightops', 'leather']
    };
    var layersMale = [
    'pet_doge','pet_vulture','pet_parrot','pet_feline','pet_raven','pet_rat','pet_canine','pet_siamese_cat','pet_gerbil','pet_chicken','pet_fox',
    'wings_angel', 'wings_devil',
    'hat_helmet_vietnam_2_of_2','hat_strainer_2_of_2','hat_fedora_2_of_2',
    'hair_manga_2_of_2',
    'coat_trench_2_of_2',
    'body_athletic',
    'tatoo_aum_chest','tatoo_aum_left','tatoo_aum_right','tatoo_chaos_chest','tatoo_chaos_left','tatoo_chaos_right',
    'scar_horizontal_neck',
    'body_head_default','body_head_square','body_head_diamond','body_head_heart','body_head_oblong','body_head_oval','body_head_round','body_head_triangle',
    'ears_default','ears_pointed',
    'age_lines',
    'scar_vertical_heart',
    'earings_gold_rings','earings_gold_ring_left','earings_gold_ring_right',
    'underwear_plain','underwear_boxers',
    'suit_wetsuit',
    'shirt_colar_2_of_2','shirt_turtleneck',
    'socks_socks',
    'shoes_hightops','shoes_leather','shirt_tanktop',
    'tie_bolo','tie_bow_2_of_2','tie_neck',
    'shirt_colar_1_of_2',
    'tie_bow_1_of_2',
    'vest_vest',
    'pants_jeans','pants_leather','pants_suit',
    'belt_straps',
    'shirt_tshirt',
    'holster_revolver_chest',
    'gloves_lab','gloves_motorcycle',
    'jacket_suit',
    'coat_lab','coat_trench_1_of_2',
    'shoulderpads_general',
    'scarf_parisian_knot','scarf_twice_around','scarf_four_in_hand','scarf_reverse_drape_cross','scarf_reverse_drape_tuck','scarf_fake_knot','scarf_reverse_drape','scarf_chest_warmer','scarf_overhand','scarf_once_around','scarf_drape',
    'shoulderpads_artillery',
    'belt_utility',
    'scar_horizontal_nose','scar_vertical_left','scar_vertical_right',
    'sockets_neutral',
    'eyes_neutral','eyes_sterness','eyes_indignation','eyes_anger', 'eyes_rage', 'eyes_disdain', 'eyes_aversion', 'eyes_disgust', 'eyes_revulsion', 'eyes_concern', 'eyes_anxiety', 'eyes_fear', 'eyes_terror', 'eyes_satisfaction', 'eyes_amusement', 'eyes_joy', 'eyes_laughing', 'eyes_dejection', 'eyes_alertness', 'eyes_betrayal', 'eyes_caged', 'eyes_cruel', 'eyes_desperation', 'eyes_eeww', 'eyes_horror', 'eyes_melancholy', 'eyes_omg', 'eyes_outrage',
    'iris_neutral','iris_sterness','iris_indignation','iris_anger', 'iris_rage', 'iris_disdain', 'iris_aversion', 'iris_disgust', 'iris_revulsion', 'iris_concern', 'iris_anxiety', 'iris_fear', 'iris_terror', 'iris_satisfaction', 'iris_amusement', 'iris_joy', 'iris_laughing', 'iris_dejection', 'iris_alertness', 'iris_betrayal', 'iris_caged', 'iris_cruel','iris_desperation', 'iris_eeww', 'iris_horror', 'iris_melancholy', 'iris_omg', 'iris_outrage',
    'pupils_human_neutral', 'pupils_human_sterness',  'pupils_human_indignation','pupils_human_anger', 'pupils_human_rage', 'pupils_human_disdain', 'pupils_human_aversion', 'pupils_human_disgust', 'pupils_human_revulsion', 'pupils_human_concern', 'pupils_human_anxiety', 'pupils_human_fear', 'pupils_human_terror', 'pupils_human_satisfaction', 'pupils_human_amusement', 'pupils_human_joy', 'pupils_human_laughing', 'pupils_human_dejection', 'pupils_human_alertness', 'pupils_human_betrayal', 'pupils_human_caged', 'pupils_human_cruel', 'pupils_human_desperation', 'pupils_human_eeww', 'pupils_human_horror', 'pupils_human_melancholy', 'pupils_human_omg', 'pupils_human_outrage',
    'brows_neutral','brows_alertness','brows_anxiety','brows_amusement','brows_anger','brows_anxiety','brows_aversion','brows_betrayal','brows_caged','brows_concern','brows_cruel','brows_dejection','brows_desperation','brows_disdain','brows_disgust','brows_eeww','brows_fear','brows_grief','brows_horror','brows_indignation','brows_joy','brows_laughing','brows_melancholy','brows_omg','brows_outrage','brows_pain','brows_rage','brows_revulsion','brows_sadness','brows_satisfaction','brows_shock','brows_sterness','brows_surprise','brows_terror','brows_wonder','brows_wtf',
    'mouth_neutral', 'mouth_amusement', 'mouth_anger', 'mouth_alertness', 'mouth_anxiety', 'mouth_betrayal', 'mouth_caged', 'mouth_cruel', 'mouth_desperation', 'mouth_eeww', 'mouth_horror', 'mouth_melancholy', 'mouth_omg', 'mouth_outrage',
    'facialhair_beard_boxed','facialhair_beard_ducktail','facialhair_beard_guru','facialhair_beard_intelectual','facialhair_beard_rap','facialhair_chinpuff','facialhair_goatee','facialhair_moustache','facialhair_moustache_thick','facialhair_muttonchops','facialhair_muttonchops_friendly','facialhair_soulpatch','facialhair_winnfield',
    'nose_default','nose_pointed','nose_strong',
    'mask_robin',
    'eyepatch_left','eyepatch_right',
    'hair_balding','hair_balding_crazy','hair_gelled','hair_manga_1_of_2','hair_mohawk','hair_short','hair_wavy','hair_crewcut',
    'mask_guy_fawkes',
    'glasses_designer','glasses_goggles','glasses_google','glasses_hipster','glasses_oakley','glasses_rayban','glasses_round','glasses_wayrafer',
    'hat_baseball','hat_berret','hat_cap','hat_tuque','hat_cowboy','hat_fedora_1_of_2','hat_top','hat_magritte','hat_police','hat_scumbag','hat_strainer_1_of_2','hat_helmet_vietnam_1_of_2',
    'jewelry_chain','jewelry_earings','jewelry_nosering','jewelry_watch',
    'mask_horse','mask_stormtrooper','mask_jason','mask_cat',
    'horns_devil',
    'pipe_subgenius',
    'earpiece_microphone'
    ];
    var femaleForm1 = {
    'Emotion': ['neutral', 'alertness', 'amusement', 'anger', 'aversion', 'dejection', 'disdain', 'disgust', 'grief', 'indignation', 'joy', 'laughter', 'melancholy', 'rage', 'sadness', 'sterness', 'surprise', 'shock', 'wonder'],
    'Body': ['athletic'],
    'Nails': ['short', 'long', 'claws'],
    'Tatoo': ['', 'chaos_chest', 'chaos_left', 'chaos_right', 'tribal_face', 'archeopteryx_left'],
    'Underwear': ['', 'plain', 'string'],
    'Pet': ['', 'feline', 'raven', 'rat', 'canine', 'siamese_cat', 'gerbil', 'chicken', 'fox', 'vulture', 'parrot', 'doge'],
    'Wings' : ['', 'devil', 'angel']
    };
    var femaleForm2 = {
    'Body_head' : ['default', 'heart', 'oblong', 'oval', 'round', 'square', 'diamond', 'triangle'],
    'Ears' : ['default', 'pointed'],
    'Iris' : ['neutral'],
    <!--'Lips' : ['default', 'thin', 'luscious'],-->
    'Pipe' : ['', 'subgenius'],
    'Nose' : ['default'],
    'Horns': ['', 'devil'],
    'Hair': ['','afro', 'down', 'manga', 'mohawk', 'ponytail', 'short', 'bangs', 'odango', 'emo', 'spider', 'wreckingball'],
    'Makeup': ['', 'frekles', 'gothic_eyeliner', 'warpaint'],
    'Earings': ['', 'gold_rings', 'gold_ring_right', 'gold_ring_left', 'death_drop'],
    'Eyepatch': ['', 'left', 'right'],
    'Glasses': ['', 'designer', 'goggles', 'google', 'hipster', 'oakley', 'rayban', 'round', 'wayrafer'],
    'Hat': ['', 'top', 'waitress', 'cowboy', 'police', 'scumbag', 'helmet_vietnam', 'tiara', 'strainer', 'magritte', 'tuque', 'cap'],
    'Mask': ['', 'guy_fawkes', 'horse', 'stormtrooper', 'jason', 'cat'],
    'Earpiece': ['', 'microphone']
    };
    var femaleForm3 = {
    'Necklace' : ['', 'perl', 'princess'],
    'Dress': ['','casual','corset', 'suit', 'waitress', 'short', 'cheerleader', 'japanese_pleat', 'parisian_fall', 'german_expression'],
    'Scarf' : ['', 'parisian_knot', 'twice_around', 'four_in_hand', 'reverse_drape_cross', 'reverse_drape_tuck', 'fake_knot', 'reverse_drape','overhand', 'once_around', 'drape'],
    'Coat' : ['', 'winter_furcollar'],
    'Shorts' : ['', 'short'],
    'Bra': ['', 'bow'],
    'Bracelet' : ['','rings'],
    'Shoulderpads' : ['', 'artillery', 'general'],
    'Belt' : ['','utility'],
    'Pants' : ['','yoga', 'jeans'],
    'Leggings': ['', 'regular'],
    'Shoes': ['','hightops', 'highheels', 'sandals_roman', 'plateforms']
    };
    var layersFemale = [
    'pet_doge','pet_vulture','pet_parrot','pet_feline','pet_raven','pet_rat','pet_canine','pet_siamese_cat','pet_gerbil','pet_chicken','pet_fox',
    'wings_devil','wings_angel',
    'hat_helmet_vietnam_2_of_2','hat_strainer_2_of_2',
    'coat_winter_furcollar_3_of_3',
    'hair_down_3_of_3','hair_manga_2_of_2',
    'body_athletic',
    'tatoo_chaos_chest','tatoo_chaos_left','tatoo_chaos_right','tatoo_archeopteryx_left',
    'necklace_perl','necklace_princess',
    'underwear_plain','underwear_string',
    'leggings_regular',
    'shoes_hightops','shoes_highheels','shoes_plateforms','shoes_sandals_roman',
    'bra_bow',
    'pants_yoga','pants_jeans',
    'shorts_short',
    'dress_casual','dress_corset','dress_suit','dress_short','dress_waitress','dress_cheerleader','dress_japanese_pleat','dress_german_expression','dress_parisian_fall',
    'shoulderpads_general',
    'scarf_parisian_knot','scarf_twice_around','scarf_four_in_hand','scarf_reverse_drape_cross','scarf_reverse_drape_tuck','scarf_fake_knot','scarf_reverse_drape','scarf_overhand','scarf_once_around','scarf_drape',
    'bracelet_rings',
    'coat_winter_furcollar_2_of_3',
    'hair_down_2_of_3',
    'body_head_default','body_head_square','body_head_diamond','body_head_heart','body_head_oblong','body_head_oval','body_head_round','body_head_triangle',
    'ears_default','ears_pointed',
    'nose_default',
    <!--'lips_default','lips_thin','lips_luscious',-->
    <!--'body_face',-->
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
    'pipe_subgenius',
    'tie_bow',
    'hair_short','hair_afro','hair_mohawk','hair_bangs','hair_ponytail','hair_odango','hair_emo','hair_spider','hair_wreckingball','hair_down_1_of_3','hair_manga_1_of_2',
    'glasses_hipster','glasses_google','glasses_oakley','glasses_rayban','glasses_round','glasses_wayrafer','glasses_designer','glasses_goggles',
    'hat_waitress','hat_police','hat_cowboy','hat_top','hat_scumbag','hat_tiara','hat_magritte','hat_strainer_1_of_2','hat_helmet_vietnam_1_of_2','hat_tuque','hat_cap',
    'body_hand',
    'nails_short','nails_long','nails_claws',
    'mask_horse','mask_stormtrooper','mask_jason','mask_cat',
    'horns_devil',
    'coat_winter_furcollar_1_of_3',
    'shoulderpads_artillery',
    'belt_utility',
    'earpiece_microphone'
    ];
    var layerDirectoryFemale = 'layer/female/';
    var layerDirectoryMale = 'layer/male/';
    var multiLayerFemale = [['hair_manga', 2], ['hair_down', 3], ['hat_strainer', 2], ['hat_helmet_vietnam', 2], ['coat_winter_furcollar', 3]];
    var multiLayerMale = [['hair_manga',2], ['coat_trench', 2], ['hat_fedora', 2], ['shirt_colar', 2], ['hat_strainer', 2], ['hat_helmet_vietnam', 2], ['tie_bow', 2]];
    var size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
    var skinLayers = ['body_athletic', 'body_head_default', 'body_head_diamond', 'body_head_heart', 'body_head_oblong', 'body_head_oval', 'body_head_round', 'body_head_square', 'body_head_triangle', 'body_hand',
    'ears_default', 'ears_pointed',
    'nose_default', 'nose_pointed', 'nose_strong',
    'mouth_shadow',
    'age_lines', 'sockets_neutral', 'wings_devil',
    'mouth_neutral', 'mouth_amusement', 'mouth_anger', 'mouth_alertness', 'mouth_anxiety', 'mouth_betrayal', 'mouth_caged', 'mouth_cruel', 'mouth_desperation', 'mouth_eeww', 'mouth_horror', 'mouth_melancholy', 'mouth_omg', 'mouth_outrage' ];
    var hairLayers = ['facialhair_beard_boxed', 'facialhair_beard_ducktail', 'facialhair_beard_guru', 'facialhair_beard_intelectual', 'facialhair_beard_rap', 'facialhair_chinpuff', 'facialhair_goatee', 'facialhair_moustache', 'facialhair_moustache_thick', 'facialhair_muttonchops', 'facialhair_muttonchops_friendly', 'facialhair_soulpatch', 'facialhair_winnfield',
    'hair_balding', 'hair_balding_crazy', 'hair_short', 'hair_gelled', 'hair_wavy', 'hair_manga_1_of_2', 'hair_manga_2_of_2', 'hair_mohawk', 'hair_down_1_of_3', 'hair_down_2_of_3', 'hair_down_3_of_3', 'hair_afro', 'hair_ponytail', 'hair_bangs', 'hair_odango', 'hair_emo', 'hair_spider', 'hair_wreckingball', 'hair_crewcut',
    'eyelashes_neutral',
    'brows_neutral','brows_alertness','brows_anxiety','brows_amusement','brows_anger','brows_anxiety','brows_aversion','brows_betrayal','brows_caged','brows_concern','brows_cruel','brows_dejection','brows_desperation','brows_disdain','brows_disgust','brows_eeww','brows_fear','brows_grief','brows_horror','brows_indignation','brows_joy','brows_laughing','brows_melancholy','brows_omg','brows_outrage','brows_pain','brows_rage','brows_revulsion','brows_sadness','brows_satisfaction','brows_shock','brows_sterness','brows_surprise','brows_terror','brows_wonder','brows_wtf',
    ];
    c.sex  = hash.get('sex');
    <!--TODO: Make the following piece of code into a function-->
    var sex = c.sex;
    if (sex ==='m') {
        var form1 = maleForm1;
        var form2 = maleForm2;
        var form3 = maleForm3;
        var layerDirectory = layerDirectoryMale;
        var layers = layersMale;
        var multiLayer = multiLayerMale;
    } else {
        var form1 = femaleForm1;
        var form2 = femaleForm2;
        var form3 = femaleForm3;
        var layerDirectory = layerDirectoryFemale;
        var layers = layersFemale;
        var multiLayer = multiLayerFemale;
    }
    var forms = [form1, form2, form3];
// Get all the hash key/value pairs and include them in the c.choices object
// Go through all the forms
    createForm(sex, forms);
    parseHash(c, forms, skinLayers, hairLayers);  //Hashed elements are added in the character object
    toBeShown = choicesToLayers(c, multiLayer);
    var viewport = Snap("#svg1");
    var viewportFace = Snap("#lg_face");
    var viewportTorso = Snap("#lg_torso");
    var viewportBody = Snap("#lg_body");
    var viewportFull = Snap("#lg_full");
    var sideBar = document.getElementById("sidebar");
    var myLoadList = layers.map(function(obj){
        return layerDirectory + obj;
    });
    viewport.loadFilesDisplayOrdered( myLoadList, onAllLoaded, onEachLoaded );
    viewportFace.loadFilesDisplayOrdered( myLoadList, onAllLoaded, onEachLoaded );
    viewportTorso.loadFilesDisplayOrdered( myLoadList, onAllLoaded, onEachLoaded );
    viewportBody.loadFilesDisplayOrdered( myLoadList, onAllLoaded, onEachLoaded );
    viewportFull.loadFilesDisplayOrdered( myLoadList, onAllLoaded, onEachLoaded );
    TweenMax.to(maleSilhouette, 0.5, {attr:{opacity: 0}, ease:Elastic.easeOut}, 0.05);
    TweenMax.to(femaleSilhouette, 0.5, {attr:{opacity: 0}, ease:Elastic.easeOut}, 0.05);
    TweenMax.to(sideBar, 0.5, {opacity: 1, ease:Elastic.easeOut}, 0.05);
}

function stageNav() {
    //var stepByStep = document.getElementById("step-by-step");
    //var state = stages[stageKey];
    //var tl = new TimelineLite();
    //tl.to(stepByStep, 0.5, {opacity:1, ease:Linear.easeIn});
}

function displayPallette () {
    var skinTones = ['#FFDFC4', '#F0D5BE', '#EECEB3', '#E1B899', '#E5C298', '#FFDCB2', '#E5B887', '#E5A073', '#E79E6D', '#DB9065', '#CE967C', '#C67856', '#BA6C49', '#A57257', '#F0C8C9', '#DDA8A0', '#B97C6D', '#A8756C', '#AD6452', '#5C3836', '#CB8442', '#BD723C', '#704139', '#A3866A']
    var gmenu = document.getElementById("gmenu");
    for (color in skinTones) {
        var newColor = skinTones[color];
        var node = document.createElement("LI");
        node.className = "skin-tone";
        node.style.cssText = "background-color:" + newColor + ";";
        gmenu.appendChild(node);
        node.onclick = colorCutout;
        //} );
    };
    TweenMax.staggerFrom(".skin-tone", 0.5, {scale:0.5, opacity:0, delay:0.5, ease:Elastic.easeOut, force3D:true}, 0.05);
}

function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function colorCutout(newColor){
    var rgb = this.style.backgroundColor;
    var newColor = rgb2hex(rgb);
    var colorCards = document.getElementsByClassName(".skin-tone");
    var maleSilhouette = document.getElementById("male_silhouette");
    var femaleSilhouette = document.getElementById("female_silhouette");
    var sideBar = document.getElementById("sidebar");
    var lg = document.getElementsByClassName("lg");
    var tl = new TimelineLite();
    tl.staggerTo(".skin-tone", 0.5, {scale:0.5, opacity:0, delay:0.5, ease:Elastic.easeOut, force3D:true}, 0.05)
    .to(femaleSilhouette, 0.5, {attr:{fill: newColor, stroke: newColor}, ease:Elastic.easeOut}, 0.05)
    .to(maleSilhouette, 0.5, {attr:{fill: newColor, stroke: newColor}, ease:Elastic.easeOut}, 0.05)
    .to(sideBar, 0.5, {attr:{fill: newColor, stroke: newColor}, ease:Elastic.easeOut}, 0.05)
    .staggerTo(lg, 0.5, {opacity:0.5, delay:0.5}, 0.05);
    var obj = new Array();
    obj['skinColor'] =  newColor;
    hash.add(obj);
    launch();

}

function selectMale(event) {
    var maleSilhouette = document.getElementById("male_silhouette");
    var femaleSilhouette = document.getElementById("female_silhouette");
    maleSilhouette.removeEventListener('click', selectMale, false);
    hash.add({ sex: 'm' });
    var malePath = document.getElementById("path_male");
    var tl = new TimelineLite();
    //var stepByStep = document.getElementById("step-by-step");
    //var navLeft = document.getElementById("nav-left");
    tl.to(maleSilhouette, 1.5, {x:111, ease:SlowMo.easeIn}, "select_male")
    .to(malePath, 0.3, {attr:{'fill-opacity': 1}, ease:Linear.easeNone}, "select_male")
    .to(femaleSilhouette, 0.3, {opacity:0}, "select_male");
    //.to(stepByStep, 0.25, {opacity:0, x:-150, ease:Linear.easeIn}, "select_male")
    //.to(navLeft, 0.25, {opacity:1, ease:Bounce.easeIn}, "select_male");
    displayPallette();
}

function selectFemale(event) {
    var maleSilhouette = document.getElementById("male_silhouette");
    var femaleSilhouette = document.getElementById("female_silhouette");
    femaleSilhouette.removeEventListener('click', selectFemale, false);
    hash.add({ sex: 'f' });
    var femaleSilhouette = document.getElementById("female_silhouette");
    var femalePath = document.getElementById("path_female");
    var tl = new TimelineLite();
    tl.to(femaleSilhouette, 1.5, {x:-111, ease:SlowMo.easeIn}, "select_female")
    .to(femalePath, 0.3, {attr:{'fill-opacity': 1}, ease:Linear.easeNone}, "select_female")
    .to(maleSilhouette, 0.3, {opacity:0}, "select_female");
    displayPallette();
}

