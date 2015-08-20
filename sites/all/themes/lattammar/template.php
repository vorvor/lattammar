<?php
/**
 * @file
 * Contains the theme's functions to manipulate Drupal's default markup.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728096
 */


/**
 * Override or insert variables into the maintenance page template.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("maintenance_page" in this case.)
 */
/* -- Delete this line if you want to use this function
function lattammar_preprocess_maintenance_page(&$variables, $hook) {
  // When a variable is manipulated or added in preprocess_html or
  // preprocess_page, that same work is probably needed for the maintenance page
  // as well, so we can just re-use those functions to do that work here.
  lattammar_preprocess_html($variables, $hook);
  lattammar_preprocess_page($variables, $hook);
}
// */

/**
 * Override or insert variables into the html templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("html" in this case.)
 */
/* -- Delete this line if you want to use this function
function lattammar_preprocess_html(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');

  // The body tag's classes are controlled by the $classes_array variable. To
  // remove a class from $classes_array, use array_diff().
  //$variables['classes_array'] = array_diff($variables['classes_array'], array('class-to-remove'));
}
// */

/**
 * Override or insert variables into the page templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case.)
 */
/* -- Delete this line if you want to use this function
function lattammar_preprocess_page(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the node templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("node" in this case.)
 */
/* -- Delete this line if you want to use this function
function lattammar_preprocess_node(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');

  // Optionally, run node-type-specific preprocess functions, like
  // lattammar_preprocess_node_page() or lattammar_preprocess_node_story().
  $function = __FUNCTION__ . '_' . $variables['node']->type;
  if (function_exists($function)) {
    $function($variables, $hook);
  }
}
// */

/**
 * Override or insert variables into the comment templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("comment" in this case.)
 */
/* -- Delete this line if you want to use this function
function lattammar_preprocess_comment(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the region templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("region" in this case.)
 */
/* -- Delete this line if you want to use this function
function lattammar_preprocess_region(&$variables, $hook) {
  // Don't use Zen's region--sidebar.tpl.php template for sidebars.
  //if (strpos($variables['region'], 'sidebar_') === 0) {
  //  $variables['theme_hook_suggestions'] = array_diff($variables['theme_hook_suggestions'], array('region__sidebar'));
  //}
}
// */

/**
 * Override or insert variables into the block templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */
/* -- Delete this line if you want to use this function
function lattammar_preprocess_block(&$variables, $hook) {
  // Add a count to all the blocks in the region.
  // $variables['classes_array'][] = 'count-' . $variables['block_id'];

  // By default, Zen will use the block--no-wrapper.tpl.php for the main
  // content. This optional bit of code undoes that:
  //if ($variables['block_html_id'] == 'block-system-main') {
  //  $variables['theme_hook_suggestions'] = array_diff($variables['theme_hook_suggestions'], array('block__no_wrapper'));
  //}
}
// */
function lattammar_node_view_alter(&$build) {
  // Remove the read more link
  //unset($build['links']['node']['#links']['node-readmore']);

  // Add your own custom link
  
  if (arg(1)) {
    $node = node_load(arg(1));
    
    if ($node->type == 'tipp') {
        $build['links']['node']['#links']['tryagain'] = array(
          'title' => '< ' . t('Újra próbálkozom'), 
          'href' => 'node/add/tipp/' . $node->field_source_place['und'][0]['nid'] . '/' . arg(1), 
          'html' => TRUE, 
          'attributes' => array(
            'title' => 'Újrapróbálkozás',
          ),
        );
    
        $nid = $node->field_source_place['und'][0]['nid'];
        $placenode = node_load($node->field_source_place['und'][0]['nid']);
        $node = $placenode;
        
        $queues = nodequeue_load_queues_by_type($node->type);
        $subqueues = nodequeue_get_subqueues_by_node($queues, $node);
        
        $query = db_query('SELECT * FROM {nodequeue_nodes} WHERE nid = :nid', array(':nid' => $nid))->fetchObject();
        $query = db_query('SELECT nid, position FROM {nodequeue_nodes}
                          WHERE position = :pos
                          AND qid = :qid',
                          array(':pos' => $query->position + 1,
                                ':qid' => $query->qid))->fetchObject();
       
        
        
        if (!empty($query)) {
          $build['links']['node']['#links']['nextplace'] = array(
          'title' => t('Következő hely') . ' >', 
          'href' => 'node/add/tipp/' . $query->nid, 
          'html' => TRUE, 
          'attributes' => array(
            'title' => 'Következő hely',
          ),
        );
        } else {
          $build['links']['node']['#links']['newgame'] = array(
          'title' => t('Játék vége, új játék') . ' >', 
          'href' => 'games', 
          'html' => TRUE, 
          'attributes' => array(
            'title' => 'Új játék',
          ),
        );
        }
    }
   }
  
  
  
/*
  // Move read more link to first slot
  $link_read_more = $build['links']['node']['#links']['node_read_more'];
  unset($build['links']['node']['#links']['node_read_more']);
  $links = $build['links']['node']['#links'];
  $build['links']['node']['#links'] = array(
    'node_read_more' => $link_read_more,
  ) + $links;

  // Move link to the last slot
  $link_read_more = $build['links']['node']['#links']['node_read_more'];
  unset($build['links']['node']['#links']['node_read_more']);
  $build['links']['node']['#links']['node_read_more'] = $link_read_more;
  */
}