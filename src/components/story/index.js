import { useState } from "react";
import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";
import validator from "validator";
import {
  BigDivision,
  BigText,
  Container,
  Heading,
  SmallDivision,
} from "./story";

const { Configuration, OpenAIApi } = require("openai");

export default function Story() {
  const [storyResponse, setStoryResponse] = useState(
    "Your short story will show up here."
  );
  const [translatedResponse, setTranslatedResponse] = useState(
    "Your translated short story will show up here."
  );
  const [storyLoading, setStoryLoading] = useState(false);
  const [valid, setValid] = useState(true);
  const [translationLoading, setTranslationLoading] = useState(false);

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const configuration = new Configuration({
    apiKey: API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const onGenreSubmit = (e) => {
    e.preventDefault();
    setStoryLoading(true);
    const genreData = new FormData(e.target),
      genreDataObj = Object.fromEntries(genreData.entries());

    setValid(true);

    openai
      .createCompletion("text-davinci-001", {
        prompt: `Write a ${genreDataObj.genre} short story:`,
        temperature: 1,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((response) => {
        console.log(response);
        setStoryResponse(response.data.choices[0].text);
        setStoryLoading(false);
      });
  };

  const onLanguageSubmit = (e) => {
    e.preventDefault();
    setTranslationLoading(true);
    const languageData = new FormData(e.target),
      languageDataObj = Object.fromEntries(languageData.entries());

    const theStory = "#" + validator.trim(storyResponse) + "#";

    const check = `Translate to ${languageDataObj.language}:\n\n${theStory}`;
    console.log(check);

    openai
      .createCompletion("text-davinci-001", {
        prompt: `Translate to ${languageDataObj.language}:\n\n${theStory}`,
        temperature: 0,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((response) => {
        console.log(response);
        setTranslatedResponse(response.data.choices[0].text);
        setTranslationLoading(false);
      });
  };

  return (
    <>
      <Container>
        <SmallDivision className="green-overlay">
          <BigText>How does this work?</BigText>
          You input a genre as a prompt, and the GPT-3 model will generate a
          text completion that attempts to match whatever context (in this case,
          a genre) you gave it.
        </SmallDivision>
        <BigDivision className="p-4">
          <Heading>Short Story Generation</Heading>
          <p>Choose a genre and have GPT-3 generate a short story for you.</p>

          <Form onSubmit={onGenreSubmit}>
            <Form.Group>
              <Form.Select
                style={{ maxWidth: "40%", marginBottom: "20px" }}
                name="genre"
              >
                {[
                  "Action",
                  "Adventure",
                  "Dark humor",
                  "Drama",
                  "Fairytale",
                  "Fantasy",
                  "Fiction",
                  "Folklore",
                  "Historical Fiction",
                  "Horror",
                  "Humor",
                  "Mystery",
                  "Mythology",
                  "Nonfiction",
                  "Poetry",
                  "Romance",
                  "Science Fiction",
                  "Thriller",
                ].map((option, idx) => (
                  <option key={idx}>{option}</option>
                ))}
              </Form.Select>
            </Form.Group>
            {storyLoading ? (
              <Spinner animation="border" style={{ color: "#0032fb" }} />
            ) : (
              <Button className="buttons" type="submit" value="submit">
                Generate
              </Button>
            )}
          </Form>

          <Card className="my-4">
            <Card.Body>
              {storyLoading ? (
                <>
                  <Spinner animation="grow" size="sm" />{" "}
                  <Spinner animation="grow" size="sm" />{" "}
                  <Spinner animation="grow" size="sm" />{" "}
                </>
              ) : (
                <p>{storyResponse}</p>
              )}
            </Card.Body>
          </Card>
        </BigDivision>
      </Container>
      <Container>
        <BigDivision className="p-4">
          <Heading>Short Story Translation</Heading>
          <p>
            Choose a language and have GPT-3 translate the short story for you.
          </p>

          <Form onSubmit={onLanguageSubmit}>
            <Form.Group>
              <Form.Select
                style={{ maxWidth: "40%", marginBottom: "20px" }}
                name="language"
              >
                {[
                  "Arabic",
                  "Bengali",
                  "French",
                  "German",
                  "Greek",
                  // "Hindi",
                  "Indonesian",
                  "Italian",
                  "Japanese",
                  "Korean",
                  "Mandarin",
                  "Portuguese",
                  "Russian",
                  "Spanish",
                  // "Tamil",
                ].map((option, idx) => (
                  <option key={idx}>{option}</option>
                ))}
              </Form.Select>
            </Form.Group>
            {translationLoading ? (
              <Spinner animation="border" style={{ color: "#0032fb" }} />
            ) : (
              <Button
                className="buttons"
                type="submit"
                value="submit"
                disabled={
                  storyResponse === "Your short story will show up here."
                    ? "true"
                    : null
                }
              >
                Translate
              </Button>
            )}
          </Form>

          <Card className="my-4">
            <Card.Body>
              {translationLoading ? (
                <>
                  <Spinner animation="grow" size="sm" />{" "}
                  <Spinner animation="grow" size="sm" />{" "}
                  <Spinner animation="grow" size="sm" />{" "}
                </>
              ) : (
                <p>{translatedResponse}</p>
              )}
            </Card.Body>
          </Card>
        </BigDivision>
        <SmallDivision className="green-overlay">
          <BigText>Translator.</BigText>
          GPT-3 is capable of translating to and from a variety of languages,
          knows billions of words.
        </SmallDivision>
      </Container>
    </>
  );
}
