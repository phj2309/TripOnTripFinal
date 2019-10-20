function addCost(i, count, c, nameList) {
    var tagList = '';
    var collapseExample = "collapseExample";
    var checkbox = "checkbox";
    // var user = "user";
    var nameList = nameList.split(',');
    //count는 plan을 수정할 수 있는 사람들의 수
        collapseExample += i;
        checkbox += i;
        tagList += '<div class="row">';
        tagList += '<div class="col-4">';
        tagList += '<div class="form-group"><label class="bmd-label-floating">항목</label><input type="text" name="realItem" class="form-control"></div>';
        tagList += '</div>';
        tagList += '<div class="col-4">';
        tagList += '<div class="form-group"><label class="bmd-label-floating">비용</label><input type="text" name="realCost" class="form-control"></div>';
        tagList += '</div>';
        tagList += '<button type="button" class="btn btn-white btn-round btn-just-icon" data-toggle="collapse" data-target="#'+collapseExample+'" aria-expanded="false" aria-controls="'+collapseExample+'">';
        tagList += '<i class="material-icons">'+"person_outline"+'</i></button>';
        tagList += '<div class="collapse" id="'+collapseExample+'" aria-expanded="true" style>';
        tagList += '<div class="cdiv"><ul class="ks-cboxtags">';
        for(var j=0; j<count; j++) {
            tagList += '<li><input type="checkbox" id="'+checkbox+c+'" value="Rainbow Dash" checked><label for="'+checkbox+c+'">'+nameList[j]+'</label></li>';
            c++;
        }
        tagList += '</ul></div></div></div></div>';

        $('#costInputArea').append(tagList);
    
}