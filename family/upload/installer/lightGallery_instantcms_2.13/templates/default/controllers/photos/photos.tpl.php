<?php 
$current_ctype = cmsModel::getCachedResult('current_ctype');
$current_ctype_item = cmsModel::getCachedResult('current_ctype_item');
if ($current_ctype_item && $current_ctype['name']=='albums'){ ?>


    <?php $disable_owner = isset($disable_owner) ? true : false; ?>
	
	<div id="lightgallery">
	
    <?php foreach($photos as $photo){ ?>

        <?php
            $is_photo_owner = ($is_owner || $photo['user_id'] == $user->id) && !$disable_owner;
            $photo_url = html_image_src($photo['image'], 'big', true, false);
        ?>

        <div class="photo photo-<?php echo $photo['id']; ?> <?php if ($is_photo_owner) { ?> is_my_photo<?php } ?> <?php echo (($photo_url=='#') ? 'unpublished' : ''); ?>" data-w="<?php echo $photo['sizes'][$preset_small]['width']; ?>" data-h="<?php echo $photo['sizes'][$preset_small]['height']; ?>" itemscope itemtype="http://schema.org/ImageObject">
            <a class="photo_thumb_link lg_link" href="<?php echo $photo_url; ?>" title="<?php html($photo['title']); ?>">
                <img src="<?php echo html_image_src($photo['image'], $preset_small, true, false); ?>" title="<?php html($photo['title']); ?>" alt="<?php html($photo['title']); ?>" itemprop="thumbnail" />
			</a>
			<div class="info">
				<h3>
					<span class="photo_page_link">
						<?php html($photo['title']); ?>
					</span>
				</h3>
				<div class="photo-counts">
					<span class="hits-count" title="<?php echo LANG_HITS; ?>">
						<?php echo $photo['hits_count']; ?>
					</span>
					<span title="<?php echo LANG_RATING; ?>" class="rating <?php echo html_signed_class($photo['rating']); ?>">
						<?php echo html_signed_num($photo['rating']); ?>
					</span>
					<span class="comments" title="<?php echo LANG_COMMENTS; ?>">
						<?php echo $photo['comments']; ?>
					</span>
                <?php if(!empty($photo['user']['nickname'])){ ?>
                    <a class="author" title="<?php echo LANG_AUTHOR; ?>" href="<?php echo href_to('users', $photo['user']['id']); ?>">
                        <?php html($photo['user']['nickname']); ?>
                    </a>
                <?php } ?>
				</div>
			</div>
            <?php if ($is_photo_owner) { ?>
                <a class="delete dt-i-cancel" href="#" data-id="<?php echo $photo['id']; ?>" title="<?php echo LANG_DELETE; ?>"></a>
            <?php } ?>
            <meta itemprop="height" content="<?php echo $photo['sizes'][$preset_small]['height']; ?> px">
            <meta itemprop="width" content="<?php echo $photo['sizes'][$preset_small]['width']; ?> px">
        </div>

    <?php } ?>
	
	</div>
	
	
	
	
<?php }else{ ?>





<?php if ($photos){ ?>
    <?php $disable_owner = isset($disable_owner) ? true : false; ?>
	
    <?php foreach($photos as $photo){ ?>

        <?php
            $is_photo_owner = ($is_owner || $photo['user_id'] == $user->id) && !$disable_owner;
            $photo_url = $photo['slug'] ? href_to('photos', $photo['slug'].'.html') : '#';
            $photo['title'] = $photo_url=='#' ? LANG_PHOTOS_NO_PUB : $photo['title'];
        ?>

        <div class="photo photo-<?php echo $photo['id']; ?> <?php if ($is_photo_owner) { ?> is_my_photo<?php } ?> <?php echo (($photo_url=='#') ? 'unpublished' : ''); ?>" data-w="<?php echo $photo['sizes'][$preset_small]['width']; ?>" data-h="<?php echo $photo['sizes'][$preset_small]['height']; ?>" itemscope itemtype="http://schema.org/ImageObject">
            <a class="photo_thumb_link" href="<?php echo $photo_url; ?>" title="<?php html($photo['title']); ?>">
                <img src="<?php echo html_image_src($photo['image'], $preset_small, true, false); ?>" title="<?php html($photo['title']); ?>" alt="<?php html($photo['title']); ?>" itemprop="thumbnail" />
			</a>
			<div class="info">
				<h3>
					<a class="photo_page_link" href="<?php echo $photo_url; ?>" title="<?php html($photo['title']); ?>" itemprop="name">
						<?php html($photo['title']); ?>
					</a>
				</h3>
				<div class="photo-counts">
					<span class="hits-count" title="<?php echo LANG_HITS; ?>">
						<?php echo $photo['hits_count']; ?>
					</span>
					<span title="<?php echo LANG_RATING; ?>" class="rating <?php echo html_signed_class($photo['rating']); ?>">
						<?php echo html_signed_num($photo['rating']); ?>
					</span>
					<span class="comments" title="<?php echo LANG_COMMENTS; ?>">
						<?php echo $photo['comments']; ?>
					</span>
                <?php if(!empty($photo['user']['nickname'])){ ?>
                    <a class="author" title="<?php echo LANG_AUTHOR; ?>" href="<?php echo href_to('users', $photo['user']['id']); ?>">
                        <?php html($photo['user']['nickname']); ?>
                    </a>
                <?php } ?>
				</div>
			</div>
            <?php if ($is_photo_owner) { ?>
                <a class="delete dt-i-cancel" href="#" data-id="<?php echo $photo['id']; ?>" title="<?php echo LANG_DELETE; ?>"></a>
            <?php } ?>
            <meta itemprop="height" content="<?php echo $photo['sizes'][$preset_small]['height']; ?> px">
            <meta itemprop="width" content="<?php echo $photo['sizes'][$preset_small]['width']; ?> px">
        </div>

    <?php } ?>

	
	
	<?php if((isset($has_next) || isset($page) || empty($disable_flex)) || !empty($item['photos_url_params'])){ ?>
	
<?php ob_start(); ?>
    <script type="text/javascript">
        <?php if(isset($has_next) || isset($page) || empty($disable_flex)){ ?>
            <?php if(isset($has_next)){ ?>
                <?php if($has_next){ ?>
                    icms.photos.has_next = true;
                <?php } else { ?>
                    icms.photos.has_next = false;
                <?php } ?>
            <?php } ?>
            <?php if(isset($page)){ ?>
                icms.photos.page = <?php echo $page; ?>;
            <?php } ?>
        <?php } ?>
        <?php if(!empty($item['photos_url_params'])){ ?>
            $(function(){
                $('.photo_page_link').each(function (){
                    $(this).attr('href', $(this).attr('href')+'?<?php echo $item['photos_url_params']; ?>');
                });
            });
        <?php } ?>
    </script>
	
<?php $this->addBottom(ob_get_clean()); ?>
	<?php } ?>
<?php } ?>



<?php } ?>
