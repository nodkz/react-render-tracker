import * as React from "react";
import { useTrackRender } from "../helpers";
import { TestCase } from "../types";

export default {
  title: "Set state by event handler",
  Root,
} as TestCase;

function Root() {
  useTrackRender();
  return <Child />;
}

function Child() {
  const { useState } = useTrackRender();
  const [ok, setOk] = useState(false);

  if (!ok) {
    return (
      <div data-send-event="click" onClick={() => setOk(true)}>
        Failed: waiting for click event
      </div>
    );
  }
  return <>OK</>;
}
