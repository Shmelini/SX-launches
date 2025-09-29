import { StrictMode } from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { App } from "../App";

describe("App component", () => {
  it("компонент App должен успешно рендериться", () => {
    render(
      <StrictMode>
        <MantineProvider>
          <App />
        </MantineProvider>
      </StrictMode>
    );

    const title = screen.getByText(/spacex launches 2020/i);

    expect(title).toBeInTheDocument();
  });
});
