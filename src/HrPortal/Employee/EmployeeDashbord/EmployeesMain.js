import React from 'react'
import BirthdayTable from './BirthdaysInMonth'
import WorkAnniversary from './WorkAnniversary'
import ConfirmationPending from './ConfirmationPending'

function EmployeeDashbord() {
    return (
        <div>
            <BirthdayTable />
            <WorkAnniversary />
            <ConfirmationPending />

        </div>
    )
}

export default EmployeeDashbord
