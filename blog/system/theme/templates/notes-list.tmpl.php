<?php if (array_key_exists ('notes-list', $content)) { ?>

<div class="e2-note-list e2-text">
<?php foreach ($content['notes-list'] as $note): ?>
<p>
  <a href="<?= $note['href'] ?>" title=""><?= $note['title']?></a>
  <?php if ($note['favourite?']) { ?>
  ★
  <?php } ?>
  <?php if (array_key_exists ('text-fragment', $note)) { ?>
  <br /><?= $note['text-fragment']?>
  <?php } ?>
</p>
<?php endforeach; ?>
</div>

<?php } ?>
