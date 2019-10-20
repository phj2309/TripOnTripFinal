const mapper = require('../../DB/mapperController.js');

var request = require('request');
var cheerio = require('cheerio');

exports.toPlan = async function(req, res)
{
    //로그인 되어있을 때만 plan페이지 접근 가능
    if(req.session.userId){
        res.render("plan.html");
    }else { 
        res.redirect('/user/login');
    }
}
exports.insertPlan = async function(req, res)
{
    var userId = req.session.userId; //현재 로그인 유저
    var title = req.body.title;
    var country = req.body.country;
   //var startDate = req.body.startDate;
    //var finishDate = req.body.finishDate;
    var sYear = req.body.sYear;
    var sMonth = req.body.sMonth;
    var sDay = req.body.sDay;
    var fYear = req.body.fYear;
    var fMonth = req.body.fMonth;
    var fDay = req.body.fDay;

    var startDate = new Date(sYear, sMonth-1, sDay);
    var finishDate = new Date(fYear, fMonth-1, fDay);

    var btMs = finishDate.getTime() - startDate.getTime();
    var btDay = btMs/(1000*60*60*24) + 1;
  //  console.log(userId, title, country, sYear, sMonth, sDay, fYear, fMonth, fDay);
   // console.log(btDay);
    //console.log(finishDate-startDate);
    //res.render("detailPlanShow.html");
    var i=0;
    var s = 'p';
    //원본수정 from 수빈    
    var loginedUserNick;
    var planId;
    mapper.admin.getUserInfoById(userId).then(function (result) {
        var userAI = result[0].user_id; //로그인 user의 auto increament id 값
        loginedUserNick = result[0].nickname; //로그인 user의 nickname 값
        
        return mapper.plan.createPlan(userAI, title, startDate, finishDate, country);
    }).then(async function (result) {
        console.log(result.insertId);
        planId = result.insertId;
        req.session.planId = planId;

        for (i = 0; i < req.body.mate.length; i++) {
            var nickname = req.body.mate[i];
            console.log("현재 닉" + nickname);

            //입력된 mate들(nickname값)이 user테이블에 있는 값인지 확인.
            let hasNickResult = await mapper.admin.hasNickname(nickname);
            if (hasNickResult == true) {
                mapper.plan.insertGroup(planId, nickname);
            }
        } //for문 끝


        return mapper.plan.insertGroup(planId, loginedUserNick);
    }).then(function(result) {
        console.log("createPlan success");
        req.session.title = title;
        req.session.day = btDay;
        var fdayValue = 'day1';

        res.render("detailPlanShow.html", { day: btDay, planId: planId, title: title, fdayValue: fdayValue });
    }).catch(function (error) {
        console.log(error);
    });




    //원본
    // mapper.plan.createPlan(userId, title, startDate, finishDate, country).then(function(result) {
    //     console.log(result.insertId);
    //     var planId = result.insertId;
    //     req.session.planId = planId;

    //     for(i=0; i<req.body.mate.length; i++) {
    //         var nickname = req.body.mate[i];

    //         mapper.plan.insertGroup(planId, nickname).then(function(result) {
    //             console.log("insertGroup success");
    //            //console.log("성공");
    //         }).catch(function(error) {
    //             console.log(error);
                
    //         });
    //         //console.log(nickname);
    //     }
    //     mapper.user.getNickname(userId).then(function(result) {
    //         var nickname = result[0].nickname;
    //         mapper.plan.insertGroup(planId, nickname).then(function(result) {
    //             console.log("insertGroup success");
    //            //console.log("성공");
    //         }).catch(function(error) {
    //             console.log(error);
                
    //         });
    //        //console.log("성공");
    //     }).catch(function(error) {
    //         console.log(error);
            
    //     });
    //     console.log("createPlan success");
    //     req.session.title = title;
    //     req.session.day = btDay;
    //     var fdayValue = 'day1';
    //     res.render("detailPlanShow.html", { day : btDay, planId : planId, title: title, fdayValue: fdayValue});
    // }).catch(function(error) {
    //     console.log(error);
    // });

}

exports.showToCreate = async function(req, res)
{
    var planId = req.session.planId;
    var dayValue = req.params.dayValue;
    req.session.dayValue = dayValue;
    var sdayValue = req.session.dayValue;
    var lat, lon, addressValue, keyword, content, sHour, sMin, fHour, fMin = "";
    console.log("show to create. planId : "+planId);
    console.log("days : "+sdayValue);
    res.render("detailPlanCreate.html", { planId : planId, dayValue: sdayValue, lat: lat, lon: lon, addressValue: addressValue, keyword: keyword,
    content: content, sHour: sHour, sMin: sMin, fHour: fHour, fMin:fMin});
}

exports.mapSubmit = async function(req, res)
{
    var lat = req.body.lat;
    var lon = req.body.lon;
    var addressValue = req.body.addressValue;
    var keyword = req.body.address;
    var content = req.session.content;
    var sHour = req.session.sHour;
    var sMin = req.session.sMin;
    var fHour = req.session.fHour;
    var fMin = req.session.fMin;
    console.log("테스트 : "+req.session.dayValue);
    console.log("위도 : "+lat);
    var planId = req.session.planId;
    var dayValue = req.session.dayValue;
   // console.log("show to create. planId : "+planId);
   // console.log("days : "+dayValue);
    res.render("detailPlanCreate.html", { planId : planId, dayValue: dayValue, lat: lat, lon: lon, addressValue: addressValue, keyword: keyword,
    content: content, sHour: sHour, sMin: sMin, fHour: fHour, fMin:fMin});
}

exports.insertDetailPlan = async function(req, res)
{
    var latitude = req.body.lat;
    var longitude = req.body.lon;
    var addressValue = req.body.addressValue;
    var keyword = req.body.place;
    console.log('keyword: '+keyword);
    var planId = req.session.planId;
    var content = req.body.content;
    var sHour = req.body.sHour;
    var sMin = req.body.sMin;
    var fHour = req.body.fHour;
    var fMin = req.body.fMin;
    var days = req.session.dayValue;
    var startTime = new Date();
    startTime.setHours(sHour, sMin);
    var finishTime = new Date();
    finishTime.setHours(fHour, fMin);
    console.log("insertDetailPlan");
    console.log("planId : "+planId);

    var title = req.session.title;
    var day = req.session.day;

    //console.log("startTime : "+startTime);
   // console.log("finishTime : "+finishTime);

    mapper.plan.createDetailPlan(planId, days, content, startTime, finishTime).then(function(result) {
        console.log("createDetailPlan success");
        var days_detail_id = result.insertId;
        return mapper.map.insertPlace(days_detail_id, addressValue, keyword, latitude, longitude);
    }).then(function(result) {
        console.log("insertPlace success");
        return mapper.plan.detailPlanList(planId);
    }).then(async function(result) {
        console.log("detailPlanList 호출");
        var detailList = [];
        var reviewList = [];
        let reviewListResult = await mapper.plan.getReviewList(planId);
        for(var i=0; i<result.length; i++) {
            var dayday = result[i].days;
            dayday = dayday.substring(3, 4);
            console.log(dayday);
            var st = result[i].startTime;
            st = st.substring(0, 5);
            var ft = result[i].finishTime;
            ft = ft.substring(0, 5);
            detailList.push({days: dayday, content: result[i].content, startTime: st, finishTime: ft})
            console.log('detailList: '+detailList);
        }
        if (reviewListResult) {
            for (var j = 0; j < reviewListResult.length; j++) {
                var d = reviewListResult[j].days;
                d = d.substring(3, 4);
                reviewList.push({ days: d, review: reviewListResult[j].comment })
            }
            res.render("detailPlanShow.html", {planId: planId, title: title, day: day, detailList: detailList,fdayValue: days, reviewList: reviewList});
        } else
            res.render("detailPlanShow.html", {planId: planId, title: title, day: day, detailList: detailList,fdayValue: days});
        
     }).catch(function(error) {
         console.log(error);
         
     });
    
},
exports.insertReview = async function (req, res) {
    var dayValue = req.session.dayValue;
    var comment = req.body.review;

    var title = req.session.title;
    var day = req.session.day;
    var planId = req.session.planId;
    
    mapper.plan.insertReview(dayValue, comment, planId).then(function(result) {
        return mapper.plan.detailPlanList(planId);
    }).then(async function(result){
        console.log("detailPlanList 호출");
        var detailList = [];
        var reviewList = [];
        let reviewListResult = await mapper.plan.getReviewList(planId);
        for(var i=0; i<result.length; i++) {
            var dayday = result[i].days;
            dayday = dayday.substring(3, 4);
            console.log(dayday);
            var st = result[i].startTime;
            st = st.substring(0, 5);
            var ft = result[i].finishTime;
            ft = ft.substring(0, 5);
    
           detailList.push({days: dayday, content: result[i].content, startTime: st, finishTime: ft})
        }
        if (reviewListResult) {
            for (var j = 0; j < reviewListResult.length; j++) {
                var d = reviewListResult[j].days;
                d = d.substring(3, 4);
                reviewList.push({ days: d, review: reviewListResult[j].comment })
            }
            res.render("detailPlanShow.html", {planId: planId, title: title, day: day, detailList: detailList,fdayValue: 'day1', reviewList: reviewList});
        } else
            res.render("detailPlanShow.html", {planId: planId, title: title, day: day, detailList: detailList,fdayValue: 'day1'});
    }).catch(function(error) {
        console.log(error);
        
    });
        // mapper.plan.detailPlanList(planId, dayValue).then(function(result) {
        //     console.log("detailPlanList 호출");
        //     var detailList = new Array();
        //     for(var i=0; i<result.length; i++) {
        //         detailList[i] = result[i].content;
        //     }
        //     res.render("detailPlanShow.html", {planId: planId, title: title, day: day, detailList: detailList, fdayValue: dayValue, review: comment });
        //  }).catch(function(error) {
        //      console.log(error);
        //  });
     
},


exports.cost = async function (req, res) {

    var item = req.body.item;
    var cost = req.body.cost;
    var country = req.body.country;

    request({
        url: 'https://okbfex.kbstar.com/quics?chgCompId=b028286&baseCompId=b028286&page=C015690&cc=b028286:b028286',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'
        }
    }, function (err, res, html) {
        if (err) {
            console.log(err);
            return;
        }
        var $ = cheerio.load(html);
        var liList = $('#AllDsp1').children('tr').children('td');

        for (var i = 0; i < liList.length; i = i + 11) {
            var split = $(liList[i]).text().trim();
            var split2 = $(liList[i + 1]).text().trim();
            console.log(split);
            console.log(split2);
        }
    });


    var planId = req.params.planId;
    var dayValue = req.params.dayValue;
    var count = 0;
    mapper.plan.groupCount(planId).then(function(result) {
        count = result[0].count;
        console.log("group count : "+count);
        return mapper.plan.findNicknameByPlanId(planId);
     }).then(function(result){
        var nameList = new Array();  //planid가 같은 유저들의 nickname배열 정의
        
        for(var i=0; i < result.length; i++){
            nameList[i] = result[i].nickname;
            console.log("현재 nickList : "+nameList);
        }
        // res.render("costPage.html", {count : count, item: item, cost: cost});
        res.render("costPage.html", {count : count, item: item, cost: cost, nameList: nameList, planId: planId, dayValue: dayValue});
        
    }).catch(function(error) {
         console.log(error);
         
     });




    //원본
    // mapper.plan.groupCount(planId).then(function(result) {
    //     var count = result[0].count;
    //     console.log("group count : "+count);
    //     res.render("costPage.html", {count : count, item: item, cost: cost});
        //  }).catch(function(error) {
        //      console.log(error);

        //  });

    },
    exports.costAdd = async function (req, res) {
        //costPage에서 save눌렸을 때 .
        var nameList = req.body.nameList.split(',');
        var count = req.body.count; //mate들의 수

        var planId = req.params.planId;
        var detailDaysId = req.params.dayValue;
        var p_cost = new Array();
        var items = req.body.realItem;
        var costs = req.body.realCost;

        console.log(nameList, count, planId, detailDaysId, items, costs);

        if (count == 1) {
            //개인여행의 경우 모든 지출 비용은 누적됨.
            for (i = 0; i < req.body.costs.length; i++) {
                var item = items[i];
                var cost = costs[i];
                console.log("현재 item, cost: " + item, cost);
                mapper.plan.cost(item, nameList[0], cost, detailDaysId).then(function (result) {
                    console.log(result.insertItem);

                    for (i = 0; i < req.body.cost.length; i++) {

                        item = req.body.item[i];
                        cost = req.body.cost[i];

                        console.log("item, cost insert successfuly");
                    }
                    //    res.render("detailPlanShow.html", {  });

                }).catch(function (error) {
                    console.log(error);
                });
                //입력된 mate들(nickname값)이 user테이블에 있는 값인지 확인.
                let hasNickResult = await mapper.admin.hasNickname(nickname);
                if (hasNickResult == true) {
                    mapper.plan.insertGroup(planId, nickname);
                }
            } //for문 끝










    }else {
        //여행 인원이 2명 이상일 때 공금과 개인지출 나눠서 저장
    }
    // for(var i=0; i<count.length; i++){
    //     var v = 'checkbox'+count;
    //     if(req.body.name == 'realItem'){
    //         items[i] = 
    //     }
        
    // }
    res.redirect('/plan/detailPlanShow')
    // mapper.plan.cost(item, p_cost, cost, detailDaysId).then(function (result) {
    //     console.log(result.insertItem);

    //     for (i = 0; i < req.body.cost.length; i++) {

    //             item = req.body.item[i];
    //             cost = req.body.cost[i];

    //             console.log("item, cost insert successfuly");
    //     }
    // //    res.render("detailPlanShow.html", {  });
        
    // }).catch(function (error) {
    //     console.log(error);
    // });
}
