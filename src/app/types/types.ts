export type LaunchLinks = {
  mission_patch?: string | undefined;
  mission_patch_small?: string | undefined;
}

export type Rocket = {
  rocket_name: string;
}

export type Launch = {
  mission_name: string;
  rocket: Rocket;
  links: LaunchLinks;
  details: string | undefined;
}

export type State = {
  launches: Launch[]
}

export type Action = {
  type: "SET_LAUNCHES";
  payload: Launch[]
}

export type Modal = {
    image: string | undefined;
    title: string;
    rocket: string;
    body: string | undefined;
}

export type Card = {
    image: string | undefined;
    title: string;
    rocket: string;
}

export type LaunchData = {
  card: Card
  modal: Modal
}

export type LaunchCardProps = {
  launchData: LaunchData
}

export type LaunchModalProps = {
  modal: Modal;
  toggleIsOpen: React.ActionDispatch<[]>
}