/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

//Loads Array elements into corresponding Object properties. Additionally,
//initialize empty Arrays on the properties timeInEvents and timeOutEvents
 function createEmployeeRecord(array){
    let testEmployee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return testEmployee
}
//Converts each nested Array into an employee record using createEmployeeRecord
//and accumulates it to a new Array
function createEmployeeRecords(array) {
    let employeeRecords = array.map(createEmployeeRecord); //no invoking?
    return employeeRecords;
}
//Add an Object with keys.Return the record that was just updated
function createTimeInEvent(dateTimeString) {
    let objectTime = {
       type: "TimeIn",
       hour: timeInExtract(dateTimeString),
       date: dateInExtract(dateTimeString),
   };
   this.timeInEvents.push(objectTime);
   return this;
}
function dateInExtract(dateTimeString) {
    return dateTimeString.split(" ")[0];
}
function timeInExtract(dateTimeString) {
    return parseInt(dateTimeString.split(" ")[1]);
}
//Add an Object with keys.Return the record that was just updated
function createTimeOutEvent(dateTimeString) {
    let objectTime = {
       type: "TimeOut",
       hour: timeOutExtract(dateTimeString),
       date: dateOutExtract(dateTimeString),
   };
   this.timeOutEvents.push(objectTime);
   return this;
}
function dateOutExtract(dateTimeString) {
   return dateTimeString.split(" ")[0];
}
function timeOutExtract(dateTimeString) {
   return parseInt(dateTimeString.split(" ")[1]);
}
//Given a date, find the number of hours elapsed between
//that date's timeInEvent and timeOutEvent
function hoursWorkedOnDate(dateString) {
    let timeIn, timeOut;

    this.timeInEvents.find(object => {
        if(object.date === dateString) {
            timeIn = object.hour/100;
        }
    })
    this.timeOutEvents.find(object => {
        if(object.date === dateString) {
            timeOut = object.hour/100;
        }
    })
    return Math.abs(timeIn - timeOut)
}
//Using hoursWorkedOnDate, multiply the hours by the record's payRate to
//determine amount owed.
function wagesEarnedOnDate(dateString) {
    return this.payPerHour * hoursWorkedOnDate.call(this, dateString)
}
//Using wagesEarnedOnDate, accumulate the value of all dates worked by
//the employee in the record used as context.  
const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
//Using allWagesFor for each of the employees, accumulate the value of all dates
//worked by the employee in the record used as context. 
function calculatePayroll(employees) {
    const reducer = (accumulator, emp) => {
        console.log(emp)
        let grandTotal = accumulator + allWagesFor.call(emp)
        return grandTotal
    } 
    return employees.reduce(reducer, 0)
}
//Test the firstName field for a match with the firstName argument
function findEmployeeByFirstName(srcArray, firstName) {
   
    return srcArray.find(emp => emp.firstName === firstName);
}

// findEmployeeByFirstName(
//     {firstName: "Nastya",
//     familyName: "Shatokhina",
//     title: "Writer",
//     payPerHour: 1003,
//     timeInEvents: [{
//         type: "TypeIn",
//         hour: 1000,
//         date: "2019-01-02"
//     }],
//     timeOutEvents: [{
//         type: "TypeOut",
//         hour: 2100,
//         date: "2019-01-02"
//     }
//     ]},
//     {firstName: "Kostya",
//     familyName: "Tsoy",
//     title: "Security",
//     payPerHour: 1000,
//     timeInEvents: [{
//         type: "TypeIn",
//         hour: 2000,
//         date: "2019-01-02"
//     }],
//     timeOutEvents: [{
//         type: "TypeOut",
//         hour: 4100,
//         date: "2019-01-02"
//     }
//     ]}, "Kostya")
