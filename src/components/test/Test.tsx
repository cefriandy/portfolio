import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table, Alert } from "react-bootstrap";

const apiHost = import.meta.env.VITE_API_HOST;

const Test: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [questions, setQuestions] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newQuestion, setNewQuestion] = useState<{ questionText: string; options: string[]; correctAnswer: string }>({
    questionText: "",
    options: [""],
    correctAnswer: ""
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [examList, setExamList] = useState<any[]>([]);

  const handleAddQuestion = () => {
    setQuestions([...questions, newQuestion]);
    setNewQuestion({ questionText: "", options: [""], correctAnswer: "" });
    setShowModal(false);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  const handleAddOption = () => {
    setNewQuestion({ ...newQuestion, options: [...newQuestion.options, ""] });
  };

  const handleSubmit = async () => {
    const examData = { title, questions };
    setLoading(true);
    try {
      const response = await fetch(`${apiHost}/api/v1/exams/create-exam`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(examData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Exam created successfully:", result);
      setSuccessMessage("Exam created successfully!");

      // Reset form after submission
      setTitle("");
      setQuestions([]);

      // Show success message for 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error submitting exam data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchExamList = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiHost}/api/v1/exams/get-list?examId=EXM8919`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setExamList([data]); // Assuming you want to display a single exam
    } catch (error) {
      console.error("Error fetching exam list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExamList(); // Fetch the exam list when the component mounts
  }, []);

  return (
    <div className="container mt-5">
      <h1>Create Exam</h1>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form>
        <Form.Group controlId="formTitle">
          <Form.Label>Exam Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter exam title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={() => setShowModal(true)} disabled={loading}>
          Add Question
        </Button>
        <ul className="list-group mt-3">
          {questions.map((q, index) => (
            <li key={index} className="list-group-item">
              {q.questionText} - Correct Answer: {q.correctAnswer}
            </li>
          ))}
        </ul>
        <Button variant="success" onClick={handleSubmit} className="mt-3" disabled={loading}>
          {loading ? "Submitting..." : "Submit Exam"}
        </Button>
      </Form>

      {/* Modal for adding questions */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formQuestionText">
            <Form.Label>Question Text</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter question"
              value={newQuestion.questionText}
              onChange={(e) => setNewQuestion({ ...newQuestion, questionText: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="formOptions">
            <Form.Label>Options</Form.Label>
            {newQuestion.options.map((option, index) => (
              <Form.Control
                key={index}
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            ))}
            <Button variant="secondary" onClick={handleAddOption} className="mt-2">
              Add Option
            </Button>
          </Form.Group>
          <Form.Group controlId="formCorrectAnswer">
            <Form.Label>Correct Answer</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter correct answer"
              value={newQuestion.correctAnswer}
              onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddQuestion}>
            Add Question
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Table to display exam list */}
      <h2 className="mt-5">Exam List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Exam ID</th>
              <th>Title</th>
              <th>Questions</th>
            </tr>
          </thead>
          <tbody>
            {examList.map((exam) => (
              <tr key={exam.id}>
                <td>{exam.examId}</td>
                <td>{exam.title}</td>
                <td>
                  <ul>
                    {exam.questions.map((q: { questionId: React.Key | null | undefined; questionText: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                      <li key={q.questionId}>{q.questionText}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Test;