// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
  .config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
    $stateProvider
      .state('viewpager',{
        url:'/viewpager',
        templateUrl:'components/viewpager.html',
        controller:'viewpager'
      })

      .state("regLog",{
        url:"/regLog",
        templateUrl:"components/regLog.html"
      })
      .state("register",{
        url:"/register",
        templateUrl:"components/register.html",
        controller:"register"
      })
      .state("login",{
        url:"/login",
        templateUrl:"components/login.html",
        controller:"login"
      })

      .state('tab',{
        url:'/tab',
        templateUrl:'components/tab.html'
      })

      .state('tab.find',{
        url:'/find',
        views:{
          findTab:{
            templateUrl:'components/find.html',
            controller:'find'
          }
        }
      })
      .state('tab.food',{
        url:'/food',
        views:{
          findTab:{
            templateUrl:'components/food.html',
            controller:'food'
          }
        }
      })
      .state('nearby',{
        url:'/nearby',
            templateUrl:'components/nearby.html',
            controller:'nearby'
      })
      .state('details',{
        url:'/details',
        templateUrl:'components/details.html',
        controller:'details'
      })
      .state("personal",{
        url:"/personal",
        templateUrl:"components/personal.html"
      })
      .state("notice",{
        url:"/notice",
        templateUrl:"components/notice.html"
      })

    $urlRouterProvider.otherwise('/viewpager')
  })
  .controller('viewpager',function($scope,$location){

    $scope.slideHasChanged=function(i){
      var idslide0=document.getElementById('slide0')
      var idslide1=document.getElementById('slide1')
      var idslide2=document.getElementById('slide2')
      console.log(idslide1)

      function slide0(){
        idslide0.style.display='block';
        idslide1.style.display="none";
        idslide2.style.display='none'
      }
      function slide1(){
        idslide0.style.display='none';
        idslide1.style.display="block";
        idslide2.style.display='none'
      }
      function slide2(){
        idslide0.style.display='none';
        idslide1.style.display="none";
        idslide2.style.display='block'
      }
      switch (i){
        case 0:slide0();
          break;
        case 1:slide1();
          break;
        case 2:slide2()
          break;
        default:slide0();
          break;
      }
    }
    $scope.passIn=function () {
      // if(localStorage.getItem('user')){
      //   $location.path('/tab/find');
      // }else{
        $location.path('/regLog');
      // }
    }

  })
  .controller("register",["$scope","$http","$location","$interval","$cordovaToast",function($scope,$http,$location,$interval,$cordovaToast) {
    $scope.info = {}
    $scope.info.timer = 60;
    var myTimer=null;
    var flag=true;
    $scope.register = function () {
      //用户名验证
      var reg1 = /^[a-zA-Z]\w*$/i;
      if ($scope.info.username && !reg1.test($scope.info.username)) {
        alert("用户名格式不正确");

        return false;
      }
      //手机验证
      var reg3 = /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/;
      if ($scope.info.email && !reg3.test($scope.info.email)) {
        alert("请重新检查邮箱格式填写是否正确");

      }
      //密码验证
      var reg2 = /^([a-zA-z]+[0-9]+)|([0-9]+[a-zA-Z]+)$/i;
      if (($scope.info.password).length < 8 && !reg2.test($scope.info.password)) {
        alert("密码格式不正确");

        return false;
      }


      $http({
        url: "http://10.8.155.3:8080/find/regist",
        params: {"username": $scope.info.username, "password": $scope.info.password, "email": $scope.info.email}
      }).success(function (data) {
        console.log(data);
        if (data.code == '6001') {
          alert('用户名已存在');

        } else if (data.code == '9001') {
          localStorage.setItem('user', $scope.info.username)
          $location.path('/tab/find');
        }

      })
    }

    $scope.getNumber = function () {

      var reg3 = /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/;

      if ($scope.info.email && !reg3.test($scope.info.email)) {
        alert("请重新检查手机格式填写是否正确");

      }else{
        if (flag) {
          timer.innerHTML='60s';
          $http({
            url: 'http://datainfo.duapp.com/shopdata/getGoods.php',
            params: {
              phone:$scope.info.email,
              callback: ''
            }
          })
            .success(function (data) {
              flag=false;
              $interval.cancel(myTimer);
              myTimer = $interval(function () {
                timer.innerHTML = $scope.info.timer + 's';
                $scope.info.timer--;
                if($scope.info.timer==0){
                  timer.innerHTML='重新获取'
                  $interval.cancel(myTimer);
                  flag=true;
                }
              }, 1000)
            })
        }
        else{
          alert('请60s后再试');

        }
      }

    }


    $scope.$on('$destroy',function(){
      $interval.cancel(myTimer);
    })
  }])

  .controller("login",["$scope","$http","$location",function($scope,$http,$location){
    $scope.info = {}
    $scope.login = function(){
      $http({
        url:"http://10.8.155.18:8080/find/login",
        params:{"username":$scope.info.username,"password":$scope.info.password}
      }).then(function(data){

        alert('登陆成功')
        localStorage.setItem('user',$scope.info.username)
        $location.path('/tab/find');
      },function (data) {
        alert(JSON.stringify(data));
      })
    }
  }])
  .controller('find',function ($scope,$http,$cordovaSocialSharing) {
    $scope.mShare=function () {
      console.log(123);
      $cordovaSocialSharing
        .share('message, subject, file, link') // Share via native share sheet
        .then(function(result) {
          console.log(result);
          // Success!
        }, function(err) {
          // An error occured. Show a message to the user
        });
    }
    $scope.loadMore = function() {
      $http({
        url:' http://datainfo.duapp.com/shopdata/getGoods.php',
        params:{
          // pageCode:2,
          callback:''
        }
      })
        .then(function (data) {
          console.log(data);

          $scope.$broadcast('scroll.infiniteScrollComplete');
        },function (err) {
          console.log(err);
          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    };
  })
  .controller('food',function ($scope) {

  })
  .controller('nearby',function ($scope,$cordovaGeolocation) {
    console.log(123);
    /*document.addEventListener("deviceready", function () {
      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          var lat  = position.coords.latitude
          var long = position.coords.longitude
          console.log(lat,long);
        }, function(err) {
          // error
        });
    }, false);*/
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var lat  = position.coords.latitude
        var long = position.coords.longitude
        console.log(lat,long);

        var map = new AMap.Map('container',{
          zoom: 12,
          center: [long,lat]//new AMap.LngLat(116.39,39.9)
        });
        var marker = new AMap.Marker({
          position: [long,lat],//marker所在的位置
          map:map,//创建时直接赋予map属性
          title:'我的位置',
          animation:"AMAP_ANIMATION_DROP"
        });
      }, function(err) {
        // error
      });
  })
  .controller('details',function($scope,$http,$stateParams,$cordovaSocialSharing){
    $scope.goBack=function(){
      history.back();
    };
    $scope.share=function() {
      console.log('share')

      $cordovaSocialSharing
        .share('message, subject, file, link') // Share via native share sheet
        .then(function (result) {
          console.log(result);
          // Success!
        }, function (err) {
          // An error occured. Show a message to the user
        });

    };
    $scope.message=function(){
      console.log('message')
    }
    $scope.lick=function(){
      console.log('lick')
      var oLick=document.getElementById('lick')
      oLick.style.color='aliceblue';
      oLick.classList.remove('ion-ios-heart-outline');
      oLick.classList.add('ion-ios-heart');
    }
  })
