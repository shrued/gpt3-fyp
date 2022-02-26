import { useEffect, useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import { Container } from "./bot";
import { Send } from "react-bootstrap-icons";

const { Configuration, OpenAIApi } = require("openai");

export default function Bot() {
  const [convo, setConvo] = useState([
    {
      from: "ai",
      val: "Hey there, this is Aiden. I am an AI. How can I help you?",
    },
  ]);
  const [question, setQuestion] = useState("");
  const [botResponse, setBotResponse] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [convo]);

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const configuration = new Configuration({
    apiKey: API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const onQuestionSubmit = (e) => {
    e.preventDefault();

    setConvo((convo) => [...convo, { from: "me", val: question }]);
    setQuestion("");

    openai
      .createCompletion("text-davinci-001", {
        prompt: `This is a conversation with an AI bot called Aiden that suggests books, movies and television: \n\n Human: ${question} \n AI:`,
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
    <div className="chat-popup">
      <Container>
        <Card className="chatbox">
          {convo.map((message, index) => messageItem(message, index))}
          <div ref={messagesEndRef} />
        </Card>
        <Form className="ask" onSubmit={onQuestionSubmit}>
          <Form.Group className="pb-">
            <Form.Control
              type="text"
              name="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type something..."
              autoComplete="off"
            />
          </Form.Group>
          <Button className="send-button" type="submit" value="submit">
            <Send size={18} />
          </Button>
        </Form>
      </Container>
    </div>
  );
}
