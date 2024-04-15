package nl.axians.training.containers.controllers;

import lombok.extern.slf4j.Slf4j;
import nl.axians.training.containers.domain.Account;
import nl.axians.training.containers.domain.Opportunity;
import nl.axians.training.containers.services.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/accounts")
@Slf4j
public class AccountController {

    private final AccountService accountService;

    /**
     * Create a new instance.
     *
     * @param theAccountService The {@link AccountService} to use for managing {@link Account} instances.
     */
    public AccountController(final AccountService theAccountService) {
        accountService = theAccountService;
    }

    /**
     * Add the specified {@link Account}.
     *
     * @param theAccount The account to add.
     * @return The newly added account, including the assigned id.
     */
    @PostMapping
    public ResponseEntity<Account> createAccount(final @RequestBody Account theAccount) {
        return new ResponseEntity<>(accountService.addAccount(theAccount), HttpStatus.CREATED);
    }

    /**
     * Update an existing account.
     *
     * @param id The id of the account to update.
     * @param theUpdatedAccount The updated account.
     * @return The updated account.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Account> updateAccount(final @PathVariable Long id,
                                                 final @RequestBody Account theUpdatedAccount) {
        theUpdatedAccount.setId(id);
        return new ResponseEntity<>(accountService.updateAccount(theUpdatedAccount), HttpStatus.OK);
    }

    /**
     * Delete the account with the specified id.
     *
     * @param theId Identifies the account.
     */
    @DeleteMapping("/{theId}")
    public ResponseEntity<Void> deleteAccount(final @PathVariable Long theId) {
        accountService.deleteAccount(theId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * Get the account with the specified id.
     *
     * @param theId Identifies the account.
     * @return The account or 404 if not found.
     */
    @GetMapping("/{theId}")
    public ResponseEntity<Account> retrieveAccount(@PathVariable Long theId) {
        return new ResponseEntity<>(accountService.getAccount(theId), HttpStatus.OK);
    }

    /**
     * Get all accounts.
     *
     * @return All accounts.
     */
    @GetMapping
    public ResponseEntity<List<Account>> retrieveAllAccounts() {
        log.info("Retrieving all accounts");
        return new ResponseEntity<>(accountService.getAccounts(), HttpStatus.OK);
    }

    /**
     * Get the opportunities for the account with the specified id.
     *
     * @param theId Identifies the account.
     * @return The opportunities for the account.
     */
    @GetMapping("/{theId}/opportunities")
    public ResponseEntity<List<Opportunity>> retrieveOpportunities(@PathVariable Long theId) {
        return new ResponseEntity<>(accountService.getAccount(theId).getOpportunities(), HttpStatus.OK);
    }

}
