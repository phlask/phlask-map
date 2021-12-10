export const hours = {
    getFullHours: function getFullHours(hours){

        // Check for 12:00am or hours exceeding 2400
        const intHours = parseInt(hours)
        if(intHours >= 2400){
            
            return hours === 2400 
                ? '12:00am'
                : 'Exceeded 2400 hours'
        }
        
        const time = hours.split('')
        const minute = (time[2] + time[3])
    
        // Check for minutes exceeding 59
        if (parseInt(minute) > 59 ){        
            return 'Incorrect minute format: minutes too large'
        }
    
        const hour = parseInt(time[0] + time[1])
        const newHour = hour > 12 
            ? (hour - 12).toString()
            : hour === 0 
                ? 12
                : hour.toString()
    
        const mer = hour >= 12 ? 'pm' : 'am'
    
        return `${newHour}:${minute}${mer}`    
    },
    /* Returns a user readable time, truncating the :00 if there are no partial hours
        eg: "6pm" or "3:30pm"
    */
    getSimpleHours : function getSimpleHours(hours){
    
        // Check for 12:00am or hours exceeding 2400
        const intHours = parseInt(hours)
        if(intHours >= 2400){
            
            return hours === 2400 
                ? '12:00am'
                : 'Exceeded 2400 hours'
        }
        
        const time = hours.split('')
        const minute = (time[2] + time[3])
    
        // Check for minutes exceeding 59
        if (parseInt(minute) > 59 ){        
            return 'Incorrect minute format: minutes too large'
        }
    
        const hour = parseInt(time[0] + time[1])
        const newHour = hour > 12 
            ? (hour - 12).toString()
            : hour === 0 
                ? 12
                : hour.toString()
    
        const mer = hour >= 12 ? 'pm' : 'am'
    
        // console.log(parseInt(minute) === 0 
        //     ? `${newHour}${mer}`
        //     : `${newHour}:${minute}${mer}` );
        
        if (isNaN(hour) || isNaN(minute) ){
            return null
        } else {
            return parseInt(minute) === 0
            ? `${newHour}${mer}`
            : `${newHour}:${minute}${mer}`    
        }
    },
    
    getHourFromMilitary: function getHourFromMilitary(hour){
        if(hour === 12){
            return hour
        }
        return (hour - 12).toString()
    },
    
    getDays:  function getDays(integerDay){
    
        if (integerDay > 6 || integerDay < 0 || !Number.isInteger(integerDay) ){
            return 'Integer Day should be of value 0-6'
        }
    
        const intDays = [0,1,2,3,4,5,6,]
        const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    
        return days[intDays.indexOf(integerDay)]
    },
    
    checkOpen: function checkOpen(open, close){
        const today = new Date()

        // If minutes is single digit, add "0" as first digit
        let minutes = today.getMinutes().toString()
        if (minutes.length < 2){
            minutes = "0" + minutes
        }
        const currentTime = parseInt(today.getHours().toString() + minutes)
        
        return currentTime > parseInt(open) && currentTime < parseInt(close)
            ? true
            : false
    },

    getOrgTimes: ( times ) => {
        const timeSplit = times.split('-')
        const open = getTime(timeSplit[0])
        const close = getTime(timeSplit[1])
    
        console.log('Open: ' + convertToMilitary(open));
        console.log('Close: ' + convertToMilitary(close));
    }
 }


/*** Food Org Hours ***/

            
function convertToMilitary(time){
    if (time.mer === 'am'){
        const test = time.hour + time.minute 

        if ( time.hour === '12' ){
            return '00' + time.minute 
        }else{
            return time.hour + time.minute 
        }
        
    }else if ( time.mer === 'pm' ){
        const test = (parseInt(time.hour) + 12).toString() + time.minute 
        
        if(time.hour !== '12'){
            return (parseInt(time.hour) + 12).toString() + time.minute 
        }else{
            return (parseInt(time.hour)).toString() + time.minute 
        }
    }
}
function getTime(time){
    const timeSplit = time.split(':')
    const hour = timeSplit[0]

    const minuteSplit = timeSplit[1].split('')
    const minute = minuteSplit[0] + minuteSplit[1]
    const mer = minuteSplit[2] + minuteSplit[3]

    return {
        hour: hour,
        minute: minute,
       
        mer: mer
    }
}

function getDays(days){
    const week = ['S','M','T','W','Th','F','Sat']
    const daysSplit = days.split(" ")


}

// hours.checkOpen(1200,1900)