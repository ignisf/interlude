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
    title: 'Regex 101',
    startTime: moment({hour: 10, minute: 00}),
    speakers: [
        {
            name: 'Bradley Andersen (‎elohmrow‎)',
            description: 'Je n\'avais pas besoin de cette hypothese-la'
        }
    ]
});

schedule.addEvent({
    title: 'HTTP Clients and Perl‎',
    startTime: moment({hour: 11}),
    speakers: [
        {
            name: 'Tom Hukins',
            description: ''
        }
    ]
});

schedule.addEvent({
    title: 'Dancer and DBIx::Class‎',
    startTime: moment({hour: 11, minute: 30}),
    speakers: [
        {
            name: 'Stefan Hornburg (‎racke‎)',
            description: 'Open source consultant since 1998, with the focus on E-Commerce, Perl and Debian. Started using Dancer in 2011 and is now part of the Dancer development team.'
        }
    ]
});

schedule.addEvent({
    title: 'Lunch',
    startTime: moment({hour: 12, minute: 20})
});

schedule.addEvent({
    title: 'Reading the layercake, an introduction to PerlIO‎',
    startTime: moment({hour: 13, minute: 20}),
    speakers: [
        {
            name: 'Leon Timmermans (‎leont‎)',
            description: 'He\'s a Dutch perl hacker, mainly known for File::Map, Module::Build::Tiny, libperl++ and threads::lite, as well as some contributions to core.'
        }
    ]
});

schedule.addEvent({
    title: 'Devops Logique‎',
    startTime: moment({hour: 13, minute: 50}),
    speakers: [
        {
            name: 'Matt S Trout (‎mst‎)',
            description: ''
        }
    ]
});

schedule.addEvent({
    title: 'Functional Pe(a)rls: Huey\'s Zipper‎',
    startTime: moment({hour: 14, minute: 50}),
    speakers: [
        {
            name: 'osfameron',
            description: 'mySociety, DoES Liverpool (coworking/hackspace), co-author of Designing the Internet of Things'
        }
    ]
});

schedule.addEvent({
    title: 'Coffee Break',
    startTime: moment({hour: 15, minute: 40})
});

schedule.addEvent({
    title: 'Lightning Talks',
    startTime: moment({hour: 16, minute: 10}),
});

schedule.addEvent({
    title: 'Day 2 Keynote - State of the Velociraptor‎',
    startTime: moment({hour: 17, minute: 10}),
    speakers: [
        {
            name: 'Matt S Trout (‎mst‎)',
            description: ''
        }
    ]
});
