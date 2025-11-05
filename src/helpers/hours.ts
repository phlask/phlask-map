const hours = {
  /* Returns a user readable time, truncating the :00 if there are no partial hours
        eg: "6pm" or "3:30pm"
    */
  getSimpleHours: (hours: number) => {
    // Check for 12:00am or hours exceeding 2400
    const intHours = hours;
    if (intHours >= 2400) {
      return hours === 2400 ? '12:00am' : 'Exceeded 2400 hours';
    }

    // In some cases, time is just 4 numbers
    if (hours.time && /\d{4}/.test(hours.time)) {
      let hour = parseInt(hours.time.slice(0, 2), 10);
      const minute = hours.time.slice(2, 4);
      const mer = hour >= 12 ? 'pm' : 'am';
      if (hour > 12) {
        hour -= 12;
      }
      if (hour === 0) {
        hour = 12;
      }
      return `${hour}:${minute}${mer}`;
    }

    // TODO: Address difference between Water and Food taps when it comes to the hours key in the Supabase DB
    // Water taps have an `hours` key with day and time values while Food taps do not
    const time = hours.time ? hours.time.split() : hours.split();
    const minute = time[2] + time[3];

    // Check for minutes exceeding 59
    if (parseInt(minute, 10) > 59) {
      return 'Incorrect minute format: minutes too large';
    }

    const hour = parseInt(time[0] + time[1], 10);
    let newHour = hour.toString();
    if (hour > 12) {
      newHour = (hour - 12).toString();
    } else if (hour === 0) {
      newHour = 12;
    }

    const mer = hour >= 12 ? 'pm' : 'am';

    if (Number.isNaN(hour) || Number.isNaN(minute)) {
      return null;
    }
    return parseInt(minute, 10) === 0
      ? `${newHour}${mer}`
      : `${newHour}:${minute}${mer}`;
  },

  getDays: (integerDay: number) => {
    if (integerDay > 6 || integerDay < 0 || !Number.isInteger(integerDay)) {
      return 'Integer Day should be of value 0-6';
    }

    const intDays = [0, 1, 2, 3, 4, 5, 6];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return days[intDays.indexOf(integerDay)];
  },

  checkOpen: (open: number, close: number) => {
    const today = new Date();

    // If minutes is single digit, add "0" as first digit
    let minutes = today.getMinutes().toString();
    if (minutes.length < 2) {
      minutes = `0${minutes}`;
    }
    const currentTime = parseInt(today.getHours().toString() + minutes, 10);

    return currentTime > open && currentTime < close;
  }
};

export default hours;
