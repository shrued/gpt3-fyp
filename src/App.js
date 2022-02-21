import Layout from "./components/layout";
import Home from "./components/home";
import Story from "./components/story";
import Bot from "./components/bot";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function React() {
  return (
    <>
      <Layout>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/story" element={<Story />} />
            <Route path="/bot" element={<Bot />} />
          </Routes>
        </Router>
      </Layout>
    </>
  );
}
