var fs = require('fs');
var AdmZip = require('adm-zip');

var root = 'textures/blocks/';
var outTP = 'ProgrammerArt-TexturePack.zip';
var outRP = 'ProgrammerArt-ResourcePack.zip';
// translate our image names to texture pack images names
var image2tp = {
    planks_oak: 'wood',
    planks_birch: 'wood_birch',
    planks_spruce: 'wood_spruce',
    planks_jungle: 'wood_jungle',
    log_oak: 'tree_side',
    log_spruce_top: 'tree_top',
    log_spruce: 'tree_spruce',
    log_birch: 'tree_birch',
    log_jungle: 'tree_jungle',
    door_wood_lower: 'doorWood_lower',
    door_wood_upper: 'doorWood_upper',
    door_iron_lower: 'doorIron_lower',
    door_iron_upper: 'doorIron_upper',
    ladder: 'ladder',
    trapdoor: 'trapdoor',
    dirt: 'dirt',
    farmland_wet: 'farmland_wet',
    farmland_dry: 'farmland_dry',
    grass_side: 'grass_side',
    grass_side_snowed: 'snow_side',
    grass_side_overlay: 'grass_side_overlay',
    grass_top: 'grass_top',
    tallgrass: 'tallgrass',
    mycelium_top: 'mycel_top',
    mycelium_side: 'mycel_side',
    leaves_birch: 'leaves',
    leaves_birch_opaque: 'leaves_opaque',
    leaves_spruce: 'leaves_spruce',
    leaves_spruce_opaque: 'leaves_spruce_opaque',
    leaves_jungle: 'leaves_jungle',
    leaves_jungle_opaque: 'leaves_jungle_opaque',
    obsidian: 'obsidian',
    cobblestone: 'stonebrick',
    cobblestone_mossy: 'stoneMoss',
    stone: 'stone',
    stone_slab_side: 'stoneslab_side',
    stone_slab_top: 'stoneslab_top',
    bedrock: 'bedrock',
    end_stone: 'whiteStone',
    stonebrick: 'stonebricksmooth',
    stonebrick_cracked: 'stonebricksmooth_cracked',
    stonebrick_mossy: 'stonebricksmooth_mossy',
    stonebrick_carved: 'stonebricksmooth_carved',
    brick: 'brick',
    nether_brick: 'netherBrick',
    gravel: 'gravel',
    sand: 'sand',
    sandstone_top: 'sandstone_top',
    sandstone_normal: 'sandstone_side',
    sandstone_smooth: 'sandstone_smooth',
    sandstone_carved: 'sandstone_carved',
    sandstone_bottom: 'sandstone_bottom',
    clay: 'clay',
    snow: 'snow',

    gold_ore: 'oreGold',
    coal_ore: 'oreCoal',
    redstone_ore: 'oreRedstone',
    iron_ore: 'oreIron',
    lapis_ore: 'oreLapis',
    emerald_ore: 'oreEmerald',
    diamond_ore: 'oreDiamond',

    gold_block: 'blockGold',
    diamond_block: 'blockDiamond',
    emerald_block: 'blockEmerald',
    iron_block: 'blockIron',
    redstone_block: 'blockRedstone',
    lapis_block: 'blockLapis',
    quartz_block_side: 'quartzblock_side',
    quartz_block_top: 'quartzblock_top',
    quartz_block_bottom: 'quartzblock_bottom',
    quartz_block_lines: 'quartzblock_lines',
    quartz_block_lines_top: 'quartzblock_lines_top',
    quartz_block_chiseled: 'quartzblock_chiseled',
    quartz_block_chiseled_top: 'quartzblock_chiseled_top',

    iron_bars: 'fenceIron',

    glass: 'glass',
    glass_pane_top: 'thinglass_top',

    wool_colored_white: 'cloth_0',
    wool_colored_orange: 'cloth_1',
    wool_colored_magenta: 'cloth_2',
    wool_colored_light_blue: 'cloth_3',
    wool_colored_yellow: 'cloth_4',
    wool_colored_lime: 'cloth_5',
    wool_colored_pink: 'cloth_6',
    wool_colored_gray: 'cloth_7',
    wool_colored_silver: 'cloth_8',
    wool_colored_cyan: 'cloth_9',
    wool_colored_purple: 'cloth_10',
    wool_colored_blue: 'cloth_11',
    wool_colored_brown: 'cloth_12',
    wool_colored_green: 'cloth_13',
    wool_colored_red: 'cloth_14',
    wool_colored_black: 'cloth_15',
    bed_head_top: 'bed_head_top',
    bed_feet_top: 'bed_feet_top',
    bed_head_side: 'bed_head_side',
    bed_feet_side: 'bed_feet_side',
    bed_head_end: 'bed_head_end',
    bed_feet_end: 'bed_feet_end',
    anvil_base: 'anvil_base',
    anvil_top_damaged_0: 'anvil_top',
    anvil_top_damaged_1: 'anvil_top_damaged_1',
    anvil_top_damaged_2: 'anvil_top_damaged_2',
    brewing_stand: 'brewingStand',
    brewing_stand_base: 'brewingStand_base',
    cauldron_bottom: 'cauldron_bottom',
    cauldron_inner: 'cauldron_inner',
    cauldron_side: 'cauldron_side',
    cauldron_top: 'cauldron_top',
    itemframe_background: 'itemframe_back',

    beacon: 'beacon',

    rail_normal: 'rail',
    rail_normal_turned: 'rail_turn',
    rail_detector: 'detectorRail',
    rail_activator: 'activatorRail',
    rail_activator_powered: 'activatorRail_powered',
    rail_golden: 'goldenRail',
    rail_golden_powered: 'goldenRail_powered',

    web: 'web',
    flower_dandelion: 'flower',
    flower_rose: 'rose',
    deadbush: 'deadbush',
    fern: 'fern',
    flower_pot: 'flowerPot',
    waterlily: 'waterlily',
    sapling_oak: 'sapling',
    sapling_spruce: 'sapling_spruce',
    sapling_birch: 'sapling_birch',
    sapling_jungle: 'sapling_jungle',

    wheat_stage_0: 'crops_0',
    wheat_stage_1: 'crops_1',
    wheat_stage_2: 'crops_2',
    wheat_stage_3: 'crops_3',
    wheat_stage_4: 'crops_4',
    wheat_stage_5: 'crops_5',
    wheat_stage_6: 'crops_6',
    wheat_stage_7: 'crops_7',
    carrots_stage_0: 'carrots_0',
    carrots_stage_1: 'carrots_1',
    carrots_stage_2: 'carrots_2',
    carrots_stage_3: 'carrots_3',
    potatoes_stage_0: 'potatoes_0',
    potatoes_stage_1: 'potatoes_1',
    potatoes_stage_2: 'potatoes_2',
    potatoes_stage_3: 'potatoes_3',
    cactus_side: 'cactus_side',
    cactus_bottom: 'cactus_bottom',
    cactus_top: 'cactus_top',
    cake_top: 'cake_top',
    cake_bottom: 'cake_bottom',
    cake_side: 'cake_side',
    cake_inner: 'cake_inner',
    cocoa_stage_0: 'cocoa_0',
    cocoa_stage_1: 'cocoa_1',
    cocoa_stage_2: 'cocoa_2',
    melon_side: 'melon_side',
    melon_top: 'melon_top',
    pumpkin_side: 'pumpkin_side',
    pumpkin_top: 'pumpkin_top',
    pumpkin_face_off: 'pumpkin_face',
    pumpkin_face_on: 'pumpkin_jack',
    mushroom_block_skin_stem: 'mushroom_skin_stem',
    mushroom_block_skin_red: 'mushroom_skin_red',
    mushroom_block_skin_brown: 'mushroom_skin_brown',
    mushroom_block_inside: 'mushroom_inside',
    mushroom_brown: 'mushroom_brown',
    mushroom_red: 'mushroom_red',
    nether_wart_stage_0: 'netherStalk_0',
    nether_wart_stage_1: 'netherStalk_1',
    nether_wart_stage_2: 'netherStalk_2',
    reeds: 'reeds',
    melon_stem_disconnected: 'stem_straight',
    melon_stem_connected: 'stem_bent',

    dragon_egg: 'dragonEgg',
    enchanting_table_bottom: 'enchantment_bottom',
    enchanting_table_side: 'enchantment_side',
    enchanting_table_top: 'enchantment_top',
    endframe_eye: 'endframe_eye',
    endframe_side: 'endframe_side',
    endframe_top: 'endframe_top',

    destroy_stage_0: 'destroy_0',
    destroy_stage_1: 'destroy_1',
    destroy_stage_2: 'destroy_2',
    destroy_stage_3: 'destroy_3',
    destroy_stage_4: 'destroy_4',
    destroy_stage_5: 'destroy_5',
    destroy_stage_6: 'destroy_6',
    destroy_stage_7: 'destroy_7',
    destroy_stage_8: 'destroy_8',
    destroy_stage_9: 'destroy_9',

    ice: 'ice',
    water_still: 'water',
    water_flow: 'water_flow',
    lava_still: 'lava',
    lava_flow: 'lava_flow',
    portal: 'portal',
    fire_layer_0: 'fire_0',
    fire_layer_1: 'fire_1',

    mob_spawner: 'mobSpawner',

    torch_on: 'torch',
    redstone_torch_off: 'redtorch',
    redstone_torch_on: 'redtorch_lit',
    redstone_dust_line: 'redstoneDust_line',
    redstone_dust_line_overlay: 'redstoneDust_line_overlay',
    redstone_dust_cross: 'redstoneDust_cross',
    redstone_dust_cross_overlay: 'redstoneDust_cross_overlay',
    redstone_lamp_off: 'redstoneLight',
    redstone_lamp_on: 'redstoneLight_lit',
    repeater_off: 'repeater',
    repeater_on: 'repeater_lit',
    comparator_off: 'comparator',
    comparator_on: 'comparator_lit',
    daylight_detector_top: 'daylightDetector_top',
    daylight_detector_side: 'daylightDetector_side',
    lever: 'lever',
    trip_wire: 'tripWire',
    trip_wire_source: 'tripWireSource',
    tnt_bottom: 'tnt_bottom',
    tnt_top: 'tnt_top',
    tnt_side: 'tnt_side',
    hopper_outside: 'hopper',
    hopper_inside: 'hopper_inside',
    hopper_top: 'hopper_top',
    piston_bottom: 'piston_bottom',
    piston_inner: 'piston_inner_top',
    piston_side: 'piston_side',
    piston_top_sticky: 'piston_top_sticky',
    piston_top_normal: 'piston_top',

    sponge: 'sponge',
    vine: 'vine',

    furnace_front_off: 'furnace_front',
    furnace_front_on: 'furnace_front_lit',
    furnace_side: 'furnace_side',
    furnace_top: 'furnace_top',
    dispenser_front_horizontal: 'dispenser_front',
    dispenser_front_vertical: 'dispenser_front_vertical',
    dropper_front_horizontal: 'dropper_front',
    dropper_front_vertical: 'dropper_front_vertical',

    crafting_table_side: 'workbench_side',
    crafting_table_top: 'workbench_top',
    crafting_table_front: 'workbench_front',
    command_block: 'commandBlock',
    bookshelf: 'bookshelf',
    noteblock: 'musicBlock',
    jukebox_top: 'jukebox_top',

    netherrack: 'hellrock',
    quartz_ore: 'netherquartz',
    soul_sand: 'hellsand',
    glowstone: 'lightgem',
};

rpAdded = {
    anvil_base: false,
    anvil_top_damaged_0: false,
    anvil_top_damaged_1: false,
    anvil_top_damaged_2: false,
    beacon: false,
    bed_feet_end: false,
    bed_feet_side: false,
    bed_feet_top: false,
    bed_head_end: false,
    bed_head_side: false,
    bed_head_top: false,
    bedrock: false,
    bookshelf: false,
    brewing_stand: false,
    brewing_stand_base: false,
    brick: false,
    cactus_bottom: false,
    cactus_side: false,
    cactus_top: false,
    cake_bottom: false,
    cake_inner: false,
    cake_side: false,
    cake_top: false,
    carrots_stage_0: false,
    carrots_stage_1: false,
    carrots_stage_2: false,
    carrots_stage_3: false,
    cauldron_bottom: false,
    cauldron_inner: false,
    cauldron_side: false,
    cauldron_top: false,
    clay: false,
    coal_block: false,
    coal_ore: false,
    cobblestone: false,
    cobblestone_mossy: false,
    cocoa_stage_0: false,
    cocoa_stage_1: false,
    cocoa_stage_2: false,
    command_block: false,
    comparator_off: false,
    comparator_on: false,
    crafting_table_front: false,
    crafting_table_side: false,
    crafting_table_top: false,
    daylight_detector_side: false,
    daylight_detector_top: false,
    deadbush: false,
    destroy_stage_0: false,
    destroy_stage_1: false,
    destroy_stage_2: false,
    destroy_stage_3: false,
    destroy_stage_4: false,
    destroy_stage_5: false,
    destroy_stage_6: false,
    destroy_stage_7: false,
    destroy_stage_8: false,
    destroy_stage_9: false,
    diamond_block: false,
    diamond_ore: false,
    dirt: false,
    dirt_podzol_side: false,
    dirt_podzol_top: false,
    dispenser_front_horizontal: false,
    dispenser_front_vertical: false,
    door_iron_lower: false,
    door_iron_upper: false,
    door_wood_lower: false,
    door_wood_upper: false,
    double_plant_fern_bottom: false,
    double_plant_fern_top: false,
    double_plant_grass_bottom: false,
    double_plant_grass_top: false,
    double_plant_paeonia_bottom: false,
    double_plant_paeonia_top: false,
    double_plant_rose_bottom: false,
    double_plant_rose_top: false,
    double_plant_sunflower_back: false,
    double_plant_sunflower_bottom: false,
    double_plant_sunflower_front: false,
    double_plant_sunflower_top: false,
    double_plant_syringa_bottom: false,
    double_plant_syringa_top: false,
    dragon_egg: false,
    dropper_front_horizontal: false,
    dropper_front_vertical: false,
    emerald_block: false,
    emerald_ore: false,
    enchanting_table_bottom: false,
    enchanting_table_side: false,
    enchanting_table_top: false,
    end_stone: false,
    endframe_eye: false,
    endframe_side: false,
    endframe_top: false,
    farmland_dry: false,
    farmland_wet: false,
    fern: false,
    fire_layer_0: false,
    fire_layer_1: false,
    flower_allium: false,
    flower_blue_orchid: false,
    flower_dandelion: false,
    flower_houstonia: false,
    flower_oxeye_daisy: false,
    flower_paeonia: false,
    flower_pot: false,
    flower_rose: false,
    flower_tulip_orange: false,
    flower_tulip_pink: false,
    flower_tulip_red: false,
    flower_tulip_white: false,
    furnace_front_off: false,
    furnace_front_on: false,
    furnace_side: false,
    furnace_top: false,
    glass: false,
    glass_black: false,
    glass_blue: false,
    glass_brown: false,
    glass_cyan: false,
    glass_gray: false,
    glass_green: false,
    glass_light_blue: false,
    glass_lime: false,
    glass_magenta: false,
    glass_orange: false,
    glass_pane_top: false,
    glass_pane_top_black: false,
    glass_pane_top_blue: false,
    glass_pane_top_brown: false,
    glass_pane_top_cyan: false,
    glass_pane_top_gray: false,
    glass_pane_top_green: false,
    glass_pane_top_light_blue: false,
    glass_pane_top_lime: false,
    glass_pane_top_magenta: false,
    glass_pane_top_orange: false,
    glass_pane_top_pink: false,
    glass_pane_top_purple: false,
    glass_pane_top_red: false,
    glass_pane_top_silver: false,
    glass_pane_top_white: false,
    glass_pane_top_yellow: false,
    glass_pink: false,
    glass_purple: false,
    glass_red: false,
    glass_silver: false,
    glass_white: false,
    glass_yellow: false,
    glowstone: false,
    gold_block: false,
    gold_ore: false,
    grass_side: false,
    grass_side_overlay: false,
    grass_side_snowed: false,
    grass_top: false,
    gravel: false,
    hardened_clay: false,
    hardened_clay_stained_black: false,
    hardened_clay_stained_blue: false,
    hardened_clay_stained_brown: false,
    hardened_clay_stained_cyan: false,
    hardened_clay_stained_gray: false,
    hardened_clay_stained_green: false,
    hardened_clay_stained_light_blue: false,
    hardened_clay_stained_lime: false,
    hardened_clay_stained_magenta: false,
    hardened_clay_stained_orange: false,
    hardened_clay_stained_pink: false,
    hardened_clay_stained_purple: false,
    hardened_clay_stained_red: false,
    hardened_clay_stained_silver: false,
    hardened_clay_stained_white: false,
    hardened_clay_stained_yellow: false,
    hay_block_side: false,
    hay_block_top: false,
    hopper_inside: false,
    hopper_outside: false,
    hopper_top: false,
    ice: false,
    ice_packed: false,
    iron_bars: false,
    iron_block: false,
    iron_ore: false,
    itemframe_background: false,
    jukebox_side: false,
    jukebox_top: false,
    ladder: false,
    lapis_block: false,
    lapis_ore: false,
    lava_flow: false,
    lava_still: false,
    leaves_acacia: false,
    leaves_acacia_opaque: false,
    leaves_big_oak: false,
    leaves_big_oak_opaque: false,
    leaves_birch: false,
    leaves_birch_opaque: false,
    leaves_jungle: false,
    leaves_jungle_opaque: false,
    leaves_oak: false,
    leaves_oak_opaque: false,
    leaves_spruce: false,
    leaves_spruce_opaque: false,
    lever: false,
    log_acacia: false,
    log_acacia_top: false,
    log_big_oak: false,
    log_big_oak_top: false,
    log_birch: false,
    log_birch_top: false,
    log_jungle: false,
    log_jungle_top: false,
    log_oak: false,
    log_oak_top: false,
    log_spruce: false,
    log_spruce_top: false,
    melon_side: false,
    melon_stem_connected: false,
    melon_stem_disconnected: false,
    melon_top: false,
    mob_spawner: false,
    mushroom_block_inside: false,
    mushroom_block_skin_brown: false,
    mushroom_block_skin_red: false,
    mushroom_block_skin_stem: false,
    mushroom_brown: false,
    mushroom_red: false,
    mycelium_side: false,
    mycelium_top: false,
    nether_brick: false,
    nether_wart_stage_0: false,
    nether_wart_stage_1: false,
    nether_wart_stage_2: false,
    netherrack: false,
    noteblock: false,
    obsidian: false,
    piston_bottom: false,
    piston_inner: false,
    piston_side: false,
    piston_top_normal: false,
    piston_top_sticky: false,
    planks_acacia: false,
    planks_big_oak: false,
    planks_birch: false,
    planks_jungle: false,
    planks_oak: false,
    planks_spruce: false,
    portal: false,
    potatoes_stage_0: false,
    potatoes_stage_1: false,
    potatoes_stage_2: false,
    potatoes_stage_3: false,
    pumpkin_face_off: false,
    pumpkin_face_on: false,
    pumpkin_side: false,
    pumpkin_stem_connected: false,
    pumpkin_stem_disconnected: false,
    pumpkin_top: false,
    quartz_block_bottom: false,
    quartz_block_chiseled: false,
    quartz_block_chiseled_top: false,
    quartz_block_lines: false,
    quartz_block_lines_top: false,
    quartz_block_side: false,
    quartz_block_top: false,
    quartz_ore: false,
    rail_activator: false,
    rail_activator_powered: false,
    rail_detector: false,
    rail_detector_powered: false,
    rail_golden: false,
    rail_golden_powered: false,
    rail_normal: false,
    rail_normal_turned: false,
    red_sand: false,
    redstone_block: false,
    redstone_dust_cross: false,
    redstone_dust_cross_overlay: false,
    redstone_dust_line: false,
    redstone_dust_line_overlay: false,
    redstone_lamp_off: false,
    redstone_lamp_on: false,
    redstone_ore: false,
    redstone_torch_off: false,
    redstone_torch_on: false,
    reeds: false,
    repeater_off: false,
    repeater_on: false,
    sand: false,
    sandstone_bottom: false,
    sandstone_carved: false,
    sandstone_normal: false,
    sandstone_smooth: false,
    sandstone_top: false,
    sapling_acacia: false,
    sapling_birch: false,
    sapling_jungle: false,
    sapling_oak: false,
    sapling_roofed_oak: false,
    sapling_spruce: false,
    snow: false,
    soul_sand: false,
    sponge: false,
    stone: false,
    stone_slab_side: false,
    stone_slab_top: false,
    stonebrick: false,
    stonebrick_carved: false,
    stonebrick_cracked: false,
    stonebrick_mossy: false,
    tallgrass: false,
    tnt_bottom: false,
    tnt_side: false,
    tnt_top: false,
    torch_on: false,
    trapdoor: false,
    trip_wire: false,
    trip_wire_source: false,
    vine: false,
    water_flow: false,
    water_still: false,
    waterlily: false,
    web: false,
    wheat_stage_0: false,
    wheat_stage_1: false,
    wheat_stage_2: false,
    wheat_stage_3: false,
    wheat_stage_4: false,
    wheat_stage_5: false,
    wheat_stage_6: false,
    wheat_stage_7: false,
    wool_colored_black: false,
    wool_colored_blue: false,
    wool_colored_brown: false,
    wool_colored_cyan: false,
    wool_colored_gray: false,
    wool_colored_green: false,
    wool_colored_light_blue: false,
    wool_colored_lime: false,
    wool_colored_magenta: false,
    wool_colored_orange: false,
    wool_colored_pink: false,
    wool_colored_purple: false,
    wool_colored_red: false,
    wool_colored_silver: false,
    wool_colored_white: false,
    wool_colored_yellow: false,
}

fs.readdir(root, function(err, files) {
    console.log("files = " + files);
    
    var zipTP = new AdmZip();
    var zipRP = new AdmZip();

    zipRP.addFile('pack.mcmeta', fs.readFileSync('pack.mcmeta'));
    zipTP.addFile('pack.txt', fs.readFileSync('pack.txt'));

    for (var i = 0; i < files.length; ++i) {
        var file = files[i];
        var buffer = fs.readFileSync(root + '/' + file);

        var nameRP = file.replace('.png', '');
        var nameTP = image2tp[nameRP];

        if (nameTP !== undefined) {
            // part of texture pack
            var pathTP = 'textures/blocks/' + nameTP + '.png';

            zipTP.addFile(pathTP, buffer);
        }

        if (rpAdded[nameRP] !== undefined) {
            // part of resource pack
            rpAdded[nameRP] = true;
            var pathRP = 'assets/minecraft/textures/blocks/' + nameRP + '.png';
            zipRP.addFile(pathRP, buffer);
        } else {
            console.log("Unknown file: " + file);
        }
    }

    zipTP.writeZip(outTP);
    zipRP.writeZip(outRP);

    console.log("Wrote " + outTP);
    console.log("Wrote " + outRP);

    var total = 0, missing = 0;
    for (var x in rpAdded) {
        ++total;
        if (rpAdded[x]) continue;
        console.log("Missing "+x);
        ++missing;
    }
    console.log((total - missing) + " / " + total + " = " + (total - missing) / total);
});

