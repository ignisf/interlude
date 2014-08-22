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
    title: 'Perl Secret‎',
    startTime: moment({hour: 11, minute: 30}),
    speakers: [
        {
            name: 'Mihai Pop',
            description: ''
        }
    ]
});

schedule.addEvent({
    title: 'Translation with context',
    startTime: moment({hour: 12, minute: 30}),
    speakers: [
        {
            name: 'Mark Overmeer (‎markov‎)',
            description: 'Perl, Perl and UNIX'
        }
    ]
});

schedule.addEvent({
    title: 'Lunch 🍔',
    startTime: moment({hour: 12, minute: 20})
});

schedule.addEvent({
    title: 'Some Dist::Zilla::Plugin:: best practices‎',
    startTime: moment({hour: 13, minute: 20}),
    speakers: [
        {
            name: 'Olivier Mengué (‎dolmen‎)',
            description: '15 years of Perl programming (6 years as a full time Perl developer). Worked as a professional Perl developer on a portable (various Unix, Linux, Windows) daemon application built with POE. Currently working with Perl in an embedded environment for home automation with AnyEvent, Dist::Zilla...'
        }
    ]
});

schedule.addEvent({
    title: 'Video and audio with Perl and DLNA (and Chromecast)‎',
    startTime: moment({hour: 13, minute: 50}),
    speakers: [
        {
            name: 'Max Maischein (‎Corion‎)',
            description: ''
        }
    ]
});

schedule.addEvent({
    title: '‎Home Automation With Perl‎',
    startTime: moment({hour: 14, minute: 20}),
    speakers: [
        {
            name: 'Maroš Kollár (‎maros‎)',
            description: ' Perl aficionado since 1998 and one of the YAPC::EU 2007 organizers.'
        }
    ]
});

schedule.addEvent({
    title: 'Open source deep sky images using perl‎',
    startTime: moment({hour: 14, minute: 50}),
    speakers: [
        {
            name: 'StrayTaoist',
            description: 'Rarely seen in public, and even then only from behind. Willing to tell you how and why you are wrong.'
        }
    ]
});

schedule.addEvent({
    title: 'Get Me to the Pub Please‎',
    startTime: moment({hour: 15, minute: 20}),
    speakers: [
        {
            name: 'Sue Spence (‎virtualsue‎)',
            description: ' Perl programmer, currently working at UK2 in London.'
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
