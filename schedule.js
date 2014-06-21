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
    title: 'Кафе',
    startTime: moment({hour: 9, minute: 30})
});

schedule.addEvent({
    title: 'Откриване',
    startTime: moment({hour: 10})
});

schedule.addEvent({
    title: 'The idiot\'s approach to patching',
    startTime: moment({hour: 10, minute: 10}),
    speaker: {
        name: 'Мариян Маринов',
        description: 'Мариян е системен администратор по душа. Занимава се с Линукс от 16 години. Той е партньор и управител на 1H Ltd. - фирма, която пише софтуер за server management специфично за hosting доставчици. Голям фен е на Open Source софтуера и редовно говори на различни Open Source конференции на Балканите. Той също помага и за случването на OpenFest - най-голямата българска Free and Open Source конференция. В свободното си време води курсове по Системна администрация и Мрежова сигурност в Софийски университет и Telerik.'
    }
});

schedule.addEvent({
    title: 'Редактори vs. IDE-та',
    startTime: moment({hour: 11}),
    speaker: {
        name: 'Стефан Кънев',
        description: 'Стефан се занимава с програмиране откакто се помни. Сред любимите му неща са Ruby, Vim, автоматизирани тестове, папийонки, Apple продуктите и всевъзможни екзотични езици за програмиране. В заетото си време програмира на Rails, а в свободното - води един-два курса във ФМИ към СУ, пише много код, който после трие и се опитва да не се нарани с планинското си колело. Никак не обича PHP и е амбивалентен към Java.'
    }
});

schedule.addEvent({
    title: 'Разработка на хибридни мобилни приложения',
    startTime: moment({hour: 11, minute: 50}),
    speaker: {
        name: 'Георги Георгиев',
        description: 'Ръководител офис Бургас на ТехноЛогика ЕАД, с над 8 години професионален опит в проектиране, разработка и внедряване на информационни системи с .NET, Web Forms, Windows Forms, WPF, WCF технологии, както и Data Warehouse системи с Oracle RDBMS технологии, APEX, Warehouse Builder, Data Integrator. Напоследък с особен фокус върху мобилните платформи и хибридните решения. Преподавател по различни курсове на Oracle, системен анализ с UML и управление на изисквания в учебния център на ТехноЛогика.'
    }
});

schedule.addEvent({
    title: 'Обяд',
    startTime: moment({hour: 12, minute: 30})
});

schedule.addEvent({
    title: 'Single Page Application – AngularJS, NodeJS',
    startTime: moment({hour: 13, minute: 30}),
    speaker: {
        name: 'Димитър Данаилов',
        description: 'Димитър Данаилов има солиден опит (6+ години) като софтуерен програмист в следните области: Java, PHP, Android, Mobile Development, Ruby on Rails, Javascript, HTML 5. В момента усилено изучава Cloud Технологии, Windows 8, Node.js, Asp.Net, Angularjs, Dart. През последната една година усилено работи за изграждането на IT общност във Варна. Като успешно се проведоха курсове по Android и Javascript Development. Един от организаторите на Cloud Conf Varna и Startup Weekend Varna.'
    }
});

schedule.addEvent({
    title: 'Автоматизация с Grunt',
    startTime: moment({hour: 14, minute: 20}),
    speaker: {
        name: 'Христо Чакъров',
        description: 'Христо (Ицката) е фронт-енд архитект и тиим лиид в Нетклайм, чиито продукт е SiteKreator – мощен website builder. Основно се занимава с проектиране на интерфейси, интеграция на фронт-енд технологии, и писане на технически спесификации. Отвреме-навреме коди, за да поддържа форма. Води курсове по JavaScript. В малкото си свободно време се занимава с какво ли не - фотография, фитнес, тенис, отскоро и с кикбокс.'
    }
});

schedule.addEvent({
    title: 'Command Line <> GUI?',
    startTime: moment({hour: 15, minute: 10}),
    speaker: {
        name: 'Евгени Кунев',
        description: 'От ранна възраст е запленен от нещата, които работят. От същия момент е обзет от желание да ги счупи, за да види може ли след това да ги поправи(да бъдат поправени изобщо). Тръгва по кривия път на математиката в невръстна възраст, когато преподаваната математика е лесна и в последствие осъзнава, че не му е там мястото. По-късно отива в (затвора) ФМИ и попада на (хора) съмишленици. Обича да е и от двете страни на обучителния процес. Изживява се като *nix проповедник и neckbeard. Обича да се кара на хората, които харесват нещата, „просто да работят“. Изкарва си хляба с web и python. Преподава разни неща, заради удоволствието да вижда ентусизъм у хора, научаващи нови неща.'
    }
});

schedule.addEvent({
    title: 'Кафе пауза ☕',
    startTime: moment({hour: 15, minute: 50})
});

schedule.addEvent({
    title: '3D графика в браузъра с three.js',
    startTime: moment({hour: 16, minute: 10}),
    speaker: {
        name: 'Андрей Радев',
        description: 'Андрей е предимно рубист, върл вимаджия, и web developer по занаят. В момента живее в Берлин и e самотния developer в малък стартъп. Съответно се занимава с всичко що е програмиране, от DevOps до javascript анимацийки. За сметка на това, поне има "CTO" на бизнес картичката. Любовта му към видеоигрите обаче все още не е утихнала и има мъгляви планове някой ден да захвърли всичко, да иде да живее в пещера и да излезе с покъртителна indie игра, която да промени света. Или поне да има впечатляващи експлозии.'
    }
});

schedule.addEvent({
    title: 'Сигурността на системи от реалния свят',
    startTime: moment({hour: 17, minute: 00}),
    speaker: {
        name: 'Васил Колев',
        description: 'Васил Колев е системен администратор от 15 години, който се занимава с всякакви системи под сериозно натоварване, а като това му доскучае – с хора.'
    }
});

schedule.addEvent({
    title: 'Lightning Talks',
    startTime: moment({hour: 17, minute: 50})
});

schedule.addEvent({
    title: 'Закриване',
    startTime: moment({hour: 18, minute: 50})
});
