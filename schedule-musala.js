function Schedule() {
    var events = [];

    this.addEvent = function(event) {
        events.push(event);
        events = _.sortBy(events, function(event) {
            return event.startTime.unix()
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
        var nextEvent = this.nextEvent();
        if (typeof nextEvent != 'undefined' && moment(nextEvent.startTime).subtract('minutes', 10).isAfter(moment())) {
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

    this.addDelay = function(time) {
        _.each(this.upcomingEvents(), function(event, index, agenda) {
            event.startTime.add(time);
        });
    }
}

var schedule = new Schedule();

schedule.addEvent({
    title: 'Auditing and toughening as part of the Security Development Lifecycle‎',
    startTime: moment({hour: 11, minute: 30}),
    speakers: [
        {
            name: 'John Lightsey',
            description: ''
        }
    ]
});

schedule.addEvent({
    title: 'Lunch 🍔',
    startTime: moment({hour: 12, minute: 20})
});

schedule.addEvent({
    title: 'Geocoding the World (in Perl)‎',
    startTime: moment({hour: 13, minute: 20}),
    speakers: [
        {
            name: 'Alex Balhatchet (‎Kaoru‎)',
            description: 'CTO at Lokku Ltd. Their main brand is the property search engine Nestoria (http://www.nestoria.com/) which operates in nine countries. They\'ve made numerous contributions to CPAN, check them out: https://github.com/lokku. They also have a developer blog which you can read here: http://devblog.nestoria.com/'
        }
    ]
});

schedule.addEvent({
    title: 'Adventures in civic hacking - FixMyStreet\'s Open311 support‎',
    startTime: moment({hour: 13, minute: 50}),
    speakers: [
        {
            name: 'osfameron',
            description: 'mySociety, DoES Liverpool (coworking/hackspace), co-author of Designing the Internet of Things'
        }
    ]
});

schedule.addEvent({
    title: 'A geo search engine in a few lines of perl‎',
    startTime: moment({hour: 14, minute: 20}),
    speakers: [
        {
            name: 'Ervin Ruci (‎eruci‎)',
            description: ''
        }
    ]
});

schedule.addEvent({
    title: 'Running Slovenian national video and audio archive on Perl Dancer.‎',
    startTime: moment({hour: 14, minute: 50}),
    speakers: [
        {
            name: 'Simun Kodzoman',
            description: ''
        }
    ]
});

schedule.addEvent({
    title: 'Perl in Automotive Logistics‎',
    startTime: moment({hour: 15, minute: 20}),
    speakers: [
        {
            name: 'Luboš Kolouch (‎kolcon‎)',
            description: 'He\'s an IT Manager who loves to find balance between technical, people and commercial aspects of projects. He like IT Security, Linux and coding in Perl.'
        }
    ]
});

schedule.addEvent({
    title: 'Coffee Break ☕',
    startTime: moment({hour: 15, minute: 40})
});

schedule.addEvent({
    title: 'Official conference dinner 🍸‎',
    startTime: moment({hour: 19, minute: 00})
});
