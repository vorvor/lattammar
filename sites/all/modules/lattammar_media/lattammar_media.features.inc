<?php
/**
 * @file
 * lattammar_media.features.inc
 */

/**
 * Implements hook_image_default_styles().
 */
function lattammar_media_image_default_styles() {
  $styles = array();

  // Exported image style: box.
  $styles['box'] = array(
    'label' => 'box',
    'effects' => array(
      2 => array(
        'name' => 'imagecache_autorotate',
        'data' => array(),
        'weight' => -10,
      ),
      1 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 250,
          'height' => 250,
        ),
        'weight' => -9,
      ),
    ),
  );

  // Exported image style: minibox.
  $styles['minibox'] = array(
    'label' => 'minibox',
    'effects' => array(
      3 => array(
        'name' => 'imagecache_autorotate',
        'data' => array(),
        'weight' => 1,
      ),
      4 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 450,
          'height' => 450,
        ),
        'weight' => 2,
      ),
    ),
  );

  // Exported image style: tinybox.
  $styles['tinybox'] = array(
    'label' => 'tinybox',
    'effects' => array(
      5 => array(
        'name' => 'imagecache_autorotate',
        'data' => array(),
        'weight' => 1,
      ),
      6 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 60,
          'height' => 60,
        ),
        'weight' => 2,
      ),
    ),
  );

  return $styles;
}
