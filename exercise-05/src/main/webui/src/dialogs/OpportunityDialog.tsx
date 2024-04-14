import React, {useEffect, useState} from 'react';
import {Account} from "../model/account";
import {Opportunity} from "../model/opportunity";
import {Col, Container, Modal, Row} from "react-bootstrap";

const OpportunityDialog = (props: {
    show: boolean,
    opportunity: Opportunity,
    onSave: (opportunity: Opportunity) => void,
    onCancel: () => void
}) => {
    const [opportunity, setOpportunity] = useState<Opportunity>(props.opportunity);
    const [accounts, setAccounts] = useState<Account[]>([]);

    // Update the opportunity state when the user changes the name
    const onOpportunityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOpportunity({...opportunity, [event.target.name]: event.target.value});
    }

    // Update the address state when the user changes the address
    const onAccountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOpportunity({...opportunity, account: {...opportunity.account, [event.target.name]: event.target.value}});
    }

    // Fetch the accounts from the server.
    const fetchAccounts = () => {
        fetch("/api/v1/accounts")
            .then((response) => response.json())
            .then((data) => setAccounts(data));
    }

    // Fetch the accounts when the component mounts.
    useEffect(() => {
        fetchAccounts();
        setOpportunity(props.opportunity);
    }, [props.show]);

    // Reset the opportunity state.
    const resetOpportunity = () => {
        setOpportunity({} as Opportunity);
    }

    // Save the opportunity and close the dialog
    const save = () => {
        props.onSave(opportunity);
        resetOpportunity();
    }

    // Close the dialog
    const cancel = () => {
        props.onCancel();
        resetOpportunity();
    }

    return (
        <Modal show={props.show} onHide={cancel} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Opportunity</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <Container>
                        <Row>
                            <Col>
                                <div className="mb-3">
                                    <label htmlFor="account" className="form-label">Account</label>
                                    <select className="form-control" id="id" name="id" autoFocus={true}
                                           value={opportunity?.account?.id || ''}
                                           onChange={onAccountChange}>
                                        <option value={0}>Select an account</option>
                                        {accounts.map((account) => <option key={account.id} value={account.id}>{account.name}</option>)}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title"
                                           value={opportunity.title || ''}
                                           onChange={onOpportunityChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name="description"
                                           value={opportunity.description || ''}
                                           onChange={onOpportunityChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="amount" className="form-label">Amount</label>
                                    <input type="number" className="form-control" id="amount" name="amount"
                                           value={opportunity.amount || ''} onChange={onOpportunityChange}/>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-outline-secondary" onClick={cancel}>Cancel</button>
                <button type="button" className="btn btn-outline-primary" onClick={save}>Save</button>
            </Modal.Footer>
        </Modal>
    )
}

export default OpportunityDialog;
