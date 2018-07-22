/**
 * Created by serg on 17-Jul-18.
 */
/**
 * Created by serg on 17-Jul-18.
 */
var app = angular.module('sto', []);
app.controller('rules', function ($scope, $http) {

    // $scope.sensorParams = [
    //     {title: "Voltage", id: "voltage"},
    //     {title: "Oil temperature", id: "oil_temp"},
    //     {title: "Oil Pressure", id: "oil_press"},
    //     {title: "Coolant Temperature", id: "coolant_temp"}
    // ];
    // $scope.resultEvents = [
    //     {title: 'Alterator problem', id: 0},
    //     {title: 'Coolant leak', id: 1},
    //     {title: 'Check break', id: 2}
    // ];


    $http.get('http://localhost:8080/sensors/all').
    then(function(response) {
        $scope.sensorParams = response.data;
    });

    $http.get('http://localhost:8080/events/all').
        then(function (response) {
            $scope.resultEvents = response.data;
    })

    $scope.operators = [
        '<', '>', '=', '<>'
        // {title: "<", operator: "<"},
        // {title: ">", operator: ">"},
        // {title: "=", operator: "="},
        // {title: "!=", operator: "<>"}
    ];

    $scope.startEvents = [
        {colId: 0, selectedParameter: '', operator: '', value: '', strategy: '' }
    ];

    $scope.ruleCondition = {
        type: '',
        time: 0,
        simpleConditions: [
            {colId: 0, selectedParameter: '', operator: '', value: '', strategy: ''}
            ],
        complexCondition: {
            parameters: [{colId: 0, selectedParameter: '', literal: ''}],
            threshold: 0,
            strategy: ''
        }
    }

    $scope.condition_panels = [
        'simple', 'complex'
        // {title: 'Simple equation', id: 'simple'},
        // {title: 'Complex formula', id: 'complex'}
    ]

    $scope.strategies = [
        'AVG','ANY','SUM'
        // {title: 'Average', id: 'AVG'},
        // {title: 'Any', id: 'ANY'},
        // {title: 'Sum', id: 'SUM'}
    ]



    $scope.selectedResultEvent = {title:'', id:''}

    $scope.newSensor = '';


    $scope.addElement = function (list) {
        var newItemNo = list.length+1;
        list.push({'colId':newItemNo});
    }

    $scope.removeElement = function (list, index) {
        list.splice( index, 1);
        // if no rows left in the array create a blank array
        if ( list.length === 0 || list.length == null){
            alert('no rec');
            list.push({"colId":0});
        }
    }

    $scope.saveRule = function () {
        var rule = {
            startEvents : $scope.startEvents,
             condition: $scope.ruleCondition,
            action: $scope.selectedResultEvent
        };

        $scope.resultRule = rule;

        $http.post('http://localhost:8080/rules/add', rule).
            success(function (data, status, headers, config) {
                alert("added: " + data);
            });

    }




    // $scope.addUser = function () {
    //     //alert($scope.user);
    //     var user = $scope.user;
    //     var response =  $http.post('http://localhost:8080/add', user);
    //     response.success(function(data, status, headers, config) {
    //         $scope.msg = data;
    //     });
    //     response.error(function(data, status, headers, config) {
    //         $scope.msg = data;
    //     });
    // }
});

