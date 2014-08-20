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
    title: 'Registration and Attendees Meet and Greet',
    startTime: moment({hour: 9, minute: 30})
});

schedule.addEvent({
    title: 'Welcome to YAPC',
    startTime: moment({hour: 11})
});

schedule.addEvent({
    title: 'How The Camel Is De-Cocooning‎',
    startTime: moment({hour: 11, minute: 30}),
    speakers: [
        {
            name: 'liz',
            description: 'Made some interesting modules, to be found at CPAN. Co-organiser YAPC::Europe::2001 in Amsterdam. Chairman of YAPC::Europe::Foundation (YEF)'
        }
    ]
});

schedule.addEvent({
    title: 'Lunch',
    startTime: moment({hour: 12, minute: 20})
});

schedule.addEvent({
    title: '‎Code I\'m proud of‎',
    startTime: moment({hour: 13, minute: 20}),
    speakers: [
        {
            name: 'Thomas Klausner (‎domm‎)',
            description: 'Currently full-time father of 2 kids, half-time Perl hacker, sort-of DJ, bicyclist, no longer dreadlocked and more than 34 years old but too lazy to update his profile once a year.'
        }
    ]
});

schedule.addEvent({
    title: 'How to Fake a Database Design‎',
    startTime: moment({hour: 13, minute: 50}),
    speakers: [
        {
            name: 'Curtis Poe (‎Ovid‎)',
            description: 'Freelance Perl guru for hire. Perl Foundation Board Committee member. Former Perl Foundation Grant Committee chair. Testing zealot. Professional expat. Beer lover.'
        }
    ]
});

schedule.addEvent({
    title: 'Rakudo Perl 6 and MoarVM Performance Advances‎',
    startTime: moment({hour: 14, minute: 50}),
    speakers: [
        {
            name: 'Jonathan Worthington (‎jnthn‎)',
            description: 'In the Perl world, Jonathan is best known as one of the key developers of the Rakudo Perl 6 compiler. His work has focused on the object model, type system, multiple dispatch and signatures. He\'s a regular speaker in the European Perl Conference and Workshop scene, and finds any invite to come and speak and enjoy a few beers with the local Perl hackers hard to resist.'
        }
    ]
});

schedule.addEvent({
    title: 'Coffee Break ☕',
    startTime: moment({hour: 15, minute: 40})
});

schedule.addEvent({
    title: 'Lightning Talks',
    startTime: moment({hour: 16, minute: 10}),
});

schedule.addEvent({
    title: '‎Day 1 Keynote - You\'re Killing Managers (Keep It Up)‎',
    startTime: moment({hour: 17, minute: 10}),
    speakers: [
        {
            name: 'Curtis Poe (‎Ovid‎)',
            description: 'Freelance Perl guru for hire. Perl Foundation Board Committee member. Former Perl Foundation Grant Committee chair. Testing zealot. Professional expat. Beer lover.'
        }
    ]
});

schedule.addEvent({
    title: 'Official conference dinner‎',
    startTime: moment({hour: 19, minute: 00})
});
