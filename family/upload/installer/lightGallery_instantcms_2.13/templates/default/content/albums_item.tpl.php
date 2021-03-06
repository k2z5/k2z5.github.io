<?php $this->addCSS('templates/'.$this->name.'/lg/css/lightgallery.min.css'); ?>
<?php $this->addJS('templates/'.$this->name.'/lg/js/lightgallery-all.min.js'); ?>
<?php

$show_bar = !empty($item['show_tags']) || $item['parent_id'] ||
            $fields['date_pub']['is_in_item'] ||
            $fields['user']['is_in_item'] ||
            !empty($ctype['options']['hits_on']);
?>

<?php if ($fields['title']['is_in_item']){ ?>
    <h1 <?php if ($item['parent_id'] && !empty($ctype['is_in_groups'])){ ?>class="mb0"<?php } ?>>
        <?php if ($fields['user']['is_in_item'] && !empty($item['folder_title'])){ ?>
            <a href="<?php echo href_to('users', $item['user']['id'], array('content', $ctype['name'], $item['folder_id'])); ?>"><?php echo $item['folder_title']; ?></a>&nbsp;&rarr;&nbsp;
        <?php } ?>
        <?php html($item['title']); ?>
        <?php if ($item['is_private']) { ?>
            <span class="is_private" title="<?php html(LANG_PRIVACY_HINT); ?>"></span>
        <?php } ?>
    </h1>
    <?php if ($item['parent_id'] && !empty($ctype['is_in_groups'])){ ?>
		<a class="parent_title" href="<?php echo rel_to_href($item['parent_url']); ?>"><?php html($item['parent_title']); ?></a>
	<?php } ?>
<?php } ?>


<?php echo $this->renderControllerChild('photos', 'filter-panel', array(
    'item' => $item,
    'page_url' => href_to($ctype['name'], $item['slug'].'.html')
)); ?>


	
	
<div class="content_item <?php echo $ctype['name']; ?>_item">


<?php foreach ($fields_fieldsets as $fieldset_id => $fieldset) { ?>

        <?php $is_fields_group = !empty($ctype['options']['is_show_fields_group']) && $fieldset['title']; ?>

        <?php if ($is_fields_group) { ?>
            <div class="fields_group fields_group_<?php echo $ctype['name']; ?>_<?php echo $fieldset_id ?>">
                <h3 class="group_title"><?php html($fieldset['title']); ?></h3>
        <?php } ?>

        <?php if (!empty($fieldset['fields'])) { ?>
            <?php foreach ($fieldset['fields'] as $field) { ?>

                <div class="field ft_<?php echo $field['type']; ?> f_<?php echo $field['name']; ?> <?php echo $field['options']['wrap_type']; ?>_field" <?php if($field['options']['wrap_width']){ ?> style="width: <?php echo $field['options']['wrap_width']; ?>;"<?php } ?>>
                    <?php if ($field['options']['label_in_item'] != 'none') { ?>
                        <div class="field_label title_<?php echo $field['options']['label_in_item']; ?>"><?php html($field['title']); ?>: </div>
                    <?php } ?>
                    <div class="value"><?php echo $field['html']; ?></div>
                </div>

            <?php } ?>
        <?php } ?>

        <?php if ($is_fields_group) { ?></div><?php } ?>

    <?php } ?>

	<?php if ($props_fieldsets) { ?>
	
        <div class="content_item_props <?php echo $ctype['name']; ?>_item_props">
            <table>
                <tbody>
                    <?php foreach($props_fieldsets as $fieldset_id => $fieldset){ ?>
                        <?php if ($fieldset['title']){ ?>
                            <tr class="props_groups props_group_<?php echo $ctype['name']; ?>_<?php echo $fieldset_id ?>">
                                <td class="heading" colspan="2"><?php html($fieldset['title']); ?></td>
                            </tr>
                        <?php } ?>
                        <?php if ($fieldset['fields']){ ?>
                            <?php foreach($fieldset['fields'] as $prop){ ?>
                                <tr class="prop_wrap prop_<?php echo $prop['type']; ?>">
                                    <td class="title"><?php html($prop['title']); ?></td>
                                    <td class="value">
                                        <?php echo $prop['html']; ?>
                                    </td>
                                </tr>
                            <?php } ?>
                        <?php } ?>
                    <?php } ?>
                </tbody>
            </table>
        </div>
    <?php } ?>

    <?php
        $hooks_html = cmsEventsManager::hookAll("content_{$ctype['name']}_item_html", $item);
        if ($hooks_html) { echo html_each($hooks_html); }
    ?>

    <?php if ($ctype['item_append_html']){ ?>
        <div class="append_html"><?php echo $ctype['item_append_html']; ?></div>
    <?php } ?>
	<?php if ($show_bar){ ?>
    <div class="info_bar">
		<?php if (!empty($item['rating_widget'])){ ?>
            <div class="bar_item bi_rating">
                <?php echo $item['rating_widget']; ?>
            </div>
        <?php } ?>
		<?php if ($fields['user']['is_in_item']){ ?>
			<span class="bar_item avatar">
				<a href="<?php echo href_to('users', $item['user']['id']); ?>">
					<?php echo html_avatar_image($item['user']['avatar'], 'micro', $item['user']['nickname']); ?>
					<?php echo $item['user']['nickname']; ?>
				</a>
			</span>
		<?php } ?>
		<?php if ($fields['date_pub']['is_in_item']){ ?>
			<span class="bar_item bi_date" title="<?php html( $fields['date_pub']['title'] ); ?>">
				<?php if (!$item['is_pub']){ ?>
					<span class="bi_not_pub">
						<?php echo LANG_CONTENT_NOT_IS_PUB; ?>
					</span>
				<?php } else { ?>
					<?php echo $fields['date_pub']['html']; ?>
				<?php } ?>
			</span>
		<?php } ?>
		<?php if (!empty($ctype['options']['hits_on']) && $item['hits_count']){ ?>
			<span class="album_hits bar_item bi_hits">
				<?php echo html_spellcount($item['hits_count'], LANG_HITS_SPELL); ?>
			</span>
		<?php } ?>
		<?php if (!empty($ctype['options']['share_code'])){ ?>
            <div class="bar_item bi_share">
                <?php echo $ctype['options']['share_code']; ?>
            </div>
        <?php } ?>
		<?php if(!empty($this->options['share42'])) { ?>
			<?php if (empty($this->options['soc_share42'])){ ?>
				<script type="text/javascript" src="/templates/<?php echo $this->name; ?>/js/share42/share42.js"></script>
			<?php } ?>
			<div id="share42buttons" class="bar_item bi_share">
				<div class="share42init"></div>
				<div class="share42overlay"></div>
			</div>
		<?php } ?>
        <?php if (!$item['is_approved']){ ?>
            <div class="bar_item bi_not_approved">
                <?php echo $item['is_draft'] ? LANG_CONTENT_DRAFT_NOTICE : LANG_CONTENT_NOT_APPROVED; ?>
            </div>
        <?php } ?>
    </div>
	<?php } ?>
	<?php if (!empty($item['show_tags'])){ ?>
		<div class="tags_bar"><?php echo html_tags_bar($item['tags'], 'content-'.$ctype['name']); ?></div>
	<?php } ?>
</div>

	
<?php ob_start(); ?>
<style>	
#on_top,
#main_menu_box.fixed_nav{ z-index:999 !important; }
.lg-backdrop {	
    background-color: rgb(0,0,0,0.8) !important;
}
</style>	
<script type="text/javascript">
    $(document).ready(function() {
        $("#lightgallery").lightGallery({  selector: '.photo_thumb_link'}); 
    });
</script>

<?php $this->addBottom(ob_get_clean()); ?>
