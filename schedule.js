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
    title: 'Откриване',
    startTime: moment({hour: 10})
});


schedule.addEvent({
    title: 'За смъртта на TDD',
    startTime: moment({hour: 11}),
    lecturer: {
        name: 'Стефан Кънев',
        description: 'Стефан се занимава с програмиране откакто се помни. Сред любимите му неща са Ruby, Vim, автоматизирани тестове, папийонки, Apple продуктите и всевъзможни екзотични езици за програмиране. В заетото си време програмира на Rails, а в свободното - води един-два курса във ФМИ към СУ, пише много код, който после трие и се опитва да не се нарани с планинското си колело. Никак не обича PHP и е амбивалентен към Java.'
    }
});

schedule.addEvent({
    title: 'Компютърни игри за независими разработчици',
    startTime: moment({hour: 10, minute: 10}),
    lecturer: {
        name: 'Стефан Ставрев',
        description: 'Собственик и управител на TRI Soft. С над 3 години опит в проектирането и разработването на интелигентни системи и игри, и трудов стаж в научната компания TNO - основен партньор на Холандското министерство на отбраната. Понастоящем Стефан се занимава с разработката на иновативни автономни системи, компютърно зрение, разпознаване на лица и разработване на игри и интерактивни архитектурни визуализации в реално време. Изкуствен интелект и модерните технологии за него са не просто академични дисциплини, а и начин на мислене. В свободното си време обича да преподава. Води избираеми курсове в Пловдивския университет „Паисий Хилендарски“.'
    }
});

schedule.addEvent({
    title: 'Angular JS',
    startTime: moment({hour: 11, minute: 50}),
    lecturer: {
        name: 'Радослав Станков',
        description: 'Организатор на VarnaConf. Работи като developer от повече от 10 години. В момента основно разработва с Ruby, JavaScript и Objective-C. Участвал е в доста open-source проекти. Голяма част от тях могат да бъдат намерени в неговия Github акаунт.'
    }
});

schedule.addEvent({
    title: 'Обяд',
    startTime: moment({hour: 12, minute: 30})
});

schedule.addEvent({
    title: 'Lightning Talks',
    startTime: moment({hour: 13, minute: 30})
});

schedule.addEvent({
    title: 'Защо трябва да обичаме Haskell?',
    startTime: moment({hour: 14, minute: 30}),
    lecturer: {
        name: 'Радослав Георгиев',
        description: 'Радо, по-известен като РадоРадо, е предприемач-програмист (това е като warrior-mage), който се интересува от всичко свързано с технологии, разработка на софтуер, преподаване, автоматизиране и подобряване на образованието. Организатор на HackFMI - ежесеместърен хакатон във ФМИ (София), където млади и надъхани студенти и ученици, заменят комфорт и сън в името на създаване на софтуерни продукти, в рамките на 3 дни. В свободното си време се занимава с езици за функционално програмиране.'
    }
});

schedule.addEvent({
    title: 'Тенденции в потребителското изживяване',
    startTime: moment({hour: 15, minute: 20}),
    lecturer: {
        name: 'Теодор Лазаров',
        description: 'Теодор е управител маркетинг и реклама в TRI Soft. С над 9 години опит в областа на дизайна и рекламата. Интересува се постоянно от новите тенденции и добри практики в тази област. Работи усилено за потребителското изживяване ( UX ). Перфекционалист в работата си, обича да изпипва детайлите до съвършенство. Работил е с големи компании като Българо-Американска кредитна банка, Пампорово - АД, Корпоративна Търговска банка, адвокатска кантора SV-lawyers, рекламна агенция Megaboards и др. Теодор има и много голям интерес към продуктовия дизайн - нещо, на което производителите рядко обръщат внимание в България.'
    }
});

schedule.addEvent({
    title: 'Кафе пауза',
    startTime: moment({hour: 16, minute: 00})
});

schedule.addEvent({
    title: 'IT инфраструктура - що е то',
    startTime: moment({hour: 16, minute: 30}),
    lecturer: {
        name: 'Боян Кроснов',
        description: 'Собственик на Правец 82 (1987). Състезател - BOI, IOI. CCIE. Живял и работил в 5 държави. Съосновател на StorPool. Силни страни: Мрежи, x86 неща, datacenter неща, разпределени архитектури, мениджмънт на софтуерни продукти и предприемачество. Текуща изследователска дейност: екзотични системи и програмни езици, статии и лекции на тема съхранение на данни и стартъпи. Поведение на твърди дискове и SSD, оценяване на производителността на системи.'
    }
});

schedule.addEvent({
    title: 'Клъстеризация и Класификация',
    startTime: moment({hour: 17, minute: 20}),
    lecturer: {
        name: 'Екатерина Михайлова',
        description: 'Катя се занимава с програмиране от училище, като състезател по информатика. Била е стажант в Google, а в момента се занимава с компютърна лингвистика. Интересите ѝ включват машинно самообучение, лингвистика.'
    }
});

schedule.addEvent({
    title: 'Закриване',
    startTime: moment({hour: 18, minute: 00})
});
