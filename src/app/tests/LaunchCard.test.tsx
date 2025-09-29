import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { LaunchCard } from "../../entity/LaunchCard";

describe("LaunchCard component", () => {
  const launchDataMock = {
    card: {
      image: "image.png",
      title: "Test Mission",
      rocket: "Test Rocket",
    },
    modal: {
      image: "image.png",
      title: "Test modal Mission",
      rocket: "Test modal Rocket",
      body: "Test details",
    },
  };
  it("компонент LaunchCard должен успешно рендериться при передаче верных пропсов", () => {
    render(
      <MantineProvider>
        <LaunchCard launchData={launchDataMock} />
      </MantineProvider>
    );

    expect(screen.getByText(/test mission/i)).toBeInTheDocument();
    expect(screen.getByText(/test rocket/i)).toBeInTheDocument();
    expect(screen.getByText(/see more/i)).toBeInTheDocument();
  });
});
