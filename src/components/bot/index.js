import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { motion } from "framer-motion";

const { Configuration, OpenAIApi } = require("openai");

export default function Bot() {
  const [convo, setConvo] = useState([]);
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
        prompt: `This is a conversation with an AI bot that suggest books: \n\n Human: ${chatDataObj.question} \n AI:`,
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
        // className={classnames(style.message, `${message.from === "me" ? style.me : style.ai}`)}
      >
        <img
          src={message.from === "me" ? "/me.png" : "/bot.png"}
          name={message.from}
          style={{ size: 40 }}
          className="avatar"
        />
        <Card
          background={message.from === "me" ? "gray300" : "green500"}
          style={{ display: "flex", alignItems: "center", borderRadius: 12 }}
        >
          <p
            style={{
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 12,
              marginRight: 12,
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
      <Form onSubmit={onQuestionSubmit}>
        <Form.Group className="pb-3">
          <Form.Label className="input-title">
            Enter the names of your characters separated by commas
          </Form.Label>
          <Form.Control
            className="w-auto"
            type="text"
            name="question"
            placeholder="Question"
          />
        </Form.Group>
        <Button className="buttons" type="submit" value="submit">
          Generate
        </Button>
      </Form>
      {botResponse}
      <Container>
        <Card>
          {convo.map((message, index) => messageItem(message, index))}
        </Card>
      </Container>
    </>
  );
}
