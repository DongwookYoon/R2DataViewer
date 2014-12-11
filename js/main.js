var SERVER_URL = 'https://richreview.net/';
//SERVER_URL = 'https://localhost:8000/';

function HandleError(error){
    console.log('fail', error);
    $('#div_error').load('error.html');
}

var docids = [];
var n_total = 0;
var n_actions = [];
var n_playAudio = [];
var n_playAudioWf = [];
var n_playAudioPen = [];
var n_playAudioSplt = [];
var n_playAudioSpace = [];
var n_playAudioMenu = [];
var n_playAudioBtn = [];
var n_playAudioAuto = [];
var n_Nav = [];
var n_NavDrag = [];
var n_NavWheel = [];
var n_NavZoom = [];
var n_NavPage = [];

function Analysis_Cnt(data_str) {
    var data = JSON.parse(data_str);

    // n total
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            docids.push(key);
            ++n_total;
        }
    }

    // n actions
    for (var i = 0; i < docids.length; ++i) {
        n_actions.push(data[docids[i]].length);
    }

    // n_playAudio
    for (var i = 0; i < docids.length; ++i) {
        var pdata = data[docids[i]];
        var cnt = 0;
        var cnt_Wf = 0;
        var cnt_Pen = 0;
        var cnt_Splt = 0;
        var cnt_Space = 0;
        var cnt_Menu = 0;
        var cnt_Btn = 0;
        var cnt_Auto = 0;

        for (var j = 0; j < pdata.length; ++j) {
            var action = JSON.parse(pdata[j].LOGSTR);
            if (action.op == 'AudioPlay') {
                cnt++;
                switch (action.type) {
                    case 'waveform':
                        cnt_Wf++;
                        break;
                    case 'strokepen':
                        cnt_Pen++;
                        break;
                    case 'spotlight':
                        cnt_Splt++;
                        break;
                    case 'space':
                        cnt_Space++;
                        break;
                    case 'click_play':
                        cnt_Menu++;
                        break;
                    case 'radialmenu0':
                        cnt_Btn++;
                        break;
                    case 'radialmenu1':
                        cnt_Btn++;
                        break;
                    case 'auto':
                        cnt_Auto++;
                        break;
                    default:
                        console.log(action.type);
                        break;
                }
            }

        }
        n_playAudio.push(cnt);
        n_playAudioWf.push(cnt_Wf);
        n_playAudioPen.push(cnt_Pen);
        n_playAudioSplt.push(cnt_Splt);
        n_playAudioSpace.push(cnt_Space);
        n_playAudioMenu.push(cnt_Menu);
        n_playAudioBtn.push(cnt_Btn);
        n_playAudioAuto.push(cnt_Auto);
    }


    // n_Nav
    for (var i = 0; i < docids.length; ++i) {
        var pdata = data[docids[i]];
        var cnt = 0;
        var cnt_Drag = 0;
        var cnt_Wheel = 0;
        var cnt_Zoom = 0;
        var cnt_Page = 0;
        for (var j = 0; j < pdata.length; ++j) {
            var action = JSON.parse(pdata[j].LOGSTR);
            if (action.op == 'Nav') {
                cnt++;
                switch (action.input) {
                    case 'mouse':
                        cnt_Drag++;
                        break;
                    case 'touch':
                        cnt_Drag++;
                        break;
                    case 'wheel':
                        cnt_Wheel++;
                        break;
                    case 'click_zoomin':
                        cnt_Zoom++;
                        break;
                    case 'click_zoomout':
                        cnt_Zoom++;
                        break;
                    case 'click_goto_page':
                        cnt_Page++;
                        break;
                    default:
                        console.log(action.input);
                        break;
                }
            }
        }
        n_Nav.push(cnt);
        n_NavDrag.push(cnt_Drag);
        n_NavWheel.push(cnt_Wheel);
        n_NavZoom.push(cnt_Zoom);
        n_NavPage.push(cnt_Page);
    }
}

function GetRawData(callback){
    try{
        var url = SERVER_URL+'dataviewer?op=getRawData';
        var posting = $.post(url, '');
        posting.success(function(result){
            callback(null, result);
        });
        posting.fail(function(error){
            HandleError(error);
        });
    }
    catch(error){
        HandleError(error);
    }
}




function Run(){
    GetRawData(function(error, result){
        Analysis_Cnt(result);
    });
}

Run();