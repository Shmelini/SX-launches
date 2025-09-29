import {
  Paper,
  Title,
  Group,
  Stack,
  Image,
  Text,
  CloseButton,
} from "@mantine/core";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import noImage from "../../shared/icons/noImage.svg";
import type { LaunchModalProps } from "../../app/types/types";
import classNames from "classnames/bind";
import s from "./style.module.scss";

const cx = classNames.bind(s);

const modalElement = document.getElementById("modal") as HTMLElement;

export function LaunchModal({ modal, toggleIsOpen }: LaunchModalProps) {
  useEffect(() => {
    const body = document.body;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = "auto";
    };
  }, []);
  return createPortal(
    <>
      <div className={cx("modal")}>
        <Paper
          shadow="xs"
          w={900}
          h={700}
          p={25}
          style={{
            overflowY: "scroll",
          }}
        >
          <Stack align="flex-start" h={700}>
            <Group justify="space-between" w="100%">
              <Title order={3}>{modal.title}</Title>
              <CloseButton data-testid="close-button" onClick={toggleIsOpen} />
            </Group>
            <Image
              fit="contain"
              w={400}
              h={400}
              ml="auto"
              mr="auto"
              src={modal.image ? modal.image : noImage}
            />
            <Stack align="flex-start" gap={5} mb={10}>
              <Text fw={600}>Mission name:</Text>
              <Text fw={500} c="gray">
                {modal.title}
              </Text>
            </Stack>
            <Stack align="flex-start" gap={5} mb={10}>
              <Text fw={600}>Rocket name:</Text>
              <Text fw={500} c="gray">
                {modal.rocket}
              </Text>
            </Stack>
            <Stack align="flex-start" gap={5} mb={10}>
              <Text fw={600}>Details:</Text>
              <Text fw={500} c="gray">
                {modal.body ? modal.body : "No details"}
              </Text>
            </Stack>
          </Stack>
        </Paper>
      </div>
      <div className={cx("overlay")} onClick={toggleIsOpen}></div>
    </>,
    modalElement
  );
}
