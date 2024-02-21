import { Link } from "@remix-run/react";
import type { FC } from "react";

export const meta = () => {
  return {
    title: "Events",
    description: "Events",
  };
};

const PageComponent: FC = () => {
  return (
    <section className="flex">
      <h1>Events</h1>

      <article>
        <h2>Hosting</h2>
        <ul>
          <li>Event 1</li>
          <li>Event 2</li>
          <li>Event 3</li>
        </ul>
        <Link
          to={{
            pathname: "/events/create",
          }}
        >
          Create Event
        </Link>
      </article>

      <article>
        <h2>Attending</h2>
        <ul>
          <li>Event 1</li>
          <li>Event 2</li>
          <li>Event 3</li>
        </ul>
        <Link
          to={{
            pathname: "/events/join",
          }}
        >
          Join Event
        </Link>
      </article>

      <p>Events page</p>
    </section>
  );
};

export default PageComponent;
