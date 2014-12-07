var SERVER_URL = 'https://richreview.net/';
//SERVER_URL = 'https://localhost:8000/';

function HandleError(error){
    console.log('fail', error);
    $('#div_error').load('error.html');
}

function GetRawData(){
    try{
        var url = SERVER_URL+'dataviewer?op=getRawData';
        var posting = $.post(url, '');
        posting.success(function(result){
            console.log('success: ', result);
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
    GetRawData()
}

Run();