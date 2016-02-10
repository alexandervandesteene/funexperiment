
var app = angular.module('adminpanel', ['ngMaterial']);

app.factory('socket', function(){
    return io.connect('http://localhost:3000');
});

app.controller('quizCtrl', function($scope, socket, $mdToast){

    $scope.verstuur = function() {
        console.log($scope.quiz);

        if($scope.quiz.vraag != undefined && $scope.quiz.type != undefined && $scope.quiz.antwoord != undefined ){
            socket.emit('vraag', $scope.quiz);
            $scope.quiz= '';
        }else{
            console.log("mislukt");
            $mdToast.showSimple("toevoegen mislukt");
        }


    };

    $scope.Clear = function() {
        console.log($scope.quiz);
        $scope.quiz= '';
        socket.emit('vraag', $scope.quiz);

    };

    socket.on('get msg', function(data) {
        $scope.msgs.push(data);
        $scope.$digest();
    });
});