import { useEffect, useRef, useState } from "react";
import { Button, Card, Form, Modal, Spinner } from "react-bootstrap";
import { ChevronDoubleDown } from "react-bootstrap-icons";
import validator from "validator";
import {
  ArrowSection,
  BigDivision,
  BigText,
  Container,
  Heading,
  ResponseContainer,
  SmallDivision,
  StoryContainer,
  Subtitle,
} from "./story";
import Bot from "../bot";
import Synonymizer from "../synonymizer";

const { Configuration, OpenAIApi } = require("openai");

export default function Story() {
  const [storyResponse, setStoryResponse] = useState(
    "Your short story will show up here."
  );
  const [translatedResponse, setTranslatedResponse] = useState(
    "Your translated short story will show up here."
  );
  const [storyLoading, setStoryLoading] = useState(false);
  const [translationLoading, setTranslationLoading] = useState(false);
  const [scrollChecker, setScrollChecker] = useState();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showSynonymizer, setShowSynonymizer] = useState(false);
  const mountedRef = useRef();

  useEffect(() => {
    if (mountedRef.current)
      document.getElementById("story-section").scrollIntoView();
  }, [scrollChecker]);

  useEffect(() => {
    mountedRef.current = true;
  });

  const scrollToStory = () => {
    document.getElementById("story-section").scrollIntoView();
  };

  const scrollToTranslator = () => {
    document.getElementById("translator-section").scrollIntoView();
  };

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

    openai
      .createCompletion("text-davinci-001", {
        prompt: `Write a ${genreDataObj.genre} short story with ${genreDataObj.characters} characters named ${genreDataObj.names} and give the story an appropriate title:`,
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
        setScrollChecker(true);
        setEdit(true);
      });
  };

  const onLanguageSubmit = (e) => {
    e.preventDefault();
    setTranslationLoading(true);
    const languageData = new FormData(e.target),
      languageDataObj = Object.fromEntries(languageData.entries());

    const theStory = "#" + validator.trim(storyResponse) + "#";

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
        <SmallDivision className="page-overlay">
          <BigText>How does this work?</BigText>
          You input a genre as a prompt, and the GPT-3 model will generate a
          text completion that attempts to match whatever context (in this case,
          a genre) you gave it.
        </SmallDivision>
        <BigDivision className="px-4 py-6">
          <Heading>Short Story Generation</Heading>
          <Subtitle>
            Choose a genre and have GPT-3 generate a short story for you.
          </Subtitle>

          <Form onSubmit={onGenreSubmit}>
            <Form.Group className="pb-3">
              <Form.Label className="input-title">Pick a genre</Form.Label>
              <Form.Select className="w-auto" name="genre">
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
            <Form.Group className="pb-3">
              <Form.Label className="input-title">
                How many characters do you want?
              </Form.Label>
              <Form.Select className="w-auto" name="characters">
                {["1", "2", "3", "4", "5"].map((option, idx) => (
                  <option key={idx}>{option}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="pb-3">
              <Form.Label className="input-title">
                Enter the names of your characters separated by commas
              </Form.Label>
              <Form.Control
                className="w-auto"
                type="text"
                name="names"
                placeholder="Fen, Jake, Darren"
              />
              <Form.Text className="text-muted">
                Example: Fen, Jake, Darren
              </Form.Text>
            </Form.Group>

            <Button type="submit" value="submit">
              Generate{" "}
              {storyLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  style={{ fontSize: "10px" }}
                />
              ) : null}
            </Button>
          </Form>
          <ArrowSection>
            <ChevronDoubleDown size={30} onClick={scrollToStory} />
          </ArrowSection>
        </BigDivision>
      </Container>

      <Container className="s-container" id="story-section">
        <StoryContainer className="my-5">
          <Card className="my-3 response-card scroll-story">
            {edit ? (
              <Button
                className="edit-button"
                style={{
                  margin: 5,
                }}
                onClick={() => setShowSynonymizer(true)}
              >
                Edit
              </Button>
            ) : null}
            <Modal
              show={showSynonymizer}
              onHide={() => setShowSynonymizer(false)}
              size="lg"
              dialogClassName="modal-90w"
              className="synonymizer"
            >
              <Synonymizer story={storyResponse} />
            </Modal>
            <Card.Body>
              {storyLoading ? (
                <>
                  <Spinner animation="grow" size="sm" />{" "}
                  <Spinner animation="grow" size="sm" />{" "}
                  <Spinner animation="grow" size="sm" />{" "}
                </>
              ) : (
                <p>
                  {storyResponse.split("\n\n").map((story) => (
                    <p>{story}</p>
                  ))}
                </p>
              )}
            </Card.Body>
          </Card>
          <ArrowSection>
            <ChevronDoubleDown size={30} onClick={scrollToTranslator} />
          </ArrowSection>
        </StoryContainer>
      </Container>

      <Container id="translator-section" className="reverse-cards">
        <BigDivision className="px-4 py-6">
          <Heading>Short Story Translation</Heading>
          <Subtitle>
            Choose a language and have GPT-3 translate the short story for you.
          </Subtitle>

          <Form onSubmit={onLanguageSubmit}>
            <Form.Group className="pb-3">
              <Form.Label className="input-title">Pick a language</Form.Label>
              <Form.Select className="w-auto" name="language">
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
            <Button
              type="submit"
              value="submit"
              disabled={
                storyResponse === "Your short story will show up here."
                  ? "true"
                  : null
              }
            >
              Translate{" "}
              {translationLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  style={{ fontSize: "10px" }}
                />
              ) : null}
            </Button>
          </Form>

          <Card className="my-4 response-card scroll-translation">
            <Card.Body>
              {translationLoading ? (
                <>
                  <Spinner animation="grow" size="sm" />{" "}
                  <Spinner animation="grow" size="sm" />{" "}
                  <Spinner animation="grow" size="sm" />{" "}
                </>
              ) : (
                <p>
                  <p>{translatedResponse}</p>
                </p>
              )}
            </Card.Body>
          </Card>
        </BigDivision>
        <SmallDivision className="page-overlay">
          <BigText>Translator.</BigText>
          GPT-3 is capable of translating to and from a variety of languages,
          knows billions of words.
        </SmallDivision>
      </Container>
      <button
        className="bot-button"
        style={{
          margin: 0,
          top: "auto",
          right: 20,
          bottom: 20,
          left: "auto",
          position: "fixed",
        }}
        onClick={() => (open ? setOpen(false) : setOpen(true))}
      ></button>
      {open ? <Bot /> : null}
    </>
  );
}
