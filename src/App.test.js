import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders stopwatch heading", () => {
  render(<App />);
  const headingElement = screen.getByRole("heading", { name: /stopwatch/i });
  expect(headingElement).toBeInTheDocument();
});
