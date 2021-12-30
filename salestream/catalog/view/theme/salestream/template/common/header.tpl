<!DOCTYPE html>
<!--[if IE 8]>         <html class="no-js lt-ie9" lang="ru"> <![endif]-->
<!--[if IE 9]>         <html class="no-js lt-ie10" lang="ru"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="ru"> <!--<![endif]-->
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <script src="/catalog/view/javascript/modernizr.min.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?sensor=true"></script>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, maximum-scale=1.0" />
    <link href="catalog/view/javascript/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen" />
    <link href="catalog/view/javascript/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="catalog/view/theme/salestream/stylesheet/stylesheet.css" rel="stylesheet">

    <title>Главная</title>
    <base href="<?php echo $base; ?>" />
    <?php if ($description) { ?>
    <meta name="description" content="<?php echo $description; ?>" />
    <?php } ?>
    <?php if ($keywords) { ?>
    <meta name="keywords" content= "<?php echo $keywords; ?>" />
    <?php } ?>
    <?php foreach ($styles as $style) { ?>
    <link href="<?php echo $style['href']; ?>" type="text/css" rel="<?php echo $style['rel']; ?>" media="<?php echo $style['media']; ?>" />
    <?php } ?>
    <?php foreach ($links as $link) { ?>
    <link href="<?php echo $link['href']; ?>" rel="<?php echo $link['rel']; ?>" />
    <?php } ?>
    <?php foreach ($analytics as $analytic) { ?>
    <?php echo $analytic; ?>
    <?php } ?>

    <link rel="stylesheet" href="catalog/view/theme/salestream/stylesheet/main.css">
  </head>

  <body>
    <div id="panel"></div>
    <!--[if lt IE 10]>
<p class="browsehappy">Вы используете устаревший, <strong>не поддерживаемый</strong> браузер. Пожалуйста <a href="http://browsehappy.com/">обновите ваш браузер</a>, чтобы получить доступ ко всем возможностям сайта.</p>
<![endif]-->
    <div class="l-section">

      <div class="submenu-wr js-submenu-wr">
        <div class="submenu-top">
          <div class="nav-menu-btn js-nav-menu-btn"></div>
          <div class="nav-back-btn js-nav-back-btn">Назад</div>
          <a href="/" class="ir menu-logo" alt="SaleStream">SaleStream</a>
        </div>

        
        <?php foreach ($categories as $key => $category) { ?>
        <div class="main-submenu js-submenu" data-id="<?php echo $key+1; ?>">
          <?php if ($category['children']) { ?>
          <?php foreach (array_chunk($category['children'], ceil(count($category['children']) / $category['column'])) as $children) { ?>
          <h3><?php echo $category['name']; ?></h3>
          <ul>
            <?php foreach ($children as $child) { ?>
            <li><a href="<?php echo $child['href']; ?>"><?php echo $child['name']; ?></a></li>
            <?php } ?>
          </ul>
          <?php } ?>
        <?php } else { ?>
        <h3><?php echo $category['name']; ?></h3>
        <?php } ?>
        </div>
        <?php } ?>
      </div>

      <div class="l-nav js-nav">
        <div class="nav-menu-wr js-nav-menu-wr">
          <div class="nav-menu-btn js-nav-menu-btn"></div>
          <ul class="main-menu js-submenu js-main-menu">
            <?php foreach ($categories as $key => $category) { ?>
            <?php if ($category['children']) { ?>

            <li data-id="<?php echo $key+1; ?>" >
              <span><?php echo $category['name']; ?></span>
            </li>
            <?php } else { ?>
            <li>
              <a href="<?php echo $category['href']; ?>"><?php echo $category['name']; ?></a>
            </li>
            <?php } ?>
            <?php } ?>
          </ul>
          <a href="/partners/partner/" class="nav-partners"><span>Стать партнером</span></a>    </div>
      </div>