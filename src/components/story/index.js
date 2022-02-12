import { useState } from "react";
import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";

const { Configuration, OpenAIApi } = require("openai");

export default function Story() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(
    "Your short story will show up here."
  );
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(true);

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  const onFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());

    if (formDataObj.genre === "") {
      setValid(false);
      setLoading(false);
    } else {
      setValid(true);
      const configuration = new Configuration({
        apiKey: API_KEY,
      });
      const openai = new OpenAIApi(configuration);

      openai
        .createCompletion("text-davinci-001", {
          prompt: `Write a ${formDataObj.genre} short story:`,
          temperature: 1,
          max_tokens: 1000,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        })
        .then((response) => {
          setInput(formDataObj.genre);
          setResponse(response.data.choices[0].text);
          setLoading(false);
        });
    }
  };
  return (
    <div className="p-5 d-flex flex-column">
      <p>Enter a genre and have GPT3 generate a short story for you.</p>

      <Form onSubmit={onFormSubmit}>
        <Form.Group>
          <Form.Label>
            <Form.Control
              type="text"
              name="genre"
              placeholder="Enter a genre"
            />
          </Form.Label>
        </Form.Group>
        {loading ? (
          <Spinner animation="border" variant="success" />
        ) : (
          <Button variant="success" type="submit" value="submit">
            Generate
          </Button>
        )}
      </Form>

      {!valid ? (
        <>
          <Alert className="mt-4" variant="danger">
            Genre cannot be empty.
          </Alert>
        </>
      ) : null}

      <Card className="my-4">
        <Card.Body>
          {loading ? (
            <>
              <Spinner animation="grow" size="sm" />{" "}
              <Spinner animation="grow" size="sm" />{" "}
              <Spinner animation="grow" size="sm" />{" "}
            </>
          ) : (
            <p>{response}</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
