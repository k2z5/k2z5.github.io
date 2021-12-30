<style>
.callback {
  background: rgba(0, 0, 0, 0.6);
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  border-radius: 10px;
  padding: 25px 40px 12px 40px;
  margin: 15px 20px 30px 20px;
  font-family: "Open Sans",Arial,"Helvetica";
}
.callback .cb-title {
  color: #ffffff;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 28px;
  font-size: 24px;
}
.callback input {
  width: 100%;
  padding: 8px 14px 12px 14px;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  -ms-border-radius: 8px;
  border-radius: 8px;
  border: 0;
  font-size: 19px;
  background: #ffffff;
  height: 38px;
}
.callback input:focus {
  outline: 0;
  border: 0;
  box-shadow: none;
}
.callback input:focus::-webkit-input-placeholder {
  color: #fff;
}
.callback input:focus:-moz-placeholder {
  color: #fff;
}
.callback input:focus::-moz-placeholder {
  color: #fff;
}
.callback input:focus:-ms-input-placeholder {
  color: #fff;
}
.callback input::-webkit-input-placeholder {
  position: relative;
  top: 3px;
}
.callback input:-moz-placeholder {
  position: relative;
  top: 3px;
}
.callback input::-moz-placeholder {
  position: relative;
  top: 3px;
}
.callback input:-ms-input-placeholder {
  position: relative;
  top: 3px;
}
.callback .fcallback {
  width: 100%;
  padding: 8px 14px 11px 14px;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  -ms-border-radius: 8px;
  border-radius: 8px;
  border: 0;
  font-size: 19px;
  text-align: center;
  height: 38px;
  background: #a3cc32;
  background: -moz-linear-gradient(top, #a3cc32 0%, #a3cc32 25%, #73ba2a 100%);
  background: -webkit-gradient(left top, left bottom, color-stop(0%, #a3cc32), color-stop(25%, #a3cc32), color-stop(100%, #73ba2a));
  background: -webkit-linear-gradient(top, #a3cc32 0%, #a3cc32 25%, #73ba2a 100%);
  background: -o-linear-gradient(top, #a3cc32 0%, #a3cc32 25%, #73ba2a 100%);
  background: -ms-linear-gradient(top, #a3cc32 0%, #a3cc32 25%, #73ba2a 100%);
  background: linear-gradient(to bottom, #a3cc32 0%, #a3cc32 25%, #73ba2a 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a3cc32', endColorstr='#73ba2a', GradientType=0 );
  color: #fff;
  font-family: "Open Sans",Arial,"Helvetica";
  cursor: pointer;
  -moz-transition: 0.3s;
  -o-transition: 0.3s;
  -webkit-transition: 0.3s;
  transition: 0.3s;
}
.callback .fcallback:hover {
  background: #7aa106;
  background: -moz-linear-gradient(top, #7aa106 0%, #7aa106 25%, #73ba2a 100%);
  background: -webkit-gradient(left top, left bottom, color-stop(0%, #7aa106), color-stop(25%, #7aa106), color-stop(100%, #73ba2a));
  background: -webkit-linear-gradient(top, #7aa106 0%, #7aa106 25%, #73ba2a 100%);
  background: -o-linear-gradient(top, #7aa106 0%, #7aa106 25%, #73ba2a 100%);
  background: -ms-linear-gradient(top, #7aa106 0%, #7aa106 25%, #73ba2a 100%);
  background: linear-gradient(to bottom, #7aa106 0%, #7aa106 25%, #73ba2a 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#7aa106', endColorstr='#73ba2a', GradientType=0 );
}
.callback .ok-message {
  text-align: center;
  color: #fff;
  margin-top: 12px;
  font-size: 14px;
}
@media (max-width: 767px) {
.callback .cb-title {
  color: #ffffff;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 25px;
  font-size: 18px;
}
.callback {
    background: rgba(0, 0, 0, 0.6);
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    border-radius: 10px;
    padding: 15px 20px 10px 20px;
    margin: 25px auto;
    max-width: 300px;
  }
.callback input {
    width: 100%;
    padding: 8px 14px 12px 14px;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    -ms-border-radius: 8px;
    border-radius: 8px;
    border: 0;
    font-size: 16px;
    background: #FFF;
    height: 34px;
    margin-bottom: 10px;
  }
.callback .fcallback {
    font-size: 16px;
    height: 38px;
    padding: 6px 14px 11px 14px;
  }
}
</style>

        <div class="row">
          <div class="col-md-10 col-md-offset-1 col-sm-12 col-xs-12 text-center">
            <div class="callback">
              <div class="cb-title">
                <?php echo $heading_title; ?>
              </div>
              <div class="row">
                <div class="col-sm-4 col-xs-12">
                  <input type="text" name="name" placeholder="<?php echo $entry_name; ?>" autocomplete="off" value="" class="input-name" required="required" pattern=".{3,}">
                </div>
                <div class="col-sm-4 col-xs-12">
                  <input type="tel" name="phone" placeholder="<?php echo $entry_phone; ?>" autocomplete="off" value="" class="input-phone" required="required">
                </div>
                <div class="col-sm-4 col-xs-12">
                  <div class="fcallback"><?php echo $entry_submit; ?></div>
                </div>
              </div>
              <div class="ok-message"></div>
              <script type="text/javascript">
                $(document).ready(function(){
                  $(".fcallback").on('click', function() {
                    var name = $('.input-name').val();
                    var phone = $('.input-phone').val();
                    if(name!=''&&phone!=''){
                          $.ajax({
                            type: "GET",
                            url: "/catalog/controller/extension/module/callback-sender.php",
                            data: 'name='+name+'&phone='+phone,
                            success: function() {
                                  $('.ok-message').html('<?php echo $entry_ok; ?>');
                                  setTimeout(function() { $('.ok-message').html(''); }, 2000)
                              }
                          });
                      } else {
                        $('.ok-message').html('<?php echo $entry_error; ?>');
                        setTimeout(function() { $('.ok-message').html(''); }, 2000)
                      }
                    });
                })
              </script>
            </div>
          </div>
        </div>