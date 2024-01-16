import React, { useState } from "react";
import "./App.css";
import { Input, Form, Typography, Button } from "antd";
import axios from "axios";
import bg from "./1322907.png";

const { TextArea } = Input;
const { Item } = Form;

function App() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = () => {
    axios
      .post("https://gehqhkdkz2oxxddwe7guyx5dv40nbfxl.lambda-url.us-east-1.on.aws", {
        string: value,
      })
      .then((res) => setResult(JSON.stringify(res.data.result)))
      .catch((e) => console.log(e));
  };

  return (
    <div
      className="App"
      style={{
        background: `url(${bg})`,
      }}
    >
      <Form
        style={{
          padding: "20px",
          background: "rgba(255,255,255,0.9)",
          borderRadius: "12px",
        }}
      >
        <Typography.Title level={2}>Welcome form</Typography.Title>

        <Item style={{ width: "400px" }}>
          <Typography.Title level={3}>Input text</Typography.Title>
          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={4}
            style={{ marginBottom: "30px" }}
          />
          <Typography.Title level={3}>Result</Typography.Title>
          <TextArea
            style={{ color: "black", userSelect: "none", cursor: "default" }}
            value={result}
            rows={4}
          />
        </Item>
        <Button
          style={{ width: "180px" }}
          type="primary"
          size="large"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
