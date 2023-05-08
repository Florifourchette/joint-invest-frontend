import { Message } from "semantic-ui-react";
import LogIn from "../pages/LogIn";

export default function AuthIssue() {
  return (
    <div>
      <div className="d-flex justify-content-center">
        <Message error>
          <strong>You are not logged in, please login!</strong>
        </Message>
      </div>
      <LogIn />
    </div>
  );
}
