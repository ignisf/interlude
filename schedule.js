function Schedule(hallId) {
    var events = [];

    this.update = function() {
        $.getJSON("http://varnaconf.com/schedules/2015.json", function(data) {
            var scheduleEvents = $.map(data[hallId], function(event) {
                event['startTime'] = moment(event['startTime']);
                return event;
            });

            $.each(scheduleEvents, function(index, event) {
                var nextEvent = scheduleEvents[index + 1];
                if (typeof(nextEvent) != 'undefined') {
                    event['endTime'] = moment(nextEvent['startTime']).subtract(10, 'minutes');
                } else {
                    event['endTime'] = moment(event['startTime']).add(40, 'minutes');
                }
            });

            events = scheduleEvents;
            console.log(events);
        });
    }

    this.upcomingEvents = function() {
        return _.select(events, function(event) {
            return event.startTime.isAfter(moment());
        });
    }

    this.nextEvent = function() {
        return _.first(this.upcomingEvents());
    }

    this.currentEvent = function() {
        var latestEvent = _.last(this.pastEvents());
        if (typeof(latestEvent) != 'undefined' && latestEvent.endTime.isAfter(moment())) {
            return latestEvent;
        } else {
            return undefined;
        }
    }

    this.futureEvents = function() {
        return this.upcomingEvents().splice(1);
    }

    this.pastEvents = function() {
        return _.select(events, function(event) {
            return event.startTime.isBefore(moment());
        });
    }

    this.allEvents = function() {
        return events;
    }
}

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

var schedule = new Schedule(parseInt($.urlParam('roomId')));
