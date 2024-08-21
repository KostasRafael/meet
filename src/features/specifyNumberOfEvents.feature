Feature: Specify Number of Events
    Scenario: When user has not specified a number, 32 events are shown by default.
        Given the user hasn't specified a number of events to be displayed
        When the app presents a list of events
        Then a list of 32 events should be shown by default

    Scenario: User can change the number of events displayed.
        Given the user is presented with a list of events
        When the user types a number in the input that specifies the number of events to be displayed
        Then The number of events displayed should be equal to the number specified by the user.