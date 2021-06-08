const createEmployeeRecord = (attributes) => {
    let employee = {
        firstName: attributes[0],
        familyName: attributes[1],
        title: attributes[2],
        payPerHour: attributes[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

const createEmployeeRecords = (employeesData) => {
    return employeesData.map(employee => createEmployeeRecord(employee))
}

const createTimeInEvent = function(dateTime) {
    const timeIn = {
        type: "TimeIn",
        date: dateTime.slice(0,10),
        hour: parseInt(dateTime.slice(-4))
    }
    this.timeInEvents.push(timeIn)
    return this
}

const createTimeOutEvent = function(dateTime) {
    const timeOut = {
        type: "TimeOut",
        date: dateTime.slice(0,10),
        hour: parseInt(dateTime.slice(-4))
    }
    this.timeOutEvents.push(timeOut)
    return this
}

const hoursWorkedOnDate = function(date){
    const matchingTimeIn = this.timeInEvents.find(timeIn => timeIn.date === date)
    const matchingTimeOut = this.timeOutEvents.find(timeOut => timeOut.date === date)
    return (matchingTimeOut.hour - matchingTimeIn.hour)/100
}

const wagesEarnedOnDate = function(date){
    return this.payPerHour * hoursWorkedOnDate.call(this, date)
}

const calculatePayroll = function(employeeArray){
    return employeeArray.reduce(function(total, employee){ return total + allWagesFor.call(employee)}, 0)
}

const findEmployeeByFirstName = function(employeeArray, name){
    return employeeArray.find((employee) => employee.firstName === name)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}