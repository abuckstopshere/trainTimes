// Initialize Firebase
        var config = {
            apiKey: "AIzaSyBgwtiAwGzi42WIG0p3zQPJbZuv6EyuHg8",
            authDomain: "traintimes-c0aa1.firebaseapp.com",
            databaseURL: "https://traintimes-c0aa1.firebaseio.com",
            projectId: "traintimes-c0aa1",
            storageBucket: "",
            messagingSenderId: "146574636829"
        };

        firebase.initializeApp(config);

// variables
        var database = firebase.database()
        var trainName = "" 
        var trainDeparture = ""
        var trainDestination = ""
        var trainTime = ""
        var trainFrequency = ""


// submit event handler
        $("#submitTrain").on( "click" , function() {
            event.preventDefault()
            trainName = $("#trainName").val() 
            trainDeparture = $("#trainDeparture").val()
            trainDestination = $("#trainDestination").val()
            trainTime = moment($("#firstTrain").val().trim(), "HH:mm").format("HH:mm")
            trainFrequency = $("#trainFrequency").val()

            database.ref().push( {
                trainName : trainName ,
                trainDeparture : trainDeparture ,
                trainDestination : trainDestination ,
                trainTime : trainTime ,
                trainFrequency : trainFrequency
            })
            $(".form-control").val("")
        })


// grab list of trains from datatbase and populate on html index
        database.ref().on( "child_added" , function(snapshot) {
            var freqeuncyOfTrain = snapshot.val().trainFrequency
            var trainTimeFormatted = moment(snapshot.val().trainTime, 'HH:mm')
            var currentTime = moment().format('HH:mm')
            var timeDifferential = moment().diff(moment(trainTimeFormatted), "minutes")
            var timeRemainder = timeDifferential % freqeuncyOfTrain
            var timeTillTrain = freqeuncyOfTrain - timeRemainder
            var nextTrain = moment().add(timeTillTrain, "minutes").format("h:mm a")

            $(".trainData").append(`
                <tr><td>${snapshot.val().trainName}</td>
                <td>${snapshot.val().trainDeparture}
                <td>${snapshot.val().trainDestination}</td>
                <td>${snapshot.val().trainFrequency}</td>
                <td>${nextTrain}</td>
                <td>${timeTillTrain}</td></tr>`)
        })