<?php
class sc  {
	public static $hpg = array('counter' => 0);
    private $page, $query;
    private $config, $replaces = array(), $get, $clear_url;
    private $__specsymbols = array(
        '\\' => '__s-backslash__',
        '/' => '__s-slash__',
        ':' => '__s-colon__',
        '*' => '__s-star__',
        '?' => '__s-quest__',
        '"' => '__s-quotes__',
        '<' => '__s-leftarrow__',
        '>' => '__s-rightarrow__',
        '|' => '__s-direct__');

    public static function debug($var) {  echo '<pre>'; print_r($var); echo '</pre>'; }

    public static function create($config, $query = null, $get = null, $clear_url = null) {
        $obj = new sc;
        $obj->config = $config;
        $obj->get = $get;
        $obj->clear_url = $clear_url;

        $obj->config['murl'] = str_replace(array('http://', 'https://'), '', $obj->config['url']);
        if(substr($obj->config['murl'], -1) == '/')
            $obj->config['murl'] = substr($obj->config['murl'], 0, -1);

        $obj->config['url_domain_count'] = count(explode('.', $obj->config['murl']));
        if($query !== null)
            $obj->query = $query;

        return $obj;
    }

    public function getPage() {
        $call_url = $this->clear_url;

        $tmp = explode('/', $call_url);
        $end = array_pop($tmp);
        if(empty($end))
            $end = array_pop($tmp);

        $_tmp = explode('.', $end);
		
        if(count($_tmp) == 1) {
            if(substr($call_url, -1) == '/')
                $call_url = $call_url.'index.html';
            else
                $call_url = $call_url.'/index.html';
        }
        else
            switch($_tmp[1]) {
                case 'jpg': case 'png': case'jpeg': $call_url = str_replace(array('(', ')'), '', $call_url); break;
            }
		
        if(file_exists('cache/'.$call_url)) {
            $this->page = file_get_contents('cache/'.$call_url);
            $this->SetHeaders();
            return $this;
        }
        elseif(strpos( $this->query, '?')) {
            $url_end = substr($this->query, strpos($this->query, '?'));
            $url_end = str_replace(array_keys($this->__specsymbols), array_values($this->__specsymbols),$url_end);
            $call_url = $this->clear_url.$url_end;
            if(file_exists('cache/'.$call_url))
            {
                $this->page = file_get_contents('cache/'.$call_url);
                $this->SetHeaders();
                return $this;
            }
        }
		
        if($this->query !== null) {
            if(isset($url_end))
                unset($url_end);

            if(strpos($this->query, '?'))
                $url_end = substr($this->query, strpos($this->query, '?'));
            $query = explode('/', $this->clear_url);

            $end = end($query);
			$file = strpos($end, '.') ? array_pop($query) : '';

            if(isset($url_end))
                $file = str_replace(array_keys($this->__specsymbols), array_values($this->__specsymbols), $file.$url_end);

            reset($query);

            $dir = 'cache';
            foreach($query as $key => $value) {
                $dir = $dir.'/'.$value;
                @mkdir($dir);
            }
        }

        $http = new http;

        if($this->config['charset'] !== null)
            $http->encoding = $this->config['charset'];

        if(is_file('proxy.txt'))
            $http->proxy = $this->getProxy();

        $url = $this->config['url'];

        if($this->query !== null)
            if(substr($this->query, 0, 3) == 's__')
                $url = 'http://'.substr($this->query, 3, strpos($this->query, '/')-3).'.'. $this->config['murl'].substr($this->query, strpos($this->query, '/'));
            else
                $url = $this->config['url'].$this->query;

        $this->page = $http->get($url);
        if($this->page == '') // ?? ???????????? ?????????????? ?? ????????????.
            if(is_file('proxy.txt')) {
                $proxy_list = explode("\n", file_get_contents('proxy.txt'));
                foreach($proxy_list as $key => $value)
                    $proxy_list[$key] = trim($value);

                $proxy_list = array_flip($proxy_list);
                unset($proxy_list[$http->proxy]);
                $proxy_list = array_flip($proxy_list);

                $proxy_list = implode("\r\n", $proxy_list);
                if(!empty($proxy_list))
                    file_put_contents('proxy.txt', $proxy_list);
                else
                    @unlink('proxy.txt');

                if(!is_file('proxy.txt')) {
                    $this->proxy = '';
                    $this->page = $http->get($url);
                }
                else {
                    $http->proxy = $this->getProxy();
                    $this->page = $http->get($url);
                }
            }
			
		if(isset($this->config['handlers'])) {
			$this->page = str_replace('</head>',
'<script>
window.onload = function() {var options = document.getElementsByTagName("option");
for(var i = 0; i <= options.length; i++) {
    if(options[i] != undefined)
        options[i].value = options[i].innerHTML;
}}</script></head>', $this->page);
		}
			
        if(isset($this->query))
        {
            $tmp = explode('.', $this->query);
            $ext = strtolower(array_pop($tmp));

            switch($ext) {
                case 'css': $this->cssOperation(); $this->setHeaders(); break;
                case 'jpg':
                case 'jpeg':
                case 'png': $this->imageOperation(); $this->setHeaders(); return $this; break;
                default:
                    $this->sinonim(); // ????????????????????????
                    $this->cutCounters(); // ???????????????? ????????????????
                    $this->urlReplaces()->replaceHrefs(); // ???????????? ????????????
                    $this->textReplaces(); // ???????????? (?????????? ?? ??????????????????)
                    $this->formHandlers(); // ?????????????????????? ????????
					          $this->SetHeaders(); // ?????????????????? ????????????????????
            }
        }
        else {
            $this->sinonim(); // ????????????????????????
            $this->cutCounters(); // ???????????????? ????????????????
            $this->urlReplaces()->replaceHrefs(); // ???????????? ????????????
            $this->textReplaces(); // ???????????? (?????????? ?? ??????????????????)
			      $this->formHandlers(); // ?????????????????????? ????????
            $this->SetHeaders(); // ?????????????????? ????????????????????
        }

        if($this->query !== null) {
            if(isset($file) and !empty($file))
                file_put_contents($dir.'/'.$file, $this->page);
            else
                file_put_contents($dir.'/index.html', $this->page);
        }
        else
            file_put_contents('cache/index.html', $this->page);

         return $this;
    }                                                                            // ?????????? getPage
    
    public function sinonim() {
        if(isset($this->config['sinonim'])) {
            $db_name = 's.db';

            if($this->config['charset'] == 'windows-1251')
                $db_name = 's1251.db';

            $db = file_get_contents($db_name);
            $db = unserialize($db);
            $this->page = str_replace(array_keys($db),array_values($db), $this->page, $countreplace);
            //file_put_contents('countreplace.tt', $countreplace."\n", FILE_APPEND);
        }

        return $this;
    }

    public function cutCounters() {
        if(isset($this->config['cutcounters'])) {
            /*
            $counters = array(
                '@<!--LiveInternet counter-->.*<!--/LiveInternet-->@s',
                '@<a href="http://www.liveinternet.ru.*</a>@s',
                '@<a href="http://top.mail.ru.*</a>@s',
                '@<!-- Yandex.Metrika counter -->.*<!-- /Yandex.Metrika counter -->@s',
                '@<!-- Google analytics -->.*<!-- End google analytics -->@s',
                '@<!-- begin of Top100 logo -->.*<!-- end of Top100 logo -->@s',
                '@<!-- begin of Top100 code -->.*<!-- end of Top100 code -->@s',
                '@<script src="http\:\/\/www\.google\-analytics\.com.*<script type="text/javascript">.*urchinTracker\(\).*<\/script>@Us',
                '@<a\s+href="http\:\/\/www\.yandex\.ru/cy\?.*<img src="http\:\/\/www\.yandex\.ru\/cycounter.*>\s*<\/a>@Us'
            );
            $this->page = preg_replace($counters, '', $this->page);
            */
            /*
            $file_cls1 = file_get_contents('./system/in_clear1.txt', true);
            $file_cls2 = file_get_contents('./system/in_clear2.txt', true);
            $file_cls3 = file_get_contents('./system/in_clear3.txt', true);
            $this->page = str_replace($file_cls1, '', $this->page);
            $this->page = str_replace($file_cls2, '', $this->page);
            $this->page = str_replace($file_cls3, '', $this->page);
            */
            $patterns = array();
            $patterns[0] = '/<head>/';
            $patterns[1] = '/<\/head>/';
            $patterns[2] = '/<body>/';
            $patterns[3] = '/<\/body>/';
            
            $file1 = file_get_contents('./system/in_head.txt', true);
            $file2 = file_get_contents('./system/in_head2.txt', true);
            $file3 = file_get_contents('./system/in_body.txt', true);
            $file4 = file_get_contents('./system/in_body2.txt', true);

            $replacements = array();
            $replacements[0] = '<head>'.$file1;
            $replacements[1] = $file2.'</head>';
            $replacements[2] = '<body>'.$file3;
            $replacements[3] = $file4.'</body>';
            $this->page = preg_replace($patterns, $replacements, $this->page);
        }
    }

	public function formHandlers() {
		if(isset($this->config['handlers']) and isset($this->config['forms'])) {
			$handlers = (array)$this->config['handlers'];
			function callback($matches) {
				sc::debug($matches);
			}
			foreach($this->config['forms'] as $form) {				
				$form = (array)$form;
				$handler = (array)$handlers[$form['handler']];
				
				switch($form['pointType']) {
					case 'id':
					case 'class':
						if(!preg_match('#<form(.*)'.$form['pointType'].'="?\'?'.$form['pointName'].'\'?"?(.*)>#Ui', $this->page, $matches))
							return;

						$formHtml = $matches[0];
						break;
					case 'formindex':
						sc::$hpg['currentpoint'] = $form['pointName'];
						if(!preg_match_all('#<form(.*)>#Ui', $this->page, $matches))
							return;
						
						$formHtml = $matches[0][$form['pointName']];
						break;
				}

				$formHtml = str_replace(array("\\'", '\\"'), array("'", '"'), $formHtml);
				$form2 = preg_replace('#(action|method)="(.*)"#Ui', '', $formHtml);
				if($handler['type'] == 'email')
					$string = 'action="/schandler_'.$form['handler'].'.php" method="post"';
				elseif($handler['type'] == 'getpostsend')
					$string = 'action="'.$handler['getpostsend_url'].'" method="'.$handler['getpostsend_type'].'"';
					
				$form2 = str_replace('<form', '<form '.$string, $form2);
				if($form['pointType'] == 'formindex') {
					sc::$hpg['replace_form'] = $form2;
					$this->page = preg_replace_callback('|<form (.*)>|i', 'sc::hpregCallback', $this->page);
					$this->page = str_replace('\\#', '#', $this->page);
				}
				else
					$this->page = str_replace($formHtml, $form2, $this->page);
			}
		}
	}
	
	public static function hpregCallback($matches) {
		if(sc::$hpg['counter'] == sc::$hpg['currentpoint']) {
			sc::$hpg['counter'] = 0;
			return sc::$hpg['replace_form'];
		}
		else {
			sc::$hpg['counter'] = sc::$hpg['counter']+1;
			return $matches[0];
		}
	}
	
    public function cssOperation() {
        function is_hex($hexValue) { return $hexValue == dechex(hexdec($hexValue)) ? true : false; }

        if(isset($this->config['css_color_random'])) {
            preg_match_all('&([ //:])#([1-9a-zA-Z]{6})&', $this->page, $matches);
            $colors = $matches[2];
            $colors = array_unique($colors);

            foreach($colors as $key => $value) {
                if(is_hex($value))
                    $colors['#'.$value] = '';
                unset($colors[$key]);
            }

            if(file_exists('css_colors.txt'))
            {
                $saved_colors = explode("\n", file_get_contents('css_colors.txt'));
                $saved_colors = array_map('trim', $saved_colors);

                foreach($saved_colors as $key => $value) {
                    $c = explode(';', $value);
                    if(count($c) == 2)
                        $array_replace[$c[0]] = $c[1];
                }
                if(isset($array_replace))
                    $colors = array_merge($colors, $array_replace);
            }

            function generationColor() {
                $rand = rand(0, 255);
                if(strlen($rand) == 1)
                    $rand = '0'.$rand;

                return dechex($rand);
            }

            foreach($colors as $key => $value)
                if(empty($value))
                    $colors[$key] = '#'.generationColor().generationColor().generationColor();

            $colors_to_save = '';
            foreach($colors as $key => $value)
                $colors_to_save = $colors_to_save.$key.';'.$value."\r\n";

            file_put_contents('css_colors.txt', $colors_to_save);

            $this->page = str_ireplace(array_keys($colors), array_values($colors), $this->page);
        }
    }

    public function imageOperation() {
        $path = 'cache/'.$this->clear_url;
        $path = str_replace(array('(', ')'), '', $path);
        $tmp = explode('/', $path);
        $file_name = str_replace(array('(', ')'), '', array_pop($tmp));
        $img_folder = implode('/', $tmp);
        $path_for_rename = implode('/', $tmp).'/1'.$file_name;

        file_put_contents($path, $this->page);

        $ex = false;
        if(isset($this->config['img_exception'])) {
            $exceptions = explode("\n", $this->config['img_exception']);

            $_temp = explode('.', $exceptions[count($exceptions)-1]);
            $it_file = (count($_temp) > 1);

            $path_array = explode('/', $this->clear_url);
            if(substr($path[0], 3 == 's__'))
                array_shift($path_array);

            foreach($exceptions as $value) {
                $__temp = explode('/', $value);

                if($__temp[0] == '')
                    array_shift($__temp);

                foreach($__temp as $key => $value) {
                    $value = str_replace('/', '', $value);
                    if(isset($path_array[$key]))
						$ex = ($value == $path_array[$key]);
                    else
                        $ex = $it_file;
                }
            }
        }

        if($ex)
            return;
        else {
            $img = new Upload($path);
            if($img->image_src_x > $this->config['img_min_weight'] and $img->image_src_y > $this->config['img_min_height']) {
                if(isset($this->config['img_mirror']) and $this->config['img_mirror'] == 'on')
                    $img->image_flip = 'V';

                if(isset($this->config['img_zoom']) and $this->config['img_zoom'] != 0) {
                    $y = $img->image_src_y;
                    $x = $img->image_src_x;

                    $img->image_crop = $this->config['img_zoom'].' '.$this->config['img_zoom'];
                    $img->image_resize = true;
                    $img->image_y = $y + $this->config['img_zoom']*2;
                    $img->image_x = $x + $this->config['img_zoom']*2;
                }

                if(isset($this->config['img_copyright']) and $this->config['img_copyright'] == 'on')
                {
                    $img->image_text = $this->config['img_copyright_text'];
                    $img->image_text_color = $this->config['img_copyright_color'];
                    $bg_pos = strtoupper($this->config['img_copyright_bg_position']);
                    $bg_pos = str_replace(array('D', 'U'), array('B', 'T'), $bg_pos);
                    $img->image_text_position = strrev($bg_pos);
                    $img->image_text_padding_x = 3;
                    $img->image_text_padding_y = 3;
                    $img->image_text_font = 5;
                    $img->image_text_background = $this->config['img_copyright_bg_color'];
                }
            }

            $newname = '1'.$img->file_src_name_body;
            $fullname = $img->file_src_name;
            $img->file_new_name_body = $newname;
            $img->Process($img_folder);


            if(!$img->processed)
                die('error '.$img->error.'. Line: '.__LINE__);
            unlink($path);
            rename($path_for_rename, $path);
            $this->page = file_get_contents($path);
            return;
        }
    }

    public function textReplaces() {
        if(file_exists('replacements_standart.txt')) {
            $_t = explode("\n", file_get_contents('replacements_standart.txt'));
            $replaces = array();

            $separator = isset($this->config['replacements_standart_separator']) ? $this->config['replacements_standart_separator'] : ';';

            foreach($_t as $key => $value) {
                $_tt = explode($separator, $value);
				if(!isset($_tt[1]) or (isset($_tt[1]) and empty($_tt[1])))
					$_tt[1] = ' ';
                $replaces[$_tt[0]] = $_tt[1];
            }

            $this->page = str_ireplace(array_keys($replaces), array_values($replaces), $this->page);
        }
		
        if(file_exists('replacements_regular.txt')) {
            $_t = explode("\n", file_get_contents('replacements_regular.txt'));
            $replaces = array();

            $separator = isset($this->config['replacements_regular_separator']) ? $this->config['replacements_regular_separator'] : ';';

            foreach($_t as $key => $value) {
                $_tt = explode($separator, $value);

                if(!isset($_tt[1]) or (isset($_tt[1]) and empty($_tt[1])))
                    $_tt[1] = ' ';

                $_tt[0] = trim($_tt[0]);
                $_tt[1] = trim($_tt[1]);
                if($_tt[0] == '')
                    continue;

                $replaces[$_tt[0]] = $_tt[1];
            }

            $this->page = preg_replace(array_keys($replaces), array_values($replaces), $this->page);
        }

        return $this;
    }


    public function urlReplaces($page = null) {
        if($page === null)
            $page = $this->page;

		$matches = array();
		
        preg_match_all('#[\'\"]+(https?://([^\'\"]+))[\'\"]+#', $page, $matches[0]);
        preg_match_all('#[\(]+(https?://([^\'\"]+))[\)]+#', $page, $matches[1]);
        preg_match_all('#href="?\'?([^"\']+)\'?"?#', $page, $matches[2]);
        preg_match_all('#src="?\'?([^"\']+)\'?"?#', $page, $matches[3]);

        $matches = array_merge($matches[0][2], $matches[1][2], $matches[2][1], $matches[3][1]);

        foreach($matches as $key => $value) {
            $value = str_replace(array('http://', 'https://'), '', $value);

            if(substr($value, 0, 2) == '//')
                $value = 'http://'.substr($value, 2);

            if(!preg_match("#{$this->config['murl']}#", $value)) {
                unset($matches[$key]);
                continue;
            }

            if($pos = strpos($value, '/'))
                if(!preg_match("#\.{$this->config['murl']}#", substr($value, 0, $pos))) {
                    unset($matches[$key]);
                    continue;
                }

            if($pos = strpos($value, '/'))
                $value = substr($value, 0, $pos);

            $original = $value;

            $subdomains = explode('.', $value);
            if(count($subdomains) > count(explode('.', $this->config['murl'])))
                $value = $_SERVER['HTTP_HOST'].'/s__'.$subdomains[0];
            else {
                unset($matches[$key]);
                continue;
            }

            unset($matches[$key]);
            $matches[$original] = $value;
        }

        $matches = array_unique($matches);
        $this->replaces['subdomains'] = $matches;

        return $this;
    }

    public function replaceHrefs() {
        $this->page = str_replace(array_keys($this->replaces['subdomains']), array_values($this->replaces['subdomains']), $this->page);
        $this->page = preg_replace("#https?://{$this->config['murl']}#", "http://{$_SERVER['HTTP_HOST']}", $this->page);
        foreach($this->replaces['subdomains'] as $key => $value)
        {
            $key = str_replace('\\', '', $key);
            $this->page = preg_replace("#https?://{$key}#", "http://{$_SERVER['HTTP_HOST']}", $this->page);
        }
		
        return $this;
    }

    public function printPage() {
		if(preg_match('#<\?!!php(.*)!!\?>#Uis', $this->page, $matches)) {
			$this->page = str_replace(array('<?!!php', '!!?>'), array('<?php', '?>'), $this->page);
			$name = 'temp'.md5(microtime()).'.php';
			file_put_contents($name, $this->page);
			include($name);
			unlink($name);
		}
		else
			echo $this->page;
    }

    public function setHeaders() {
		$content_type = !empty($this->query) ? $this->contentType($this->clear_url) : 'text/html';
		header("Content-Type: {$content_type}; charset={$this->config['charset']}");

        return $this;
    }

    private function contentType($filename) {
        $mime_types = array(
            'txt' => 'text/plain',
            'htm' => 'text/html',
            'html' => 'text/html',
            'xhtml' => 'text/html',
            'php' => 'text/html',
            'css' => 'text/css',
            'js' => 'application/javascript',
            'json' => 'application/json',
            'xml' => 'application/xml',
            'swf' => 'application/x-shockwave-flash',
            'flv' => 'video/x-flv',

            'png' => 'image/png',
            'jpe' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'jpg' => 'image/jpeg',
            'gif' => 'image/gif',
            'bmp' => 'image/bmp',
            'ico' => 'image/vnd.microsoft.icon',
            'tiff' => 'image/tiff',
            'tif' => 'image/tiff',
            'svg' => 'image/svg+xml',
            'svgz' => 'image/svg+xml',

            'zip' => 'application/zip',
            'rar' => 'application/x-rar-compressed',
            'exe' => 'application/x-msdownload',
            'msi' => 'application/x-msdownload',
            'cab' => 'application/vnd.ms-cab-compressed',

            'mp3' => 'audio/mpeg',
            'qt' => 'video/quicktime',
            'mov' => 'video/quicktime',

            'pdf' => 'application/pdf',
            'psd' => 'image/vnd.adobe.photoshop',
            'ai' => 'application/postscript',
            'eps' => 'application/postscript',
            'ps' => 'application/postscript',

            'doc' => 'application/msword',
            'rtf' => 'application/rtf',
            'xls' => 'application/vnd.ms-excel',
            'ppt' => 'application/vnd.ms-powerpoint',

            'odt' => 'application/vnd.oasis.opendocument.text',
            'ods' => 'application/vnd.oasis.opendocument.spreadsheet'
        );

        $tmp = explode('.', $filename);
        $ext = strtolower(array_pop($tmp));

        return array_key_exists($ext, $mime_types) ? $mime_types[$ext] : 'text/html';
    }

    public static function getCharset($url) {
        $http = new http;
        $page = $http->get($url);
        if($http->info['http_code'] == 200) {
            if(!empty($http->info['content_type'])) {
                preg_match('#charset=(.+)#', $http->info['content_type'], $match);
                if(isset($match[1]))
                    $charset = $match[1];
            }
            if(!isset($charset)) {
                preg_match('#charset=(.+)["\']#', $page, $match);
                if(isset($match[1]))
                    $charset = $match[1];
            }

			$return = isset($charset) ? $charset : '???? ?????????????? ???????????????????? ??????????????????';
        }
        else
            $return = '???? ?????????????? ?????????????????????? ?? '.$url;

        return $return;
    }

    public static function removeDir($dir, $deletehandlers = true) {
		if(file_exists($dir)) {
			chmod($dir, 0777);
			if(is_dir($dir)) {
				$handle = opendir($dir);
				while($filename = readdir($handle))
					if($filename != '.' and $filename != '..')
						sc::removeDir($dir.'/'.$filename);

				closedir($handle);
				@rmdir($dir);
			}
			else
				if($deletehandlers and !preg_match('#schandler_#', $dir))
					unlink($dir);
		}
    }

    public static function ajaxPrint($val) { echo $val; }

    public static function getPassword() { return file_exists('password.cfg') ? file_get_contents('password.cfg') : false; }

    private function getProxy() {
        $list = explode("\n", file_get_contents('proxy.txt'));
        return trim($list[array_rand($list)]);
    }
	
	public static function standartUrl($url) {
		$url = str_replace(array('www.', 'http://', 'https://'), '', $url);
		if(substr($url, -1) != '/')
			$url = $url.'/';
			
		$url = 'http://'.$url;
		return $url;
	}
}
?>