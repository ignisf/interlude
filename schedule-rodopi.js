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
    title: 'Using Perl for autogeneration physical formulas',
    startTime: moment({hour: 10, minute: 00}),
    speakers: [
        {
            name: 'Ignat Ignatov',
            description: ''
        }
    ]
});

schedule.addEvent({
    title: 'SQL::Abstract::FromQuery',
    startTime: moment({hour: 10, minute: 30}),
    speakers: [
        {
            name: 'Laurent Dami (‎dami‎)',
            description: ''
        }
    ]
});

schedule.addEvent({
    title: '‎Extreme (Elastic)Search‎',
    startTime: moment({hour: 11, minute: 00}),
    speakers: [
        {
            name: 'Borislav Nikolov (‎jackdoe‎)',
            description: ''
        }
    ]
});

schedule.addEvent({
    title: 'SQL for accountants: understanding the beast via SpreadSheets‎',
    startTime: moment({hour: 11, minute: 30}),
    speakers: [
        {
            name: 'Peter Rabbitson (‎ribasushi‎)',
            description: ''
        }
    ]
});

schedule.addEvent({
    title: 'Lunch 🍔',
    startTime: moment({hour: 12, minute: 20})
});

schedule.addEvent({
    title: 'Recruitment in Perl - The State of the Perl Recruitment Market‎',
    startTime: moment({hour: 13, minute: 20}),
    speakers: [
        {
            name: 'Rick Deller',
            description: ''
        }
    ]
});

schedule.addEvent({
    title: 'Creative Perlmongership‎',
    startTime: moment({hour: 13, minute: 50}),
    speakers: [
        {
            name: 'Salve J. Nilsen (‎sjn‎)',
            description: 'One of the original Oslo.pm\'ers who seems to end up organizing stuff more often than hacking. The fellow behind the first Perl QA Hackathon, two Nordic Perl Workshops in Oslo and one more hackathon for the EPO and Perl6 crowd, another Perl 6 hackathon in Oslo, and the 2012 "Moving to Moose" hackathon. Was leader of Oslo.pm during most of it\'s first ten years, and has since then learned to say "no" a little more often :). Currently spending most of his time playing with different projects and advocating the use of FLOS Software in the Norwegian public sector.'
        }
    ]
});

schedule.addEvent({
    title: 'CSV made easier for end-users‎',
    startTime: moment({hour: 14, minute: 50}),
    speakers: [
        {
            name: 'H.Merijn Brand (‎Tux‎)',
            description: 'Using mainly open source utilities and C to exchange data between sources, porting open source to commercial OSes and support the Open Source community as widely as possible. perl5 Configure pumpking and CSV wizard.'
        }
    ]
});

schedule.addEvent({
    title: 'Coffee Break ☕',
    startTime: moment({hour: 15, minute: 40})
});
