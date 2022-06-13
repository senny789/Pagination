import React from "react";
import { Button } from "@chakra-ui/react";
interface Props {
  pageno: number;
  onclick: any;
}
const PageButton: React.FC<Props> = (props) => {
  return (
    <Button onClick={() => props.onclick(props.pageno)}>{props.pageno}</Button>
  );
};

export default PageButton;
