import React, {useState, useEffect} from "react";
import {Button, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faArrowsRotate, faTrash, faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {Opportunity} from "../model/opportunity";
import OpportunityDialog from "../dialogs/OpportunityDialog";

export const OpportunityList = () => {
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
    const [opportunity, setOpportunity] = useState<Opportunity>({} as Opportunity);
    const [showOpportunityDialog, setShowOpportunityDialog] = useState(false);

    // Fetch the opportunities from the server.
    const refreshOpportunities = () => {
        fetch("/api/v1/opportunities")
            .then((response) => response.json())
            .then((data) => setOpportunities(data));
    }

    // Fetch the opportunities when the component mounts.
    useEffect(() => {
        refreshOpportunities();
    }, []);

    // Show the opportunity dialog to add a new opportunity.
    const addOpportunity = () => {
        setOpportunity({} as Opportunity);
        setShowOpportunityDialog(true);
    }

    const onDelete = (id: number) => {
        fetch(`/api/v1/opportunities/${id}`, {
            method: "DELETE",
        }).then(() => refreshOpportunities());
    }

    const onSave = (opportunity: Opportunity) => {
        fetch(opportunity.id ? `/api/v1/opportunities/${opportunity.id}` : "/api/v1/opportunities", {
            method: opportunity.id ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(opportunity),
        }).then(() => {
            refreshOpportunities();
            setShowOpportunityDialog(false);
        });
    }

    const onCancel = () => {
        setShowOpportunityDialog(false);
    }

    const onEdit = (id: number) => {
        fetch(`/api/v1/opportunities/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setOpportunity(data);
                setShowOpportunityDialog(true);
            });
    }

    return (
        <div className="mx-4">
            <div className="mx-4 mb-1 text-end">
                <Button variant="outline-primary" onClick={refreshOpportunities} size={"sm"}  >
                    <FontAwesomeIcon icon={faArrowsRotate} />
                </Button>
                <Button variant="outline-primary" className="mx-1" onClick={addOpportunity} size={"sm"}>
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
                <OpportunityDialog show={showOpportunityDialog} opportunity={opportunity} onSave={onSave} onCancel={onCancel} />
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
                    {opportunities.length === 0 && (
                        <tr>
                            <td colSpan={2}>No opportunities found.</td>
                        </tr>
                    )}
                    {opportunities.map((opportunity) => (
                        <tr key={opportunity.id}>
                            <td align={"left"} valign={"middle"}>{opportunity.id}</td>
                            <td align={"left"} valign={"middle"}>{opportunity.title}</td>
                            <td>
                                <div className="text-end">
                                    <Button variant="outline-primary" size={"sm"} onClick={() => onDelete(opportunity.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                    <Button variant="outline-primary" size={"sm"} className="mx-1" onClick={() => onEdit(opportunity.id)}>
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