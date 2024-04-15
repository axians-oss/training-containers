package nl.axians.training.containers.controllers;

import com.fasterxml.jackson.annotation.JsonView;
import nl.axians.training.containers.domain.Account;
import nl.axians.training.containers.domain.Opportunity;
import nl.axians.training.containers.domain.Views;
import nl.axians.training.containers.services.OpportunityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/opportunities")
public class OpportunityController {

    private final OpportunityService opportunityService;

    /**
     * Create a new instance.
     *
     * @param theOpportunityService The {@link OpportunityService} to use for managing {@link Opportunity} instances.
     */
    public OpportunityController(final OpportunityService theOpportunityService) {
        opportunityService = theOpportunityService;
    }

    /**
     * Add the specified {@link Account}.
     *
     * @param theOpportunity The opportunity to add.
     * @return The newly added opportunity, including the assigned id.
     */
    @PostMapping
    public ResponseEntity<Opportunity> createOpportunity(final @RequestBody Opportunity theOpportunity) {
        return new ResponseEntity<>(opportunityService.addOpportunity(theOpportunity), HttpStatus.CREATED);
    }

    /**
     * Update an existing opportunity.
     *
     * @param id The id of the opportunity to update.
     * @param theUpdatedOpportunity The updated opportunity.
     * @return The updated opportunity.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Opportunity> updateOpportunity(
            final @PathVariable Long id,
            final @RequestBody Opportunity theUpdatedOpportunity) {
        theUpdatedOpportunity.setId(id);
        return new ResponseEntity<>(opportunityService.updateOpportunity(theUpdatedOpportunity), HttpStatus.OK);
    }

    /**
     * Delete the opportunity with the specified id.
     *
     * @param theId Identifies the opportunity.
     */
    @DeleteMapping("/{theId}")
    public ResponseEntity<Void> deleteOpportunity(final @PathVariable Long theId) {
        opportunityService.deleteOpportunity(theId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * Get the opportunity with the specified id.
     *
     * @param theId Identifies the opportunity.
     * @return The account or 404 if not found.
     */
    @GetMapping("/{theId}")
    @JsonView(Views.Opportunity.class)
    public ResponseEntity<Opportunity> retrieveOpportunity(@PathVariable Long theId) {
        return new ResponseEntity<>(opportunityService.getOpportunity(theId), HttpStatus.OK);
    }

    /**
     * Get all opportunities.
     *
     * @return All accounts.
     */
    @GetMapping
    @JsonView(Views.Opportunity.class)
    public ResponseEntity<List<Opportunity>> retrieveAllOpportunities() {
        return new ResponseEntity<>(opportunityService.getOpportunities(), HttpStatus.OK);
    }


}
