package nl.axians.training.containers.repository;

import nl.axians.training.containers.exercise04.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository for managing {@link Account} entities.
 */
public interface AccountRepository extends JpaRepository<Account, Long> {
}
