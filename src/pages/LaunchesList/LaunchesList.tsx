import ky from "ky";
import { useEffect, useReducer } from "react";
import { LaunchCard } from "../../entity/LaunchCard";
import type { Launch, State, Action } from "../../app/types/types";
import classNames from "classnames/bind";
import s from "./style.module.scss";
import { Title } from "@mantine/core";

const cx = classNames.bind(s);

function reducer(state: State, action: Action) {
  return action.type === "SET_LAUNCHES"
    ? { ...state, launches: action.payload }
    : state;
}

export function LaunchesList() {
  const [{ launches }, dispatch] = useReducer(reducer, { launches: [] });

  useEffect(() => {
    const fetchData = async () => {
      const data = await ky
        .get("https://api.spacexdata.com/v3/launches?launch_year=2020")
        .json<Launch[]>();

      dispatch({ type: "SET_LAUNCHES", payload: data });
    };
    fetchData();
  }, []);
  return (
    <>
      <Title order={2} fz={40} mb={30}>
        SpaceX Launches 2020
      </Title>
      <div data-testid="launches-list" className={cx("launches-list")}>
        {launches.map((launch) => {
          const launchData = {
            card: {
              image: launch.links?.mission_patch_small,
              title: launch.mission_name,
              rocket: launch.rocket?.rocket_name,
            },
            modal: {
              image: launch.links?.mission_patch,
              title: launch.mission_name,
              rocket: launch.rocket?.rocket_name,
              body: launch.details,
            },
          };
          return (
            <LaunchCard key={launchData.card.title} launchData={launchData} />
          );
        })}
      </div>
    </>
  );
}
