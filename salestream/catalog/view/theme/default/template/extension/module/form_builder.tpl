<link rel="stylesheet" href="catalog/view/javascript/form_builder/picker.default.min.css" />
<script type="text/javascript" src="catalog/view/javascript/form_builder/picker.min.js"></script>

<style type="text/css">
	<?php echo $settings['extra_css']; ?>
	.form-builder .field-block {
		display: block;
		min-width: 150px;
		padding: 0 0 10px;
		vertical-align: top;
	}
	.form-builder h4 {
		margin: 10px 0 5px;
	}
	.form-builder .sub-text {
		font-size: 11px;
		margin-bottom: 5px;
	}
	.form-builder input[type="checkbox"], .form-builder input[type="radio"] {
		cursor: pointer;
		margin-right: 2px;
	}
	.form-builder input[type="text"] {
		margin: 0;
	}
	.form-builder textarea {
		height: 100px;
	}
	.form-builder [readonly] {
		cursor: auto;
		background-color: #FFF;
	}
	.form-builder label {
		border: 1px solid #FFF;
		cursor: pointer;
		display: block;
		padding: 0 0 0 5px;
		margin: 0;
	}
	.form-builder label:hover {
		border: 1px dashed #AAA;
		border-radius: 5px;
	}
	.required-field {
		color: #F00;
	}
	.field-group {
		font-style: italic;
	}
	.other-response {
		margin-top: 5px !important;
	}
</style>

<div id="form-builder-<?php echo $settings['module_id']; ?>" class="form-builder box">
	<?php if (!empty($settings['heading_' . $language])) { ?>
		<div class="box-heading">
			<h3>
			<?php echo $settings['heading_' . $language]; ?>
			</h3>
		</div>
	<?php } ?>
	
	<div class="box-content">
		<?php if (!empty($settings['pre_text_' . $language])) { ?>
			<div class="pre-text"><?php echo html_entity_decode($settings['pre_text_' . $language], ENT_QUOTES, 'UTF-8'); ?></div>
			<hr style="margin: 15px 0 0" />
		<?php } ?>
		
		<?php foreach ($settings['field'] as $field) { ?>
			<div class="field-block">
				<h4><?php if ($field['required']) { ?>
						<span class="required-field">*</span>
					<?php } ?>
					<?php echo html_entity_decode($field['title_' . $language], ENT_QUOTES, 'UTF-8'); ?>
				</h4>
				
				<?php if (!empty($field['text_' . $language])) { ?>
					<div class="sub-text"><?php echo html_entity_decode($field['text_' . $language], ENT_QUOTES, 'UTF-8'); ?></div>
				<?php } ?>
				
				<?php
				$id = $settings['module_id'] . '-' . $field['sort_order'];
				$responses = array_map('trim', explode(';', $field['responses_' . $language]));
				
				$set_responses = array();
				foreach ($responses as $index => $response) {
					if (strpos($response, '[') === 0) {
						$responses[$index] = str_replace(array('[', ']'), '', $response);
						$set_responses[] = $responses[$index];
					}
				}
				?>
				
				<?php if ($field['type'] == 'radio' || $field['type'] == 'checkbox') { ?>
					
					<?php foreach ($responses as $response) { ?>
						<?php $checked = (in_array($response, $set_responses)) ? 'checked="checked"' : ''; ?>
						<?php if (strpos($response, '{') === 0) { ?>
							<div class="field-group"><?php echo str_replace(array('{', '}'), '', $response); ?></div>
						<?php } else { ?>
							<label><input type="<?php echo $field['type']; ?>" name="<?php echo $name . '_' . $id . ($field['type'] == 'checkbox' ? '[]' : ''); ?>" value="<?php echo $response; ?>" <?php echo $checked; ?> /> <?php echo $response; ?></label>
						<?php } ?>
					<?php } ?>
					
					<?php if ($field['other_response_' . $language]) { ?>
						<?php $other_values = implode('; ', array_diff($set_responses, $responses)); ?>
						<label><input type="<?php echo $field['type']; ?>" name="<?php echo $name . '_' . $id; ?>" value="<?php echo $other_values; ?>" <?php if ($other_values) echo 'checked="checked"'; ?> /> <?php echo $field['other_response_' . $language]; ?></label>
						<input type="text" class="form-control other-response" value="<?php echo $other_values; ?>" onclick="$(this).prev().find('input').click()" onkeyup="$(this).prev().find('input').val($(this).val())" />
					<?php } ?>
					
				<?php } elseif ($field['type'] == 'select' || $field['type'] == 'multiselect') { ?>
					
					<?php if ($field['type'] == 'select') { ?>
						<select class="form-control" name="<?php echo $name . '_' . $id; ?>" onchange="selectActions($(this))">
							<option value="" class="please-select"><?php echo $text_select; ?></option>
					<?php } elseif ($field['type'] == 'multiselect') { ?>
						<select class="form-control" name="<?php echo $name . '_' . $id; ?>[]" onchange="selectActions($(this))" multiple="multiple" size="5">
					<?php } ?>
						
						<?php $grouped = false; ?>
						
						<?php foreach ($responses as $response) { ?>
							<?php if (strpos($response, '{') === 0) { ?>
								<?php if ($grouped) { ?>
									</optgroup>
								<?php } else { ?>
									<?php $grouped = true; ?>
								<?php } ?>
								<optgroup label="<?php echo str_replace(array('{', '}'), '', $response); ?>">
							<?php } else { ?>
								<?php $selected = (in_array($response, $set_responses)) ? 'selected="selected"' : ''; ?>
								<option value="<?php echo $response; ?>" <?php echo $selected; ?>><?php echo $response; ?></option>
							<?php } ?>
						<?php } ?>
						
						<?php if ($field['other_response_' . $language]) { ?>
							<?php $selected = (!empty($session_data[$settings['module_id'] . '.' . $field['sort_order']]) && array_diff($set_responses, $responses)) ? 'selected="selected"' : ''; ?>
							<option class="other-option" value="<?php echo implode('; ', array_diff($set_responses, $responses)); ?>" <?php echo $selected; ?>><?php echo $field['other_response_' . $language]; ?></option>
						<?php } ?>
						
						<?php if ($grouped) { ?>
							</optgroup>
						<?php } ?>
						
					</select>
					
					<?php if ($field['other_response_' . $language]) { ?>
						<?php $show_or_hide = ($selected) ? 'value="' . implode('; ', array_diff($set_responses, $responses)) . '"' : 'style="display: none"'; ?>
						<input type="text" class="form-control other-response" onkeyup="$(this).parent().find('.other-option').val($(this).val())" <?php echo $show_or_hide; ?> />
					<?php } ?>
					
				<?php } else { ?>
					
					<?php if ($field['type'] == 'textarea') { ?>
						<textarea class="form-control" name="<?php echo $name . '_' . $id; ?>" placeholder="<?php echo $field['responses_' . $language]; ?>"><?php echo ($set_responses) ? implode('; ', $set_responses) : ''; ?></textarea>
					<?php } else { ?>
						<input type="text" class="form-control <?php echo $field['type']; ?>-field" name="<?php echo $name . '_' . $id; ?>" placeholder="<?php echo $field['responses_' . $language]; ?>" value="<?php echo ($set_responses) ? implode('; ', $set_responses) : ''; ?>" />
					<?php } ?>
					
				<?php } ?>
			</div>
		<?php } /* end field loop */ ?>
		
		<?php if (!empty($settings['post_text_' . $language])) { ?>
			<hr style="margin: 5px 0 15px" />
			<div class="post-text"><?php echo html_entity_decode($settings['post_text_' . $language], ENT_QUOTES, 'UTF-8'); ?></div>
			<br />
		<?php } ?>
		
		<div class="field-block">
			<a class="button btn btn-primary" onclick="submitForm<?php echo $settings['module_id']; ?>($(this), <?php echo $settings['module_id']; ?>)"><?php echo html_entity_decode($settings['submit_button_' . $language], ENT_QUOTES, 'UTF-8'); ?></a>
		</div>
	</div>
</div>

<script type="text/javascript"><!--
	$(document).ready(function(){
		$('.date-field').pickadate({
			format: 'yyyy-mm-dd',
		});
		$('.time-field').pickatime({
			format: 'h:i A',
		});
	});
	
	function selectActions(element) {
		if (element.parent().find('.other-option:selected').length) {
			element.parent().find('input').show();
		} else {
			element.parent().find('input').hide();
		}
	}
	
	function submitForm<?php echo $settings['module_id']; ?>(element, module_id) {
		var regex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/i;
		var emailValidationFailed = false;
		$('#form-builder-' + module_id + ' .email-field').each(function(){
			if (!emailValidationFailed && $(this).val() && !regex.test($(this).val())) {
				alert('<?php echo str_replace("'", "\'", $settings['error_email_' . $language]); ?>');
				emailValidationFailed = true;
			}
		});
		if (emailValidationFailed) return;
		
		<?php
		$required = array();
		foreach ($settings['field'] as $field) {
			if (!$field['required']) continue;
			$id = $settings['module_id'] . '-' . $field['sort_order'];
			$getval = array();
			if ($field['type'] == 'checkbox' || $field['type'] == 'radio') {
				$getval[] = '$(\'input[type="' . $field['type'] . '"][name^="' . $name . '_' . $id . '"]\').is(\':checked\')';
			} elseif ($field['type'] == 'select' || $field['type'] == 'multiselect') {
				$getval[] = '$(\'select[name="' . $name . '_' . $id . '"]\').val()';
			} elseif ($field['type'] == 'textarea') {
				$getval[] = '$(\'textarea[name="' . $name . '_' . $id . '"]\').val()';
			} else {
				$getval[] = '$(\'input[type="text"][name="' . $name . '_' . $id . '"]\').val()';
			}
			$required[] = '(' . implode(' || ', $getval) . ')';
		}
		?>
		
		<?php if ($required) { ?>
			pass = (<?php echo implode(' && ', $required); ?>) ? true : false;
			if (!pass) {
				alert('<?php echo str_replace("'", "\'", $settings['error_required_' . $language]); ?>');
				return;
			}
		<?php } ?>
		
		element.attr('disabled', 'disabled').html('<?php echo html_entity_decode($settings['please_wait_' . $language], ENT_QUOTES, 'UTF-8'); ?>');
		
		$.ajax({
			type: 'POST',
			url: 'index.php?route=<?php echo $type; ?>/<?php echo $name; ?>/submitForm&module_id=' + module_id,
			data: $('#form-builder-<?php echo $settings['module_id']; ?>').find(':input:not(:checkbox), :checkbox:checked').serialize(),
			success: function(data) {
				alert(data ? data : '<?php echo $settings['success_' . $language]; ?>');
				element.removeAttr('disabled').html('<?php echo html_entity_decode($settings['submit_button_' . $language], ENT_QUOTES, 'UTF-8'); ?>');
			}
		});
	}
//--></script>
