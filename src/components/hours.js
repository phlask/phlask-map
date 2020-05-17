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
        
    
        return parseInt(minute) === 0
            ? `${newHour}${mer}`
            : `${newHour}:${minute}${mer}`    
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
        const currentTime = parseInt(today.getHours().toString() + today.getMinutes().toString())
        
        return currentTime > parseInt(open) && currentTime < parseInt(close)
            ? true
            :false
        
    }
    
    // Get current time & day
    
    // const today = new Date() 
    
    // getCurrentDay: function getCurrentDay(){  
    //     return today.getDay()
    // },
    
    // getCurrentTime: function getCurrentTime(){
    //     const time = {
    //         hour : getHourFromMilitary(today.getHours()),
    //         minute : today.getMinutes().toString
    //     }
    //     console.log(time);
        
    //     return time    
    // }
 }



// hours.checkOpen(1200,1900)