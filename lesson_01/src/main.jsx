import { createRoot } from "react-dom/client";

const Heading = (props) => {
  return <h1 style={{ color: props.color }}> {props.text}</h1>;
};

const Description = (props) => {
  const yourName = prompt('Enter your name');
  return <h2 style={{ fontStyle: props.textStyle }}>{yourName}'s first React application</h2>;
};

createRoot(document.getElementById("root")).render(
  <>
    <Heading color="crimson" text="Hello, world!" />
    <Description textStyle="italic"/>
  </>
);