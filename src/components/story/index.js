import { useState } from "react";

const { Configuration, OpenAIApi } = require("openai");

export default function Story() {
  const [input, setInput] = useState("Input");
  const [response, setResponse] = useState("Response");

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());

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
      });
  };
  return (
    <>
      <form onSubmit={onFormSubmit}>
        <label>
          Enter genre
          <input type="text" name="genre" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div>
        <p>
          Input: {input} <br />
          Response: {response}
        </p>
      </div>
    </>
  );
}
