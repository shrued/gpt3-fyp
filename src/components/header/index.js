import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

export default function Header() {
  const [colorChange, setColorchange] = useState(false);
  const [height, setHeight] = useState("");
  var x = window.matchMedia("(max-width: 768px)");

  const changeNavbarColor = () => {
    if (x.matches) {
      setHeight("50");
    } else {
      setHeight("100");
    }
    if (window.scrollY >= height) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };

  window.addEventListener("scroll", changeNavbarColor);

  return (
    <>
      <Navbar className="header-after fixed-top" variant="dark">
        <Container>
          <Nav href="#home">
            <Nav.Link>GPT3</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
