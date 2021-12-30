//vischenko
$(document).ready(function() {
    var attachmentText = "";
    var filesRemoved = [];
    var filesNameRemoved = [];
    var userName = "";
    var userNameReady = false;
    var FilesRemoveReady = false;
    var downloadStatus = true;
    var timeInterval = 1000;
    var DownloadSupported = AttrDownloadSupported();
    var AnnotationTextareaIds = [];
    var startHref = "!. . . .!";
    var finishHref = "!-. . . .!";
    var latin = ". . . . . . . . . . . . . . . . .";
    var readOnly = false;
	var formname = $('.dijitTreeRowSelected').find($('.dijitTreeLabel') ).text();
    
	function listener(event) {
		if (event.data.indexOf("setImmediate") !== 0) {
			attachmentText = event.data; 
		}
	} 

	if (window.addEventListener) {
		window.addEventListener("message", listener);
	} else {
		window.attachEvent("onmessage", listener);
	}

    function getIframe(serverName, formname){
        return '<iframe src="/tm1web/upload/iframe.html?serverName='+serverName+'&ver=300&formname='+formname+'" style="border: 0; height: 130px; margin-bottom: 24px; width:100%;"></iframe>';
    }

    startActions(timeInterval);

    function startActions(timeInterval){
        setInterval(function(){
          // getFilesRemove();
            ActionsBrowseComments();
            bindAnnotationActions();
            ActionsAddComment();
            getUserName();
        }, timeInterval);

        setInterval(function(){
            checkReadOnly();
        }, 300);
    }

    function checkReadOnly(){
        var count = 0;
        $(".tm1webCell_selected_and_readonly").each(function( i ) {
            if ($(this).is(':visible') ){
                count++;
                readOnly = true;
            }
        });
        if (count === 0) {
            readOnly = false;
        }
    }

    function getFilesRemove(){
        if (!FilesRemoveReady){
            if (serverName != "" && userName != ""){
               // FilesRemoveReady = true;
			   	var formname = $('.dijitTreeRowSelected').find($('.dijitTreeLabel') ).text();
			//   console.log(formname);
                var fileName = '/logs/remove.txt';

                $.ajax({
                    type: "POST",
                    async: false,
                    url: "/tm1web/upload/getfile.jsp",
                    data: {'fileName' : fileName, 'serverName' : serverName , 'formname' : formname },
                    success: function(r){
                        r = r.replace(/\r|\n/g, '');
                        filesRemoved = JSON.parse("["+r.slice(0,-1) +"]");
                        for (var i = 0; i < filesRemoved.length; ++i) {
                            if (!inArray(filesRemoved[i].name, filesNameRemoved)){
                                filesNameRemoved.push(filesRemoved[i].name);
                            }
                        }
						//console.log(filesRemoved);
						//console.log(filesNameRemoved);
                    }
                });
            }
        }
    }

    function getRemovedFile(fileName){
        for (var i = 0; i < filesRemoved.length; ++i) {
            if (fileName == filesRemoved[i].name){
                return filesRemoved[i];
            }
        }
    }

    function inArray(needle, haystack) {
        var length = haystack.length;
        for(var i = 0; i < length; i++) {
            if(haystack[i] == needle) return true;
        }
        return false;
    }

    function getUserName(){
        if (!userNameReady && $('#ibm-banner-welcome').is(':visible')){
            var name = $('#ibm-banner-welcome').text();
            if (name != ""){
                userName = name;
                userNameReady = true;
            }
        }
    }

    function EventClickOK(textareaId){
        var id = $('.tm1WebBtnPrimary').children('span').children('span').attr('id');
        var elemButton = '#'+id;
        var AnnotationDialogId = '#'+textareaId;
        $(elemButton).on('click', function(){
            if (attachmentText == "uploading"){
                return false;
            }
            var AnnotationDialogText = $(AnnotationDialogId).val();
            if ($(AnnotationDialogId).val() != "") {
                AnnotationDialogText = AnnotationDialogText + attachmentText;
			//	console.log(attachmentText);
				
                require([
                    'dojo',
                    'dijit'
                ], function (dojo, dijit) {
                    dijit.byId(textareaId).setValue(AnnotationDialogText);
					//console.log(AnnotationDialogText);
                });
            }
        });
    }


    function ActionsAddComment(){
        if($('.tm1webAddAnnotationDialog').is(':visible')){
			        
            var textreaId = $('.tm1webAddAnnotationDialog').find('textarea').attr('id');
			var formname = $('.dijitTreeRowSelected').find($('.dijitTreeLabel') ).text();

            if (!inArray(textreaId, AnnotationTextareaIds)){
                attachmentText = "";
                AnnotationTextareaIds[AnnotationTextareaIds.length] = textreaId;
                $('.tm1webAddAnnotationDialog').find('textarea').after(getIframe(serverName, formname));
                EventClickOK(textreaId);

            }
        }
    }

    function fileRemove(el){
        if (confirm("Вы подтверждаете удаление?")) {
            var fileName = el.attr('data-href');
			var formname = $('.dijitTreeRowSelected').find($('.dijitTreeLabel') ).text();
            $.ajax({
                type: "POST",
                url: "/tm1web/upload/remove.jsp",
                data: {'fileName' : fileName, 'serverName' : serverName, 'user' : userName ,'formname' : formname},
                success: function(r){
                    fileRemoveMessage(fileName, false, false);
                    FilesRemoveReady = false; // update list remove files
                    alert('Файл удален!');
                }
            });
        }
        return false;
    }

    function getFormattedDate() {
        var date = new Date();

        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();

        month = (month < 10 ? "0" : "") + month;
        day = (day < 10 ? "0" : "") + day;
        hour = (hour < 10 ? "0" : "") + hour;
        min = (min < 10 ? "0" : "") + min;
        sec = (sec < 10 ? "0" : "") + sec;

        var str = date.getFullYear() + "." + month + "." + day + "-" +  hour + "." + min + "." + sec;

        return str;
    }

    function fileRemoveMessage(fileName, user, datetime){
        if (user === false){
            user = userName;
        }
        if (datetime === false){
            datetime = getFormattedDate();
        }
        $('[data-filename-log="'+fileName+'"]').html('<br><span style="cursor:pointer; border-bottom:1px dashed gray;" title="Файл &quot;'+fileName+'&quot; удален пользователем '+user+' в ' + datetime + '">Файл удален</span> - ');
    }

    function fileDownload(el){
        if (downloadStatus){
            downloadStatus = false;
            var fileName = el.attr('data-filename');
            $.ajax({
                type: "POST",
                async: false,
                url: "/tm1web/upload/download.jsp",
                data: {'fileName' : fileName, 'serverName' : serverName, 'formname' : formname},
                success: function(){
                    downloadStatus = true;
                }
            });
        }
    }

    function AttrDownloadSupported(){
        var a = document.createElement('a');
        if(typeof a.download != "undefined") {
            return true;
        } else {
            return false;
        }
    }

    function getDownloadMethod(fileName, serverName,formname){
		//return '<a href="/tm1web/upload/app/getfile.jsp?fileName='+ fileName +'&serverName='+serverName+'" target="_blank">Скачать</a>';
		return '<a href="/tm1web/upload/getfile.jsp?fileName='+ encodeURIComponent(fileName) +'&serverName='+encodeURIComponent(serverName)+'&formname='+encodeURIComponent(formname)+'" target="_blank">Скачать</a>';
		
		
     //   if (!DownloadSupported) { // загрузка из сервера
      //      return '<a href="/tm1web/upload/app/getfile.jsp?fileName='+fileName+'&serverName='+serverName+'" target="_blank">Скачать</a>';
       // } else { // загрузка с веб-сервера
       //     return '<a class="fileDownload" data-filename="'+fileName+'" href="/tm1web/upload/repository/'+serverName+'/'+fileName+'" download target="_blank">Скачать</a>';
       // }
    }

    function searchFilesInAnnotation(index, text){
        var i = 0;
        var e = 0;
        var replaceArr = {};
        var replaceText = "";
        do {
            var x = text.indexOf(startHref, i);
            if (x != -1) {
                var f = text.indexOf(finishHref, e);
                var fileName = text.substring(x + startHref.length, f);
				var formname = $('.dijitTreeRowSelected').find($('.dijitTreeLabel') ).text();
                replaceText = '<span data-filename-log="'+fileName+'">' + '<br>' + getDownloadMethod(fileName, serverName, formname);
                if (!readOnly) {replaceText += ' (<a href="javascript:;" style="color:red;" class="ActionsBrowseCommentsFileRemove" data-href="' + fileName + '" >&#215; Удалить</a>)';}
                replaceText += '</span>';
                replaceArr[fileName] = replaceText;
                i = x + 1;
                e = f + 1;
            }
        } while (x != -1);
        return replaceArr;
    }

    function getNewAnnotationText(text, replaceArr){
        for (var name in replaceArr) {
            text = text.replace(startHref + name + finishHref, replaceArr[name]);
        }
        text = text.replace("Attachments:", "");
        text = text.replace(latin, "");
        return text;
    }

    function updateDOMRemovedFiles(replaceArr){
        for (var name_file in replaceArr) {
			//console.log(name_file);
			//console.log(filesNameRemoved);
            if (inArray(name_file, filesNameRemoved)){
                var file = getRemovedFile(name_file);
                fileRemoveMessage(file.name, file.user, file.datetime);
				//console.log(file);
            }
			//console.log(replaceArr);
			//console.log(name_file);
        }
    }

    function bindAnnotationActions(){
        $('.ActionsBrowseCommentsFileRemove').unbind( "click" );
        $('.ActionsBrowseCommentsFileRemove').on('click', function () {fileRemove($(this));});
       // $('.fileDownload').unbind( "click" );
       // $('.fileDownload').on('click', function () {fileDownload($(this));});
    }

    function ActionsBrowseComments(){
        $(".dojoxGridCell").each(function (index, element) {
			getFilesRemove();
            var text = $(element).html();
            var pos = text.indexOf(latin);
            if (-1 < pos ) { // это ячейка с комментарием и вложенными файлами
                var replaceArr = searchFilesInAnnotation(index, text);
                text = getNewAnnotationText(text, replaceArr);
                $(element).html(text);
                updateDOMRemovedFiles(replaceArr);
			//	console.log("open comments");
				//console.log(pos);
				// console.log(index);
			//	console.log(latin);
				
            }
        });
    }
});