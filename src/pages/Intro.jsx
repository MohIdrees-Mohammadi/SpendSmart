import { Form } from "react-router-dom";
import illustration from "../images/illustration.jpg";

const Intro = () => {
  return (
    <div className="intro">
      <div>
        <h1>
          Take control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal budgeting is the secret to financial freedom. Start your
          journey today{" "}
        </p>
        <Form method="post">
          <input
            type="text"
            name="userName"
            required
            placeholder="what is your name?"
            aria-label="Your name"
            autoComplete="given-name"
          />
          <input type="hidden" name="_action" value="newUser" />
          <button type="submit" className="btn btn--dark">
            Create Account
          </button>
        </Form>
      </div>
      <img src={illustration} alt="cash in hand " />
    </div>
  );
};

export default Intro;
