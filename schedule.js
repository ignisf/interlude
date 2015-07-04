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
    startTime: moment({hour: 9, minute: 50})
});

schedule.addEvent({
    title: 'Node.js and Open Source Software Development on Microsoft Azure',
    startTime: moment({hour: 10}),
    speakers: [
        {
            name: 'Михаил Матеев',
            description: 'Михаил е разработчик в Infragistics. Работил е в различни области, свързани с технологии на Microsoft, като Silverlight, WPF, Windows Phone, Visual Studio LightSwitch, Windows Store приложения, WCF RIA Services, MS SQL Server и Microsoft Azure. През последните десет години, Михаил е писал статии за Computer World и различни блогове за .NET технологии. Той е сътрудник и технически редактор на PACKT Publishing and Wiley. Повече от пет години е работил в ESRI България. Няколко години Михаил е бил лектор в ФМИ на Софийския университет "Св. за Климент Охридски ". Също така е и преподавател по компютърни системи в Университет по Архитектура, Строителство и Геодезия в София.'
        }
    ]
});

schedule.addEvent({
    title: 'Редизайн на „държавата“ и препрограмиране на „системата“',
    startTime: moment({hour: 11, minute: 10}),
    speakers: [
        {
            name: 'Антон Стойчев',
            description: 'Антон е прекарал последните 2 години във Великобритания, работейки като разработчик, предимно на саморегулиращи се системи за извличане и анализ на данни, достигащи на размер стотици сървъри на AWS. Сега е тук и иска да добави смисъл и желание за неизбежния, целодневен престой пред монитор; Чрез “Civic Hacking” – нещо започващо с работещите в дигиталната сфера, но обхващащо всички други. Живее живота си майсторейки и обичайки, в опити за рисуване, писане, четене и прекарвайки часове в сглобяване на извинения за честите си пътувания.'
        }
    ]
});

schedule.addEvent({
    title: 'iOS Development - Tips & Tricks',
    startTime: moment({hour: 12, minute: 10}),
    speakers: [
        {
            name: 'Галин Кърджилов',
            description: 'Галин е проактивен и творчески настроен софтуерен инженер с повече от 10 години опит. В момента е посветен на мобилните разработки и работи като Senior iOS Developer в MentorMate София. Неговият стремеж е да генерира максимално въздействие към потребителите.'
        },
        {
            name: 'Стефан Цвятков',
            description: 'Стефан е започнал кариерата си като разработчик за Mac. През 2008 г. Apple пуска iOS SDK и това е началото на една ера. Оттогава, той работи по създаването iOS приложения. В MentorMate той успява да изгради най-големия екип от iOS програмисти в България. Стефан е известен с желанието си да подобри мобилните приложения, за да бъдат по-интерактивни, ефективни и оптимизирани за нуждите на бизнеса.'
        }
    ]
});

schedule.addEvent({
    title: 'Обяд',
    startTime: moment({hour: 12, minute: 40})
});

schedule.addEvent({
    title: 'The Cloud Beyond the Buzzword',
    startTime: moment({hour: 13, minute: 30}),
    speakers: [
        {
            name: 'Божидар Божанов',
            description: 'Божидар Божанов е програмист, а понякога и архитект. От скука е направил http://computoser.com - компютърен композитор, а друго негово хоби е лингвистиката. Притежател на "дебел" stackoverflow профил.'
        }
    ]
});

schedule.addEvent({
    title: 'Мета-програмиране с Nimrod',
    startTime: moment({hour: 14, minute: 20}),
    speakers: [
        {
            name: 'Захари Караджов',
            description: 'Захари е C++ ветеран от гейм-индустрията, а понастоящем технически директор в Даркиум Студио, където с помощта на кофейн и CoffeeScript се разработва нов социално ориентиран уеб браузър. Твърдо убеден е, че използваните в момента езици за програмиране ще бъдат изместени от нови по-бързи, по-мощни и по-красиви такива и от нетърпение сам се е захванал да допринесе за това, участвайки в разработката на Nimrod.'
        }
    ]
});

schedule.addEvent({
    title: 'File editing on the client side (Javascript)',
    startTime: moment({hour: 15, minute: 10}),
    speakers: [
        {
            name: 'Росен Колев',
            description: 'Росен работи като софтуерен разработчик повече от 5 години. В моментът е Senior .NET Developer в MentorMate Варна. Пише главно на .NET, C#, JavaScript и от време на време Objective-C. Обича добре подредед код и мрази лошата архитектура.'
        }
    ]
});

schedule.addEvent({
    title: 'Кафе пауза ☕',
    startTime: moment({hour: 15, minute: 50})
});

schedule.addEvent({
    title: 'Екстремно програмиране',
    startTime: moment({hour: 16, minute: 10}),
    speakers: [
        {
            name: 'Стефан Кънев',
            description: 'Стефан се занимава с програмиране откакто се помни. Сред любимите му неща са Ruby, Vim, автоматизирани тестове, папийонки, Apple продуктите и всевъзможни екзотични езици за програмиране. В заетото си време програмира на Rails, а в свободното - води един-два курса във ФМИ към СУ, пише много код, който после трие и се опитва да не се нарани с планинското си колело. Никак не обича PHP и е амбивалентен към Java.'
        }
    ]
});

schedule.addEvent({
    title: 'Lightning Talks',
    startTime: moment({hour: 17, minute: 00})
});

schedule.addEvent({
    title: 'Закриване',
    startTime: moment({hour: 18, minute: 00})
});
