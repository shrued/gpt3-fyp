import { useState } from "react";
import { Button, Modal, Popover } from "react-bootstrap";

const { Configuration, OpenAIApi } = require("openai");

export default function Synonymizer(props) {
  const [selectedText, setSelectedText] = useState("");
  const [selected, setSelected] = useState(false);
  const [synonyms, setSynonyms] = useState();
  const [range, setRange] = useState();

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const configuration = new Configuration({
    apiKey: API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  function getSynonyms() {
    openai
      .createCompletion("text-davinci-001", {
        prompt: `Synonyms for ${selectedText}:`,
        temperature: 0,
        max_tokens: 20,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((response) => {
        // console.log(response);
        setSynonyms(response.data.choices[0].text);
        setSelected(true);
      });
  }

  function getSelectionText() {
    var text = "";
    // var range;
    if (window.getSelection) {
      text = window.getSelection().toString();
      // range = window.getSelection().getRangeAt(0);
      getSynonyms();
    } else if (document.selection && document.selection.type !== "Control") {
      text = document.selection.createRange().text;
      // getSynonyms();
    }
    return text;
  }

  document.onmouseup =
    document.onkeyup =
    document.onselectionchange =
      function () {
        setSelectedText(getSelectionText());
      };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Synonymizer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {props.story.split("\n\n").map((story) => (
            <p>{story}</p>
          ))}
        </p>

        {selected ? (
          <Popover id="popover-positioned-bottom">
            <Popover.Body>
              {synonyms.split(",").map((synonym) => (
                <p>
                  {synonym}
                  {"\n"}
                </p>
              ))}
            </Popover.Body>
          </Popover>
        ) : null}
      </Modal.Body>
    </>
  );
}
