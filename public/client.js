
var app = angular.module('adminpanel', ['ngMaterial','ezfb']);

app.config(function (ezfbProvider){
   ezfbProvider.setInitParams({
     appId:'1048605721829373'
   });
});

app.factory('socket', function(){
    return io.connect('http://localhost:3000');
});

app.controller('quizCtrl', function($scope, socket,ezfb){

    socket.on('ontvangenVraag', function(data) {
        console.log("ontvangen vraag: " + data.vraag + " antwoord: " + data.antwoord +" type: " + data.type
        + " keuze1: " +data.keuze1 + " punten: " + data.punten);
        $scope.vraag = data.vraag;
        $scope.type = data.type;
        $scope.keuze1 = data.keuze1;
        $scope.keuze2 = data.keuze2;
        $scope.keuze3 = data.keuze3;
        $scope.antwoord = data.antwoord;
        $scope.$digest();
    });

    $scope.verstuurantwoord = function(){
      console.log("versturen antwoord");
        console.log("antwoord " + $scope.quiz.antwoord);

        if($scope.quiz.antwoord == $scope.antwoord){
            var test = [];
            console.log("juist antwoord");
            test.push($scope.apiMe.name);
            test.push($scope.antwoord);
            socket.emit('antwoord', test);
        }else{
            console.log("fout antwoord");
        }

        $scope.vraag = undefined;

    };

    $scope.logout = function () {

        ezfb.logout(function () {
            updateLoginStatus(updateApiMe);
        });
    };

    $scope.login = function () {
        console.log("in de login");


        ezfb.login(function (res) {


            if (res.authResponse) {
                updateLoginStatus(updateApiMe);
            }
        }, {scope: 'email,user_likes'});
    };

    function updateLoginStatus (more) {
        ezfb.getLoginStatus(function (res) {
            $scope.loginStatus = res;
            console.log("status gevonden: " +  $scope.loginStatus.status);
            (more || angular.noop)();
        });
    }

    function updateApiMe () {
        ezfb.api('/me', function (res) {
            $scope.apiMe = res;
            console.log("gevonden naam: " + res.name);
        });
    }

});

