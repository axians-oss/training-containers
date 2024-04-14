import React, {useEffect, useState} from 'react';
import {Account} from "../model/account";
import {Col, Container, Modal, Row} from "react-bootstrap";

const AccountDialog = (props: {
    show: boolean,
    account: Account,
    onSave: (account: Account) => void,
    onCancel: () => void
}) => {
    const [account, setAccount] = useState<Account>(props.account);

    // update the account state when the user changes the name
    const onAccountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccount({...account, [event.target.name]: event.target.value});
    }

    // update the address state when the user changes the address
    const onAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAccount({...account, address: {...account.address, [event.target.name]: event.target.value}});
    }

    useEffect(() => {
        setAccount(props.account);
    }, [props.show]);

    const resetAccount = () => {
        setAccount({} as Account);
    }

    // save the account and close the dialog
    const save = () => {
        props.onSave(account);
        resetAccount();
    }

    // close the dialog
    const cancel = () => {
        props.onCancel();
        resetAccount();
    }

    return (
        <Modal show={props.show} onHide={cancel} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <Container>
                        <Row>
                            <Col>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" name="name" autoFocus={true}
                                           value={account.name || ''}
                                           onChange={onAccountChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email"
                                           value={account.email || ''}
                                           onChange={onAccountChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                    <input type="text" className="form-control" id="phoneNumber" name="phoneNumber"
                                           value={account.phoneNumber || ''} onChange={onAccountChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="vatNumber" className="form-label">VAT Number</label>
                                    <input type="text" className="form-control" id="vatNumber" name="vatNumber"
                                           value={account.vatNumber || ''} onChange={onAccountChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cocNumber" className="form-label">Chamber of Commerce Number</label>
                                    <input type="text" className="form-control" id="cocNumber" name="cocNumber"
                                           value={account.cocNumber || ''} onChange={onAccountChange}/>
                                </div>
                            </Col>
                            <Col>
                                <div className="mb-3">
                                    <label htmlFor="street" className="form-label">Street</label>
                                    <input type="text" className="form-control" id="street" name="street"
                                           value={account.address?.street || ''} onChange={onAddressChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="houseNumber" className="form-label">House Number</label>
                                    <input type="text" className="form-control" id="houseNumber" name="houseNumber"
                                           value={account.address?.houseNumber || ''} onChange={onAddressChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="houseNumberSuffix" className="form-label">House Number
                                        Suffix</label>
                                    <input type="text" className="form-control" id="houseNumberSuffix"
                                           name="houseNumberSuffix"
                                           value={account.address?.houseNumberSuffix || ''} onChange={onAddressChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="postalCode" className="form-label">Postal Code</label>
                                    <input type="text" className="form-control" id="postalCode" name="postalCode"
                                           value={account.address?.postalCode || ''} onChange={onAddressChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input type="text" className="form-control" id="city" name="city"
                                           value={account.address?.city || ''} onChange={onAddressChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <input type="text" className="form-control" id="state" name="state"
                                           value={account.address?.state || ''} onChange={onAddressChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <input type="text" className="form-control" id="country" name="country"
                                           value={account.address?.country || ''} onChange={onAddressChange}/>
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

export default AccountDialog;
