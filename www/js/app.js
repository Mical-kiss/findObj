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
  .config(function ($stateProvider, $urlRouterProvider) {
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
      .state('tab.nearby',{
        url:'/nearby',
        views:{
          findTab:{
            templateUrl:'components/nearby.html',
            controller:'nearby'
          }
        }
      })

    // $urlRouterProvider.otherwise('/viewpager')
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
      if(localStorage.getItem('user')){
        // console.log(2222);
        $location.path('/tab/find');
      }else{
        $location.path('/regLog');
      }
    }

  })
  .controller("register",["$scope","$http","$location",function($scope,$http,$location){
    $scope.info = {}

    $scope.register = function(){
//			console.log($scope.info.username,$scope.info.password,$scope.info.email)
      //用户名验证
      var reg1=/^[a-zA-Z]\w*$/i;
      if($scope.info.username && !reg1.test($scope.info.username)){
        alert("用户名格式不正确")
        return false;
      }
      //邮箱验证
      var reg3 = /^([a-zA-Z0-9_-])+\@([a-zA-Z0-9_-])+.([a-zA-Z])+$/;
      if($scope.info.email && !reg3.test($scope.info.email)){
        alert("请重新检查邮箱格式填写是否正确")
      }
      //密码验证
      var reg2 = /^([a-zA-z]+[0-9]+)|([0-9]+[a-zA-Z]+)$/i;
      if(($scope.info.password).length < 8 && !reg2.test($scope.info.password)){
        alert("密码格式不正确")
        return false;
      }


      $http({
        url:"http://10.8.155.3:8080/find/regist",
        params:{"username":$scope.info.username,"password":$scope.info.password,"email":$scope.info.email}
      }).success(function(data){
//				console.log(data)
        localStorage.setItem('user',$scope.info.username)
        $location.path('/tab/find');
      })
    }
  }])

  .controller("login",["$scope","$http","$location",function($scope,$http,$location){
    $scope.info = {}
    $scope.login = function(){
      $http({
        url:"http://10.8.155.3:8080/find/login",
        params:{"username":$scope.info.username,"password":$scope.info.password}
      }).success(function(data){
//				console.log(data)
        $location.path('/tab/find');
        localStorage.setItem('user',$scope.info.username)
      })
    }
  }])
  .controller('find',function ($scope) {

  })
  .controller('food',function ($scope) {

  })
  .controller('nearby',function ($scope,$cordovaGeolocation) {

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
  })
