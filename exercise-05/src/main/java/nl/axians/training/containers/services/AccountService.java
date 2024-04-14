package nl.axians.training.containers.services;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import nl.axians.training.containers.exercise04.domain.Account;
import nl.axians.training.containers.exercise04.repository.AccountRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service for managing {@link Account} instances.
 */
@Service
public class AccountService {

    private final AccountRepository repository;

    /**
     * Create a new instance.
     *
     * @param theAccountRepository The {@link AccountRepository} to use for managing {@link Account} instances.
     */
    public AccountService(final AccountRepository theAccountRepository) {
        repository = theAccountRepository;
    }

    /**
     * Add the specified {@link Account}.
     *
     * @param theAccount The account to add.
     * @return The newly added account, including the assigned id.
     */
    @Transactional
    public Account addAccount(final Account theAccount) {
        return repository.save(theAccount);
    }

    /**
     * Update an existing account.
     *
     * @param theAccount The updated account.
     */
    @Transactional
    public Account updateAccount(final Account theAccount) {
        return repository.save(theAccount);
    }

    /**
     * Get the account with the specified id.
     *
     * @param theAccountId Identifies the account.
     * @return The account or {@link EntityNotFoundException} if not found.
     */
    public Account getAccount(final long theAccountId) {
        return repository.findById(theAccountId).orElseThrow(EntityNotFoundException::new);
    }

    /**
     * Delete the account with the specified id.
     *
     * @param theAccountId Identifies the account.
     */
    @Transactional
    public void deleteAccount(final long theAccountId) {
        repository.deleteById(theAccountId);
    }

    /**
     * Get all accounts.
     *
     * @return All accounts.
     */
    public List<Account> getAccounts() {
        return repository.findAll();
    }

}
