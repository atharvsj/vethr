
import React, { createContext, useState } from 'react';

export const EmployeeContext = createContext();

export const EmployeeIdProvider = ({ children }) => {
  const [employeeId, setEmployeeId] = useState(null);

  return (
    <EmployeeContext.Provider value={{ employeeId, setEmployeeId }}>
      {children}
    </EmployeeContext.Provider>
  );
};