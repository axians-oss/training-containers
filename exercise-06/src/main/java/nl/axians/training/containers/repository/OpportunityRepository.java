package nl.axians.training.containers.repository;


import nl.axians.training.containers.domain.Opportunity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for managing {@link Opportunity} entities.
 */
public interface OpportunityRepository extends JpaRepository<Opportunity, Long> {
}
