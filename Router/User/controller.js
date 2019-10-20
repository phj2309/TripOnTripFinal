const mapper = require('../../DB/mapperController.js');
var util = require('util');

exports.t = async function (req, res) {
    if (!req.session.userId) {
        res.render("login2.html"); //세션에 없으면 login.html 렌더링
    } else {
        res.redirect('/'); //세션에 저장되어 있는 유저라면 자동 로그인.
    }
}
exports.googleSign = async function(req, res){
    // res.render("index.html");
}
exports.findPassword = async function (req, res) {
    res.render("findPassword.html");
}
exports.login = async function (req, res) {
    var radioCheck = req.body.tab;
    console.log("_____________들어왐마" + radioCheck);

    //로그인
    if (radioCheck == 'signin') {
        var userId = req.body.signin_id;
        var userPw = req.body.signin_pw;

        mapper.admin.isUser(userId).then(function (result) {
            // console.log("do: "+result) 여기서 result는 true 출력함
            return mapper.admin.getUserInfoById(userId);
        }).then(function (result) {
            // console.log("result:::: "+result[0].nickname);
            // console.log("result:::: "+util.inspect(result));
            //db에서 가져온 유저정보와 입력값을 비교
            if (userId == result[0].id && userPw == result[0].password) {
                // userId 세션 생성 - 로그인 여부 확인
                req.session.userId = userId;
                req.session.save(() => {
                    res.redirect('/');
                   // res.render("index.html", { nickname: result[0].nickname });
                });

            } else {
                //로그인 실패
                res.redirect('/user/login');
            }
        }).catch(function (error) {
            console.log(error + "id에 대한 유저정보 못 받아옴.");

        });

    }

    //회원가입
    else if (radioCheck == 'signup') {
        var password1 = req.body.signup_pw;
        var password2 = req.body.signup_pw_repeat;
        var id = req.body.signup_id;
        var nickname = req.body.signup_nickname;
        var email = req.body.signup_email;

        //비밀번호 확인 필드가 일치하면
        if (password1 == password2) {
            //새로운 사용자 세션 생성
            // var user = {
            //     userId: id,
            //     userPw: password1
            // };

            //id 유효성검사
            mapper.admin.isUser(id).then(function (result) {

                //유저 생성
                return mapper.admin.createUser(id, nickname, password1, email);
            }).then(function (result) {
                req.session.userId = id;
                req.session.save(() => {
                    //res.render("index.html", { nickname: nickname });
                    res.redirect('/');
                });

            }).catch(function (error) {
                console.log(error + "유저생성 실패");
            });
        }

    }

}
//logout
exports.logout = async function (req, res) {
    delete req.session.userId;
    req
        .session
        .save(() => {
            res.redirect('/');
        });
}