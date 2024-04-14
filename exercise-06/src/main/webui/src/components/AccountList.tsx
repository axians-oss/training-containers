import React, {useState, useEffect} from "react";
import {Account} from "../model/account";
import {Button, Table} from "react-bootstrap";
import AccountDialog from "../dialogs/AccountDialog";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faArrowsRotate, faTrash, faPenToSquare} from "@fortawesome/free-solid-svg-icons";

// The AccountList component fetches the list of accounts from the server and renders them as a list.
export const AccountList = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [account, setAccount] = useState<Account>({} as Account);
    const [showAccountDialog, setShowAccountDialog] = useState(false);

    // Fetch the accounts from the server.
    const refreshAccounts = () => {
        fetch("/api/v1/accounts")
            .then((response) => response.json())
            .then((data) => setAccounts(data));
    }

    // Fetch the accounts when the component mounts.
    useEffect(() => {
        refreshAccounts();
    }, []);

    // Show the account dialog to add a new account.
    const addAccount = () => {
        setAccount({} as Account);
        setShowAccountDialog(true);
    }

    const onDelete = (id: number) => {
        fetch(`/api/v1/accounts/${id}`, {
            method: "DELETE",
        }).then(() => refreshAccounts());
    }

    const onSave = (account: Account) => {
        fetch(account.id ? `/api/v1/accounts/${account.id}` : "/api/v1/accounts", {
            method: account.id ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(account),
        }).then(() => {
            refreshAccounts();
            setShowAccountDialog(false);
        });
    }

    const onCancel = () => {
        setShowAccountDialog(false);
    }

    const onEdit = (id: number) => {
        fetch(`/api/v1/accounts/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setAccount(data);
                setShowAccountDialog(true);
            });
    }

    return (
        <div className="mx-4">
            <div className="mx-4 mb-1 text-end">
                <Button variant="outline-primary" onClick={refreshAccounts} size={"sm"}  >
                    <FontAwesomeIcon icon={faArrowsRotate} />
                </Button>
                <Button variant="outline-primary" className="mx-1" onClick={addAccount} size={"sm"}>
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
                <AccountDialog show={showAccountDialog} account={account} onSave={onSave} onCancel={onCancel} />
            </div>
            <div className="mx-4 text-start">
                <Table striped hover size="sm">
                    <thead>
                    <tr>
                        <th align={"left"}>ID</th>
                        <th align={"left"}>Name</th>
                        <th align={"right"}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {accounts.length === 0 && (
                        <tr>
                            <td colSpan={2}>No accounts found.</td>
                        </tr>
                    )}
                    {accounts.map((account) => (
                        <tr key={account.id}>
                            <td align={"left"} valign={"middle"}>{account.id}</td>
                            <td align={"left"} valign={"middle"}>{account.name}</td>
                            <td>
                                <div className="text-end">
                                    <Button variant="outline-primary" size={"sm"} onClick={() => onDelete(account.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                    <Button variant="outline-primary" size={"sm"} className="mx-1" onClick={() => onEdit(account.id)}>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );

}