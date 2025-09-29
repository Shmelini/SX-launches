import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { LaunchesList } from "../../pages/LaunchesList";
import ky from "ky";

vi.mock("ky");

describe("LaunchesList component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("компонент LaunchesList должен успешно рендериться и отображать карточки после загрузки", async () => {
    const mockLaunches = [
      {
        mission_name: "Test Mission",
        links: {
          mission_patch_small: "image.png",
          mission_patch: "image.png",
        },
        rocket: {
          rocket_name: "Test Rocket",
        },
        details: "Test details",
      },
    ];

    (ky as any).get.mockReturnValue({
      json: () => Promise.resolve(mockLaunches),
    });

    render(
      <MantineProvider>
        <LaunchesList />
      </MantineProvider>
    );

    expect(screen.getByText("SpaceX Launches 2020")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Test Mission")).toBeInTheDocument();
    });

    const launchesList = screen.getByTestId("launches-list");
    expect(launchesList.childElementCount).toBeGreaterThan(0);
  });
});
