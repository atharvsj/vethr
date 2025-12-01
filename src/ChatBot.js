"use client"

import { useState, useEffect, useRef } from "react"
import LogoIcon from "./Assests/tdtllogo.jpg"; // Assuming this path is correct or you have a fallback
import { GiExpand } from "react-icons/gi"
import { AiOutlineCompress } from "react-icons/ai"

const BotUIComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  // const [activeTable, setActiveTable] = useState("") // Removed activeTable
  const messagesEndRef = useRef(null)

  // Fetch access token from localStorage whenever the component is used - REMOVED
  // const getAccessToken = () => { ... } // Removed

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (isOpen) { // If closing
        setMessages([]) // Clear messages on close
    }
    setIsExpanded(false) // Reset to default size
  }

  // Function to handle topbar button click (remains as placeholder)
  const handleTopbarButtonClick = () => {
    alert("Topbar button clicked! Add your custom functionality here.")
  }

  const sendMessageToAPI = async (userMessage) => {
    // Get the latest token from localStorage directly when making the request - REMOVED
    // const token = getAccessToken() // Removed

    // if (!token) { // Removed token check
    //   setMessages((prevMessages) => [
    //     ...prevMessages,
    //     { type: "bot", text: "Authentication error. Please log in again." },
    //   ])
    //   return
    // }

    setIsLoading(true)
    try {
      const requestBody = {
        input_type: "text", // New payload structure
        user_query: userMessage, // New payload structure
      }

      // Add table_name to request if available - REMOVED
      // if (activeTable) {
      //   requestBody.table_name = activeTable
      // }

      // UPDATED API ENDPOINT
      const response = await fetch("https://tdtlworld.com/hrms-backend/api/sql_chatbot/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`, // REMOVED Authorization header
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        // Try to parse error message from API if available
        let errorData;
        try {
            errorData = await response.json();
        } catch (e) {
            // Ignore if error response is not JSON
        }
        const errorMessage = errorData?.detail || errorData?.error || `API request failed with status ${response.status}`;
        throw new Error(errorMessage);
      }

      const data = await response.json()

      // Update the active table if returned in the response - REMOVED
      // if (data.active_table) {
      //   setActiveTable(data.active_table)
      // }

      // Store the complete response object instead of just formatting text
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "bot",
          fullResponse: data, // Stores { sql_query: "...", query_result: [...] }
        },
      ])
    } catch (error) {
      console.error("Error calling API:", error)
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", text: `Sorry, I encountered an error: ${error.message}` },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSend = () => {
    if (message.trim() === "") return

    const userMessage = message
    setMessages((prevMessages) => [...prevMessages, { type: "user", text: userMessage }])
    setMessage("")

    // Send to API and get response
    sendMessageToAPI(userMessage)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) { // Prevent send if loading
      handleSend()
    }
  }

  // Render bot response with proper formatting (UPDATED FOR NEW API RESPONSE)
  const renderBotResponse = (message) => {
    // If it's a simple text message (e.g., error messages we construct)
    if (message.text) {
      return <span style={{ whiteSpace: "pre-wrap" }}>{message.text}</span>
    }

    const { fullResponse } = message
    if (!fullResponse) return <span>No response data available</span>

    // New API response structure
    const { sql_query, query_result } = fullResponse

    // Clean up SQL query string from markdown backticks
    const cleanedSqlQuery = sql_query ? sql_query.replace(/```(?:sql)?\s*|\s*```/g, "").trim() : null;


    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          animation: "slideIn 0.3s ease-out",
        }}
      >
        {/* Display SQL Query if available */}
        {/* {cleanedSqlQuery && (
          <div
            style={{
              marginTop: "16px",
              animation: "fadeIn 0.5s ease-out",
            }}
          >
            <div
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(106, 27, 154, 0.15)",
              }}
            >
              <div
                style={{
                  backgroundColor: "#6a1b9a",
                  color: "white",
                  padding: "10px 16px",
                  fontWeight: "600",
                  fontSize: "15px",
                  textAlign: "left",
                }}
              >
                Generated SQL Query
              </div>
              <pre
                style={{
                  backgroundColor: "#f8f9fa",
                  padding: "16px",
                  margin: 0,
                  overflowX: "auto",
                  fontSize: "13px",
                  lineHeight: "1.5",
                  fontFamily: "monospace",
                  borderTop: "1px solid #eee",
                  whiteSpace: "pre-wrap", // Respect newlines and spaces
                  wordBreak: "break-all", // Break long words/queries
                }}
              >
                <code>{cleanedSqlQuery}</code>
              </pre>
            </div>
          </div>
        )} */}

        {/* Display Query Result if available */}
        {query_result && (
          <div
            style={{
              marginTop: "16px",
              animation: "fadeIn 0.5s ease-out",
            }}
          >
            <div
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(106, 27, 154, 0.15)",
                background: "white",
              }}
            >
              <div
                style={{
                  backgroundColor: "#6a1b9a",
                  color: "white",
                  padding: "10px 16px",
                  fontWeight: "600",
                  fontSize: "15px",
                  textAlign: "left",
                }}
              >
                Query Result
              </div>
              <div style={{ padding: "16px", overflowX: "auto" }}>
                {Array.isArray(query_result) && query_result.length > 0 && typeof query_result[0] === 'object' && query_result[0] !== null ? (
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                    <thead>
                      <tr style={{backgroundColor: "#f2f2f2"}}>
                        {Object.keys(query_result[0]).map(key => (
                          <th key={key} style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", fontWeight: "600" }}>{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {query_result.map((row, rowIndex) => (
                        <tr key={rowIndex} style={{ backgroundColor: rowIndex % 2 === 0 ? "#fff" : "#f9f9f9"}}>
                          {Object.values(row).map((val, cellIndex) => (
                            <td key={cellIndex} style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
                              {typeof val === 'object' && val !== null ? JSON.stringify(val) : String(val)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : query_result.length === 0 && Array.isArray(query_result) ? (
                    <p style={{ fontSize: "13px", fontFamily: "monospace", color: "#555" }}>No results returned.</p>
                ): (
                  <pre style={{ fontSize: "13px", fontFamily: "monospace", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                    <code>{JSON.stringify(query_result, null, 2)}</code>
                  </pre>
                )}
              </div>
            </div>
          </div>
        )}

        {/* If API returned something but not sql_query or query_result, or if it's an unexpected format */}
        {!sql_query && !query_result && (
          <div style={{ marginTop: "10px", color: "#555", fontSize: "14px" }}>
            <p>Received an unexpected response from the bot:</p>
            <pre style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "4px", overflowX: "auto", whiteSpace: "pre-wrap", wordBreak: "break-all"  }}>
              <code>{JSON.stringify(fullResponse, null, 2)}</code>
            </pre>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      {!isOpen && (
        <div
          onClick={toggleChat}
          style={{
            backgroundColor: "#6a1b9a",
            padding: "12px",
            borderRadius: "50%",
            width: "65px",
            height: "65px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
            cursor: "pointer",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            animation: "pulse 2s infinite",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)"
            e.currentTarget.style.boxShadow = "0px 6px 16px rgba(0, 0, 0, 0.4)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)"
            e.currentTarget.style.boxShadow = "0px 4px 12px rgba(0, 0, 0, 0.3)"
          }}
        >
          <img
            src={LogoIcon} // Use .src for Next.js Image imports
            alt="Chat Bot"
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
        </div>
      )}

      {isOpen && (
        <div
          style={{
            width: isExpanded ? "80vw" : "380px",
            height: isExpanded ? "85vh" : "520px",
            background: "linear-gradient(135deg, #6a1b9a, #9c27b0)",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            animation: "fadeInUp 0.3s ease-out",
            transition: "width 0.3s ease, height 0.3s ease",
            maxWidth: "100vw", // ensure it doesn't overflow viewport
            maxHeight: "100vh", // ensure it doesn't overflow viewport
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.15)",
              padding: "14px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#fff",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img
                src={LogoIcon} // Use .src
                alt="Chat Bot Logo"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  // cursor: "pointer", // Removed as it was for handleTopbarButtonClick which is not used here
                  border: "2px solid rgba(255,255,255,0.3)",
                }}
                // onClick={handleTopbarButtonClick} // If this logo click should trigger it
              />
              <strong
                style={{
                  fontSize: "18px",
                  letterSpacing: "0.5px",
                  textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                }}
              >
                HRMS
              </strong>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  color: "#fff",
                  fontSize: "1.1rem",
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.25)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.15)"
                }}
                title={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? <AiOutlineCompress /> : <GiExpand />}
              </button>
              <button
                onClick={toggleChat}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  color: "#fff",
                  fontSize: "1.2rem", // Made 'x' slightly larger
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background 0.2s",
                  lineHeight: "1", // Ensure 'x' is centered
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.25)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.15)"
                }}
                title="Close"
              >
                ×
              </button>
            </div>
          </div>

          {/* Chat messages area */}
          <div
            style={{
              flexGrow: 1,
              padding: "16px",
              overflowY: "auto",
              backgroundColor: "#fefefe",
              backgroundImage:
                "linear-gradient(rgba(106, 27, 154, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(106, 27, 154, 0.02) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          >
            {messages.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  color: "#666",
                  marginTop: "40px",
                  padding: "30px 20px",
                  backgroundColor: "rgba(255,255,255,0.7)",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(106, 27, 154, 0.08)",
                  animation: "fadeIn 0.5s ease-out",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    margin: "0 auto 16px",
                    backgroundColor: "#6a1b9a",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={LogoIcon} // Use .src
                    alt="Chat Bot Icon"
                    style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                  />
                </div>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    marginBottom: "8px",
                    color: "#6a1b9a",
                  }}
                >
                  Hello! I'm your data assistant.
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#666",
                  }}
                >
                  Ask me anything about your data.
                </p>
                {/* {activeTable && ( // Removed activeTable display
                  <p style={{ fontSize: "0.9em", marginTop: "10px" }}>
                    Currently working with table: <strong>{activeTable}</strong>
                  </p>
                )} */}
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
                  marginBottom: "20px",
                  animation: msg.type === "user" ? "slideInRight 0.3s ease-out" : "slideInLeft 0.3s ease-out",
                }}
              >
                <div
                  style={{
                    backgroundColor: msg.type === "user" ? "#e1bee7" : "#f8f9fa",
                    color: "#000",
                    padding: msg.type === "user" ? "12px 16px" : "16px 20px",
                    borderRadius: msg.type === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    maxWidth: msg.type === "user" ? "70%" : "95%", // Bot messages can be wider
                    boxShadow:
                      msg.type === "user" ? "0 2px 8px rgba(106, 27, 154, 0.15)" : "0 2px 10px rgba(0, 0, 0, 0.05)",
                    width: msg.type === "bot" ? "calc(100% - 10px)" : "auto", // Allow bot message to take more width if needed
                    border: msg.type === "user" ? "1px solid #d1c4e9" : "1px solid #e0e0e0",
                  }}
                >
                  {msg.type === "user" ? (
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: "500",
                        whiteSpace: "pre-wrap", // ensure user message also wraps
                        wordBreak: "break-word",
                      }}
                    >
                      {msg.text}
                    </span>
                  ) : (
                    renderBotResponse(msg)
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "16px",
                  animation: "fadeIn 0.3s ease-out",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#f0e5ff",
                    color: "#000",
                    padding: "12px 20px",
                    borderRadius: "18px 18px 18px 4px",
                    boxShadow: "0 2px 8px rgba(106, 27, 154, 0.1)",
                    border: "1px solid #e1bee7",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span
                      style={{
                        height: "10px",
                        width: "10px",
                        backgroundColor: "#6a1b9a",
                        borderRadius: "50%",
                        display: "inline-block",
                        animation: "bounce 1.5s infinite ease-in-out",
                        animationDelay: "0s",
                      }}
                    ></span>
                    <span
                      style={{
                        height: "10px",
                        width: "10px",
                        backgroundColor: "#6a1b9a",
                        borderRadius: "50%",
                        display: "inline-block",
                        animation: "bounce 1.5s infinite ease-in-out",
                        animationDelay: "0.2s",
                      }}
                    ></span>
                    <span
                      style={{
                        height: "10px",
                        width: "10px",
                        backgroundColor: "#6a1b9a",
                        borderRadius: "50%",
                        display: "inline-block",
                        animation: "bounce 1.5s infinite ease-in-out",
                        animationDelay: "0.4s",
                      }}
                    ></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div
            style={{
              padding: "14px 16px",
              backgroundColor: "#f5f5f5",
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#ffffff",
                borderRadius: "24px",
                padding: "6px 8px 6px 16px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                border: "1px solid #e0e0e0",
                transition: "box-shadow 0.3s ease, border-color 0.3s ease",
              }}
            >
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isLoading}
                style={{
                  flexGrow: 1,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: "15px",
                  padding: "8px 0",
                  color: "#333",
                }}
                onFocus={(e) => {
                  e.currentTarget.parentElement.style.boxShadow = "0 2px 12px rgba(106, 27, 154, 0.15)"
                  e.currentTarget.parentElement.style.borderColor = "#9c27b0"
                }}
                onBlur={(e) => {
                  e.currentTarget.parentElement.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)"
                  e.currentTarget.parentElement.style.borderColor = "#e0e0e0"
                }}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || message.trim() === ""}
                style={{
                  backgroundColor: message.trim() === "" || isLoading ? "#d1c4e9" : "#6a1b9a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  padding: "10px",
                  marginLeft: "8px",
                  cursor: message.trim() === "" || isLoading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  transition: "all 0.2s ease",
                  transform: "scale(1)",
                  boxShadow: "0 2px 6px rgba(106, 27, 154, 0.2)",
                }}
                onMouseEnter={(e) => {
                  if (message.trim() !== "" && !isLoading) {
                    e.currentTarget.style.transform = "scale(1.05)"
                    e.currentTarget.style.boxShadow = "0 3px 10px rgba(106, 27, 154, 0.3)"
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)"
                  e.currentTarget.style.boxShadow = "0 2px 6px rgba(106, 27, 154, 0.2)"
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from { 
            opacity: 0;
            transform: translateX(20px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInLeft {
          from { 
            opacity: 0;
            transform: translateX(-20px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideIn { /* Used by bot response container */
          from { 
            opacity: 0;
            transform: translateY(10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-5px);
          }
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(106, 27, 154, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(106, 27, 154, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(106, 27, 154, 0);
          }
        }

        /* Custom scrollbar for chat messages area */
        div[style*="overflowY: auto"]::-webkit-scrollbar {
          width: 8px;
        }
        div[style*="overflowY: auto"]::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        div[style*="overflowY: auto"]::-webkit-scrollbar-thumb {
          background: #c5cae9; /* Lighter purple */
          border-radius: 10px;
        }
        div[style*="overflowY: auto"]::-webkit-scrollbar-thumb:hover {
          background: #9fa8da; /* Darker on hover */
        }
      `}</style>
    </div>
  )
}

export default BotUIComponent