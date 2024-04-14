package nl.axians.training.containers.services;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import nl.axians.training.containers.exercise04.domain.Opportunity;
import nl.axians.training.containers.exercise04.repository.OpportunityRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

/**
 * Service for managing {@link Opportunity} instances.
 */
@Service
public class OpportunityService {

    private final OpportunityRepository repository;
    private final EventPublisher eventPublisher;

    /**
     * Create a new instance.
     *
     * @param theOpportunityRepository The {@link OpportunityRepository} to use for managing {@link Opportunity} instances.
     * @param theEventPublisher        The {@link EventPublisher} to use for publishing events.
     */
    public OpportunityService(final OpportunityRepository theOpportunityRepository,
                              final EventPublisher theEventPublisher) {
        repository = theOpportunityRepository;
        eventPublisher = theEventPublisher;
    }

    /**
     * Add the specified {@link Opportunity}.
     *
     * @param theOpportunity The opportunity to add.
     * @return The newly added opportunity, including the assigned id.
     */
    @Transactional
    public Opportunity addOpportunity(final Opportunity theOpportunity) {
        theOpportunity.setRegistrationDateTime(Instant.now());
        repository.save(theOpportunity);
        eventPublisher.newOpportunityEvent(theOpportunity);
        return theOpportunity;
    }

    /**
     * Update an existing opportunity.
     *
     * @param theOpportunity The updated opportunity.
     */
    @Transactional
    public Opportunity updateOpportunity(final Opportunity theOpportunity) {
        theOpportunity.setRegistrationDateTime(Instant.now());
        repository.save(theOpportunity);
        eventPublisher.updatedOpportunityEvent(theOpportunity);
        return repository.save(theOpportunity);
    }

    /**
     * Get the opportunity with the specified id.
     *
     * @param theOpportunityId Identifies the opportunity.
     * @return The opportunity or {@link EntityNotFoundException} if not found.
     */
    public Opportunity getOpportunity(final long theOpportunityId) {
        return repository.findById(theOpportunityId).orElseThrow(EntityNotFoundException::new);
    }

    /**
     * Delete the opportunity with the specified id.
     *
     * @param theOpportunityId Identifies the opportunity.
     */
    @Transactional
    public void deleteOpportunity(final long theOpportunityId) {
        repository.deleteById(theOpportunityId);
    }

    /**
     * Get all opportunities.
     *
     * @return All opportunities.
     */
    public List<Opportunity> getOpportunities() {
        return repository.findAll();
    }

}

