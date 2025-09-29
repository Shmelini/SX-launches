import { MantineProvider } from "@mantine/core";
import { LaunchesList } from "../pages/LaunchesList";
import "@mantine/core/styles.css";
import "./App.scss";

export function App() {
  return (
    <MantineProvider>
      <LaunchesList />
    </MantineProvider>
  );
}
