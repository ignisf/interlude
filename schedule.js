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
        if (typeof nextEvent != 'undefined' && typeof latestEvent != 'undefined' && (latestEvent.displayNext || moment(nextEvent.startTime).subtract('minutes', 10).isAfter(moment()))) {
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
    title: 'Кафе',
    startTime: moment({hour: 9, minute: 30})
});

schedule.addEvent({
    title: 'Откриване',
    startTime: moment({hour: 10})
});

schedule.addEvent({
    title: 'Уеб сайтове с Perl Dancer',
    startTime: moment({hour: 10, minute: 10}),
    speakers: [
        {
            name: 'Мариян Маринов',
            description: 'Мариян е системен администратор по душа. Занимава се с Линукс от 16 години. Той е партньор и управител на 1H Ltd. - фирма, която пише софтуер за server management специфично за hosting доставчици. Голям фен е на Open Source софтуера и редовно говори на различни Open Source конференции на Балканите. Той също помага и за случването на OpenFest - най-голямата българска Free and Open Source конференция. В свободното си време води курсове по Системна администрация и Мрежова сигурност в Софийски университет и Telerik.'
        }
    ]
});

schedule.addEvent({
    title: 'Zero Downtime Deployment with Relational Databases',
    startTime: moment({hour: 11, minute: 00}),
    speakers: [
        {
            name: 'Неда Калчева',
            description: 'Неда е CTO на PowerToFly, разработчик по душа, а в Бургас е позната като майката на Лора. Преди това е учила в САЩ и е работила като програмист и софтуерен архитект. В момента живее в Бургас заедно със семейството си.'
        }
    ]
});

schedule.addEvent({
    title: 'Извличане на информация или как работят търсачките',
    startTime: moment({hour: 11, minute: 50}),
    speakers: [
        {
            name: 'Мария Матева',
            description: 'Мария е ентусиаст в областта на изкуствения интелект. Част е от Data Science Society. На последните си две работни места работи по софтуер, взимащ интелигентни решения - семантична търсачка, класификатори, препоръчваща система, софтуер за анализ и оптимизация на кредитен риск. В рамките на три семестъра преподава в магистърския курс "Извличане на информация" във ФМИ на СУ, откъдето идва и вдъхновението за тази лекция.'
        }
    ]
});

schedule.addEvent({
    title: 'Обяд',
    startTime: moment({hour: 12, minute: 30})
});

schedule.addEvent({
    title: 'Wearables',
    startTime: moment({hour: 13, minute: 20}),
    speakers: [
        {
            name: 'Стоян Узунов',
            description: 'Стоян е програмист в бургаския офис на ТехноЛогика, занимава се предимно с .NET. От 4 години е студент партньор на Microsoft. Обича да ходи по различни състезания по програмиране и изпитва странен и необясним интерес към разнообразни нови джаджи.'
        }
    ]
});

schedule.addEvent({
    title: 'Swift in the Real World',
    startTime: moment({hour: 14, minute: 10}),
    speakers: [
        {
            name: 'Галин Кърджилов',
            description: 'Галин е проактивен и творчески настроен софтуерен инженер с повече от 10 години опит. В момента е посветен на мобилните разработки и работи като Senior iOS Developer в 23snaps София. Неговият стремеж е да генерира максимално въздействие към потребителите.'
        }
    ]
});

schedule.addEvent({
    title: 'Кафе пауза ☕',
    startTime: moment({hour: 14, minute: 50})
});


schedule.addEvent({
    title: 'Изкуствен интелект – възможности или заплаха?',
    startTime: moment({hour: 15, minute: 10}),
    speakers: [
        {
            name: 'Стефан Ставрев',
            description: 'Собственик и управител на TRI Soft. С над 3 години опит в проектирането и разработването на интелигентни системи и игри, и трудов стаж в научната компания TNO - основен партньор на Холандското министерство на отбраната. Понастоящем Стефан се занимава с разработката на иновативни автономни системи, компютърно зрение, разпознаване на лица и разработване на игри и интерактивни архитектурни визуализации в реално време. Изкуствен интелект и модерните технологии за него са не просто академични дисциплини, а и начин на мислене. В свободното си време обича да преподава. Води избираеми курсове в Пловдивския университет "Паисий Хилендарски".'
        }
    ]
});

schedule.addEvent({
    title: 'Lightning Talks',
    startTime: moment({hour: 16, minute: 00})
});

schedule.addEvent({
    title: 'Закриване',
    startTime: moment({hour: 17, minute: 00})
});
