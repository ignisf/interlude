function Schedule(hallId, date) {
    var events = [];

    this.update = function() {
        $.getJSON('http://www.openfest.org/2016/wp-content/themes/initfest/schedule/interlude.php', function(data) {
            var scheduleEvents = $.map(data[hallId], function(event) {
                event['startTime'] = moment(event['starts_at'] * 1000);
                event['endTime'] = moment(event['ends_at'] * 1000);
				console.log(event['startTime'].date());
				if (event['startTime'].date() !== date) {
					return null;
				}
				
                return event;
            });

            events = scheduleEvents;
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

var schedule = new Schedule(parseInt($.urlParam('roomId')), parseInt($.urlParam('date')));
