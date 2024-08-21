Feature: Show/Hide Event Details
    Scenario: An event element is collapsed by default.
        Given  the app is open
        When a list of events is displayed
        Then the elememt that displays information about each event should be hidden by default

    Scenario: User can expand an event to see details.
        Given a list of events is present
        When the user clicks on the show details button
        Then the element that displays information about this event should be shown

    Scenario: User can collapse an event to hide details.
        Given a list of events is present
        And the details about some event are showing
        When the user clicks on the hide details button
        Then the element that displays the details about the event should hide
