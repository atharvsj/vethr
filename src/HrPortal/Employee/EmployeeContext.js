import React, { createContext, useState } from "react";

export const EmployeeContext = createContext({ employeeId: null, setEmployeeId: () => {} });

export const EmployeeIdProvider = ({ children }) => {
  const [employeeId, setEmployeeId] = useState(null);
  console.log('employeeId from context:', employeeId);
  return (
    <EmployeeContext.Provider value={{ employeeId, setEmployeeId }}>
      {children}
    </EmployeeContext.Provider>
  );
};