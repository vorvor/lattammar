<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
//print dpm(array_keys(get_defined_vars()));

?>
<?php if (!empty($title)): ?>
<div style="clear: both;"></div>
<div class="group-title">  
  <h3><a><?php print $title; ?></a></h3><span class="rowcount"><?php print('(' . count($rows) . ' helyszín)'); ?></span>
</div>
<?php endif; ?>
<?php $i = 0; foreach ($rows as $id => $row): ?>
  <div<?php $i++; if ($classes_array[$id]) { print ' class="' . $classes_array[$id] .'"';  } ?>>
    <?php print $row; ?>
    
  </div>
  <?php if ($i > 4) { break;} ?>
<?php endforeach; ?>