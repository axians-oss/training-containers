package nl.axians.training.containers.services;

import nl.axians.training.containers.exercise04.domain.Opportunity;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.format.DateTimeFormatter;

/**
 * Service for publishing events.
 */
@Service
public class EventPublisher {

    /**
     * The JSON template for events.
     */
    private static final String EVENT_TEMPLATE = """
            {
                "EventId": "%s",
                "EventType": "%s",
                "EventDateTime": "%s",
                "EntityId": "%s"
            }
            """;

    private final JmsTemplate jmsTemplate;

    /**
     * Create a new instance.
     *
     * @param theJmsTemplate The {@link JmsTemplate} to use for publishing events.
     */
    public EventPublisher(final JmsTemplate theJmsTemplate) {
        jmsTemplate = theJmsTemplate;
    }

    /**
     * Publish a new {@link Opportunity} event.
     *
     * @param theOpportunity The opportunity for which to publish the event.
     */
    public void newOpportunityEvent(final Opportunity theOpportunity) {
        jmsTemplate.send("SalesCloudEvents", session -> {
            final String message = EVENT_TEMPLATE.formatted(
                    theOpportunity.getId(),
                    "NewOpportunity",
                    DateTimeFormatter.ISO_INSTANT.format(Instant.now()),
                    theOpportunity.getAccount().getId());
            return session.createTextMessage(message);
        });
    }

    /**
     * Publish a new {@link Opportunity} event.
     *
     * @param theOpportunity The opportunity for which to publish the event.
     */
    public void updatedOpportunityEvent(final Opportunity theOpportunity) {
        jmsTemplate.send("SalesCloudEvents", session -> {
            final String message = EVENT_TEMPLATE.formatted(
                    theOpportunity.getId(),
                    "UpdatedOpportunity",
                    DateTimeFormatter.ISO_INSTANT.format(Instant.now()),
                    theOpportunity.getAccount().getId());
            return session.createTextMessage(message);
        });
    }
}

