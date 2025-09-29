import { Button, Card, Image, Text } from "@mantine/core";
import { useReducer } from "react";
import { LaunchModal } from "../../features/LaunchModal";
import noImage from "../../shared/icons/noImage.svg";
import type { LaunchCardProps } from "../../app/types/types";

export function LaunchCard({ launchData }: LaunchCardProps) {
  const [isOpen, toggleIsOpen] = useReducer((state) => {
    return !state;
  }, false);
  const { card, modal } = launchData;
  return (
    <>
      <Card p={15} h={300} shadow="sm" padding="md" radius="md" withBorder>
        <Image
          fit="contain"
          ml="auto"
          mr="auto"
          mt="10"
          src={card.image ? card.image : noImage}
          w={100}
          h={100}
        />
        <Text mt={15} fw="600">
          {card.title}
        </Text>
        <Text mt={15} c="gray">
          {card.rocket}
        </Text>
        <Button mt="auto" onClick={toggleIsOpen}>
          See more
        </Button>
      </Card>
      {isOpen && <LaunchModal modal={modal} toggleIsOpen={toggleIsOpen} />}
    </>
  );
}
