import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import { Container } from "./bot";

const { Configuration, OpenAIApi } = require("openai");

export default function Bot() {
  const [convo, setConvo] = useState([
    { from: "ai", val: "Hey there, how can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [botResponse, setBotResponse] = useState("");

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const configuration = new Configuration({
    apiKey: API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const onQuestionSubmit = (e) => {
    e.preventDefault();
    const chatData = new FormData(e.target),
      chatDataObj = Object.fromEntries(chatData.entries());

    setConvo((convo) => [...convo, { from: "me", val: chatDataObj.question }]);

    const check = `This is a conversation with an AI bot that suggest books: \n\n Human: ${chatDataObj.question} \n AI:`;
    console.log(check);

    openai
      .createCompletion("text-davinci-001", {
        prompt: `This is a conversation with an AI bot that suggests books, movies and television: \n\n Human: ${chatDataObj.question} \n AI:`,
        temperature: 1,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((response) => {
        console.log(response);
        setConvo((convo) => [
          ...convo,
          { from: "ai", val: response.data.choices[0].text },
        ]);
        setBotResponse(response.data.choices[0].text);
      });
  };

  const messageItem = (message, index) => {
    return (
      <motion.div
        transition={{ type: "spring", stiffness: 300, duration: 0.5 }}
        initial={{ y: 10 }}
        animate={{ y: 0 }}
        key={`message_${index}`}
        className={message.from === "me" ? "me" : "ai"}
      >
        <img
          src={message.from === "me" ? "/me.jpeg" : "/bot.jpeg"}
          name={message.from}
          style={{ size: 40 }}
          className="avatar"
        />
        <Card
          className={message.from === "me" ? "me-bubble" : "ai-bubble"}
          style={{
            display: "flex",
            borderRadius: 12,
            margin: "0.3em",
          }}
        >
          <p
            style={{
              margin: 10,
              size: 500,
            }}
          >
            {message.val}
          </p>
        </Card>
      </motion.div>
    );
  };

  return (
    <>
      <Container>
        <Card className="chatbox">
          {convo.map((message, index) => messageItem(message, index))}
        </Card>
        <Form className="ask" onSubmit={onQuestionSubmit}>
          <Form.Group className="pb-6">
            <Form.Control
              type="text"
              name="question"
              placeholder="Type something..."
            />
          </Form.Group>
          <Button className="ask-button mx-3" type="submit" value="submit">
            Ask
          </Button>
        </Form>
      </Container>
    </>
  );
}
