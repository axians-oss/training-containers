package nl.axians.training.containers.domain;

import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

/**
 * Represents an opportunity related to a specific {@link Account}.
 */
@Getter
@Setter
@Entity
@Table(name = "opportunities")
public class Opportunity {

    @Id
    @GeneratedValue
    @JsonView(Views.Opportunity.class)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "account_id", foreignKey =  @ForeignKey(name = "account_fk"))
    @JsonView(Views.Opportunity.class)
    private Account account;

    @Column(name = "registration_datetime", nullable = false)
    @JsonView(Views.Opportunity.class)
    private Instant registrationDateTime;

    @Column(name = "title", nullable = false)
    @JsonView(Views.Opportunity.class)
    private String title;

    @Column(name = "description")
    @JsonView(Views.Opportunity.class)
    private String description;

    @Column(name = "amount", nullable = false)
    @JsonView(Views.Opportunity.class)
    private Double amount;

}
