
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Button,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axiosInstance from "../utils/axiosInstance";
 
const electricPurple = "#bf00ff";
 
const PurpleRadio = styled(Radio)(() => ({
  color: electricPurple,
  "&.Mui-checked": {
    color: electricPurple,
    boxShadow: "none",
  },
}));
 
const PurpleTextField = styled(TextField)(({ error }) => ({
  "& .MuiFormHelperText-root": {
    color: error ? "red" : "inherit",
  },
  "& label.Mui-focused": {
    color: electricPurple,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: error ? "red" : "#ccc",
    },
    "&:hover fieldset": {
      borderColor: electricPurple,
    },
    "&.Mui-focused fieldset": {
      borderColor: electricPurple,
      boxShadow: `0 0 6px ${electricPurple}`,
    },
  },
}));
 
export default function ExitInterviewQuestionnaire() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [clickedSubmit, setClickedSubmit] = useState(false);
  const [errors, setErrors] = useState({});
 
  const employeeId = localStorage.getItem("EmID") || "";
 
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("exit-questionnaire/");
        if (response.data.status === "success") {
          setQuestions(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);
 
  const handleOptionChange = (quesIndex, option) => {
    setAnswers((prev) => ({
      ...prev,
      [quesIndex]: {
        ...prev[quesIndex],
        answer: option,
      },
    }));
 
    if (errors[quesIndex]?.answer) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[quesIndex].answer;
        if (Object.keys(newErrors[quesIndex]).length === 0) {
          delete newErrors[quesIndex];
        }
        return newErrors;
      });
    }
  };
 
  const handleBriefAnswerChange = (quesIndex, value) => {
    setAnswers((prev) => ({
      ...prev,
      [quesIndex]: {
        ...prev[quesIndex],
        brief_answer: value,
      },
    }));
 
    if (errors[quesIndex]?.brief_answer) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[quesIndex].brief_answer;
        if (Object.keys(newErrors[quesIndex]).length === 0) {
          delete newErrors[quesIndex];
        }
        return newErrors;
      });
    }
  };
 
  const validateAnswers = () => {
    const newErrors = {};
    questions.forEach((q, qIndex) => {
      const currentErrors = {};
      const answer = answers[qIndex]?.answer;
      const briefAnswer = answers[qIndex]?.brief_answer;
 
      if (q.options.length > 0 && !answer) {
        currentErrors.answer = true;
      }
 
      const isOtherSelected = answer?.toLowerCase() === "other";
      const isLastTwo = qIndex >= questions.length - 2 && questions.length > 0;
      const isBriefAnswerRequired = isOtherSelected || isLastTwo;
 
      if (isBriefAnswerRequired && (!briefAnswer || !briefAnswer.trim())) {
        currentErrors.brief_answer = true;
      }
 
      if (Object.keys(currentErrors).length > 0) {
        newErrors[qIndex] = currentErrors;
      }
    });
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleSubmit = async () => {
    setClickedSubmit(true);
 
    if (!validateAnswers()) {
      alert("Please answer all required fields before submitting.");
      setTimeout(() => setClickedSubmit(false), 500);
      return;
    }
 
    const feedback = questions.map((q, index) => ({
      ques_id: index + 1,
      answer: answers[index]?.answer || "",
      brief_answer: answers[index]?.brief_answer || null,
    }));
 
    const payload = {
      employee_id: employeeId,
      feedback,
    };
 
    try {
      await axiosInstance.post("post_exit_procedure_feedback/", payload);
      alert("Feedback submitted successfully!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback.");
    } finally {
      setTimeout(() => setClickedSubmit(false), 500);
    }
  };
 
  if (loading) return <CircularProgress />;
 
  return (
    <Card sx={{ mt: 3, height: "80vh", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flex: "0 0 auto", px: 0 }}>
        <Typography variant="h5" fontWeight="bold" color= "#8C257C" gutterBottom sx={{ px: 2 }}>
          EXIT INTERVIEW QUESTIONNAIRE
        </Typography>
      </CardContent>
 
      <Box sx={{ flex: "1 1 auto", overflowY: "auto", px: 2 }}>
        {questions.map((q, qIndex) => {
          // **THE FIX IS HERE:** This logic now correctly checks the SELECTED answer.
          const isOtherSelected = answers[qIndex]?.answer?.toLowerCase() === "other";
          const isYesNo =
            q.options.length === 2 &&
            q.options.every((opt) => ["yes", "no"].includes(opt.toLowerCase()));
          const isLastTwo = qIndex >= questions.length - 2 && questions.length > 0;
         
          const showBriefAnswerField = isOtherSelected || isYesNo || isLastTwo;
          const placeholderText = (isOtherSelected || isLastTwo) ? "This field is required" : "Additional details (optional)";
 
          return (
            <Box key={qIndex} sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{ mb: 1, color: errors[qIndex]?.answer ? "red" : "inherit" }}
              >
                {qIndex + 1}. {q.question}
                {(q.options.length > 0 || isLastTwo) && (
                   <Box component="span" sx={{ color: "red" }}>
                    {" "}*
                   </Box>
                )}
              </Typography>
 
              {q.options.length > 0 && (
                <RadioGroup
                  value={answers[qIndex]?.answer || ""}
                  onChange={(e) => handleOptionChange(qIndex, e.target.value)}
                >
                  {q.options.map((opt, optIndex) => (
                    <FormControlLabel
                      key={optIndex}
                      value={opt}
                      control={<PurpleRadio disableRipple />}
                      label={opt}
                    />
                  ))}
                </RadioGroup>
              )}
 
              {showBriefAnswerField && (
                <Box sx={{ mt: 1 }}>
                  <PurpleTextField
                    fullWidth
                    size="small"
                    placeholder={placeholderText}
                    value={answers[qIndex]?.brief_answer || ""}
                    onChange={(e) => handleBriefAnswerChange(qIndex, e.target.value)}
                    error={!!errors[qIndex]?.brief_answer}
                    helperText={
                      errors[qIndex]?.brief_answer
                        ? "This field is required"
                        : ""
                    }
                  />
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
 
      <Box sx={{ flex: "0 0 auto", p: 2, textAlign: "right" }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: electricPurple,
            "&:hover": {
              backgroundColor: "#9900cc",
            },
            boxShadow: clickedSubmit ? `0 0 10px 3_px ${electricPurple}` : "none",
            transition: "box-shadow 0.3s ease-in-out",
          }}
        >
          Submit
        </Button>
      </Box>
    </Card>
  );
}
