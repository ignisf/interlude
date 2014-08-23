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
    title: '‎SyContent - Content in the Cloud with V8‎',
    startTime: moment({hour: 10, minute: 00}),
    speakers: [
        {
            name: 'Torsten Raudssus (‎Getty‎)',
            description: ''
        }
    ]
});


schedule.addEvent({
    title: '‎Docker with Perl - an Introduction‎ ',
    startTime: moment({hour: 11, minute: 00}),
    speakers: [
        {
            name: 'Denis Banovic (‎@bano99‎)',
            description: ''
        }
    ]
});

schedule.addEvent({
    title: 'Create your containers with perl‎',
    startTime: moment({hour: 11, minute: 30}),
    speakers: [
        {
            name: 'Marian Marinov (‎HackMan‎)',
            description: ''
        }
    ]
});

schedule.addEvent({
    title: 'Lunch 🍔',
    startTime: moment({hour: 12, minute: 20})
});

schedule.addEvent({
    title: '‎Automatization Network infrastructure‎',
    startTime: moment({hour: 13, minute: 20}),
    speakers: [
        {
            name: 'Naim Shafiyev (‎shafiev‎)',
            description: 'The student of MIREA. Interests: GCC, Linux kernel, OpenBSD, PERL, Parrot, Catalyst, Search engines'
        }
    ]
});

schedule.addEvent({
    title: 'Building an AWS SDK for Perl‎',
    startTime: moment({hour: 13, minute: 50}),
    speakers: [
        {
            name: 'Jose Luis Martinez Torres',
            description: ''
        }
    ]
});

schedule.addEvent({
    title: 'Perl in the Cloud - Update‎',
    startTime: moment({hour: 14, minute: 50}),
    speakers: [
        {
            name: 'Denis Banovic (‎@bano99‎)',
            description: 'Denis Banovic has over 13 years of experience as a senior software developer, system administrator and team leader. Currently he is busy creating and implementing Cloud Applications for the tourism industry in Austria. In his spare time, Denis\' interests include rockets, photography, traveling and psychology.'
        }
    ]
});

schedule.addEvent({
    title: 'Coffee Break ☕',
    startTime: moment({hour: 15, minute: 40})
});
