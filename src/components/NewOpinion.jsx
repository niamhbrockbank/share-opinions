import { use, useActionState } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);

  async function shareOpinionAction(prevFormState, formData) {
    const { title, body, userName } = Object.fromEntries(formData.entries());
    const errors = [];

    if (!userName.trim()) {
      errors.push("Please add a username.");
    }

    if (!body.trim()) {
      errors.push("Please enter a body to your post!");
    }

    if (errors.length > 0) {
      return { errors, enteredValues: { title, userName, body } };
    }

    await addOpinion({ title, body, userName });
    return { errors: null };
  }

  const [formState, formAction, pending] = useActionState(
    shareOpinionAction,
    []
  );

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>

        {formState.errors &&
          formState.errors.map((error) => (
            <ul className="errors">
              <li key={error}>{error}</li>
            </ul>
          ))}

        <Submit />
      </form>
    </div>
  );
}
