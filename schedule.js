function Schedule(hallId, date, setPageTitle) {
    var events = [];

    var apiEndpointPrefix = 'https://cfp.openfest.org/api/conferences/8';

    var pageTitle = 'OpenFest';
    var room = '';

    var nextLectureDelayMinutes = 4;  // show the current lecture as next for the first N minutes

    $.getJSON(apiEndpointPrefix + '/halls.json', function(data) {
        room = data[hallId]['name']['bg'];
        if (room === undefined) {
            room = '';
        }
    });

    this.update = function() {
        $.getJSON(apiEndpointPrefix + '/events.json', function(eventsData) {
            $.getJSON(apiEndpointPrefix + '/slots.json', function(slotsData) {
                $.each(slotsData, function(slotId, slot) {
                    $.extend(eventsData[slot['event_id'].toString()], slot);
                    $.extend(eventsData[slot['event_id'].toString()], {"slotId": slotId});
                });
                var scheduleEvents = $.map(eventsData, function(event, eventId) {
                    event['id'] = eventId;
                    event['startTime'] = moment(event['starts_at']);
                    event['endTime'] = moment(event['ends_at']);
                    event['hallId'] = event['hall_id'];

                    if (event['startTime'].date() !== date) {
                        return null;
                    }
                    if (event['hallId'] !== hallId) {
                        return null;
                    }

                    return event;
                });

                events = scheduleEvents.sort(function (a,b) {return a['startTime'].isBefore(b['startTime']) ? -1 : 1});
            });
        });
        this.setPageTitle();
    }

    this.upcomingEvents = function() {
        var now = this.referenceTime();
        return _.select(events, function(event) {
            return event.startTime.isAfter(now);
        });
    }

    this.nextEvent = function() {
        return _.first(this.upcomingEvents());
    }

    this.currentEvent = function() {
        var latestEvent = _.last(this.pastEvents());
        if (typeof(latestEvent) != 'undefined' && latestEvent.endTime.isAfter(this.now())) {
            return latestEvent;
        } else {
            return undefined;
        }
    }

    this.futureEvents = function() {
        return this.upcomingEvents().splice(1);
    }

    this.pastEvents = function() {
        var now = this.referenceTime();
        return _.select(events, function(event) {
            return event.startTime.isBefore(now);
        });
    }

    this.allEvents = function() {
        return events;
    }

    this.now = function() {
        now = $.urlParam("now");
        if (now) {
            return moment(now);
        } else {
            return moment();
        }
    }

    this.referenceTime = function() {
        return this.now().subtract(nextLectureDelayMinutes, 'minutes');
    }

    this.room = function() {
        return room;
    }

    this.setPageTitle = function() {
        if (setPageTitle) {
            $('title').text(pageTitle + " room=" + room + " date=" + date);
        }
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

var schedule = new Schedule(parseInt($.urlParam('roomId')), parseInt($.urlParam('date')), true);
