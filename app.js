//created this array to loop through
let thisDay = [

    {
        id : '0',
        hourOfDay : '09',
        time : '09',
        GTM : 'am',
        notification : ''
    },

    {
        id : '1',
        hourOfDay : '10',
        time : '10',
        GTM : 'am',
        notification : ''
    },

    {
        id : '2',
        hourOfDay : '11',
        time : '11',
        GTM : 'am',
        notification : ''
    },
    //new day starts
    {
        id : '3',
        hourOfDay : '12',
        time : '12',
        GTM : 'pm',
        notification : ''
    },

    {
        id : '4',
        hourOfDay : '01',
        time : '13',
        GTM : 'pm',
        notification : ''
    },

    {
        id : '5',
        hourOfDay : '02',
        time : '14',
        GTM : 'pm',
        notification : ''
    },

    {
        id : '6',
        hourOfDay : '03',
        time : '15',
        GTM : 'pm',
        notification : ''
    },

    {
        id : '7',
        hourOfDay : '04',
        time : '16',
        GTM : 'pm',
        notification : ''
    },

    {
        id : '8',
        hourOfDay : '05',
        time : '17',
        GTM : 'am',
        notification : ''
    }

];

//console.log(thisDay)

function generatePlannerDate() {
    let dateNow = moment().format('MMMM Do YYYY, HH:mm:ss');
    //console.log(dateNow)
    $('#currentDay').text(dateNow);
}

//Now saving date to local storage
function storeNotifications() {
localStorage.setItem('thisDay', JSON.stringify(thisDay));
}

//console.log(storeNotifications())

//retrieving data to the viewport
function displayNotifications() {
    thisDay.forEach(function (_theHour) {
        $(`#${_theHour.id}`).val(_theHour.notification);
    })
}

    //calling the local storgae key vaue pairs
    function init() {
        let saveDay = JSON.parse(localStorage.getItem('thisDay'));

if (saveDay) {
    thisDay = saveDay
}

storeNotifications()
displayNotifications()
   
}

generatePlannerDate();

//creating the app body
thisDay.forEach(function(theHour) {
    //building the time grid rows
    let hourLine = $ ('<form>').attr({
        'class':'row'
    })
    $('.container').append(hourLine)
});

$('.container').append(hourLine);

// create time portion
let hourPortion = $('<div>')
.text(`${theHour.hourOfDay}${theHour.GTM}`)
.attr({
    'class':'col-md-2 hourOfDay'
});

//creating the schedule interface of the app
let hourArea =  $('<div>')
.attr({
    'class':'col-md-9 description p-0'
});

let inputPlan = $('<textarea>');
hourArea.append(inputPlan);
inputPlan.attr('id', theHour.id);
if (theHour.time < moment().format('HH')) {
    inputPlan.attr({
        'class': 'past',
    })
}

else if (theHour.time === moment().format('HH')) {
    inputPlan.attr({
        'class': 'present'
    })
}

else if (theHour.time > moment().format('HH')) {
    inputPlan.attr({
        'class': 'future'
    })
}

//creating save button
let saveButton = $('<i class= far fa-save fa-lg> </i>');

let saveInput = $('<button>')  
    .attr({
        'class': 'col-md-1 saveBtn'
    })

    saveInput.append(saveButton)
    hourLine.append(hourPortion, hourArea, saveInput);

//check from this side
init();

//saves data to be used in local storage
$('.saveBtn').on('click', function(event) {
    event.preventdefault();
    var saveIndex = $(this). siblings('.description').children('.future').attr('id');
    thisDay[saveindex].notification = $(this).siblings('.description').children('future').val();
    console.log(saveIndex)
    storeNotifications()
    displayNotifications();
})



//$('#09')