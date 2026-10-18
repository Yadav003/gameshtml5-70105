// ARROW ESCAPE - COMPLETE GAME ENGINE
// Features: Slithering Tail Escape Animation,
// Interlocking Puzzles, Web Audio & Touch Controls

(function () {
  "use strict";

  // 1. EMBEDDED LEVELS (Interlocking & 100% Solvable)
  const EMBEDDED_LEVELS = {
    1: {
      id: 1,
      name: "Level 1 - Classic Loop",
      board: { width: 500, height: 600 },
      paths: [
        { id: "yellow", path: "M 80 480 V 540 H 420 V 70 H 260 V 380 H 220 V 60", color: "#FFB703" },
        { id: "orange", path: "M 320 440 V 160", color: "#FB8500" },
        { id: "green",  path: "M 170 200 V 340 H 130 V 160 H 180", color: "#52B788" },
        { id: "cyan",   path: "M 170 420 H 250 V 460 H 360 V 180 H 340 V 140 H 370", color: "#2EC4B6" },
        { id: "purple", path: "M 160 120 H 90 V 420 H 130 V 480 H 250", color: "#9D4EDD" }
      ]
    },
    2: {
      id: 2,
      name: "Level 2 - The Swirl",
      board: { width: 600, height: 620 },
      paths: [
        { id: "top_cyan_u", path: "M 480 180 V 70 H 530 V 140", color: "#00B4D8" },
        { id: "bot_cyan_v", path: "M 150 480 V 550", color: "#00B4D8" },
        { id: "top_purple", path: "M 220 80 H 70 V 210", color: "#8338EC" },
        { id: "green_u1",   path: "M 110 210 H 190 V 170 H 130", color: "#06D6A0" },
        { id: "orange_top", path: "M 120 130 H 420 V 70 H 460 V 170 H 330", color: "#FB5607" },
        { id: "yellow_mid", path: "M 380 210 H 330", color: "#FFBE0B" },
        { id: "pink_mid",   path: "M 240 180 H 270 V 250 H 420 V 220 H 530 V 250", color: "#FF006E" },
        { id: "cyan_mid",   path: "M 530 410 V 290 H 260 V 330 H 480", color: "#00B4D8" },
        { id: "purple_v",   path: "M 200 370 V 240", color: "#8338EC" },
        { id: "orange_l",   path: "M 70 340 V 520 H 110 V 260 H 140 V 340", color: "#FB5607" },
        { id: "yellow_bot", path: "M 70 560 H 200 V 440 H 240 V 470", color: "#FFBE0B" },
        { id: "orange_s1",  path: "M 250 500 H 340", color: "#FB5607" },
        { id: "yellow_u",   path: "M 530 520 H 430 V 480 H 540", color: "#FFBE0B" },
        { id: "green_bot",  path: "M 530 560 H 250 V 530 H 380", color: "#06D6A0" },
        { id: "purple_mid", path: "M 500 390 H 360 V 440 H 480 V 420 H 380 V 370 H 460", color: "#8338EC" },
        { id: "pink_hook",  path: "M 250 370 H 280 V 410", color: "#FF006E" }
      ]
    },
    3: {
      id: 3,
      name: "Level 3 - Labyrinth Maze",
      board: { width: 600, height: 640 },
      paths: [
        { id: "top_bar_left", path: "M 200 110 H 50", color: "#FFBE0B" },
        { id: "top_border_hook", path: "M 50 60 H 260 V 110 H 210", color: "#FB5607" },
        { id: "top_exit_up", path: "M 220 200 V 230 H 260 V 150 H 350 V 100 H 310 V 40", color: "#06D6A0" },
        { id: "top_right_hook", path: "M 360 60 H 550 V 110 H 460", color: "#00B4D8" },
        { id: "upper_right_down", path: "M 410 140 V 180 H 440 V 220", color: "#8338EC" },
        { id: "right_top_hook", path: "M 510 220 V 150 H 550 V 240", color: "#FF006E" },
        { id: "right_col_up", path: "M 510 320 H 460 V 160", color: "#3A86FF" },
        { id: "u_turn_mid", path: "M 310 260 V 200 H 360 V 250", color: "#F77F00" },
        { id: "left_col_up", path: "M 50 250 V 130", color: "#2EC4B6" },
        { id: "left_inner_corner", path: "M 180 160 H 100 V 290 H 150", color: "#9D4EDD" },
        { id: "left_small_hook", path: "M 190 290 V 240 H 140 V 210 H 190", color: "#FFBE0B" },
        { id: "vert_mid_left_up", path: "M 220 360 V 250", color: "#FB5607" },
        { id: "red_arrow", path: "M 400 400 V 370 H 260 V 240", color: "#E63946" },
        { id: "green_arrow", path: "M 440 230 V 330 H 300", color: "#2A9D8F" },
        { id: "left_mid_bar", path: "M 170 340 H 90", color: "#7209B7" },
        { id: "left_col_mid_up", path: "M 50 460 V 320", color: "#06D6A0" },
        { id: "step_below_red", path: "M 370 410 H 220 V 460", color: "#00B4D8" },
        { id: "bot_mid_left", path: "M 390 450 H 220", color: "#FF006E" },
        { id: "bot_right_snake", path: "M 440 490 H 310 V 530 H 400", color: "#3A86FF" },
        { id: "bot_right_v1", path: "M 450 370 V 550", color: "#FFBE0B" },
        { id: "bot_right_v2", path: "M 490 580 V 390", color: "#FB5607" },
        { id: "bot_right_v3", path: "M 530 360 V 590", color: "#8338EC" },
        { id: "bot_left_loop", path: "M 100 480 V 400 H 180 V 540 H 350 V 580 H 420", color: "#06D6A0" },
        { id: "bot_left_up", path: "M 50 580 V 480", color: "#FF006E" },
        { id: "bot_left_exit", path: "M 270 580 H 90", color: "#2EC4B6" }
      ]
    },
    4: {
      id: 4,
      name: "Level 4 - Heart Maze",
      board: { width: 680, height: 680 },
      paths: [
        { id: "h1", path: "M 110 240 V 140 H 170 V 210", color: "#06D6A0" },
        { id: "h2", path: "M 170 140 H 260 V 110 H 190", color: "#8338EC" },
        { id: "h3", path: "M 140 270 V 180 H 320 V 220 H 190", color: "#00B4D8" },
        { id: "h4", path: "M 480 110 H 550", color: "#FB5607" },
        { id: "h5", path: "M 360 210 V 140 H 590", color: "#00B4D8" },
        { id: "h6", path: "M 530 160 H 600 V 220", color: "#06D6A0" },
        { id: "h7", path: "M 460 250 V 160 H 570 V 210 H 470", color: "#06D6A0" },
        { id: "h8", path: "M 160 290 H 240 V 320 H 170", color: "#FB5607" },
        { id: "h9", path: "M 270 290 H 570", color: "#FF006E" },
        { id: "h10", path: "M 150 360 H 620 V 330 H 480", color: "#00B4D8" },
        { id: "h11", path: "M 180 395 H 580", color: "#FFBE0B" },
        { id: "h12", path: "M 140 455 H 630 V 425 H 220", color: "#06D6A0" },
        { id: "h13", path: "M 480 485 H 580", color: "#FFBE0B" },
        { id: "h14", path: "M 120 515 V 200 H 330 V 270 H 420", color: "#00B4D8" },
        { id: "h15", path: "M 150 545 H 410 V 575 H 350", color: "#FFBE0B" },
        { id: "h16", path: "M 210 600 V 550 H 300 V 620 H 370", color: "#06D6A0" },
        { id: "h17", path: "M 230 630 V 570 H 260 V 620", color: "#FF006E" },
        { id: "h18", path: "M 400 650 V 580 H 470", color: "#FB5607" },
        { id: "h19", path: "M 440 660 V 560 H 470 V 630 H 500", color: "#8338EC" },
        { id: "h20", path: "M 520 630 V 580 H 550", color: "#FFBE0B" },
        { id: "h21", path: "M 410 690 H 370 V 640 H 440 V 670", color: "#FF006E" }
      ]
    },
    5: {
      id: 5,
      name: "Level 5 - Snake Labyrinth",
      board: { width: 520, height: 600 },
      paths: [
        { id: "u_cyan",         path: "M 120 90 V 140 H 80 V 70", color: "#00B4D8" },
        { id: "yellow_left_v",  path: "M 80 540 V 180 H 120 V 210", color: "#FFBE0B" },
        { id: "pink_left_u",    path: "M 160 470 V 240 H 120 V 470", color: "#FF006E" },
        { id: "orange_top_s",   path: "M 220 170 V 110 H 300 V 75 H 155 V 190 H 190 V 235", color: "#FB5607" },
        { id: "pink_center_h",  path: "M 340 135 H 260 V 260 H 225 V 220", color: "#FF006E" },
        { id: "purple_top_box", path: "M 340 105 H 380 V 135 H 300 V 265 H 410 V 75 H 325", color: "#8338EC" },
        { id: "green_inner_c",  path: "M 370 200 H 330 V 230 H 360", color: "#06D6A0" },
        { id: "yellow_mid_bar", path: "M 190 330 V 285 H 430", color: "#FFBE0B" },
        { id: "yellow_hook",    path: "M 190 390 V 345 H 255", color: "#FFBE0B" },
        { id: "cyan_corner",    path: "M 255 385 V 425 H 180", color: "#00B4D8" },
        { id: "orange_mid_s",   path: "M 400 425 H 295 V 365 H 380", color: "#FB5607" },
        { id: "purple_bot_u",   path: "M 400 475 H 295 V 435 H 345", color: "#8338EC" },
        { id: "green_bot_u",    path: "M 410 525 H 120 V 475 H 265", color: "#06D6A0" }
      ]
    },
    6: {
      id: 6,
      name: "Level 6 - Box & Serpents",
      board: { width: 500, height: 640 },
      paths: [
        { id: "green_frame", path: "M 420 220 V 90 H 100 V 320 H 380 V 350 H 300", color: "#06D6A0" },
        { id: "pink_snake",  path: "M 170 140 H 240 V 170 H 140 V 140 H 250 V 170 H 290 V 140 H 370 V 200 H 170", color: "#FF006E" },
        { id: "yellow_top",  path: "M 380 110 H 330", color: "#FFBE0B" },
        { id: "yellow_hook", path: "M 200 230 H 160 V 270 H 140", color: "#FFBE0B" },
        { id: "pink_u",      path: "M 310 270 V 220 H 260 V 270", color: "#FF006E" },
        { id: "purp_wave1",  path: "M 270 350 H 210 V 380 H 170 V 350 H 70", color: "#8338EC" },
        { id: "cyan_wave1",  path: "M 210 440 H 100 V 370", color: "#00B4D8" },
        { id: "orange_hook", path: "M 310 380 H 260 V 410 H 230", color: "#FB5607" },
        { id: "purp_wave2",  path: "M 420 340 V 380 H 370 V 420 H 330", color: "#8338EC" },
        { id: "green_arrow", path: "M 420 440 V 390", color: "#06D6A0" },
        { id: "orange_wave", path: "M 240 430 V 490 H 200 V 530", color: "#FB5607" },
        { id: "purp_s",      path: "M 160 490 H 100 V 520 H 70", color: "#8338EC" },
        { id: "orange_c",    path: "M 80 540 V 570 H 140", color: "#FB5607" },
        { id: "yellow_d",    path: "M 240 540 V 580", color: "#FFBE0B" },
        { id: "cyan_wave2",  path: "M 410 510 H 350 V 570 H 300 V 540", color: "#00B4D8" },
        { id: "cyan_r",      path: "M 380 570 H 440", color: "#00B4D8" }
      ]
    },
    7: {
      id: 7,
      name: "Level 7 - Serpentine Maze",
      board: { width: 560, height: 660 },
      paths: [
        { id: "l7_purp_v", path: "M 80 140 V 45", color: "#8338EC" },
        { id: "l7_green_snake", path: "M 115 110 H 155 V 70 H 215 V 110 H 245 V 45", color: "#06D6A0" },
        { id: "l7_yellow_hook", path: "M 340 50 H 300 V 85 H 275 V 45", color: "#FFBE0B" },
        { id: "l7_pink_u", path: "M 460 50 H 360 V 85 H 480", color: "#FF006E" },
        { id: "l7_yellow_v", path: "M 415 185 V 105", color: "#FFBE0B" },
        { id: "l7_cyan_c1", path: "M 465 115 H 445 V 140 H 475", color: "#00B4D8" },
        { id: "l7_cyan_c2", path: "M 465 165 H 445 V 190 H 475", color: "#00B4D8" },
        { id: "l7_orange_u", path: "M 465 245 H 415 V 215 H 475", color: "#FB5607" },
        { id: "l7_yellow_wave", path: "M 80 190 H 115 V 145 H 215 V 185 H 250 V 155", color: "#FFBE0B" },
        { id: "l7_cyan_inner", path: "M 145 185 H 130 V 160 H 165", color: "#00B4D8" },
        { id: "l7_pink_loop", path: "M 345 160 V 130 H 310 V 195 H 355 V 155", color: "#FF006E" },
        { id: "l7_purp_frame", path: "M 335 225 H 80 V 285 H 275 V 260 H 375 V 105 H 225", color: "#8338EC" },
        { id: "l7_green_straight", path: "M 255 255 H 95", color: "#06D6A0" },
        { id: "l7_cyan_outer_l", path: "M 320 625 H 80 V 315", color: "#00B4D8" },
        { id: "l7_yellow_tall_u", path: "M 135 595 H 105 V 345 H 135 V 515", color: "#FFBE0B" },
        { id: "l7_green_mid_hook", path: "M 170 335 H 195 V 390 H 235", color: "#06D6A0" },
        { id: "l7_green_mid_h", path: "M 250 425 H 155", color: "#06D6A0" },
        { id: "l7_orange_wavy", path: "M 450 320 H 345 V 365 H 315 V 330 H 280 V 365 H 245 V 325", color: "#FB5607" },
        { id: "l7_pink_v_snake", path: "M 220 595 H 195 V 555 H 175 V 400", color: "#FF006E" },
        { id: "l7_pink_small_v", path: "M 175 600 V 555", color: "#FF006E" },
        { id: "l7_pink_s_snake", path: "M 295 530 H 260 V 600 H 295 V 500", color: "#FF006E" },
        { id: "l7_orange_mid_u", path: "M 330 435 H 310 V 395 H 450 V 455 H 335 V 485 H 425", color: "#FB5607" },
        { id: "l7_purp_mid_snake", path: "M 240 490 H 295 V 400 H 430 V 445 H 465 V 400", color: "#8338EC" },
        { id: "l7_orange_bot_hook", path: "M 450 525 H 395 V 580 H 350 V 540 H 380 V 510", color: "#FB5607" },
        { id: "l7_purp_bot_u", path: "M 330 575 V 625 H 465 V 560", color: "#8338EC" }
      ]
    },
    8: {
      id: 8,
      name: "Level 8 - Dual Vortex",
      board: { width: 560, height: 620 },
      paths: [
        { id: "l8_cyan_top_u", path: "M 100 50 H 440 V 90 H 270", color: "#00B4D8" },
        { id: "l8_yellow_hook", path: "M 300 170 V 100 H 170", color: "#FFBE0B" },
        { id: "l8_pink_s", path: "M 100 115 H 220 V 180 H 160", color: "#FF006E" },
        { id: "l8_green_u", path: "M 100 310 V 190 H 140 V 270", color: "#06D6A0" },
        { id: "l8_purp_wave", path: "M 285 240 V 320 H 235 V 240 H 180 V 285", color: "#8338EC" },
        { id: "l8_orange_snake", path: "M 440 250 H 370 V 210 H 440 V 110 H 330 V 290 H 300 V 230", color: "#FB5607" },
        { id: "l8_purp_hook", path: "M 370 340 H 435 V 290 H 395", color: "#8338EC" },
        { id: "l8_yellow_short", path: "M 405 340 H 455", color: "#FFBE0B" },
        { id: "l8_cyan_spiral", path: "M 140 480 H 175 V 450 H 115 V 535 H 215 V 415 H 260 V 500", color: "#00B4D8" },
        { id: "l8_orange_bot", path: "M 435 480 H 370 V 450 H 435 V 535 H 335 V 415 H 300 V 500", color: "#FB5607" }
      ]
    },
    9: {
      id: 9,
      name: "Level 9 - Gem Nexus",
      board: { width: 680, height: 720 },
      paths: [
        { id: "l9_green_crown", path: "M 320 65 H 360 V 90 H 380 V 125 H 465", color: "#06D6A0" },
        { id: "l9_purp_top_hook", path: "M 350 100 H 330 V 125 H 250", color: "#8338EC" },
        { id: "l9_orange_top_bar", path: "M 520 100 V 125 H 210", color: "#FB5607" },
        { id: "l9_cyan_top_bracket", path: "M 195 100 V 150 H 535", color: "#00B4D8" },
        { id: "l9_orange_sat_up", path: "M 170 140 V 105", color: "#FB5607" },
        { id: "l9_pink_sat_left", path: "M 215 195 V 170 H 120", color: "#FF006E" },
        { id: "l9_cyan_sat_c", path: "M 115 260 H 90 V 290 H 115 V 265", color: "#00B4D8" },
        { id: "l9_cyan_corner_up", path: "M 80 320 H 130 V 230 H 220 V 185", color: "#00B4D8" },
        { id: "l9_green_u_left", path: "M 175 320 V 275 H 155 V 320", color: "#06D6A0" },
        { id: "l9_purp_s_left", path: "M 235 305 H 195 V 330 H 225 V 355 H 175", color: "#8338EC" },
        { id: "l9_orange_sat_bot_up", path: "M 120 480 V 420", color: "#FB5607" },
        { id: "l9_cyan_sat_bot_down", path: "M 150 410 V 480", color: "#00B4D8" },
        { id: "l9_cyan_inner_v", path: "M 265 375 V 230", color: "#00B4D8" },
        { id: "l9_yellow_top_frame", path: "M 285 240 V 195 H 490 V 265", color: "#FFBE0B" },
        { id: "l9_orange_inner_hook", path: "M 420 225 H 455 V 250 H 475 V 225", color: "#FB5607" },
        { id: "l9_green_loop_mid", path: "M 320 280 H 300 V 240 H 380 V 285 H 350 V 265", color: "#06D6A0" },
        { id: "l9_purp_long_s", path: "M 325 245 H 440 V 270 H 325 V 295 H 455", color: "#8338EC" },
        { id: "l9_yellow_mid_bar", path: "M 385 320 H 275", color: "#FFBE0B" },
        { id: "l9_cyan_mid_bar", path: "M 490 345 H 275", color: "#00B4D8" },
        { id: "l9_cyan_sat_right", path: "M 545 225 H 585", color: "#00B4D8" },
        { id: "l9_yellow_sat_hook", path: "M 545 325 V 250 H 600", color: "#FFBE0B" },
        { id: "l9_yellow_sat_u", path: "M 575 305 H 560 V 275 H 590", color: "#FFBE0B" },
        { id: "l9_purp_sat_down", path: "M 545 385 V 425", color: "#8338EC" },
        { id: "l9_yellow_sat_right", path: "M 545 445 H 585", color: "#FFBE0B" },
        { id: "l9_orange_sat_hook", path: "M 575 485 V 460 H 545 V 485", color: "#FB5607" },
        { id: "l9_green_tall_up", path: "M 515 510 V 240", color: "#06D6A0" },
        { id: "l9_orange_mid_v_down", path: "M 470 365 V 435", color: "#FB5607" },
        { id: "l9_pink_spiral_left", path: "M 180 500 V 380 H 255 V 460 H 200 V 415 H 240", color: "#FF006E" },
        { id: "l9_purp_mid_maze", path: "M 275 480 V 370 H 360 V 420 H 450 V 445 H 495", color: "#8338EC" },
        { id: "l9_pink_inner_spiral", path: "M 310 460 H 340 V 405 H 315 V 440", color: "#FF006E" },
        { id: "l9_pink_hook_mid", path: "M 450 455 H 350", color: "#FF006E" },
        { id: "l9_cyan_bot_hook", path: "M 445 470 H 480 V 525", color: "#00B4D8" },
        { id: "l9_yellow_bot_h1", path: "M 245 495 H 510", color: "#FFBE0B" },
        { id: "l9_yellow_bot_h2", path: "M 270 520 H 345", color: "#FFBE0B" },
        { id: "l9_pink_bot_snake", path: "M 280 545 H 360 V 520 H 420", color: "#FF006E" },
        { id: "l9_purp_bot_hook", path: "M 380 565 H 405 V 620", color: "#8338EC" },
        { id: "l9_cyan_bot_v_up", path: "M 425 605 V 545", color: "#00B4D8" },
        { id: "l9_green_bot_hook", path: "M 430 535 H 455 V 585", color: "#06D6A0" },
        { id: "l9_orange_bot_curve", path: "M 350 575 H 280 V 605 H 220", color: "#FB5607" }
      ]
    },
    10: {
      id: 10,
      name: "Level 10 - Infinity Nexus",
      board: { width: 600, height: 640 },
      paths: [
        { id: "l10_c_tl", path: "M 140 130 V 80 H 60", color: "#00B4D8" },
        { id: "l10_c_tr", path: "M 460 130 V 80 H 540", color: "#FB5607" },
        { id: "l10_c_bl", path: "M 140 510 V 560 H 60", color: "#FFBE0B" },
        { id: "l10_c_br", path: "M 460 510 V 560 H 540", color: "#06D6A0" },
        { id: "l10_top_purp", path: "M 180 80 H 420", color: "#8338EC" },
        { id: "l10_bot_pink", path: "M 420 560 H 180", color: "#FF006E" },
        { id: "l10_top_pink_u", path: "M 160 180 V 120 H 220 V 70", color: "#FF006E" },
        { id: "l10_top_green_u", path: "M 440 180 V 120 H 380 V 70", color: "#06D6A0" },
        { id: "l10_bot_cyan_u", path: "M 160 460 V 520 H 220 V 570", color: "#00B4D8" },
        { id: "l10_bot_orange_u", path: "M 440 460 V 520 H 380 V 570", color: "#FB5607" },
        { id: "l10_l_yellow_v", path: "M 90 420 V 200", color: "#FFBE0B" },
        { id: "l10_r_purp_v", path: "M 510 220 V 440", color: "#8338EC" },
        { id: "l10_mid_cyan_h", path: "M 120 230 H 480", color: "#00B4D8" },
        { id: "l10_mid_yellow_h", path: "M 480 410 H 120", color: "#FFBE0B" },
        { id: "l10_nexus_green", path: "M 280 280 H 180 V 360 H 280 V 315", color: "#06D6A0" },
        { id: "l10_nexus_purp", path: "M 320 360 H 420 V 280 H 320 V 325", color: "#8338EC" },
        { id: "l10_nexus_core_orange", path: "M 220 320 H 380", color: "#FB5607" },
        { id: "l10_nexus_guard_pink", path: "M 300 250 V 190", color: "#FF006E" }
      ]
    },
    11: {
      "id": 11,
      "name": "Level 11 - Grand Grid",
      "board": {
            "width": 620,
            "height": 720
      },
      "paths": [
            {
                  "id": "l11_a1",
                  "path": "M 240 55 H 215",
                  "color": "#3A86FF"
            },
            {
                  "id": "l11_a2",
                  "path": "M 455 55 H 265",
                  "color": "#06D6A0"
            },
            {
                  "id": "l11_a3",
                  "path": "M 505 55 H 480",
                  "color": "#FF006E"
            },
            {
                  "id": "l11_a4",
                  "path": "M 85 245 V 225 H 60 V 55 H 105 V 105 H 85 V 135 H 110 V 160 H 85 V 190 H 110 V 245 H 130 V 275 H 110 V 330 H 265 V 220 H 345 V 165 H 375 V 220 H 430",
                  "color": "#8338EC"
            },
            {
                  "id": "l11_a5",
                  "path": "M 135 165 V 140 H 160 V 110 H 135 V 60 H 185 V 85",
                  "color": "#FB5607"
            },
            {
                  "id": "l11_a6",
                  "path": "M 560 55 H 535 V 85 H 560 V 105 H 540 V 135 H 560 V 490 H 535 V 470 H 510 V 490 H 400",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l11_a7",
                  "path": "M 215 165 H 295 V 140 H 275 V 110 H 295 V 85 H 215",
                  "color": "#00B4D8"
            },
            {
                  "id": "l11_a8",
                  "path": "M 485 110 H 505 V 85 H 480",
                  "color": "#7209B7"
            },
            {
                  "id": "l11_a9",
                  "path": "M 135 220 V 195 H 160 V 165 H 190 V 190 H 320 V 85 H 455 V 165 H 480 V 190 H 460 V 220 H 505 V 190 H 530 V 360 H 425",
                  "color": "#E63946"
            },
            {
                  "id": "l11_a10",
                  "path": "M 425 110 H 345",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l11_a11",
                  "path": "M 215 110 H 240 V 135 H 215",
                  "color": "#F77F00"
            },
            {
                  "id": "l11_a12",
                  "path": "M 190 110 V 140",
                  "color": "#52B788"
            },
            {
                  "id": "l11_a13",
                  "path": "M 400 135 H 345",
                  "color": "#3A86FF"
            },
            {
                  "id": "l11_a14",
                  "path": "M 425 190 H 405 V 165 H 430 V 135",
                  "color": "#06D6A0"
            },
            {
                  "id": "l11_a15",
                  "path": "M 535 165 H 510 V 140 H 480",
                  "color": "#FF006E"
            },
            {
                  "id": "l11_a16",
                  "path": "M 190 245 V 225 H 160 V 275 H 215",
                  "color": "#8338EC"
            },
            {
                  "id": "l11_a17",
                  "path": "M 240 220 H 220 V 245 H 240 V 300 H 160",
                  "color": "#FB5607"
            },
            {
                  "id": "l11_a18",
                  "path": "M 350 275 V 250 H 300 V 275 H 320 V 300 H 300 V 330 H 320 V 360 H 295 V 385 H 320 V 410 H 295 V 465 H 320 V 440 H 400 V 470 H 375 V 495 H 350",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l11_a19",
                  "path": "M 400 385 V 330 H 505 V 250 H 380 V 300 H 350 V 330 H 370 V 355 H 350 V 380 H 370 V 420",
                  "color": "#00B4D8"
            },
            {
                  "id": "l11_a20",
                  "path": "M 55 250 V 275 H 85 V 300 H 60 V 410 H 85",
                  "color": "#7209B7"
            },
            {
                  "id": "l11_a21",
                  "path": "M 480 300 H 400 V 280 H 430",
                  "color": "#E63946"
            },
            {
                  "id": "l11_a22",
                  "path": "M 455 275 H 485",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l11_a23",
                  "path": "M 160 465 H 140 V 490 H 115 V 385 H 85 V 360 H 265 V 520 H 110 V 660 H 275",
                  "color": "#F77F00"
            },
            {
                  "id": "l11_a24",
                  "path": "M 450 385 H 425",
                  "color": "#52B788"
            },
            {
                  "id": "l11_a25",
                  "path": "M 215 385 H 140 V 445",
                  "color": "#3A86FF"
            },
            {
                  "id": "l11_a26",
                  "path": "M 530 385 H 480",
                  "color": "#06D6A0"
            },
            {
                  "id": "l11_a27",
                  "path": "M 240 385 V 440 H 220 V 410 H 190 V 445",
                  "color": "#FF006E"
            },
            {
                  "id": "l11_a28",
                  "path": "M 400 410 H 460",
                  "color": "#8338EC"
            },
            {
                  "id": "l11_a29",
                  "path": "M 510 440 H 530 V 410 H 485 V 470",
                  "color": "#FB5607"
            },
            {
                  "id": "l11_a30",
                  "path": "M 160 415 V 445",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l11_a31",
                  "path": "M 430 440 V 465 H 450 V 435",
                  "color": "#00B4D8"
            },
            {
                  "id": "l11_a32",
                  "path": "M 55 440 H 80 V 465 H 55",
                  "color": "#7209B7"
            },
            {
                  "id": "l11_a33",
                  "path": "M 240 470 V 495 H 220 V 470 H 190 V 495 H 160",
                  "color": "#E63946"
            },
            {
                  "id": "l11_a34",
                  "path": "M 320 495 H 295",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l11_a35",
                  "path": "M 85 495 H 55",
                  "color": "#F77F00"
            },
            {
                  "id": "l11_a36",
                  "path": "M 55 605 V 660 H 80 V 580 H 60 V 555 H 80 V 525 H 55",
                  "color": "#52B788"
            },
            {
                  "id": "l11_a37",
                  "path": "M 135 635 H 190 V 605 H 215 V 630 H 345 V 605 H 375 V 635 H 425 V 605 H 455 V 635 H 560 V 520 H 295",
                  "color": "#3A86FF"
            },
            {
                  "id": "l11_a38",
                  "path": "M 160 580 V 600 H 140 V 555 H 185 V 580 H 215 V 550 H 240 V 600 H 265 V 580 H 295 V 605 H 320 V 580 H 355",
                  "color": "#06D6A0"
            },
            {
                  "id": "l11_a39",
                  "path": "M 535 550 H 270",
                  "color": "#FF006E"
            },
            {
                  "id": "l11_a40",
                  "path": "M 375 580 H 405",
                  "color": "#8338EC"
            },
            {
                  "id": "l11_a41",
                  "path": "M 430 575 H 480 V 605",
                  "color": "#FB5607"
            },
            {
                  "id": "l11_a42",
                  "path": "M 510 580 H 540",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l11_a43",
                  "path": "M 535 605 H 505",
                  "color": "#00B4D8"
            },
            {
                  "id": "l11_a44",
                  "path": "M 295 660 H 325",
                  "color": "#7209B7"
            },
            {
                  "id": "l11_a45",
                  "path": "M 350 660 H 565",
                  "color": "#E63946"
            }
      ]
},
    12: {
      "id": 12,
      "name": "Level 12 - Vertical Labyrinth",
      "board": {
            "width": 620,
            "height": 860
      },
      "paths": [
            {
                  "id": "l12_a1",
                  "path": "M 150 80 V 55",
                  "color": "#3A86FF"
            },
            {
                  "id": "l12_a2",
                  "path": "M 55 105 V 60",
                  "color": "#06D6A0"
            },
            {
                  "id": "l12_a3",
                  "path": "M 390 60 V 80 H 465",
                  "color": "#FF006E"
            },
            {
                  "id": "l12_a4",
                  "path": "M 485 60 V 80 H 535",
                  "color": "#8338EC"
            },
            {
                  "id": "l12_a5",
                  "path": "M 200 65 V 80 H 175 V 65",
                  "color": "#FB5607"
            },
            {
                  "id": "l12_a6",
                  "path": "M 175 110 H 80 V 85 H 130",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l12_a7",
                  "path": "M 225 80 H 370",
                  "color": "#00B4D8"
            },
            {
                  "id": "l12_a8",
                  "path": "M 560 105 H 200",
                  "color": "#7209B7"
            },
            {
                  "id": "l12_a9",
                  "path": "M 510 490 H 465 V 465 H 440 V 490 H 420 V 315 H 250 V 240 H 225 V 210 H 250 V 185 H 225 V 160 H 245 V 135 H 55",
                  "color": "#E63946"
            },
            {
                  "id": "l12_a10",
                  "path": "M 295 190 V 135 H 275",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l12_a11",
                  "path": "M 370 135 H 320",
                  "color": "#F77F00"
            },
            {
                  "id": "l12_a12",
                  "path": "M 365 160 H 555 V 135 H 395",
                  "color": "#52B788"
            },
            {
                  "id": "l12_a13",
                  "path": "M 105 310 H 60 V 160 H 100 V 185 H 130 V 160 H 150 V 285",
                  "color": "#3A86FF"
            },
            {
                  "id": "l12_a14",
                  "path": "M 270 515 V 335 H 200 V 165 H 205",
                  "color": "#06D6A0"
            },
            {
                  "id": "l12_a15",
                  "path": "M 365 185 H 345 V 160 H 325 V 185",
                  "color": "#FF006E"
            },
            {
                  "id": "l12_a16",
                  "path": "M 440 265 V 215 H 295 V 285 H 270 V 160",
                  "color": "#8338EC"
            },
            {
                  "id": "l12_a17",
                  "path": "M 440 695 H 175 V 160",
                  "color": "#FB5607"
            },
            {
                  "id": "l12_a18",
                  "path": "M 465 340 V 360 H 555 V 340 H 540 V 315 H 560 V 185 H 390",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l12_a19",
                  "path": "M 110 210 H 85 V 290 H 125 V 335 H 105",
                  "color": "#00B4D8"
            },
            {
                  "id": "l12_a20",
                  "path": "M 490 335 V 210 H 465 V 315",
                  "color": "#7209B7"
            },
            {
                  "id": "l12_a21",
                  "path": "M 510 335 V 215 H 535 V 290",
                  "color": "#E63946"
            },
            {
                  "id": "l12_a22",
                  "path": "M 105 260 H 125 V 235 H 100",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l12_a23",
                  "path": "M 345 260 H 410 V 240 H 320 V 285 H 440 V 315",
                  "color": "#F77F00"
            },
            {
                  "id": "l12_a24",
                  "path": "M 225 310 V 260",
                  "color": "#52B788"
            },
            {
                  "id": "l12_a25",
                  "path": "M 150 310 V 465 H 75",
                  "color": "#3A86FF"
            },
            {
                  "id": "l12_a26",
                  "path": "M 130 360 H 75 V 335 H 60",
                  "color": "#06D6A0"
            },
            {
                  "id": "l12_a27",
                  "path": "M 320 470 V 490 H 390 V 340 H 295 V 490",
                  "color": "#FF006E"
            },
            {
                  "id": "l12_a28",
                  "path": "M 440 340 V 390 H 535",
                  "color": "#8338EC"
            },
            {
                  "id": "l12_a29",
                  "path": "M 250 365 H 205 V 540 H 345 V 565 H 370 V 540 H 395",
                  "color": "#FB5607"
            },
            {
                  "id": "l12_a30",
                  "path": "M 370 465 V 360 H 320 V 390",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l12_a31",
                  "path": "M 55 365 V 440 H 75 V 390",
                  "color": "#00B4D8"
            },
            {
                  "id": "l12_a32",
                  "path": "M 130 410 V 390 H 105 V 435 H 130",
                  "color": "#7209B7"
            },
            {
                  "id": "l12_a33",
                  "path": "M 245 415 V 390 H 225 V 440 H 250",
                  "color": "#E63946"
            },
            {
                  "id": "l12_a34",
                  "path": "M 345 390 V 415 H 325 V 435 H 345 V 470",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l12_a35",
                  "path": "M 490 410 V 465 H 555 V 440 H 515 V 415 H 560",
                  "color": "#F77F00"
            },
            {
                  "id": "l12_a36",
                  "path": "M 440 440 V 415 H 465 V 445",
                  "color": "#52B788"
            },
            {
                  "id": "l12_a37",
                  "path": "M 225 490 V 515 H 245 V 470 H 225",
                  "color": "#3A86FF"
            },
            {
                  "id": "l12_a38",
                  "path": "M 150 490 H 100",
                  "color": "#06D6A0"
            },
            {
                  "id": "l12_a39",
                  "path": "M 300 515 H 535 V 495 H 560 V 665 H 565",
                  "color": "#FF006E"
            },
            {
                  "id": "l12_a40",
                  "path": "M 130 695 V 720 H 60 V 490 H 75 V 515 H 145 V 645 H 130 V 670 H 150 V 720 H 345",
                  "color": "#8338EC"
            },
            {
                  "id": "l12_a41",
                  "path": "M 130 590 V 540 H 105 V 620 H 130",
                  "color": "#FB5607"
            },
            {
                  "id": "l12_a42",
                  "path": "M 80 540 V 695 H 100 V 665",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l12_a43",
                  "path": "M 320 645 H 410 V 620 H 395 V 590 H 415 V 545 H 510 V 565 H 490 V 590 H 510 V 670",
                  "color": "#00B4D8"
            },
            {
                  "id": "l12_a44",
                  "path": "M 535 545 V 595",
                  "color": "#7209B7"
            },
            {
                  "id": "l12_a45",
                  "path": "M 200 565 H 320",
                  "color": "#E63946"
            },
            {
                  "id": "l12_a46",
                  "path": "M 465 565 H 440 V 590 H 465",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l12_a47",
                  "path": "M 315 595 V 590 H 200 V 665 H 465 V 695",
                  "color": "#F77F00"
            },
            {
                  "id": "l12_a48",
                  "path": "M 320 620 H 345 V 590 H 370",
                  "color": "#52B788"
            },
            {
                  "id": "l12_a49",
                  "path": "M 295 645 H 225 V 620 H 300",
                  "color": "#3A86FF"
            },
            {
                  "id": "l12_a50",
                  "path": "M 440 645 V 620 H 485",
                  "color": "#06D6A0"
            },
            {
                  "id": "l12_a51",
                  "path": "M 535 620 V 670",
                  "color": "#FF006E"
            },
            {
                  "id": "l12_a52",
                  "path": "M 465 645 H 490 V 745 H 300 V 795 H 420",
                  "color": "#8338EC"
            },
            {
                  "id": "l12_a53",
                  "path": "M 510 695 H 560",
                  "color": "#FB5607"
            },
            {
                  "id": "l12_a54",
                  "path": "M 440 720 H 460 H 460",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l12_a55",
                  "path": "M 370 720 H 415",
                  "color": "#00B4D8"
            },
            {
                  "id": "l12_a56",
                  "path": "M 560 795 H 490 V 775 H 510 V 725 H 560",
                  "color": "#7209B7"
            },
            {
                  "id": "l12_a57",
                  "path": "M 560 770 H 535 V 745 H 565",
                  "color": "#E63946"
            },
            {
                  "id": "l12_a58",
                  "path": "M 80 770 V 750 H 105",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l12_a59",
                  "path": "M 200 745 H 130 V 795 H 175",
                  "color": "#F77F00"
            },
            {
                  "id": "l12_a60",
                  "path": "M 250 775 V 795 H 265 V 745 H 225 V 770 H 200 V 795 H 205",
                  "color": "#52B788"
            },
            {
                  "id": "l12_a61",
                  "path": "M 55 745 V 795 H 100 V 770",
                  "color": "#3A86FF"
            },
            {
                  "id": "l12_a62",
                  "path": "M 155 770 H 180",
                  "color": "#06D6A0"
            },
            {
                  "id": "l12_a63",
                  "path": "M 320 770 H 465",
                  "color": "#FF006E"
            }
      ]
},
    13: {
      "id": 13,
      "name": "Level 13 - Master Hardcore",
      "board": {
            "width": 620,
            "height": 920
      },
      "paths": [
            {
                  "id": "l13_a1",
                  "path": "M 310 120 V 80",
                  "color": "#3A86FF"
            },
            {
                  "id": "l13_a2",
                  "path": "M 230 85 V 100 H 250 V 120 H 235 V 140 H 290 V 125 H 275 V 105 H 290 V 85",
                  "color": "#06D6A0"
            },
            {
                  "id": "l13_a3",
                  "path": "M 410 120 V 85",
                  "color": "#FF006E"
            },
            {
                  "id": "l13_a4",
                  "path": "M 75 120 H 155 V 85",
                  "color": "#8338EC"
            },
            {
                  "id": "l13_a5",
                  "path": "M 190 145 H 215 V 120 H 190 V 85",
                  "color": "#FB5607"
            },
            {
                  "id": "l13_a6",
                  "path": "M 390 90 V 100 H 370 V 85",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l13_a7",
                  "path": "M 390 145 H 430 V 90",
                  "color": "#00B4D8"
            },
            {
                  "id": "l13_a8",
                  "path": "M 570 90 V 120 H 550 V 105 H 450 V 145 H 550",
                  "color": "#7209B7"
            },
            {
                  "id": "l13_a9",
                  "path": "M 130 225 H 150 V 145 H 55 V 100 H 135 V 90",
                  "color": "#E63946"
            },
            {
                  "id": "l13_a10",
                  "path": "M 350 90 V 140 H 370 V 125 H 390",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l13_a11",
                  "path": "M 175 90 V 245 H 155 V 265 H 170 V 630 H 155 V 655",
                  "color": "#F77F00"
            },
            {
                  "id": "l13_a12",
                  "path": "M 330 95 V 125",
                  "color": "#52B788"
            },
            {
                  "id": "l13_a13",
                  "path": "M 470 120 H 530",
                  "color": "#3A86FF"
            },
            {
                  "id": "l13_a14",
                  "path": "M 250 185 H 195 V 165 H 265 V 205 H 195 V 225 H 310 V 210 H 295 V 185 H 310 V 145 H 325 V 270",
                  "color": "#06D6A0"
            },
            {
                  "id": "l13_a15",
                  "path": "M 530 250 V 230 H 545 V 290 H 565 V 160",
                  "color": "#FF006E"
            },
            {
                  "id": "l13_a16",
                  "path": "M 135 205 V 165 H 55 V 205",
                  "color": "#8338EC"
            },
            {
                  "id": "l13_a17",
                  "path": "M 490 270 V 225 H 450 V 205 H 465 V 185 H 485 V 165 H 355 V 270 H 425 V 330 H 335 V 435 H 510",
                  "color": "#FB5607"
            },
            {
                  "id": "l13_a18",
                  "path": "M 530 185 H 545 V 165 H 510 V 200 H 550",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l13_a19",
                  "path": "M 75 205 V 185 H 90 V 205",
                  "color": "#00B4D8"
            },
            {
                  "id": "l13_a20",
                  "path": "M 410 230 V 250 H 370 V 225 H 385 V 205 H 375 V 185 H 390",
                  "color": "#7209B7"
            },
            {
                  "id": "l13_a21",
                  "path": "M 410 205 V 185 H 425 V 245 H 470",
                  "color": "#E63946"
            },
            {
                  "id": "l13_a22",
                  "path": "M 115 185 V 230 H 55 V 245",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l13_a23",
                  "path": "M 525 270 H 510 V 230",
                  "color": "#F77F00"
            },
            {
                  "id": "l13_a24",
                  "path": "M 80 295 V 250 H 130 V 270 H 95 V 310 H 115 V 290",
                  "color": "#52B788"
            },
            {
                  "id": "l13_a25",
                  "path": "M 230 330 V 250 H 215 V 335",
                  "color": "#3A86FF"
            },
            {
                  "id": "l13_a26",
                  "path": "M 290 270 V 250 H 310 V 270",
                  "color": "#06D6A0"
            },
            {
                  "id": "l13_a27",
                  "path": "M 195 250 V 420",
                  "color": "#FF006E"
            },
            {
                  "id": "l13_a28",
                  "path": "M 270 270 V 250",
                  "color": "#8338EC"
            },
            {
                  "id": "l13_a29",
                  "path": "M 350 400 V 415 H 570 V 315 H 550 V 355 H 450 V 270 H 465 V 290 H 530",
                  "color": "#FB5607"
            },
            {
                  "id": "l13_a30",
                  "path": "M 55 270 V 760 H 190 V 740 H 210 V 760 H 275",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l13_a31",
                  "path": "M 270 355 V 315 H 305 V 295 H 255 V 270",
                  "color": "#00B4D8"
            },
            {
                  "id": "l13_a32",
                  "path": "M 135 290 V 335 H 80 V 355 H 90 V 375 H 80 V 395 H 155 V 285",
                  "color": "#7209B7"
            },
            {
                  "id": "l13_a33",
                  "path": "M 350 310 H 410 V 295 H 330 V 315",
                  "color": "#E63946"
            },
            {
                  "id": "l13_a34",
                  "path": "M 470 335 H 530 V 310 H 465",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l13_a35",
                  "path": "M 75 670 H 270 V 570 H 230 V 545 H 215 V 565 H 195 V 505 H 215 V 485 H 195 V 465 H 210 V 355 H 250 V 315",
                  "color": "#F77F00"
            },
            {
                  "id": "l13_a36",
                  "path": "M 295 335 H 310 V 350 H 290",
                  "color": "#52B788"
            },
            {
                  "id": "l13_a37",
                  "path": "M 135 355 V 375 H 115 V 350",
                  "color": "#3A86FF"
            },
            {
                  "id": "l13_a38",
                  "path": "M 350 375 V 355 H 410",
                  "color": "#06D6A0"
            },
            {
                  "id": "l13_a39",
                  "path": "M 270 505 V 545 H 255 V 480 H 305 V 380 H 270 V 395 H 255 V 380 H 235 V 395",
                  "color": "#FF006E"
            },
            {
                  "id": "l13_a40",
                  "path": "M 370 395 H 445 V 380 H 370",
                  "color": "#8338EC"
            },
            {
                  "id": "l13_a41",
                  "path": "M 550 395 V 375 H 465",
                  "color": "#FB5607"
            },
            {
                  "id": "l13_a42",
                  "path": "M 545 395 H 470",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l13_a43",
                  "path": "M 135 435 H 150 V 415 H 75",
                  "color": "#00B4D8"
            },
            {
                  "id": "l13_a44",
                  "path": "M 275 460 H 290 V 415 H 235 V 435",
                  "color": "#7209B7"
            },
            {
                  "id": "l13_a45",
                  "path": "M 115 505 H 95 V 520 H 150 V 465 H 120 V 440 H 100 V 460 H 75 V 545 H 155",
                  "color": "#E63946"
            },
            {
                  "id": "l13_a46",
                  "path": "M 270 440 H 255 V 460 H 235 V 525",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l13_a47",
                  "path": "M 530 440 H 565 V 525 H 550 V 545 H 565 V 565 H 550 V 650 H 565 V 735 H 525",
                  "color": "#F77F00"
            },
            {
                  "id": "l13_a48",
                  "path": "M 430 460 H 355 V 480 H 370",
                  "color": "#52B788"
            },
            {
                  "id": "l13_a49",
                  "path": "M 470 460 H 545 V 500 H 490",
                  "color": "#3A86FF"
            },
            {
                  "id": "l13_a50",
                  "path": "M 95 480 H 135 V 505",
                  "color": "#06D6A0"
            },
            {
                  "id": "l13_a51",
                  "path": "M 430 480 H 390 V 505 H 450 V 485",
                  "color": "#FF006E"
            },
            {
                  "id": "l13_a52",
                  "path": "M 525 480 H 470 V 505",
                  "color": "#8338EC"
            },
            {
                  "id": "l13_a53",
                  "path": "M 330 545 V 565 H 350 V 525 H 315 V 585 H 370 V 505 H 295 V 605 H 405 V 735",
                  "color": "#FB5607"
            },
            {
                  "id": "l13_a54",
                  "path": "M 470 565 H 430 V 550 H 485 V 585 H 410 V 570 H 390 V 550 H 405 V 525 H 525 V 650 H 430",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l13_a55",
                  "path": "M 510 545 V 630 H 485 V 610 H 475 V 635",
                  "color": "#00B4D8"
            },
            {
                  "id": "l13_a56",
                  "path": "M 115 630 H 75 V 650 H 135 V 610 H 115 V 590 H 95 V 605 H 80 V 565 H 150 V 615",
                  "color": "#7209B7"
            },
            {
                  "id": "l13_a57",
                  "path": "M 250 590 H 190",
                  "color": "#E63946"
            },
            {
                  "id": "l13_a58",
                  "path": "M 210 650 V 630 H 230 V 650 H 250 V 610 H 210",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l13_a59",
                  "path": "M 450 630 H 430 V 615 H 450",
                  "color": "#F77F00"
            },
            {
                  "id": "l13_a60",
                  "path": "M 565 630 V 610",
                  "color": "#52B788"
            },
            {
                  "id": "l13_a61",
                  "path": "M 190 610 V 650 H 175",
                  "color": "#3A86FF"
            },
            {
                  "id": "l13_a62",
                  "path": "M 390 630 H 315 V 670 H 325 V 650 H 390 V 755 H 490",
                  "color": "#06D6A0"
            },
            {
                  "id": "l13_a63",
                  "path": "M 290 630 V 655",
                  "color": "#FF006E"
            },
            {
                  "id": "l13_a64",
                  "path": "M 355 670 H 370 V 690 H 295 V 760 H 315",
                  "color": "#8338EC"
            },
            {
                  "id": "l13_a65",
                  "path": "M 450 695 V 715 H 430 V 670 H 450",
                  "color": "#FB5607"
            },
            {
                  "id": "l13_a66",
                  "path": "M 490 695 V 735 H 470 V 675 H 510 V 780 H 490 V 800 H 525 V 780 H 545 V 850",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l13_a67",
                  "path": "M 550 695 V 670 H 530 V 715 H 550",
                  "color": "#00B4D8"
            },
            {
                  "id": "l13_a68",
                  "path": "M 270 695 H 95 V 715 H 135",
                  "color": "#7209B7"
            },
            {
                  "id": "l13_a69",
                  "path": "M 75 695 V 740",
                  "color": "#E63946"
            },
            {
                  "id": "l13_a70",
                  "path": "M 255 715 H 270 V 735 H 230 V 715 H 175 V 740",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l13_a71",
                  "path": "M 315 715 H 370 V 735 H 310",
                  "color": "#F77F00"
            },
            {
                  "id": "l13_a72",
                  "path": "M 155 715 V 735 H 95",
                  "color": "#52B788"
            },
            {
                  "id": "l13_a73",
                  "path": "M 450 735 H 430",
                  "color": "#3A86FF"
            },
            {
                  "id": "l13_a74",
                  "path": "M 55 780 H 350 V 760 H 370 V 775 H 470",
                  "color": "#06D6A0"
            },
            {
                  "id": "l13_a75",
                  "path": "M 530 760 H 570 V 865 H 410",
                  "color": "#FF006E"
            },
            {
                  "id": "l13_a76",
                  "path": "M 310 820 H 275 V 800 H 450",
                  "color": "#8338EC"
            },
            {
                  "id": "l13_a77",
                  "path": "M 55 800 V 820 H 75 V 800 H 110 V 840 H 95",
                  "color": "#FB5607"
            },
            {
                  "id": "l13_a78",
                  "path": "M 190 845 H 135 V 800 H 180",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l13_a79",
                  "path": "M 155 820 H 190 V 800 H 220",
                  "color": "#00B4D8"
            },
            {
                  "id": "l13_a80",
                  "path": "M 235 800 H 250 V 820 H 235 V 840 H 330 V 820 H 345 V 840 H 365 V 825 H 410 V 840 H 390 V 860 H 250",
                  "color": "#7209B7"
            },
            {
                  "id": "l13_a81",
                  "path": "M 430 820 H 525 V 840 H 430",
                  "color": "#E63946"
            },
            {
                  "id": "l13_a82",
                  "path": "M 210 825 V 860 H 100 V 865",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l13_a83",
                  "path": "M 80 860 V 845 H 60",
                  "color": "#F77F00"
            }
      ]
},
    14: {
      "id": 14,
      "name": "Level 14 - Spiral Corridors",
      "board": {
            "width": 620,
            "height": 880
      },
      "paths": [
            {
                  "id": "l14_a1",
                  "path": "M 45 45 V 620 H 155 V 600 H 180 V 625 H 325",
                  "color": "#3A86FF"
            },
            {
                  "id": "l14_a2",
                  "path": "M 105 45 V 220 H 185",
                  "color": "#06D6A0"
            },
            {
                  "id": "l14_a3",
                  "path": "M 180 75 H 130 V 190 H 265 V 45",
                  "color": "#FF006E"
            },
            {
                  "id": "l14_a4",
                  "path": "M 485 75 H 515 V 50",
                  "color": "#8338EC"
            },
            {
                  "id": "l14_a5",
                  "path": "M 540 75 H 565 V 50",
                  "color": "#FB5607"
            },
            {
                  "id": "l14_a6",
                  "path": "M 75 50 V 510 H 380",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l14_a7",
                  "path": "M 295 55 V 160 H 460",
                  "color": "#00B4D8"
            },
            {
                  "id": "l14_a8",
                  "path": "M 210 75 H 235 V 160 H 155",
                  "color": "#7209B7"
            },
            {
                  "id": "l14_a9",
                  "path": "M 320 75 H 430 V 100 H 400",
                  "color": "#E63946"
            },
            {
                  "id": "l14_a10",
                  "path": "M 460 75 V 105 H 565 V 245 H 435 V 395 H 565 V 535 H 480",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l14_a11",
                  "path": "M 210 105 H 155 V 130 H 215",
                  "color": "#F77F00"
            },
            {
                  "id": "l14_a12",
                  "path": "M 320 130 V 105 H 345 V 130 H 485 V 160 H 510 V 135 H 535 V 190 H 400",
                  "color": "#52B788"
            },
            {
                  "id": "l14_a13",
                  "path": "M 370 190 H 320",
                  "color": "#3A86FF"
            },
            {
                  "id": "l14_a14",
                  "path": "M 295 190 V 215 H 515",
                  "color": "#06D6A0"
            },
            {
                  "id": "l14_a15",
                  "path": "M 215 220 H 265 V 245 H 410",
                  "color": "#FF006E"
            },
            {
                  "id": "l14_a16",
                  "path": "M 130 450 H 240 V 425 H 105 V 480 H 260 V 395 H 105 V 250 H 210",
                  "color": "#8338EC"
            },
            {
                  "id": "l14_a17",
                  "path": "M 180 275 H 165 V 270",
                  "color": "#FB5607"
            },
            {
                  "id": "l14_a18",
                  "path": "M 320 390 V 310 H 295 V 420 H 345 V 280 H 215 V 275",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l14_a19",
                  "path": "M 460 365 H 565 V 275",
                  "color": "#00B4D8"
            },
            {
                  "id": "l14_a20",
                  "path": "M 400 275 H 375",
                  "color": "#7209B7"
            },
            {
                  "id": "l14_a21",
                  "path": "M 460 275 H 535 V 310 H 455",
                  "color": "#E63946"
            },
            {
                  "id": "l14_a22",
                  "path": "M 130 280 V 310",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l14_a23",
                  "path": "M 380 425 H 400 V 305",
                  "color": "#F77F00"
            },
            {
                  "id": "l14_a24",
                  "path": "M 130 335 H 150 V 310 H 265 V 365 H 155",
                  "color": "#52B788"
            },
            {
                  "id": "l14_a25",
                  "path": "M 375 395 V 335",
                  "color": "#3A86FF"
            },
            {
                  "id": "l14_a26",
                  "path": "M 185 335 H 240",
                  "color": "#06D6A0"
            },
            {
                  "id": "l14_a27",
                  "path": "M 460 335 H 540",
                  "color": "#FF006E"
            },
            {
                  "id": "l14_a28",
                  "path": "M 510 450 H 350 V 480 H 535 V 425 H 430",
                  "color": "#8338EC"
            },
            {
                  "id": "l14_a29",
                  "path": "M 320 450 H 295 V 480 H 320",
                  "color": "#FB5607"
            },
            {
                  "id": "l14_a30",
                  "path": "M 375 595 H 400 V 570 H 375 V 540 H 405 V 510 H 430 V 570",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l14_a31",
                  "path": "M 540 510 H 455 V 600",
                  "color": "#00B4D8"
            },
            {
                  "id": "l14_a32",
                  "path": "M 185 570 V 535 H 75 V 595 H 135",
                  "color": "#7209B7"
            },
            {
                  "id": "l14_a33",
                  "path": "M 240 570 H 320 V 595 H 215 V 535 H 345 V 600",
                  "color": "#E63946"
            },
            {
                  "id": "l14_a34",
                  "path": "M 105 570 H 160",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l14_a35",
                  "path": "M 515 740 H 535 V 770 H 565 V 570 H 490 V 740",
                  "color": "#F77F00"
            },
            {
                  "id": "l14_a36",
                  "path": "M 540 625 V 600 H 515 V 650 H 535 V 685 H 515 V 710 H 545",
                  "color": "#52B788"
            },
            {
                  "id": "l14_a37",
                  "path": "M 455 685 V 710 H 325 V 685 H 345 V 625 H 380",
                  "color": "#3A86FF"
            },
            {
                  "id": "l14_a38",
                  "path": "M 430 685 H 375 V 655 H 400 V 625 H 430 V 650 H 460",
                  "color": "#06D6A0"
            },
            {
                  "id": "l14_a39",
                  "path": "M 45 825 H 205 V 800 H 50 V 655 H 295 V 740 H 460",
                  "color": "#FF006E"
            },
            {
                  "id": "l14_a40",
                  "path": "M 375 770 H 75 V 685 H 215",
                  "color": "#8338EC"
            },
            {
                  "id": "l14_a41",
                  "path": "M 265 710 V 685 H 240 V 710 H 105 V 740 H 215",
                  "color": "#FB5607"
            },
            {
                  "id": "l14_a42",
                  "path": "M 240 740 H 270",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l14_a43",
                  "path": "M 405 770 H 425 V 800 H 320 V 835",
                  "color": "#00B4D8"
            },
            {
                  "id": "l14_a44",
                  "path": "M 455 770 V 825 H 370",
                  "color": "#7209B7"
            },
            {
                  "id": "l14_a45",
                  "path": "M 485 770 V 835",
                  "color": "#E63946"
            },
            {
                  "id": "l14_a46",
                  "path": "M 515 770 V 825 H 565 V 805 H 575",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l14_a47",
                  "path": "M 295 825 V 800 H 265 V 835",
                  "color": "#F77F00"
            },
            {
                  "id": "l14_a48",
                  "path": "M 240 800 V 835",
                  "color": "#52B788"
            }
      ]
},
    15: {
      "id": 15,
      "name": "Level 15 - Castle Fortress",
      "board": {
            "width": 640,
            "height": 740
      },
      "paths": [
            {
                  "id": "l15_a1",
                  "path": "M 55 45 V 75 H 80 V 45 H 105 V 75 H 135 V 45 H 190 V 75 H 220 V 45 H 250 V 75 H 275 V 45 H 305 V 75 H 335 V 45 H 560 V 75 H 540 V 105 H 560 V 135 H 365",
                  "color": "#3A86FF"
            },
            {
                  "id": "l15_a2",
                  "path": "M 505 75 V 105 H 480 V 75 H 425 V 105 H 395 V 75 H 360",
                  "color": "#06D6A0"
            },
            {
                  "id": "l15_a3",
                  "path": "M 135 190 H 110 V 105 H 80",
                  "color": "#FF006E"
            },
            {
                  "id": "l15_a4",
                  "path": "M 140 105 H 340",
                  "color": "#8338EC"
            },
            {
                  "id": "l15_a5",
                  "path": "M 220 135 H 135",
                  "color": "#FB5607"
            },
            {
                  "id": "l15_a6",
                  "path": "M 50 165 V 190 H 80 V 135 H 45",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l15_a7",
                  "path": "M 365 220 V 190 H 390 V 160 H 340 V 135 H 310 V 160 H 280 V 135 H 250 V 160 H 190",
                  "color": "#00B4D8"
            },
            {
                  "id": "l15_a8",
                  "path": "M 335 190 H 165 V 165 H 135",
                  "color": "#7209B7"
            },
            {
                  "id": "l15_a9",
                  "path": "M 420 160 H 535 V 190 H 475",
                  "color": "#E63946"
            },
            {
                  "id": "l15_a10",
                  "path": "M 565 165 V 220 H 535 V 250 H 560 V 310 H 540 V 335 H 560 V 365 H 540 V 395 H 565 V 480 H 450 V 365",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l15_a11",
                  "path": "M 450 340 H 505 V 310 H 450 V 250 H 425 V 220 H 450 V 190 H 415",
                  "color": "#F77F00"
            },
            {
                  "id": "l15_a12",
                  "path": "M 55 685 H 105 V 660 H 55 V 455 H 80 V 425 H 55 V 395 H 80 V 365 H 55 V 220 H 340",
                  "color": "#52B788"
            },
            {
                  "id": "l15_a13",
                  "path": "M 505 250 V 220 H 480 V 280 H 510",
                  "color": "#3A86FF"
            },
            {
                  "id": "l15_a14",
                  "path": "M 395 220 V 305 H 365 V 245",
                  "color": "#06D6A0"
            },
            {
                  "id": "l15_a15",
                  "path": "M 195 280 V 245",
                  "color": "#FF006E"
            },
            {
                  "id": "l15_a16",
                  "path": "M 110 275 V 250 H 80 V 340",
                  "color": "#8338EC"
            },
            {
                  "id": "l15_a17",
                  "path": "M 135 280 V 250 H 165 V 335 H 190 V 305",
                  "color": "#FB5607"
            },
            {
                  "id": "l15_a18",
                  "path": "M 220 655 V 340 H 250 V 310 H 225 V 255 H 335 V 280 H 280 V 305 H 305 V 340",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l15_a19",
                  "path": "M 420 455 H 395 V 425 H 420 V 395 H 395 V 365 H 420 V 275",
                  "color": "#00B4D8"
            },
            {
                  "id": "l15_a20",
                  "path": "M 135 310 H 110 V 335 H 135 V 365 H 110 V 395 H 135 V 425 H 110 V 455 H 135 V 480 H 110 V 510 H 135 V 575",
                  "color": "#7209B7"
            },
            {
                  "id": "l15_a21",
                  "path": "M 335 365 V 340 H 395",
                  "color": "#E63946"
            },
            {
                  "id": "l15_a22",
                  "path": "M 365 450 V 360",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l15_a23",
                  "path": "M 480 450 V 360",
                  "color": "#F77F00"
            },
            {
                  "id": "l15_a24",
                  "path": "M 510 455 H 535 V 425 H 510 V 365",
                  "color": "#52B788"
            },
            {
                  "id": "l15_a25",
                  "path": "M 170 365 H 190 V 395 H 165 V 425 H 195 V 455 H 165 V 695",
                  "color": "#3A86FF"
            },
            {
                  "id": "l15_a26",
                  "path": "M 275 455 H 250 V 425 H 275 V 395 H 255 V 365 H 310",
                  "color": "#06D6A0"
            },
            {
                  "id": "l15_a27",
                  "path": "M 335 395 H 310 V 455",
                  "color": "#FF006E"
            },
            {
                  "id": "l15_a28",
                  "path": "M 335 450 V 425",
                  "color": "#8338EC"
            },
            {
                  "id": "l15_a29",
                  "path": "M 195 480 V 685 H 595",
                  "color": "#FB5607"
            },
            {
                  "id": "l15_a30",
                  "path": "M 420 655 V 630 H 395 V 655 H 255 V 630 H 305 V 600 H 255 V 485 H 275 V 570 H 335 V 540 H 310 V 485 H 425",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l15_a31",
                  "path": "M 80 485 V 540 H 105 V 570 H 80 V 625 H 110 V 600 H 135 V 660",
                  "color": "#00B4D8"
            },
            {
                  "id": "l15_a32",
                  "path": "M 590 45 V 655 H 450 V 600 H 420 V 570 H 450 V 510",
                  "color": "#7209B7"
            },
            {
                  "id": "l15_a33",
                  "path": "M 480 630 H 565 V 600 H 505 V 570 H 565 V 510",
                  "color": "#E63946"
            },
            {
                  "id": "l15_a34",
                  "path": "M 340 510 H 420 V 540 H 365 V 570 H 390 V 600 H 365 V 630",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l15_a35",
                  "path": "M 535 515 V 540 H 510 V 515 H 480 V 605",
                  "color": "#F77F00"
            },
            {
                  "id": "l15_a36",
                  "path": "M 335 625 V 595",
                  "color": "#52B788"
            }
      ]
},
    16: {
      "id": 16,
      "name": "Level 16 - Dual Core Nexus",
      "board": {
            "width": 640,
            "height": 840
      },
      "paths": [
            {
                  "id": "l16_a1",
                  "path": "M 115 95 V 55 H 70",
                  "color": "#3A86FF"
            },
            {
                  "id": "l16_a2",
                  "path": "M 55 385 V 300 H 135 V 250 H 50 V 50",
                  "color": "#06D6A0"
            },
            {
                  "id": "l16_a3",
                  "path": "M 160 685 V 50",
                  "color": "#FF006E"
            },
            {
                  "id": "l16_a4",
                  "path": "M 245 95 H 265 V 50 H 245 V 75 H 225 V 50 H 200 V 205 H 180 V 70",
                  "color": "#8338EC"
            },
            {
                  "id": "l16_a5",
                  "path": "M 500 205 V 50 H 290 V 120",
                  "color": "#FB5607"
            },
            {
                  "id": "l16_a6",
                  "path": "M 545 70 V 55 H 525 V 95 H 545 V 185 H 590",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l16_a7",
                  "path": "M 565 165 V 50 H 590 V 165",
                  "color": "#00B4D8"
            },
            {
                  "id": "l16_a8",
                  "path": "M 135 55 V 230 H 120 V 210 H 95 V 190 H 110 V 160",
                  "color": "#7209B7"
            },
            {
                  "id": "l16_a9",
                  "path": "M 70 115 V 75 H 90 V 170",
                  "color": "#E63946"
            },
            {
                  "id": "l16_a10",
                  "path": "M 310 75 H 330 V 160 H 285",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l16_a11",
                  "path": "M 395 120 V 160 H 415 V 95 H 375 V 185 H 435 V 75 H 355 V 205 H 460",
                  "color": "#F77F00"
            },
            {
                  "id": "l16_a12",
                  "path": "M 480 75 H 460 V 115 H 480 V 95",
                  "color": "#52B788"
            },
            {
                  "id": "l16_a13",
                  "path": "M 310 95 V 140 H 285",
                  "color": "#3A86FF"
            },
            {
                  "id": "l16_a14",
                  "path": "M 225 95 V 115 H 240 V 140 H 225 V 165 H 265 V 140",
                  "color": "#06D6A0"
            },
            {
                  "id": "l16_a15",
                  "path": "M 375 340 V 255 H 480 V 235 H 500 V 250 H 520 V 115",
                  "color": "#FF006E"
            },
            {
                  "id": "l16_a16",
                  "path": "M 115 140 V 115",
                  "color": "#8338EC"
            },
            {
                  "id": "l16_a17",
                  "path": "M 480 205 V 185 H 460 V 140 H 480",
                  "color": "#FB5607"
            },
            {
                  "id": "l16_a18",
                  "path": "M 70 140 V 230 H 95",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l16_a19",
                  "path": "M 310 255 V 210 H 245 V 275 H 330 V 185 H 225 V 230 H 205 V 255 H 220 V 300 H 330",
                  "color": "#00B4D8"
            },
            {
                  "id": "l16_a20",
                  "path": "M 565 255 V 210 H 590 V 275 H 565 V 295 H 585 V 365 H 525 V 345 H 545 V 320 H 525 V 300 H 545 V 210",
                  "color": "#7209B7"
            },
            {
                  "id": "l16_a21",
                  "path": "M 285 230 H 270 V 255 H 290",
                  "color": "#E63946"
            },
            {
                  "id": "l16_a22",
                  "path": "M 265 390 H 350 V 475 H 480 V 345 H 460 V 365 H 350 V 235 H 460",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l16_a23",
                  "path": "M 180 500 V 230",
                  "color": "#F77F00"
            },
            {
                  "id": "l16_a24",
                  "path": "M 200 300 V 270",
                  "color": "#52B788"
            },
            {
                  "id": "l16_a25",
                  "path": "M 50 275 H 95",
                  "color": "#3A86FF"
            },
            {
                  "id": "l16_a26",
                  "path": "M 525 275 H 395 V 295 H 460",
                  "color": "#06D6A0"
            },
            {
                  "id": "l16_a27",
                  "path": "M 480 300 H 505",
                  "color": "#FF006E"
            },
            {
                  "id": "l16_a28",
                  "path": "M 330 320 V 365 H 310 V 315",
                  "color": "#8338EC"
            },
            {
                  "id": "l16_a29",
                  "path": "M 565 340 V 315",
                  "color": "#FB5607"
            },
            {
                  "id": "l16_a30",
                  "path": "M 285 320 V 365 H 270 V 315",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l16_a31",
                  "path": "M 220 320 V 385 H 205 V 320",
                  "color": "#00B4D8"
            },
            {
                  "id": "l16_a32",
                  "path": "M 435 320 H 415",
                  "color": "#7209B7"
            },
            {
                  "id": "l16_a33",
                  "path": "M 500 455 V 320 H 460",
                  "color": "#E63946"
            },
            {
                  "id": "l16_a34",
                  "path": "M 95 320 V 455 H 50 V 430",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l16_a35",
                  "path": "M 245 320 V 545 H 225 V 410",
                  "color": "#F77F00"
            },
            {
                  "id": "l16_a36",
                  "path": "M 70 320 V 410 H 45",
                  "color": "#52B788"
            },
            {
                  "id": "l16_a37",
                  "path": "M 225 565 H 180 V 680 H 220 V 745 H 180 V 725 H 155 V 745 H 135 V 320",
                  "color": "#3A86FF"
            },
            {
                  "id": "l16_a38",
                  "path": "M 115 385 V 340",
                  "color": "#06D6A0"
            },
            {
                  "id": "l16_a39",
                  "path": "M 395 340 H 435",
                  "color": "#FF006E"
            },
            {
                  "id": "l16_a40",
                  "path": "M 565 455 H 525 V 385",
                  "color": "#8338EC"
            },
            {
                  "id": "l16_a41",
                  "path": "M 375 455 V 390 H 390 V 415",
                  "color": "#FB5607"
            },
            {
                  "id": "l16_a42",
                  "path": "M 460 455 V 390 H 420 V 415",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l16_a43",
                  "path": "M 565 410 V 435 H 545 V 390 H 590",
                  "color": "#00B4D8"
            },
            {
                  "id": "l16_a44",
                  "path": "M 180 525 V 545 H 200 V 410",
                  "color": "#7209B7"
            },
            {
                  "id": "l16_a45",
                  "path": "M 480 770 H 120 V 410",
                  "color": "#E63946"
            },
            {
                  "id": "l16_a46",
                  "path": "M 285 565 H 270 V 410 H 330 V 545",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l16_a47",
                  "path": "M 590 410 V 480 H 500 V 590 H 375 V 700 H 245 V 565",
                  "color": "#F77F00"
            },
            {
                  "id": "l16_a48",
                  "path": "M 440 410 V 460",
                  "color": "#52B788"
            },
            {
                  "id": "l16_a49",
                  "path": "M 285 545 V 435 H 310 V 525",
                  "color": "#3A86FF"
            },
            {
                  "id": "l16_a50",
                  "path": "M 395 455 V 435 H 415 V 460",
                  "color": "#06D6A0"
            },
            {
                  "id": "l16_a51",
                  "path": "M 70 500 V 590 H 90 V 480 H 50 V 610 H 95",
                  "color": "#FF006E"
            },
            {
                  "id": "l16_a52",
                  "path": "M 265 680 H 350 V 500 H 395 V 525",
                  "color": "#8338EC"
            },
            {
                  "id": "l16_a53",
                  "path": "M 395 545 H 415 V 500 H 435 V 565 H 460",
                  "color": "#FB5607"
            },
            {
                  "id": "l16_a54",
                  "path": "M 480 520 V 500 H 460 V 545 H 480",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l16_a55",
                  "path": "M 585 615 V 745 H 570 V 590 H 590 V 565 H 570 V 545 H 585 V 500 H 545 V 595",
                  "color": "#00B4D8"
            },
            {
                  "id": "l16_a56",
                  "path": "M 525 500 V 610 H 545 V 660",
                  "color": "#7209B7"
            },
            {
                  "id": "l16_a57",
                  "path": "M 375 525 V 565 H 420",
                  "color": "#E63946"
            },
            {
                  "id": "l16_a58",
                  "path": "M 310 545 V 565 H 330 V 590 H 270 V 660",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l16_a59",
                  "path": "M 225 590 V 655 H 200 V 590",
                  "color": "#F77F00"
            },
            {
                  "id": "l16_a60",
                  "path": "M 330 655 V 610 H 290 V 640",
                  "color": "#52B788"
            },
            {
                  "id": "l16_a61",
                  "path": "M 245 745 H 390 V 610 H 415 V 665",
                  "color": "#3A86FF"
            },
            {
                  "id": "l16_a62",
                  "path": "M 460 615 H 500 V 700 H 435",
                  "color": "#06D6A0"
            },
            {
                  "id": "l16_a63",
                  "path": "M 440 615 V 680 H 480",
                  "color": "#FF006E"
            },
            {
                  "id": "l16_a64",
                  "path": "M 90 635 H 50 V 705",
                  "color": "#8338EC"
            },
            {
                  "id": "l16_a65",
                  "path": "M 310 635 V 660",
                  "color": "#FB5607"
            },
            {
                  "id": "l16_a66",
                  "path": "M 480 660 H 460 V 635 H 480",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l16_a67",
                  "path": "M 50 795 H 520 V 655",
                  "color": "#00B4D8"
            },
            {
                  "id": "l16_a68",
                  "path": "M 70 700 V 660 H 90 V 705",
                  "color": "#7209B7"
            },
            {
                  "id": "l16_a69",
                  "path": "M 415 680 V 705",
                  "color": "#E63946"
            },
            {
                  "id": "l16_a70",
                  "path": "M 545 680 V 725",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l16_a71",
                  "path": "M 200 705 H 175",
                  "color": "#F77F00"
            },
            {
                  "id": "l16_a72",
                  "path": "M 245 725 H 290",
                  "color": "#52B788"
            },
            {
                  "id": "l16_a73",
                  "path": "M 480 745 H 415 V 725 H 460",
                  "color": "#3A86FF"
            },
            {
                  "id": "l16_a74",
                  "path": "M 480 725 H 505",
                  "color": "#06D6A0"
            },
            {
                  "id": "l16_a75",
                  "path": "M 95 770 V 745 H 70 V 770 H 55 V 725 H 95",
                  "color": "#FF006E"
            },
            {
                  "id": "l16_a76",
                  "path": "M 310 725 H 355",
                  "color": "#8338EC"
            },
            {
                  "id": "l16_a77",
                  "path": "M 500 770 V 745",
                  "color": "#FB5607"
            },
            {
                  "id": "l16_a78",
                  "path": "M 545 750 V 795 H 565 V 770 H 590",
                  "color": "#FFBE0B"
            }
      ]
},
    17: {
      "id": 17,
      "name": "Level 17 - Grand Overlord",
      "board": {
            "width": 640,
            "height": 900
      },
      "paths": [
            {
                  "id": "l17_a1",
                  "path": "M 505 50 H 565",
                  "color": "#3A86FF"
            },
            {
                  "id": "l17_a2",
                  "path": "M 195 225 H 55 V 50 H 475",
                  "color": "#06D6A0"
            },
            {
                  "id": "l17_a3",
                  "path": "M 585 55 V 80 H 475 V 135 H 500 V 110 H 530 V 255 H 595",
                  "color": "#FF006E"
            },
            {
                  "id": "l17_a4",
                  "path": "M 110 110 H 135 V 140 H 165 V 80 H 130",
                  "color": "#8338EC"
            },
            {
                  "id": "l17_a5",
                  "path": "M 105 80 H 80 V 195 H 195",
                  "color": "#FB5607"
            },
            {
                  "id": "l17_a6",
                  "path": "M 220 110 H 195 V 85 H 225",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l17_a7",
                  "path": "M 305 110 H 445 V 85 H 280 V 140 H 390",
                  "color": "#00B4D8"
            },
            {
                  "id": "l17_a8",
                  "path": "M 500 610 V 640 H 475 V 610 H 445 V 580 H 415 V 550 H 365 V 465 H 390 V 435 H 360 V 375 H 335 V 315 H 360 V 285 H 300 V 255 H 275 V 195 H 250 V 85",
                  "color": "#7209B7"
            },
            {
                  "id": "l17_a9",
                  "path": "M 560 230 H 585 V 200 H 560 V 170 H 585 V 140 H 560 V 115 H 595",
                  "color": "#E63946"
            },
            {
                  "id": "l17_a10",
                  "path": "M 110 140 V 170 H 190 V 140 H 225",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l17_a11",
                  "path": "M 355 730 H 530 V 580 H 480 V 435 H 585 V 285 H 445 V 170 H 420 V 140 H 445",
                  "color": "#F77F00"
            },
            {
                  "id": "l17_a12",
                  "path": "M 280 170 H 310",
                  "color": "#52B788"
            },
            {
                  "id": "l17_a13",
                  "path": "M 415 260 V 200 H 390 V 260 H 335 V 230 H 360 V 170 H 390",
                  "color": "#3A86FF"
            },
            {
                  "id": "l17_a14",
                  "path": "M 475 170 V 255 H 500 V 195",
                  "color": "#06D6A0"
            },
            {
                  "id": "l17_a15",
                  "path": "M 220 170 V 230 H 245 V 255 H 195 V 285 H 255",
                  "color": "#FF006E"
            },
            {
                  "id": "l17_a16",
                  "path": "M 305 225 V 200 H 335",
                  "color": "#8338EC"
            },
            {
                  "id": "l17_a17",
                  "path": "M 80 285 H 50 V 260 H 105 V 285 H 130 V 260 H 170",
                  "color": "#FB5607"
            },
            {
                  "id": "l17_a18",
                  "path": "M 110 580 H 305 V 380 H 165 V 285",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l17_a19",
                  "path": "M 560 315 H 530 V 345 H 555 V 375 H 530 V 405 H 475 V 380 H 500 V 345 H 475 V 320 H 390 V 290 H 420",
                  "color": "#00B4D8"
            },
            {
                  "id": "l17_a20",
                  "path": "M 110 345 H 130 V 320 H 45",
                  "color": "#7209B7"
            },
            {
                  "id": "l17_a21",
                  "path": "M 305 345 H 195 V 320 H 225",
                  "color": "#E63946"
            },
            {
                  "id": "l17_a22",
                  "path": "M 250 315 H 280",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l17_a23",
                  "path": "M 80 525 V 580 H 50 V 495 H 75 V 465 H 50 V 435 H 80 V 405 H 50 V 345 H 80 V 375 H 105 V 405 H 160 V 435 H 190 V 400",
                  "color": "#F77F00"
            },
            {
                  "id": "l17_a24",
                  "path": "M 360 345 H 450",
                  "color": "#52B788"
            },
            {
                  "id": "l17_a25",
                  "path": "M 445 435 V 375 H 415 V 405 H 390 V 375",
                  "color": "#3A86FF"
            },
            {
                  "id": "l17_a26",
                  "path": "M 220 435 V 405 H 250",
                  "color": "#06D6A0"
            },
            {
                  "id": "l17_a27",
                  "path": "M 335 405 V 580 H 390",
                  "color": "#FF006E"
            },
            {
                  "id": "l17_a28",
                  "path": "M 445 550 V 465 H 420 V 435",
                  "color": "#8338EC"
            },
            {
                  "id": "l17_a29",
                  "path": "M 135 435 H 110 V 495 H 135 V 465 H 160 V 530",
                  "color": "#FB5607"
            },
            {
                  "id": "l17_a30",
                  "path": "M 220 465 H 250 V 435 H 275 V 495 H 250 V 520 H 225 V 495",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l17_a31",
                  "path": "M 530 555 H 505 V 465 H 560",
                  "color": "#00B4D8"
            },
            {
                  "id": "l17_a32",
                  "path": "M 190 465 V 550 H 280",
                  "color": "#7209B7"
            },
            {
                  "id": "l17_a33",
                  "path": "M 390 495 V 520 H 415 V 490",
                  "color": "#E63946"
            },
            {
                  "id": "l17_a34",
                  "path": "M 560 580 V 555 H 585 V 495 H 560 V 520 H 530 V 490",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l17_a35",
                  "path": "M 110 550 V 525 H 135 V 550 H 165",
                  "color": "#F77F00"
            },
            {
                  "id": "l17_a36",
                  "path": "M 585 820 V 845 H 560 V 790 H 585 V 730 H 560 V 700 H 585 V 640 H 560 V 610 H 585 V 580",
                  "color": "#52B788"
            },
            {
                  "id": "l17_a37",
                  "path": "M 55 610 H 105 V 640 H 55 V 670 H 80 V 700 H 135 V 760",
                  "color": "#3A86FF"
            },
            {
                  "id": "l17_a38",
                  "path": "M 250 610 H 220 V 640 H 160",
                  "color": "#06D6A0"
            },
            {
                  "id": "l17_a39",
                  "path": "M 190 610 H 135 V 645",
                  "color": "#FF006E"
            },
            {
                  "id": "l17_a40",
                  "path": "M 390 640 V 670 H 280 V 615 H 415 V 700 H 250 V 635",
                  "color": "#8338EC"
            },
            {
                  "id": "l17_a41",
                  "path": "M 475 675 H 500 V 700 H 445 V 640",
                  "color": "#FB5607"
            },
            {
                  "id": "l17_a42",
                  "path": "M 305 640 H 365",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l17_a43",
                  "path": "M 110 670 H 165 V 705",
                  "color": "#00B4D8"
            },
            {
                  "id": "l17_a44",
                  "path": "M 505 845 H 530 V 820 H 475 V 845 H 415 V 815 H 360 V 845 H 330 V 815 H 305 V 785 H 280 V 755 H 335 V 730 H 245 V 760 H 215 V 670 H 190 V 705",
                  "color": "#7209B7"
            },
            {
                  "id": "l17_a45",
                  "path": "M 50 700 V 730 H 105 V 755 H 75",
                  "color": "#E63946"
            },
            {
                  "id": "l17_a46",
                  "path": "M 165 755 V 730 H 190 V 785 H 45",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l17_a47",
                  "path": "M 390 760 H 355",
                  "color": "#F77F00"
            },
            {
                  "id": "l17_a48",
                  "path": "M 445 815 V 790 H 420 V 755",
                  "color": "#52B788"
            },
            {
                  "id": "l17_a49",
                  "path": "M 560 760 H 505 V 790 H 475 V 760 H 445",
                  "color": "#3A86FF"
            },
            {
                  "id": "l17_a50",
                  "path": "M 220 790 H 255",
                  "color": "#06D6A0"
            },
            {
                  "id": "l17_a51",
                  "path": "M 335 790 H 390",
                  "color": "#FF006E"
            },
            {
                  "id": "l17_a52",
                  "path": "M 55 845 H 160 V 820 H 80",
                  "color": "#8338EC"
            },
            {
                  "id": "l17_a53",
                  "path": "M 305 845 H 275 V 815 H 250 V 845 H 225 V 815",
                  "color": "#FB5607"
            },
            {
                  "id": "l17_a54",
                  "path": "M 190 820 V 855",
                  "color": "#FFBE0B"
            }
      ]
},
    18: {
      "id": 18,
      "name": "Level 18 - Serpentine Columns",
      "board": {
            "width": 620,
            "height": 920
      },
      "paths": [
            {
                  "id": "l18_a1",
                  "path": "M 50 300 V 55",
                  "color": "#3A86FF"
            },
            {
                  "id": "l18_a2",
                  "path": "M 70 85 V 55",
                  "color": "#06D6A0"
            },
            {
                  "id": "l18_a3",
                  "path": "M 440 65 H 400 V 55",
                  "color": "#FF006E"
            },
            {
                  "id": "l18_a4",
                  "path": "M 275 65 H 220 V 60",
                  "color": "#8338EC"
            },
            {
                  "id": "l18_a5",
                  "path": "M 365 125 V 65 H 310 V 60",
                  "color": "#FB5607"
            },
            {
                  "id": "l18_a6",
                  "path": "M 105 200 V 60",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l18_a7",
                  "path": "M 460 65 H 480",
                  "color": "#00B4D8"
            },
            {
                  "id": "l18_a8",
                  "path": "M 85 125 V 65",
                  "color": "#7209B7"
            },
            {
                  "id": "l18_a9",
                  "path": "M 160 65 H 125 V 60",
                  "color": "#E63946"
            },
            {
                  "id": "l18_a10",
                  "path": "M 145 130 V 85 H 200 V 65 H 180",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l18_a11",
                  "path": "M 385 715 V 200 H 370 V 185 H 385 V 65",
                  "color": "#F77F00"
            },
            {
                  "id": "l18_a12",
                  "path": "M 475 125 V 160 H 405 V 145 H 445 V 85 H 515 V 65 H 565 V 105 H 530 V 125 H 515 V 140 H 530 V 165 H 515 V 320 H 495 V 340",
                  "color": "#52B788"
            },
            {
                  "id": "l18_a13",
                  "path": "M 400 120 V 80",
                  "color": "#3A86FF"
            },
            {
                  "id": "l18_a14",
                  "path": "M 220 85 H 290 V 140 H 265 V 105 H 235 V 125 H 255 V 140 H 235",
                  "color": "#06D6A0"
            },
            {
                  "id": "l18_a15",
                  "path": "M 310 200 H 290 V 220 H 325 V 145 H 310 V 125 H 325 V 85 H 345 V 145 H 360 V 160",
                  "color": "#FF006E"
            },
            {
                  "id": "l18_a16",
                  "path": "M 310 105 V 85",
                  "color": "#8338EC"
            },
            {
                  "id": "l18_a17",
                  "path": "M 420 125 V 85",
                  "color": "#FB5607"
            },
            {
                  "id": "l18_a18",
                  "path": "M 200 160 V 125 H 160 V 105 H 215 V 160 H 310 V 180 H 255 V 200 H 270 V 220 H 235 V 180 H 180 V 145 H 140",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l18_a19",
                  "path": "M 460 145 V 105 H 490 V 185",
                  "color": "#00B4D8"
            },
            {
                  "id": "l18_a20",
                  "path": "M 120 120 V 105",
                  "color": "#7209B7"
            },
            {
                  "id": "l18_a21",
                  "path": "M 570 180 V 125 H 555 V 185",
                  "color": "#E63946"
            },
            {
                  "id": "l18_a22",
                  "path": "M 70 300 V 140",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l18_a23",
                  "path": "M 90 160 V 145",
                  "color": "#F77F00"
            },
            {
                  "id": "l18_a24",
                  "path": "M 160 180 V 160 H 145",
                  "color": "#52B788"
            },
            {
                  "id": "l18_a25",
                  "path": "M 345 200 V 160",
                  "color": "#3A86FF"
            },
            {
                  "id": "l18_a26",
                  "path": "M 330 320 H 305 V 300 H 290 V 320 H 250 V 355 H 220 V 340 H 235 V 320 H 200 V 300 H 175 V 320 H 125 V 260 H 140 V 185 H 120 V 240 H 85 V 185",
                  "color": "#06D6A0"
            },
            {
                  "id": "l18_a27",
                  "path": "M 420 240 V 180 H 405 V 220",
                  "color": "#FF006E"
            },
            {
                  "id": "l18_a28",
                  "path": "M 455 200 H 440 V 180",
                  "color": "#8338EC"
            },
            {
                  "id": "l18_a29",
                  "path": "M 460 180 H 475 V 200 H 495",
                  "color": "#FB5607"
            },
            {
                  "id": "l18_a30",
                  "path": "M 550 320 V 280 H 565 V 335 H 535 V 185",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l18_a31",
                  "path": "M 215 220 V 200 H 160",
                  "color": "#00B4D8"
            },
            {
                  "id": "l18_a32",
                  "path": "M 555 225 V 200 H 565",
                  "color": "#7209B7"
            },
            {
                  "id": "l18_a33",
                  "path": "M 570 260 V 220",
                  "color": "#E63946"
            },
            {
                  "id": "l18_a34",
                  "path": "M 310 260 H 250 V 280 H 235 V 260 H 220 V 240 H 350 V 220 H 365 V 280 H 270 V 295 H 210 V 280 H 195 V 220 H 160",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l18_a35",
                  "path": "M 420 260 V 280 H 435 V 220",
                  "color": "#F77F00"
            },
            {
                  "id": "l18_a36",
                  "path": "M 420 240 H 400 V 300 H 435 V 320 H 460 V 225 H 495 V 300 H 475 V 375 H 460 V 400 H 535",
                  "color": "#52B788"
            },
            {
                  "id": "l18_a37",
                  "path": "M 180 240 H 160 V 260 H 180 V 285 H 140 V 300 H 160",
                  "color": "#3A86FF"
            },
            {
                  "id": "l18_a38",
                  "path": "M 475 280 V 240",
                  "color": "#06D6A0"
            },
            {
                  "id": "l18_a39",
                  "path": "M 550 260 V 240",
                  "color": "#FF006E"
            },
            {
                  "id": "l18_a40",
                  "path": "M 105 260 H 85 V 305",
                  "color": "#8338EC"
            },
            {
                  "id": "l18_a41",
                  "path": "M 345 260 H 325",
                  "color": "#FB5607"
            },
            {
                  "id": "l18_a42",
                  "path": "M 105 300 V 280",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l18_a43",
                  "path": "M 330 300 H 345",
                  "color": "#00B4D8"
            },
            {
                  "id": "l18_a44",
                  "path": "M 365 300 V 440",
                  "color": "#7209B7"
            },
            {
                  "id": "l18_a45",
                  "path": "M 180 460 V 475 H 160 V 420 H 105 V 360 H 195 V 340 H 55 V 320 H 105",
                  "color": "#E63946"
            },
            {
                  "id": "l18_a46",
                  "path": "M 400 360 V 320 H 420",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l18_a47",
                  "path": "M 460 360 V 335",
                  "color": "#F77F00"
            },
            {
                  "id": "l18_a48",
                  "path": "M 290 360 H 275 V 340 H 305 V 335",
                  "color": "#52B788"
            },
            {
                  "id": "l18_a49",
                  "path": "M 200 440 H 255 V 420 H 235 V 400 H 265 V 435 H 310 V 460 H 340 V 340 H 330 V 375 H 220 V 395 H 180 V 435",
                  "color": "#3A86FF"
            },
            {
                  "id": "l18_a50",
                  "path": "M 400 380 V 455 H 440 V 435 H 425 V 340 H 435 V 415",
                  "color": "#06D6A0"
            },
            {
                  "id": "l18_a51",
                  "path": "M 50 390 V 360",
                  "color": "#FF006E"
            },
            {
                  "id": "l18_a52",
                  "path": "M 85 360 V 455",
                  "color": "#8338EC"
            },
            {
                  "id": "l18_a53",
                  "path": "M 545 400 V 380 H 495 V 360 H 570 V 420 H 495 V 595",
                  "color": "#FB5607"
            },
            {
                  "id": "l18_a54",
                  "path": "M 140 395 H 125 V 380 H 170",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l18_a55",
                  "path": "M 50 420 V 455 H 70 V 395",
                  "color": "#00B4D8"
            },
            {
                  "id": "l18_a56",
                  "path": "M 325 435 V 420 H 295 V 400 H 330",
                  "color": "#7209B7"
            },
            {
                  "id": "l18_a57",
                  "path": "M 220 420 H 200",
                  "color": "#E63946"
            },
            {
                  "id": "l18_a58",
                  "path": "M 435 515 V 535 H 405 V 595 H 455 V 500 H 405 V 475 H 460 V 430",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l18_a59",
                  "path": "M 125 460 H 140 V 440 H 105 V 460",
                  "color": "#F77F00"
            },
            {
                  "id": "l18_a60",
                  "path": "M 515 440 H 565 V 495 H 550 V 530 H 520 V 495 H 530 V 515",
                  "color": "#52B788"
            },
            {
                  "id": "l18_a61",
                  "path": "M 475 595 V 440",
                  "color": "#3A86FF"
            },
            {
                  "id": "l18_a62",
                  "path": "M 270 535 H 200 V 440",
                  "color": "#06D6A0"
            },
            {
                  "id": "l18_a63",
                  "path": "M 510 475 H 550 V 455 H 515 V 440",
                  "color": "#FF006E"
            },
            {
                  "id": "l18_a64",
                  "path": "M 290 460 H 220 V 480 H 305 V 495 H 290 V 560 H 270 V 575 H 255 V 615 H 175 V 495 H 145",
                  "color": "#8338EC"
            },
            {
                  "id": "l18_a65",
                  "path": "M 115 515 H 105 V 495 H 125 V 475 H 50 V 530 H 70 V 495 H 85 V 515",
                  "color": "#FB5607"
            },
            {
                  "id": "l18_a66",
                  "path": "M 345 495 H 325 V 480 H 365 V 500",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l18_a67",
                  "path": "M 215 515 H 270 V 495 H 220",
                  "color": "#00B4D8"
            },
            {
                  "id": "l18_a68",
                  "path": "M 130 515 V 575 H 140 V 595 H 70 V 575 H 100 V 535 H 85 V 555 H 50 V 575",
                  "color": "#7209B7"
            },
            {
                  "id": "l18_a69",
                  "path": "M 160 555 H 145 V 540 H 160 V 515 H 145",
                  "color": "#E63946"
            },
            {
                  "id": "l18_a70",
                  "path": "M 345 555 V 520 H 365 V 560",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l18_a71",
                  "path": "M 400 515 H 430",
                  "color": "#F77F00"
            },
            {
                  "id": "l18_a72",
                  "path": "M 565 515 V 560 H 510 V 635 H 495 V 615 H 405 V 635 H 460 V 655 H 440 V 670 H 515 V 695 H 495 V 715 H 510 V 750 H 495 V 770 H 470 V 750 H 460",
                  "color": "#52B788"
            },
            {
                  "id": "l18_a73",
                  "path": "M 310 520 H 310",
                  "color": "#3A86FF"
            },
            {
                  "id": "l18_a74",
                  "path": "M 325 520 V 575 H 350 V 615 H 370 V 730 H 385 V 790 H 350 V 795",
                  "color": "#06D6A0"
            },
            {
                  "id": "l18_a75",
                  "path": "M 235 595 H 200 V 555 H 220",
                  "color": "#FF006E"
            },
            {
                  "id": "l18_a76",
                  "path": "M 420 555 H 440",
                  "color": "#8338EC"
            },
            {
                  "id": "l18_a77",
                  "path": "M 325 615 V 635 H 345 V 730 H 330 V 655 H 315 V 585",
                  "color": "#FB5607"
            },
            {
                  "id": "l18_a78",
                  "path": "M 235 575 H 215",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l18_a79",
                  "path": "M 160 575 V 615 H 125",
                  "color": "#00B4D8"
            },
            {
                  "id": "l18_a80",
                  "path": "M 440 575 H 420",
                  "color": "#7209B7"
            },
            {
                  "id": "l18_a81",
                  "path": "M 530 615 H 565 V 575 H 530",
                  "color": "#E63946"
            },
            {
                  "id": "l18_a82",
                  "path": "M 365 575 V 595",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l18_a83",
                  "path": "M 50 675 V 615 H 70 V 635 H 85 V 615 H 100 V 630 H 275 V 595 H 285 V 650 H 270 V 695 H 285 V 675 H 310 V 710 H 240 V 730",
                  "color": "#F77F00"
            },
            {
                  "id": "l18_a84",
                  "path": "M 480 635 V 655 H 535 V 635 H 570 V 795 H 545 V 830 H 530 V 850 H 490 V 870 H 475 V 850 H 455 V 865 H 385 V 850 H 400 V 830 H 385 V 810 H 365",
                  "color": "#52B788"
            },
            {
                  "id": "l18_a85",
                  "path": "M 160 670 H 235 V 690 H 250 V 655 H 70",
                  "color": "#3A86FF"
            },
            {
                  "id": "l18_a86",
                  "path": "M 405 675 H 415 V 655 H 405 H 405",
                  "color": "#06D6A0"
            },
            {
                  "id": "l18_a87",
                  "path": "M 545 655 V 750 H 535",
                  "color": "#FF006E"
            },
            {
                  "id": "l18_a88",
                  "path": "M 85 690 V 670 H 70 V 690 H 55 V 710 H 140 V 690 H 155 V 715",
                  "color": "#8338EC"
            },
            {
                  "id": "l18_a89",
                  "path": "M 140 675 H 105 V 695",
                  "color": "#FB5607"
            },
            {
                  "id": "l18_a90",
                  "path": "M 530 675 V 730",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l18_a91",
                  "path": "M 255 730 H 310 V 770 H 295 V 790 H 305 V 825 H 275 V 755 H 220 V 695 H 175",
                  "color": "#00B4D8"
            },
            {
                  "id": "l18_a92",
                  "path": "M 405 690 H 475 V 730 H 475",
                  "color": "#7209B7"
            },
            {
                  "id": "l18_a93",
                  "path": "M 400 770 V 715 H 420 V 730 H 435 V 750 H 425 V 850 H 435 V 775 H 460 V 790 H 535 V 805 H 475 V 830 H 510",
                  "color": "#E63946"
            },
            {
                  "id": "l18_a94",
                  "path": "M 85 810 H 70 V 730 H 50",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l18_a95",
                  "path": "M 250 810 H 235 V 825 H 250 V 870 H 160 V 790 H 180 V 805 H 215 V 790 H 250 V 775 H 200 V 730 H 90 V 755",
                  "color": "#F77F00"
            },
            {
                  "id": "l18_a96",
                  "path": "M 50 750 V 830",
                  "color": "#52B788"
            },
            {
                  "id": "l18_a97",
                  "path": "M 125 775 V 790 H 90 V 770 H 105 V 755 H 175 V 770 H 140 V 865 H 120 V 810 H 110 V 815",
                  "color": "#3A86FF"
            },
            {
                  "id": "l18_a98",
                  "path": "M 345 810 H 325 V 770 H 360 V 750 H 350",
                  "color": "#06D6A0"
            },
            {
                  "id": "l18_a99",
                  "path": "M 550 770 H 515",
                  "color": "#FF006E"
            },
            {
                  "id": "l18_a100",
                  "path": "M 400 790 V 810",
                  "color": "#8338EC"
            },
            {
                  "id": "l18_a101",
                  "path": "M 460 810 V 835",
                  "color": "#FB5607"
            },
            {
                  "id": "l18_a102",
                  "path": "M 570 810 V 825 H 575",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l18_a103",
                  "path": "M 70 870 V 850 H 80 V 865 H 105 V 830 H 70",
                  "color": "#00B4D8"
            },
            {
                  "id": "l18_a104",
                  "path": "M 235 850 H 215 V 830 H 200 V 855",
                  "color": "#7209B7"
            },
            {
                  "id": "l18_a105",
                  "path": "M 365 850 H 325 V 830 H 365",
                  "color": "#E63946"
            },
            {
                  "id": "l18_a106",
                  "path": "M 50 850 V 875",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l18_a107",
                  "path": "M 365 870 H 275 V 850 H 310",
                  "color": "#F77F00"
            },
            {
                  "id": "l18_a108",
                  "path": "M 550 850 H 575",
                  "color": "#52B788"
            },
            {
                  "id": "l18_a109",
                  "path": "M 570 870 H 515",
                  "color": "#3A86FF"
            }
      ]
},
    19: {
      "id": 19,
      "name": "Level 19 - Central Chamber",
      "board": {
            "width": 620,
            "height": 940
      },
      "paths": [
            {
                  "id": "l19_a1",
                  "path": "M 185 165 V 45",
                  "color": "#3A86FF"
            },
            {
                  "id": "l19_a2",
                  "path": "M 190 195 H 240 V 165 H 215 V 45",
                  "color": "#06D6A0"
            },
            {
                  "id": "l19_a3",
                  "path": "M 240 80 V 55 H 265 V 80 H 320 V 45",
                  "color": "#FF006E"
            },
            {
                  "id": "l19_a4",
                  "path": "M 405 135 V 80 H 355 V 45",
                  "color": "#8338EC"
            },
            {
                  "id": "l19_a5",
                  "path": "M 405 50 H 385 V 45",
                  "color": "#FB5607"
            },
            {
                  "id": "l19_a6",
                  "path": "M 55 50 H 80 V 540 H 520",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l19_a7",
                  "path": "M 130 50 H 105 V 80 H 135",
                  "color": "#00B4D8"
            },
            {
                  "id": "l19_a8",
                  "path": "M 265 195 H 425 V 55 H 565 V 280 H 490 V 425 H 320",
                  "color": "#7209B7"
            },
            {
                  "id": "l19_a9",
                  "path": "M 350 365 V 340 H 160 V 75",
                  "color": "#E63946"
            },
            {
                  "id": "l19_a10",
                  "path": "M 50 165 V 85 H 45",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l19_a11",
                  "path": "M 485 165 V 110 H 510 V 195 H 460 V 80 H 540 V 220 H 380 V 370",
                  "color": "#F77F00"
            },
            {
                  "id": "l19_a12",
                  "path": "M 270 110 H 295 V 165 H 270 V 140 H 245 V 105",
                  "color": "#52B788"
            },
            {
                  "id": "l19_a13",
                  "path": "M 405 165 H 350 V 140 H 375 V 110 H 325 V 140",
                  "color": "#3A86FF"
            },
            {
                  "id": "l19_a14",
                  "path": "M 130 110 V 135",
                  "color": "#06D6A0"
            },
            {
                  "id": "l19_a15",
                  "path": "M 130 225 H 105 V 200 H 130 V 170 H 110 V 135",
                  "color": "#FF006E"
            },
            {
                  "id": "l19_a16",
                  "path": "M 50 195 V 685 H 80 V 710 H 55 V 885 H 240 V 745",
                  "color": "#8338EC"
            },
            {
                  "id": "l19_a17",
                  "path": "M 215 280 H 240 V 255 H 215 V 225 H 345 V 255 H 330 V 280 H 350 V 310 H 190 V 220",
                  "color": "#FB5607"
            },
            {
                  "id": "l19_a18",
                  "path": "M 105 250 H 130 V 280 H 105",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l19_a19",
                  "path": "M 295 255 H 270 V 280 H 300",
                  "color": "#00B4D8"
            },
            {
                  "id": "l19_a20",
                  "path": "M 405 255 H 455 V 280 H 405 V 315",
                  "color": "#7209B7"
            },
            {
                  "id": "l19_a21",
                  "path": "M 490 255 H 515",
                  "color": "#E63946"
            },
            {
                  "id": "l19_a22",
                  "path": "M 105 340 H 130 V 315 H 105",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l19_a23",
                  "path": "M 460 370 V 310 H 430",
                  "color": "#F77F00"
            },
            {
                  "id": "l19_a24",
                  "path": "M 515 310 H 560 V 340 H 540",
                  "color": "#52B788"
            },
            {
                  "id": "l19_a25",
                  "path": "M 350 395 H 405 V 340 H 425 V 395 H 460",
                  "color": "#3A86FF"
            },
            {
                  "id": "l19_a26",
                  "path": "M 515 345 V 395 H 540 V 370 H 565 V 425 H 540",
                  "color": "#06D6A0"
            },
            {
                  "id": "l19_a27",
                  "path": "M 215 395 H 135 V 425 H 235 V 370 H 110 V 510 H 130 V 455 H 270",
                  "color": "#FF006E"
            },
            {
                  "id": "l19_a28",
                  "path": "M 270 370 V 425 H 295 V 450 H 325",
                  "color": "#8338EC"
            },
            {
                  "id": "l19_a29",
                  "path": "M 325 395 V 370 H 300 V 400",
                  "color": "#FB5607"
            },
            {
                  "id": "l19_a30",
                  "path": "M 350 455 H 385",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l19_a31",
                  "path": "M 435 510 H 565 V 455 H 405 V 515",
                  "color": "#00B4D8"
            },
            {
                  "id": "l19_a32",
                  "path": "M 160 510 V 485 H 275",
                  "color": "#7209B7"
            },
            {
                  "id": "l19_a33",
                  "path": "M 435 485 H 545",
                  "color": "#E63946"
            },
            {
                  "id": "l19_a34",
                  "path": "M 295 510 V 485 H 350",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l19_a35",
                  "path": "M 325 510 H 385",
                  "color": "#F77F00"
            },
            {
                  "id": "l19_a36",
                  "path": "M 190 510 H 275",
                  "color": "#52B788"
            },
            {
                  "id": "l19_a37",
                  "path": "M 570 570 V 545 H 540 V 570 H 80 V 655 H 275",
                  "color": "#3A86FF"
            },
            {
                  "id": "l19_a38",
                  "path": "M 190 600 H 165 V 625 H 190",
                  "color": "#06D6A0"
            },
            {
                  "id": "l19_a39",
                  "path": "M 130 625 H 110 V 600 H 140",
                  "color": "#FF006E"
            },
            {
                  "id": "l19_a40",
                  "path": "M 570 885 H 430 V 860 H 375 V 830 H 350 V 800 H 325 V 775 H 345 V 745 H 325 V 720 H 300 V 630 H 215 V 600 H 245",
                  "color": "#8338EC"
            },
            {
                  "id": "l19_a41",
                  "path": "M 270 600 H 315 V 655 H 375 V 685 H 400 V 660 H 435",
                  "color": "#FB5607"
            },
            {
                  "id": "l19_a42",
                  "path": "M 350 625 V 600 H 490",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l19_a43",
                  "path": "M 515 625 V 600 H 545",
                  "color": "#00B4D8"
            },
            {
                  "id": "l19_a44",
                  "path": "M 380 625 H 405",
                  "color": "#7209B7"
            },
            {
                  "id": "l19_a45",
                  "path": "M 435 625 H 480 V 655 H 515",
                  "color": "#E63946"
            },
            {
                  "id": "l19_a46",
                  "path": "M 565 655 H 540 V 630 H 575",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l19_a47",
                  "path": "M 485 715 H 460 V 855 H 565 V 690 H 425",
                  "color": "#F77F00"
            },
            {
                  "id": "l19_a48",
                  "path": "M 380 800 V 715 H 355 V 685",
                  "color": "#52B788"
            },
            {
                  "id": "l19_a49",
                  "path": "M 105 685 H 265 V 750",
                  "color": "#3A86FF"
            },
            {
                  "id": "l19_a50",
                  "path": "M 210 710 H 105",
                  "color": "#06D6A0"
            },
            {
                  "id": "l19_a51",
                  "path": "M 515 745 H 540 V 715 H 510",
                  "color": "#FF006E"
            },
            {
                  "id": "l19_a52",
                  "path": "M 430 715 H 405 V 745",
                  "color": "#8338EC"
            },
            {
                  "id": "l19_a53",
                  "path": "M 105 830 H 185 V 775 H 80 V 855 H 210 V 745 H 75",
                  "color": "#FB5607"
            },
            {
                  "id": "l19_a54",
                  "path": "M 485 830 V 800 H 510 V 825 H 540 V 770 H 490 V 740",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l19_a55",
                  "path": "M 430 830 V 740",
                  "color": "#00B4D8"
            },
            {
                  "id": "l19_a56",
                  "path": "M 270 770 H 295 V 800 H 275 V 830 H 290 V 855 H 345 V 885 H 405",
                  "color": "#7209B7"
            },
            {
                  "id": "l19_a57",
                  "path": "M 405 775 V 830",
                  "color": "#E63946"
            },
            {
                  "id": "l19_a58",
                  "path": "M 105 800 H 160",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l19_a59",
                  "path": "M 270 860 V 885 H 300",
                  "color": "#F77F00"
            }
      ]
},
    20: {
      "id": 20,
      "name": "Level 20 - Ultimate Master",
      "board": {
            "width": 620,
            "height": 760
      },
      "paths": [
            {
                  "id": "l20_a1",
                  "path": "M 50 75 V 45",
                  "color": "#3A86FF"
            },
            {
                  "id": "l20_a2",
                  "path": "M 250 50 V 125 H 225 V 45",
                  "color": "#06D6A0"
            },
            {
                  "id": "l20_a3",
                  "path": "M 80 80 V 50 H 200",
                  "color": "#FF006E"
            },
            {
                  "id": "l20_a4",
                  "path": "M 520 75 H 565 V 50 H 470 V 75 H 450 V 50 H 370 V 75 H 350 V 50 H 275 V 150 H 200",
                  "color": "#8338EC"
            },
            {
                  "id": "l20_a5",
                  "path": "M 200 75 H 120",
                  "color": "#FB5607"
            },
            {
                  "id": "l20_a6",
                  "path": "M 295 125 V 80 H 320 V 100 H 415 V 75",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l20_a7",
                  "path": "M 50 250 V 130 H 75 V 150 H 100 V 125 H 150 V 150 H 175 V 125 H 195 V 105 H 45",
                  "color": "#00B4D8"
            },
            {
                  "id": "l20_a8",
                  "path": "M 520 175 V 150 H 495 V 200 H 540 V 125 H 470 V 225 H 565 V 100 H 445 V 230",
                  "color": "#7209B7"
            },
            {
                  "id": "l20_a9",
                  "path": "M 420 275 V 125 H 325 V 305 H 375",
                  "color": "#E63946"
            },
            {
                  "id": "l20_a10",
                  "path": "M 370 230 V 250 H 395 V 150 H 320",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l20_a11",
                  "path": "M 225 455 V 330 H 290 V 230 H 275 V 205 H 295 V 150",
                  "color": "#F77F00"
            },
            {
                  "id": "l20_a12",
                  "path": "M 125 350 V 305 H 150 V 375 H 75 V 355 H 95 V 330 H 75 V 305 H 100 V 175 H 225",
                  "color": "#52B788"
            },
            {
                  "id": "l20_a13",
                  "path": "M 50 355 V 275 H 75 V 175",
                  "color": "#3A86FF"
            },
            {
                  "id": "l20_a14",
                  "path": "M 370 200 V 175 H 350 V 275 H 375",
                  "color": "#06D6A0"
            },
            {
                  "id": "l20_a15",
                  "path": "M 205 205 H 125 V 250 H 220",
                  "color": "#FF006E"
            },
            {
                  "id": "l20_a17",
                  "path": "M 150 225 H 230",
                  "color": "#FB5607"
            },
            {
                  "id": "l20_a18",
                  "path": "M 470 280 H 495 V 305 H 445 V 255 H 570",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l20_a19",
                  "path": "M 200 280 H 245 V 250",
                  "color": "#00B4D8"
            },
            {
                  "id": "l20_a20",
                  "path": "M 270 300 V 250",
                  "color": "#7209B7"
            },
            {
                  "id": "l20_a21",
                  "path": "M 520 280 H 565 V 305 H 520 V 330 H 370 V 455 H 300 V 405",
                  "color": "#E63946"
            },
            {
                  "id": "l20_a22",
                  "path": "M 130 280 H 175 V 405 H 50 V 555 H 120 V 630 H 100 V 660 H 120 V 680 H 245 V 575",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l20_a23",
                  "path": "M 395 280 V 300 H 420",
                  "color": "#F77F00"
            },
            {
                  "id": "l20_a24",
                  "path": "M 170 430 H 75 V 455 H 195 V 305 H 250",
                  "color": "#52B788"
            },
            {
                  "id": "l20_a25",
                  "path": "M 320 375 V 325",
                  "color": "#3A86FF"
            },
            {
                  "id": "l20_a27",
                  "path": "M 345 330 V 430 H 325 V 400",
                  "color": "#FF006E"
            },
            {
                  "id": "l20_a28",
                  "path": "M 250 350 V 455 H 270 V 355",
                  "color": "#8338EC"
            },
            {
                  "id": "l20_a30",
                  "path": "M 495 405 V 355 H 540 V 375 H 565 V 400 H 545 V 505 H 395 V 380",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l20_a31",
                  "path": "M 470 355 V 455 H 490 V 425",
                  "color": "#00B4D8"
            },
            {
                  "id": "l20_a32",
                  "path": "M 420 405 V 360 H 425",
                  "color": "#7209B7"
            },
            {
                  "id": "l20_a33",
                  "path": "M 445 355 V 460",
                  "color": "#E63946"
            },
            {
                  "id": "l20_a34",
                  "path": "M 520 455 V 380",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l20_a35",
                  "path": "M 570 455 V 425",
                  "color": "#F77F00"
            },
            {
                  "id": "l20_a36",
                  "path": "M 420 430 V 480 H 520",
                  "color": "#52B788"
            },
            {
                  "id": "l20_a37",
                  "path": "M 565 505 V 530 H 540 V 555 H 520 V 535 H 80 V 485 H 370",
                  "color": "#3A86FF"
            },
            {
                  "id": "l20_a38",
                  "path": "M 100 505 H 350",
                  "color": "#06D6A0"
            },
            {
                  "id": "l20_a39",
                  "path": "M 150 555 H 200 V 580 H 225 V 555 H 490 V 635",
                  "color": "#FF006E"
            },
            {
                  "id": "l20_a40",
                  "path": "M 515 580 V 585 H 570 V 685",
                  "color": "#8338EC"
            },
            {
                  "id": "l20_a41",
                  "path": "M 100 605 V 580 H 75 V 705",
                  "color": "#FB5607"
            },
            {
                  "id": "l20_a42",
                  "path": "M 150 580 H 175 V 605 H 150 V 630 H 195 V 610",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l20_a43",
                  "path": "M 370 610 H 395 V 585 H 275 V 635",
                  "color": "#00B4D8"
            },
            {
                  "id": "l20_a44",
                  "path": "M 50 660 V 705 H 415 V 580",
                  "color": "#7209B7"
            },
            {
                  "id": "l20_a45",
                  "path": "M 470 605 V 580 H 450 V 710 H 510 V 715",
                  "color": "#E63946"
            },
            {
                  "id": "l20_a46",
                  "path": "M 50 585 V 625 H 45",
                  "color": "#2EC4B6"
            },
            {
                  "id": "l20_a47",
                  "path": "M 525 600 V 610 H 540 V 630 H 520 V 685",
                  "color": "#F77F00"
            },
            {
                  "id": "l20_a48",
                  "path": "M 150 660 H 220 V 605",
                  "color": "#52B788"
            },
            {
                  "id": "l20_a49",
                  "path": "M 300 605 H 345 V 705",
                  "color": "#3A86FF"
            },
            {
                  "id": "l20_a50",
                  "path": "M 300 630 H 315 V 685 H 270",
                  "color": "#06D6A0"
            },
            {
                  "id": "l20_a51",
                  "path": "M 395 660 V 635 H 370 V 680 H 415",
                  "color": "#FF006E"
            },
            {
                  "id": "l20_a52",
                  "path": "M 470 635 V 685",
                  "color": "#8338EC"
            },
            {
                  "id": "l20_a53",
                  "path": "M 295 660 H 265",
                  "color": "#FB5607"
            },
            {
                  "id": "l20_a54",
                  "path": "M 545 660 V 715",
                  "color": "#FFBE0B"
            },
            {
                  "id": "l20_a55",
                  "path": "M 495 660 V 685",
                  "color": "#00B4D8"
            }
      ]
}
  };

  // 2. GEOMETRY & TRAJECTORY UTILITIES
  function dist(p1, p2) {
    return Math.hypot(p2.x - p1.x, p2.y - p1.y);
  }

  function getPointAtDistance(polyline, d) {
    if (d <= 0) return { point: { ...polyline[0] }, segIndex: 0 };
    let current = 0;
    for (let i = 0; i < polyline.length - 1; i++) {
      const p1 = polyline[i];
      const p2 = polyline[i + 1];
      const segLen = dist(p1, p2);
      if (current + segLen >= d || i === polyline.length - 2) {
        const remain = Math.max(0, d - current);
        const ratio = segLen === 0 ? 0 : Math.min(1, remain / segLen);
        return {
          point: {
            x: p1.x + (p2.x - p1.x) * ratio,
            y: p1.y + (p2.y - p1.y) * ratio
          },
          segIndex: i
        };
      }
      current += segLen;
    }
    return { point: { ...polyline[polyline.length - 1] }, segIndex: polyline.length - 2 };
  }

  function slicePolyline(polyline, uStart, uEnd) {
    if (uStart >= uEnd) return [];
    const startInfo = getPointAtDistance(polyline, uStart);
    const endInfo = getPointAtDistance(polyline, uEnd);

    const pts = [startInfo.point];
    for (let i = startInfo.segIndex + 1; i <= endInfo.segIndex; i++) {
      const v = polyline[i];
      if (dist(pts[pts.length - 1], v) > 0.5) {
        pts.push({ ...v });
      }
    }
    if (dist(pts[pts.length - 1], endInfo.point) > 0.5) {
      pts.push(endInfo.point);
    }
    return pts;
  }

  function polylineToPathD(pts) {
    if (pts.length < 2) return "";
    let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {
      d += ` L ${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)}`;
    }
    return d;
  }

  function pointToSegmentDist(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const l2 = dx * dx + dy * dy;
    if (l2 === 0) return Math.hypot(px - x1, py - y1);
    let t = ((px - x1) * dx + (py - y1) * dy) / l2;
    t = Math.max(0, Math.min(1, t));
    const projX = x1 + t * dx;
    const projY = y1 + t * dy;
    return Math.hypot(px - projX, py - projY);
  }

  function distanceToArrow(px, py, arrow) {
    let minDist = Infinity;
    for (const seg of arrow.getSegments()) {
      const d = pointToSegmentDist(px, py, seg.p1.x, seg.p1.y, seg.p2.x, seg.p2.y);
      if (d < minDist) minDist = d;
    }
    const headD = Math.hypot(px - arrow.headPoint.x, py - arrow.headPoint.y);
    if (headD < minDist) minDist = headD;
    return minDist;
  }

  function getArrowheadData(head, direction) {
    const hx = head.x;
    const hy = head.y;
    const L = 15; // Base length back from head
    const W = 10; // Wing half-width (20px total, vs 10px stem)
    const E = 4;  // Forward tip extension

    let tip, wing1, wing2, stemEnd;

    if (direction === "RIGHT") {
      tip = { x: hx + E, y: hy };
      wing1 = { x: hx - L, y: hy - W };
      wing2 = { x: hx - L, y: hy + W };
      stemEnd = { x: hx - 8, y: hy };
    } else if (direction === "LEFT") {
      tip = { x: hx - E, y: hy };
      wing1 = { x: hx + L, y: hy - W };
      wing2 = { x: hx + L, y: hy + W };
      stemEnd = { x: hx + 8, y: hy };
    } else if (direction === "DOWN") {
      tip = { x: hx, y: hy + E };
      wing1 = { x: hx - W, y: hy - L };
      wing2 = { x: hx + W, y: hy - L };
      stemEnd = { x: hx, y: hy - 8 };
    } else if (direction === "UP") {
      tip = { x: hx, y: hy - E };
      wing1 = { x: hx - W, y: hy + L };
      wing2 = { x: hx + W, y: hy + L };
      stemEnd = { x: hx, y: hy + 8 };
    } else {
      tip = { x: hx + E, y: hy };
      wing1 = { x: hx - L, y: hy - W };
      wing2 = { x: hx - L, y: hy + W };
      stemEnd = { x: hx - 8, y: hy };
    }

    return {
      points: `${wing1.x.toFixed(1)},${wing1.y.toFixed(1)} ${tip.x.toFixed(1)},${tip.y.toFixed(1)} ${wing2.x.toFixed(1)},${wing2.y.toFixed(1)}`,
      stemEnd
    };
  }

  // ------------------------------------------
  // 3. ARROW CLASS
  // ------------------------------------------
  class Arrow {
    constructor({ id, path = "", color = null }) {
      this.id = String(id);
      this.path = String(path || "").trim();
      this.color = color;
      this.isActive = true;
      this.isRemoved = false;
      this.points = this.parsePoints();
      this.headPoint = this.points[this.points.length - 1] || { x: 0, y: 0 };
      this.direction = this.determineDirection();
      this.length = this.calculateLength();
    }

    determineDirection() {
      if (this.points.length >= 2) {
        const p1 = this.points[this.points.length - 2];
        const p2 = this.points[this.points.length - 1];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        if (Math.abs(dx) > Math.abs(dy)) {
          return dx > 0 ? "RIGHT" : "LEFT";
        } else if (Math.abs(dy) > 0) {
          return dy > 0 ? "DOWN" : "UP";
        }
      }
      return "RIGHT";
    }

    calculateLength() {
      let total = 0;
      for (let i = 0; i < this.points.length - 1; i++) {
        total += dist(this.points[i], this.points[i + 1]);
      }
      return total;
    }

    parsePoints() {
      const commands = this.path.match(/[a-zA-Z][^a-zA-Z]*/g) || [];
      let cx = 0, cy = 0;
      const pts = [];

      for (const token of commands) {
        const cmd = token[0].toUpperCase();
        const args = token.slice(1).trim().split(/[,\s]+/).filter(Boolean).map(Number);
        if (cmd === "M" || cmd === "L") {
          for (let i = 0; i + 1 < args.length; i += 2) {
            cx = args[i]; cy = args[i + 1];
            pts.push({ x: cx, y: cy });
          }
        } else if (cmd === "H") {
          for (const x of args) {
            cx = x;
            pts.push({ x: cx, y: cy });
          }
        } else if (cmd === "V") {
          for (const y of args) {
            cy = y;
            pts.push({ x: cx, y: cy });
          }
        }
      }
      if (!pts.length) pts.push({ x: cx, y: cy });
      return pts;
    }

    getSegments() {
      if (this._segments) return this._segments;
      const segs = [];
      for (let i = 0; i < this.points.length - 1; i++) {
        const p1 = this.points[i], p2 = this.points[i + 1];
        segs.push({
          p1, p2,
          minX: Math.min(p1.x, p2.x),
          maxX: Math.max(p1.x, p2.x),
          minY: Math.min(p1.y, p2.y),
          maxY: Math.max(p1.y, p2.y),
          isHorizontal: Math.abs(p1.y - p2.y) < 0.5,
          isVertical: Math.abs(p1.x - p2.x) < 0.5
        });
      }
      this._segments = segs;
      return segs;
    }
  }

  // 4. MOVEMENT ENGINE (Precise 2D Ray Collision)
  class MovementEngine {
    constructor(board, arrows = []) {
      this.board = board;
      this.arrows = arrows;
      this.tolerance = 10;
    }

    setArrows(arrows = []) {
      this.arrows = arrows;
    }

    analyze(arrowId) {
      const arrow = this.arrows.find((a) => String(a.id) === String(arrowId));
      if (!arrow) throw new Error(`Arrow ${arrowId} not found`);

      const dir = arrow.direction;
      const head = arrow.headPoint;
      const blocker = this.findClosestBlocker(arrow, head, dir);
      const canMove = blocker == null;
      const boundaryDist = this.distanceToBoundary(head, dir);

      return {
        arrowId: arrow.id,
        direction: dir,
        canMove,
        blockingArrowId: blocker ? blocker.arrow.id : null,
        travelDistance: canMove ? boundaryDist + 200 : Math.max(0, blocker.distance)
      };
    }

    findClosestBlocker(targetArrow, head, dir) {
      const active = this.arrows.filter(
        (a) => a.isActive && !a.isRemoved && String(a.id) !== String(targetArrow.id)
      );
      let closest = null;

      for (const arrow of active) {
        for (const seg of arrow.getSegments()) {
          const hit = this.rayIntersectSegment(head, dir, seg);
          if (hit !== null && hit.distance > 0.5) {
            if (!closest || hit.distance < closest.distance) {
              closest = { arrow, distance: hit.distance };
            }
          }
        }
      }
      return closest;
    }

    rayIntersectSegment(head, dir, seg) {
      const tol = this.tolerance;
      const minX = seg.minX, maxX = seg.maxX;
      const minY = seg.minY, maxY = seg.maxY;

      if (dir === "RIGHT") {
        if (seg.isVertical && seg.p1.x > head.x + 2 && head.y >= minY - tol && head.y <= maxY + tol) {
          return { distance: seg.p1.x - head.x };
        }
        if (seg.isHorizontal && Math.abs(seg.p1.y - head.y) <= tol && maxX > head.x + 2) {
          return { distance: Math.max(0, minX - head.x) };
        }
      } else if (dir === "LEFT") {
        if (seg.isVertical && seg.p1.x < head.x - 2 && head.y >= minY - tol && head.y <= maxY + tol) {
          return { distance: head.x - seg.p1.x };
        }
        if (seg.isHorizontal && Math.abs(seg.p1.y - head.y) <= tol && minX < head.x - 2) {
          return { distance: Math.max(0, head.x - maxX) };
        }
      } else if (dir === "DOWN") {
        if (seg.isHorizontal && seg.p1.y > head.y + 2 && head.x >= minX - tol && head.x <= maxX + tol) {
          return { distance: seg.p1.y - head.y };
        }
        if (seg.isVertical && Math.abs(seg.p1.x - head.x) <= tol && maxY > head.y + 2) {
          return { distance: Math.max(0, minY - head.y) };
        }
      } else if (dir === "UP") {
        if (seg.isHorizontal && seg.p1.y < head.y - 2 && head.x >= minX - tol && head.x <= maxX + tol) {
          return { distance: head.y - seg.p1.y };
        }
        if (seg.isVertical && Math.abs(seg.p1.x - head.x) <= tol && minY < head.y - 2) {
          return { distance: Math.max(0, head.y - maxY) };
        }
      }
      return null;
    }

    distanceToBoundary(head, dir) {
      if (dir === "RIGHT") return Math.max(0, this.board.width - head.x);
      if (dir === "LEFT") return Math.max(0, head.x);
      if (dir === "DOWN") return Math.max(0, this.board.height - head.y);
      if (dir === "UP") return Math.max(0, head.y);
      return 0;
    }
  }

  // 5. AUDIO SYNTHESIZER
  class AudioManager {
    constructor() {
      this.ctx = null;
      this.enabled = true;
      try {
        const saved = localStorage.getItem("arrow_escape_sound");
        if (saved !== null) this.enabled = saved === "true";
      } catch (e) {}
    }

    initContext() {
      if (!this.ctx && typeof window !== "undefined") {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    }

    toggleSound() {
      this.enabled = !this.enabled;
      try {
        localStorage.setItem("arrow_escape_sound", String(this.enabled));
      } catch (e) {}
      return this.enabled;
    }

    playClick() {
      if (!this.enabled) return;
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;
      osc.frequency.setValueAtTime(700, t);
      osc.frequency.exponentialRampToValueAtTime(350, t + 0.04);
      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.04);
    }

    playEscape() {
      if (!this.enabled) return;
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(340, t);
      osc.frequency.exponentialRampToValueAtTime(780, t + 0.18);
      osc.frequency.exponentialRampToValueAtTime(1020, t + 0.32);
      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.15, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.36);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.36);
    }

    playBlocked() {
      if (!this.enabled) return;
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(160, t);
      osc.frequency.exponentialRampToValueAtTime(70, t + 0.13);
      gain.gain.setValueAtTime(0.24, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.14);
    }

    playLevelComplete() {
      if (!this.enabled) return;
      this.initContext();
      if (!this.ctx) return;
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        const t = this.ctx.currentTime + idx * 0.11;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.01, t);
        gain.gain.linearRampToValueAtTime(0.14, t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, t + (idx === notes.length - 1 ? 0.6 : 0.2));
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + (idx === notes.length - 1 ? 0.65 : 0.25));
      });
    }
  }

  // ------------------------------------------
  // 6. SVG BOARD RENDERER
  // ------------------------------------------
  class SVGRenderer {
    constructor(container) {
      this.container = container;
      this.ns = "http://www.w3.org/2000/svg";
      this.palette = [
        "#3A86FF", // Blue
        "#06D6A0", // Mint
        "#FF006E", // Magenta
        "#8338EC", // Purple
        "#FB5607", // Orange
        "#FFBE0B", // Gold
        "#00B4D8", // Cyan
        "#7209B7"  // Violet
      ];
      this.arrowColors = new Map();
    }

    getArrowColor(arrow, idx = 0) {
      if (arrow && arrow.color) return arrow.color;
      const arrowId = arrow ? arrow.id : idx;
      if (this.arrowColors.has(String(arrowId))) {
        return this.arrowColors.get(String(arrowId));
      }
      const c = this.palette[idx % this.palette.length];
      this.arrowColors.set(String(arrowId), c);
      return c;
    }

    createGridBackground(w, h) {
      const g = document.createElementNS(this.ns, "g");
      g.classList.add("board-grid");
      const spacing = 40;
      for (let x = spacing; x < w; x += spacing) {
        for (let y = spacing; y < h; y += spacing) {
          const c = document.createElementNS(this.ns, "circle");
          c.setAttribute("cx", String(x));
          c.setAttribute("cy", String(y));
          c.setAttribute("r", "2.5");
          c.classList.add("grid-dot");
          g.appendChild(c);
        }
      }
      return g;
    }

    render(level, arrows = []) {
      this.container.innerHTML = "";
      const w = level.board.width;
      const h = level.board.height;

      const svg = document.createElementNS(this.ns, "svg");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
      svg.classList.add("board-svg");

      const padding = 36;
      svg.setAttribute("viewBox", `${-padding} ${-padding} ${w + padding * 2} ${h + padding * 2}`);

      const contentGroup = document.createElementNS(this.ns, "g");
      contentGroup.classList.add("board-content");

      // Background dot matrix
      contentGroup.appendChild(this.createGridBackground(w, h));

      const active = arrows.filter((a) => a.isActive && !a.isRemoved);
      active.forEach((arrow, idx) => {
        const color = this.getArrowColor(arrow, idx);

        const group = document.createElementNS(this.ns, "g");
        group.setAttribute("id", `arrow-group-${arrow.id}`);
        group.classList.add("arrow-item");
        group.dataset.arrowId = arrow.id;

        // Arrowhead data with flaring wings and trimmed stem end
        const headData = getArrowheadData(arrow.headPoint, arrow.direction);
        const stemPts = [...arrow.points.slice(0, -1), headData.stemEnd];
        const stemPathD = polylineToPathD(stemPts);

        // Path body (sleek rounded snake, 10px stroke)
        const pathEl = document.createElementNS(this.ns, "path");
        pathEl.setAttribute("d", stemPathD);
        pathEl.setAttribute("fill", "none");
        pathEl.setAttribute("stroke", color);
        pathEl.setAttribute("stroke-width", "10");
        pathEl.setAttribute("stroke-linecap", "round");
        pathEl.setAttribute("stroke-linejoin", "round");
        pathEl.setAttribute("id", `arrow-path-${arrow.id}`);
        pathEl.classList.add("board-path");
        pathEl.dataset.arrowId = arrow.id;

        // Integrated triangular head (crisp, proportional wings)
        const headEl = document.createElementNS(this.ns, "polygon");
        headEl.setAttribute("points", headData.points);
        headEl.setAttribute("fill", color);
        headEl.setAttribute("stroke", color);
        headEl.setAttribute("stroke-width", "1.5");
        headEl.setAttribute("stroke-linejoin", "round");
        headEl.setAttribute("id", `arrow-head-${arrow.id}`);
        headEl.classList.add("board-head");
        headEl.dataset.arrowId = arrow.id;

        // Touch hit area (tightened to 18px to prevent overlapping adjacent paths)
        const hitEl = document.createElementNS(this.ns, "path");
        hitEl.setAttribute("d", arrow.path);
        hitEl.setAttribute("fill", "none");
        hitEl.setAttribute("stroke", "transparent");
        hitEl.setAttribute("stroke-width", "18");
        hitEl.setAttribute("stroke-linecap", "round");
        hitEl.setAttribute("stroke-linejoin", "round");
        hitEl.classList.add("hit-path");
        hitEl.dataset.arrowId = arrow.id;

        group.appendChild(hitEl);
        group.appendChild(pathEl);
        group.appendChild(headEl);
        contentGroup.appendChild(group);
      });

      svg.appendChild(contentGroup);
      this.container.appendChild(svg);
      this.svgRoot = svg;
    }

    setArrowState(arrowId, state) {
      if (!this.svgRoot) return;
      const pathEl = this.svgRoot.querySelector(`#arrow-path-${CSS.escape(String(arrowId))}`);
      const headEl = this.svgRoot.querySelector(`#arrow-head-${CSS.escape(String(arrowId))}`);
      if (!pathEl || !headEl) return;

      pathEl.classList.remove("selected", "wrong", "hint-active");
      headEl.classList.remove("selected", "wrong", "hint-active");

      if (state === "selected") {
        pathEl.classList.add("selected");
        pathEl.setAttribute("stroke", "#ffd166");
        headEl.setAttribute("fill", "#ffd166");
        headEl.setAttribute("stroke", "#ffd166");
        pathEl.style.filter = "drop-shadow(0 0 10px rgba(255, 209, 102, 0.9))";
      } else if (state === "wrong") {
        pathEl.classList.add("wrong");
        pathEl.setAttribute("stroke", "#ef4566");
        headEl.setAttribute("fill", "#ef4566");
        headEl.setAttribute("stroke", "#ef4566");
        pathEl.style.filter = "drop-shadow(0 0 10px rgba(239, 69, 102, 0.9))";
      } else if (state === "hint") {
        pathEl.classList.add("hint-active");
        pathEl.setAttribute("stroke", "#ffb703");
        headEl.setAttribute("fill", "#ffb703");
        headEl.setAttribute("stroke", "#ffb703");
        pathEl.style.filter = "drop-shadow(0 0 14px rgba(255, 183, 3, 0.95))";
      } else {
        const arrow = (activeArrows || []).find((a) => String(a.id) === String(arrowId));
        const orig = (arrow && arrow.color) || this.arrowColors.get(String(arrowId)) || "#3A86FF";
        pathEl.setAttribute("stroke", orig);
        headEl.setAttribute("fill", orig);
        headEl.setAttribute("stroke", orig);
        pathEl.style.filter = "";
      }
    }

    clearArrowState(arrowId) {
      this.setArrowState(arrowId, null);
    }
  }

  // ------------------------------------------
  // 7. SLITHERING ANIMATION CONTROLLER
  // ------------------------------------------
  class SlitherAnimator {
    constructor() {
      this.isAnimating = false;
    }

    // Slithers arrow along its path and unbends straight out along heading
    animateEscape(groupEl, pathEl, headEl, arrow, exitDistance, duration = 380) {
      this.isAnimating = true;
      const head = arrow.headPoint;
      const dir = arrow.direction;
      const len = arrow.length;

      // Unit vector for exit ray
      let dx = 0, dy = 0;
      if (dir === "RIGHT") dx = 1;
      else if (dir === "LEFT") dx = -1;
      else if (dir === "DOWN") dy = 1;
      else if (dir === "UP") dy = -1;

      // Trajectory: original vertices + far off-screen exit point
      const totalExtension = exitDistance + len + 400;
      const exitPoint = {
        x: head.x + dx * totalExtension,
        y: head.y + dy * totalExtension
      };
      const trajectory = [...arrow.points, exitPoint];

      const totalTravel = exitDistance + len + 80;
      const start = performance.now();

      return new Promise((resolve) => {
        const step = (now) => {
          const p = Math.min((now - start) / duration, 1);
          // Ease-in acceleration: starts smooth, speeds up as it straightens out
          const eased = Math.pow(p, 1.5);
          const s = totalTravel * eased;

          const uTail = s;
          const uHead = len + s;

          const uStemEnd = Math.max(uTail + 1, uHead - 8);
          const slicedStem = slicePolyline(trajectory, uTail, uStemEnd);
          if (slicedStem.length >= 2) {
            pathEl.setAttribute("d", polylineToPathD(slicedStem));
          }
          const currentHead = getPointAtDistance(trajectory, uHead).point;
          headEl.setAttribute("points", getArrowheadData(currentHead, dir).points);

          // Fade out near very end
          if (p > 0.8) {
            groupEl.style.opacity = String(Math.max(0, 1 - (p - 0.8) * 5));
          }

          if (p < 1) {
            requestAnimationFrame(step);
          } else {
            this.isAnimating = false;
            resolve();
          }
        };
        requestAnimationFrame(step);
      });
    }

    // Elastic nudge and spring back when blocked
    animateBlocked(pathEl, headEl, arrow, duration = 180) {
      this.isAnimating = true;
      const head = arrow.headPoint;
      const dir = arrow.direction;
      const len = arrow.length;

      let dx = 0, dy = 0;
      if (dir === "RIGHT") dx = 1;
      else if (dir === "LEFT") dx = -1;
      else if (dir === "DOWN") dy = 1;
      else if (dir === "UP") dy = -1;

      const trajectory = [
        ...arrow.points,
        { x: head.x + dx * 50, y: head.y + dy * 50 }
      ];

      const start = performance.now();
      const initialHeadData = getArrowheadData(head, dir);
      const initialStemPts = [...arrow.points.slice(0, -1), initialHeadData.stemEnd];
      const initialD = polylineToPathD(initialStemPts);

      return new Promise((resolve) => {
        const step = (now) => {
          const p = Math.min((now - start) / duration, 1);
          // Spring factor
          const factor = Math.sin(p * Math.PI * 1.5) * Math.exp(-p * 2.5);
          const s = Math.max(0, 14 * factor);

          const uStemEnd = Math.max(s + 1, len + s - 8);
          const slicedStem = slicePolyline(trajectory, s, uStemEnd);
          if (slicedStem.length >= 2) {
            pathEl.setAttribute("d", polylineToPathD(slicedStem));
          }
          const currentHead = getPointAtDistance(trajectory, len + s).point;
          headEl.setAttribute("points", getArrowheadData(currentHead, dir).points);

          if (p < 1) {
            requestAnimationFrame(step);
          } else {
            pathEl.setAttribute("d", initialD);
            headEl.setAttribute("points", initialHeadData.points);
            this.isAnimating = false;
            resolve();
          }
        };
        requestAnimationFrame(step);
      });
    }
  }

  // ------------------------------------------
  // 8. GAME CONTROLLER
  // ------------------------------------------
  let currentLevelNum = 1;
  let currentLevelData = null;
  let activeArrows = [];
  let lives = 3;
  let remainingHints = 3;

  const audio = new AudioManager();
  const animator = new SlitherAnimator();
  let renderer = null;
  let movementEngine = null;
  let isLocked = false;


  function updateBoardDimensions(board) {
    const boardShell = document.querySelector(".board-shell");
    const gameShell = document.querySelector(".game-shell");
    if (!boardShell || !board) return;

    const bw = board.width || 600;
    const bh = board.height || 640;
    const padding = 36;
    const totalW = bw + padding * 2;
    const totalH = bh + padding * 2;
    const aspect = totalW / totalH;

    // Viewport-based available space
    const availW = (gameShell ? gameShell.clientWidth : window.innerWidth) - 24;
    const availH = (gameShell ? gameShell.clientHeight : window.innerHeight - 150) - 20;

    // Dynamically increase max bounds for larger canvas levels
    const maxW = Math.min(availW, Math.max(560, Math.min(availW, bw * 1.05)));
    const maxH = Math.min(availH, Math.max(680, Math.min(availH, bh * 0.95)));

    let targetW = maxW;
    let targetH = targetW / aspect;

    if (targetH > maxH) {
      targetH = maxH;
      targetW = targetH * aspect;
    }

    boardShell.style.width = `${Math.round(targetW)}px`;
    boardShell.style.height = `${Math.round(targetH)}px`;
  }

  function loadLevel(lvlNum) {
    currentLevelNum = lvlNum;
    currentLevelData = EMBEDDED_LEVELS[lvlNum] || EMBEDDED_LEVELS[1];
    activeArrows = currentLevelData.paths.map((p) => new Arrow(p));
    movementEngine = new MovementEngine(currentLevelData.board, activeArrows);
    lives = 3;
    remainingHints = 3;
    isLocked = false;

    updateUI();
    updateBoardDimensions(currentLevelData.board);
    renderer.render(currentLevelData, activeArrows);
  }

  function updateUI() {
    const badge = document.getElementById("levelBadge");
    if (badge && currentLevelData) {
      badge.textContent = currentLevelData.name || `Level ${currentLevelNum}`;
    }

    const hearts = document.querySelectorAll(".heart");
    hearts.forEach((h, idx) => {
      if (idx < lives) {
        h.classList.remove("lost");
      } else {
        h.classList.add("lost");
      }
    });

    const hintBadge = document.getElementById("hintBadge");
    if (hintBadge) {
      hintBadge.textContent = String(remainingHints);
    }
  }

  function showToast(text, isSuccess = false) {
    const msg = document.getElementById("gameMessage");
    if (!msg) return;
    msg.textContent = text;
    msg.classList.toggle("success", Boolean(isSuccess));
    msg.classList.add("show");
    window.setTimeout(() => msg.classList.remove("show"), 1500);
  }

  function handleArrowClick(arrowId) {
    if (isLocked || lives <= 0) return;
    const arrow = activeArrows.find((a) => String(a.id) === String(arrowId));
    if (!arrow || !arrow.isActive) return;

    movementEngine.setArrows(activeArrows);
    const analysis = movementEngine.analyze(arrow.id);
    const groupEl = document.getElementById(`arrow-group-${arrow.id}`);
    const pathEl = document.getElementById(`arrow-path-${arrow.id}`);
    const headEl = document.getElementById(`arrow-head-${arrow.id}`);
    if (!groupEl || !pathEl || !headEl) return;

    isLocked = true;

    if (analysis.canMove) {
      audio.playEscape();
      renderer.setArrowState(arrow.id, "selected");

      // Animate slithering along path out to edge!
      animator.animateEscape(groupEl, pathEl, headEl, arrow, analysis.travelDistance).then(() => {
        arrow.isActive = false;
        arrow.isRemoved = true;
        groupEl.remove();

        activeArrows = activeArrows.filter((a) => a.id !== arrow.id);
        movementEngine.setArrows(activeArrows);
        isLocked = false;

        // Check Victory
        if (activeArrows.length === 0) {
          audio.playLevelComplete();
          const overlay = document.getElementById("levelCompleteOverlay");
          const title = document.getElementById("levelCompleteTitle");
          const msg = overlay ? overlay.querySelector("p") : null;
          const nextBtn = document.getElementById("nextLevelButton");

          if (currentLevelNum === 20) {
            if (title) title.textContent = "🏆 All Levels Cleared!";
            if (msg) msg.textContent = "You have cleared all levels! New levels coming soon!";
            if (nextBtn) nextBtn.textContent = "Play Again 🔄";
          } else {
            if (title) title.textContent = `🎉 ${currentLevelData.name} Complete!`;
            if (msg) msg.textContent = "Awesome work! All arrows escaped the maze.";
            if (nextBtn) nextBtn.textContent = "Next Level →";
          }
          if (overlay) overlay.classList.remove("hidden");
        }
      });
    } else {
      audio.playBlocked();
      renderer.setArrowState(arrow.id, "wrong");
      lives = Math.max(0, lives - 1);
      updateUI();
      showToast("Blocked arrow! -1 ❤", false);

      // Animate elastic nudge and rebound
      animator.animateBlocked(pathEl, headEl, arrow).then(() => {
        renderer.clearArrowState(arrow.id);
        isLocked = false;

        // Check Game Over
        if (lives <= 0) {
          const overlay = document.getElementById("gameOverOverlay");
          if (overlay) overlay.classList.remove("hidden");
        }
      });
    }
  }

  function provideHint() {
    if (remainingHints <= 0) {
      showToast("No hints left for this level!");
      return;
    }
    movementEngine.setArrows(activeArrows);
    const free = activeArrows.filter((a) => movementEngine.analyze(a.id).canMove);
    if (free.length === 0) {
      showToast("No free arrows available!");
      return;
    }

    const hintArrow = free[0];
    remainingHints--;
    updateUI();
    audio.playClick();
    showToast("Found a free arrow! 💡", true);
    renderer.setArrowState(hintArrow.id, "hint");
    window.setTimeout(() => renderer.clearArrowState(hintArrow.id), 1400);
  }

  // DOMContentLoaded
  document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("svgContainer");
    renderer = new SVGRenderer(container);

    // Pointer event delegation with nearest-arrow geometric resolution
    container.addEventListener("pointerdown", (e) => {
      // 1. Direct hit on visible path or arrow head
      if (e.target.classList.contains("board-path") || e.target.classList.contains("board-head")) {
        const id = e.target.dataset.arrowId;
        if (id) {
          handleArrowClick(id);
          return;
        }
      }

      // 2. High-precision coordinate-based nearest-arrow targeting
      const svg = container.querySelector("svg");
      if (svg && activeArrows.length > 0) {
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

        let closestArrow = null;
        let closestDist = Infinity;
        for (const arrow of activeArrows) {
          if (!arrow.isActive || arrow.isRemoved) continue;
          const d = distanceToArrow(svgP.x, svgP.y, arrow);
          if (d < closestDist) {
            closestDist = d;
            closestArrow = arrow;
          }
        }
        if (closestArrow && closestDist <= 22) {
          handleArrowClick(closestArrow.id);
          return;
        }
      }

      // 3. Fallback to closest element with data-arrow-id
      const target = e.target.closest("[data-arrow-id]");
      if (target && target.dataset.arrowId) {
        handleArrowClick(target.dataset.arrowId);
      }
    });

    // Sound toggle
    const soundButton = document.getElementById("soundButton");
    const soundIcon = document.getElementById("soundIcon");
    function updateSoundIcon() {
      if (soundIcon) {
        soundIcon.src = audio.enabled ? "assets/sound-on.svg" : "assets/sound-off.svg";
      }
    }
    updateSoundIcon();
    soundButton.addEventListener("click", () => {
      audio.toggleSound();
      updateSoundIcon();
      audio.playClick();
    });

    // Theme toggle
    const themeButton = document.getElementById("themeButton");
    const themeIcon = document.getElementById("themeIcon");
    let theme = "light";
    try {
      theme = localStorage.getItem("arrow_escape_theme") || "light";
    } catch (e) {}

    function applyTheme(t) {
      theme = t;
      document.body.dataset.theme = t;
      if (themeIcon) {
        themeIcon.src = t === "dark" ? "assets/theme-sun.svg" : "assets/theme-moon.svg";
      }
      try {
        localStorage.setItem("arrow_escape_theme", t);
      } catch (e) {}
    }
    applyTheme(theme);

    themeButton.addEventListener("click", () => {
      applyTheme(theme === "light" ? "dark" : "light");
      audio.playClick();
    });

    // Hint button
    document.getElementById("hintButton").addEventListener("click", () => {
      provideHint();
    });

    // Restart button
    document.getElementById("restartButton").addEventListener("click", () => {
      audio.playClick();
      loadLevel(currentLevelNum);
    });

    // Back button
    document.getElementById("backButton").addEventListener("click", () => {
      audio.playClick();
      loadLevel(Math.max(1, currentLevelNum - 1));
    });

    // Modals
    document.getElementById("retryOverlayButton").addEventListener("click", () => {
      document.getElementById("gameOverOverlay").classList.add("hidden");
      audio.playClick();
      loadLevel(currentLevelNum);
    });

    document.getElementById("nextLevelButton").addEventListener("click", () => {
      document.getElementById("levelCompleteOverlay").classList.add("hidden");
      audio.playClick();
      let nextLvl = currentLevelNum + 1;
      if (nextLvl > 20) nextLvl = 1;
      loadLevel(nextLvl);
    });

    // Level Badge click to jump levels
    const levelBadgeEl = document.getElementById("levelBadge");
    if (levelBadgeEl) {
      levelBadgeEl.style.cursor = "pointer";
      levelBadgeEl.title = "Click to jump to next level (levels 1-20, Left/Right Arrows)";
      levelBadgeEl.addEventListener("click", () => {
        audio.playClick();
        loadLevel(currentLevelNum >= 20 ? 1 : currentLevelNum + 1);
      });
    }

    // Keyboard shortcuts
    window.addEventListener("keydown", (e) => {
      if (e.key === "r" || e.key === "R") loadLevel(currentLevelNum);
      if (e.key === "h" || e.key === "H") provideHint();
      if (e.key === "m" || e.key === "M") soundButton.click();
      if (e.key >= "1" && e.key <= "9") {
        audio.playClick();
        loadLevel(parseInt(e.key, 10));
      } else if (e.key === "0") {
        audio.playClick();
        loadLevel(10);
      } else if (e.key === "-" || e.key === "_") {
        audio.playClick();
        loadLevel(11);
      } else if (e.key === "=" || e.key === "+") {
        audio.playClick();
        loadLevel(12);
      } else if (e.key === "]" || e.key === "}") {
        audio.playClick();
        loadLevel(13);
      } else if (e.key === "ArrowRight") {
        audio.playClick();
        loadLevel(currentLevelNum >= 20 ? 1 : currentLevelNum + 1);
      } else if (e.key === "ArrowLeft") {
        audio.playClick();
        loadLevel(Math.max(1, currentLevelNum - 1));
      }
    });

    // Resize
    window.addEventListener("resize", () => {
      if (currentLevelData) {
        updateBoardDimensions(currentLevelData.board);
        renderer.render(currentLevelData, activeArrows);
      }
    });

    // Load Level 1
    loadLevel(1);
  });
})();
