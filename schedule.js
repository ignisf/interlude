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
    title: 'Behind the scenes of a grown-up web application‎',
    startTime: moment({hour: 10, minute: 00}),
    speakers: [
        {
            name: 'Kerstin Puschke (‎titanoboa‎)',
            description: 'Kerstin Puschke is a software engineer living in Hamburg. As part of an awesome team, she contributes to the backend of XING, a social network for business professionals with about 14 million users.'
        }
    ]
});

schedule.addEvent({
    title: 'GOTO statement considered awesome‎',
    startTime: moment({hour: 10, minute: 30}),
    speakers: [
        {
            name: 'Carl Mäsak (‎masak‎)',
            description: 'Has been programming Perl since 2001. Found Perl 6 somewhere around 2004, and fell in love. Now doing a number of projects in Perl 5 and 6. A regular at #perl6, he often helps newcomers and does smallish tasks on the Perl 6 specs, test suite and on Rakudo and Niecza.'
        }
    ]
});

schedule.addEvent({
    title: '‎C-Day Is Coming‎',
    startTime: moment({hour: 11}),
    speakers: [
        {
            name: 'liz',
            description:  'Made some interesting modules, to be found at CPAN. Co-organiser YAPC::Europe::2001 in Amsterdam. Chairman of YAPC::Europe::Foundation (YEF)'
        }
    ]
});

schedule.addEvent({
    title: 'Lunch',
    startTime: moment({hour: 12, minute: 20})
});

schedule.addEvent({
    title: 'Digest:SHA is broken‎',
    startTime: moment({hour: 13, minute: 20}),
    speakers: [
        {
            name: 'Mark Overmeer (‎markov‎)',
            description: 'Perl, Perl and UNIX'
        }
    ]
});


schedule.addEvent({
    title: 'Asynchronous Programming with Futures‎',
    startTime: moment({hour: 13, minute: 50}),
    speakers: [
        {
            name: 'Paul Evans (‎LeoNerd‎)',
            description: ''
        }
    ]
});

schedule.addEvent({
    title: 'Adventures in Perl 6 Asynchrony‎',
    startTime: moment({hour: 14, minute: 50}),
    speakers: [
        {
            name: 'Jonathan Worthington (‎jnthn‎)',
            description: 'In the Perl world, Jonathan is best known as one of the key developers of the Rakudo Perl 6 compiler. His work has focused on the object model, type system, multiple dispatch and signatures. He\'s a regular speaker in the European Perl Conference and Workshop scene, and finds any invite to come and speak and enjoy a few beers with the local Perl hackers hard to resist.'
        }
    ]
});

schedule.addEvent({
    title: 'Coffee Break',
    startTime: moment({hour: 15, minute: 40})
});

schedule.addEvent({
    title: '‎Day 3 Keynote - The Joy In What We Do‎',
    startTime: moment({hour: 16, minute: 10}),
    speakers: [
        {
            name: 'Sawyer X',
            description: ''
        }
    ]
});

schedule.addEvent({
    title: 'Lightning Talks',
    startTime: moment({hour: 17, minute: 00}),
});
