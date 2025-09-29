import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { LaunchModal } from "../../features/LaunchModal";
import { LaunchCard } from "../../entity/LaunchCard";
import { MantineProvider } from "@mantine/core";

vi.mock("react-dom", () => ({
  ...vi.importActual("react-dom"),
  createPortal: (children: any) => children,
}));

beforeEach(() => {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal");
  document.body.appendChild(modalRoot);
});

afterEach(() => {
  cleanup();
  const modalRoot = document.getElementById("modal");
  if (modalRoot) {
    document.body.removeChild(modalRoot);
  }
});

describe("LaunchModal component", () => {
  const mockModalData = {
    title: "Test mission",
    rocket: "Test rocket",
    body: "Test details",
    image: "image.png",
  };

  const mockToggleIsOpen = vi.fn();

  it("компонент должен рендериться при верно переданных пропсах", () => {
    render(
      <MantineProvider>
        <LaunchModal modal={mockModalData} toggleIsOpen={mockToggleIsOpen} />
      </MantineProvider>
    );

    expect(screen.getByText("Mission name:")).toBeInTheDocument();
    expect(screen.getByText("Rocket name:")).toBeInTheDocument();
    expect(screen.getByText("Details:")).toBeInTheDocument();
  });

  it("компонент должен условно рендериться по смене стейта isOpen из компонента LaunchCard", () => {
    const mockLaunchData = {
      card: {
        title: "Test Mission",
        rocket: "Falcon 9",
        image: "test-image.jpg",
      },
      modal: mockModalData,
    };

    render(
      <MantineProvider>
        <LaunchCard launchData={mockLaunchData} />
      </MantineProvider>
    );

    expect(screen.queryByText("Mission name:")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("See more"));

    expect(screen.getByText("Mission name:")).toBeInTheDocument();
  });

  it("компонент должен обрабатывать срабатывание переданной функции по нажатию на кнопку закрытия и оверлей", () => {
    render(
      <MantineProvider>
        <LaunchModal modal={mockModalData} toggleIsOpen={mockToggleIsOpen} />
      </MantineProvider>
    );

    const closeButton = screen.getByTestId("close-button");
    fireEvent.click(closeButton);
    expect(mockToggleIsOpen).toHaveBeenCalledTimes(1);

    const overlay = document.querySelector(".overlay");
    if (overlay) {
      fireEvent.click(overlay);
      expect(mockToggleIsOpen).toHaveBeenCalledTimes(2);
    }
  });
});
