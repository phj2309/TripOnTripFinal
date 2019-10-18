const mapper = require('../../DB/mapperController.js');

var request = require('request');
var cheerio = require('cheerio');

exports.toPlan = async function(req, res)
{
    res.render("plan.html");
}
exports.insertPlan = async function(req, res)
{
    var userId = req.params.userId;
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
    
    mapper.plan.createPlan(userId, title, startDate, finishDate, country).then(function(result) {
        console.log(result.insertId);
        var planId = result.insertId;
        req.session.planId = planId;

        for(i=0; i<req.body.mate.length; i++) {
            var nickname = req.body.mate[i];

            mapper.plan.insertGroup(planId, nickname).then(function(result) {
                console.log("insertGroup success");
               //console.log("성공");
            }).catch(function(error) {
                console.log(error);
                
            });
            //console.log(nickname);
        }
        mapper.user.getNickname(userId).then(function(result) {
            var nickname = result[0].nickname;
            mapper.plan.insertGroup(planId, nickname).then(function(result) {
                console.log("insertGroup success");
               //console.log("성공");
            }).catch(function(error) {
                console.log(error);
                
            });
           //console.log("성공");
        }).catch(function(error) {
            console.log(error);
            
        });
        console.log("createPlan success");
        req.session.title = title;
        req.session.day = btDay;
        var fdayValue = 'day1';
        res.render("detailPlanShow.html", { day : btDay, planId : planId, title: title, fdayValue: fdayValue});
    }).catch(function(error) {
        console.log(error);
    });

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
    var address = req.body.addressValue;
    var keyword = req.body.address;
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
        mapper.map.insertPlace(days_detail_id, address, keyword, latitude, longitude).then(function(result) {
            console.log("insertPlace success");
            mapper.plan.detailPlanList(planId).then(function(result) {
                console.log("detailPlanList 호출");
                var detailList = [];
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
                res.render("detailPlanShow.html", {planId: planId, title: title, day: day, detailList: detailList, fdayValue: days});
             }).catch(function(error) {
                 console.log(error);
             });
         }).catch(function(error) {
             console.log(error);
         });
        
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
    
    mapper.plan.insertReview(dayValue, comment).then(function(result) {
        mapper.plan.detailPlanList(planId, dayValue).then(function(result) {
            console.log("detailPlanList 호출");
            var detailList = new Array();
            for(var i=0; i<result.length; i++) {
                detailList[i] = result[i].content;
            }
            res.render("detailPlanShow.html", {planId: planId, title: title, day: day, detailList: detailList, fdayValue: dayValue, review: comment });
         }).catch(function(error) {
             console.log(error);
         });
     }).catch(function(error) {
         console.log(error);
         
     });
},
exports.cost_test = async function (req, res) {
    var planId = req.params.planId;
    
    mapper.plan.groupCount(planId).then(function(result) {
        var count = result[0].count;
        console.log("group count : "+count);
        res.render("costPage.html", {count : count});
     }).catch(function(error) {
         console.log(error);
         
     });
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

    mapper.plan.cost(item, cost).then(function (result) {
        console.log(result.insertItem);

        for (i = 0; i < req.body.cost.length; i++) {

                item = req.body.item[i];
                cost = req.body.cost[i];

                console.log("성공");
        }
       // res.render("costPage.html", { item: item, cost: cost });
    }).catch(function (error) {
        console.log(error);
    });

    var planId = req.params.planId;

    mapper.plan.groupCount(planId).then(function(result) {
        var count = result[0].count;
        console.log("group count : "+count);
        res.render("costPage.html", {count : count, item: item, cost: cost});
     }).catch(function(error) {
         console.log(error);
         
     });

}