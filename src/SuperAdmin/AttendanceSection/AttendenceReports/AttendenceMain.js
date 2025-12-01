import React from 'react';
import MonthlyAttendanceReport from './MonthlyAttendanceReport';
import AttendanceReport from './AttendanceReport';
import { Box } from '@mui/material';

function AttendanceMain() {
    return (

        <div sx={{ maxHeight: 600, overflowX: 'hidden' }}>

            <Box sx={{ p: 3 }}>


                <MonthlyAttendanceReport />


                <Box sx={{ mt: 4 }}>
                    <AttendanceReport />
                </Box>

            </Box>
        </div>

    );
}

export default AttendanceMain;