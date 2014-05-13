var reactive = new Ractive({
    // The `el` option can be a node, an ID, or a CSS selector.
    el: '.slides',

    // We could pass in a string, but for the sake of convenience
    // we're passing the ID of the script tag above.
    template: '#slides_template',

    // Here, we're passing in some initial data
    data: {event: schedule.nextEvent(), agenda: schedule.getEvents()}
});

function refreshEvent() {
    reactive.set({event: schedule.nextEvent(), agenda: schedule.getEvents()});
}
