<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */


$pattern = '/data-qid=\"(.*?)\"/';
$data = reset($variables['rows']);
preg_match($pattern, $data, $matches);

?>
<div class="game-row"><a href="/games/<?php print $matches[1]; ?>">
<?php if (!empty($title)): ?>
<div style="clear: both;"></div>
<div class="group-title">  
  <h3><?php print $title; ?></h3><span class="rowcount"><?php print('(' . count($rows) . ' helyszín)'); ?></span>
</div>
<?php endif; ?>
<?php $i = 0; foreach ($rows as $id => $row): ?>
  <div<?php $i++; if ($classes_array[$id]) { print ' class="' . $classes_array[$id] .'"';  } ?>>
    <?php print $row; ?>
    
  </div>
  <?php if ($i > 4) { break;} ?>
<?php endforeach; ?>
</a>
</div>