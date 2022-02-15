import { Navbar, Container } from "react-bootstrap";

export default function Header() {
  return (
    <>
      <Navbar variant="dark">
        <Container>
          <Navbar.Brand href="#home">GPT3</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}
