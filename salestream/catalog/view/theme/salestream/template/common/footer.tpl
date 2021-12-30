<div class="nice-modal error-modal js-nice-modal">
  <div class="nice-modal-close js-nice-modal-close"></div>
  <div class="nice-modal-inner js-nice-modal-inner"></div>
</div>
<div class="dark-bg js-dark-bg"></div>
</div><!-- end of l-section  -->

<footer class="l-footer">
  <div class="footer-left">
    <span class="f-copy">© 2018 SaleStream Consulting</span>

  </div>

  <div class="footer-right">

    <a href="#" class="to-top js-to-top"><span>Наверх</span></a>
  </div>
</footer>

<script type="text/javascript">
  Modernizr.load([
    {
      load: 'http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js',
      complete: function() {
        if (!window.jQuery) {
          Modernizr.load('/catalog/view/javascript/user/jquery-2.1.1.min.js')
        }
      }
    },
    {
      load: [
        '/catalog/view/javascript/user/plugins.js',
        '/catalog/view/javascript/user/external.js',
        '/catalog/view/javascript/user/main.js',
        '/catalog/view/javascript/bootstrap/js/bootstrap.min.js',
        <?php foreach ($scripts as $script) { ?>
        '<?php echo $script; ?>',
        <?php } ?>
        'catalog/view/javascript/common.js'

      ]
    }
  ])
</script>
</body>
</html>