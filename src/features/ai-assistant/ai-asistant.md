# Frontend Low-Level Design: AI Assistant --- Create Course

## 1. Overview

This document describes the frontend implementation for the **Create
Course** action in the context-aware AI Assistant.

For the current scope, clicking **Create Course** opens a form, collects
course details, and submits them to the `course-structure/generate`
endpoint. The generated course structure can then be handled by the
existing workflow.

### Goals

-   Provide a clear, guided form for course generation.
-   Submit a predictable, typed request payload to the backend.
-   Handle loading, validation, success, and error states.
-   Keep the implementation modular so additional assistant actions can
    be added later.

### In scope

-   Create Course action selection.
-   Course form rendering and validation.
-   API request and response handling.
-   UI states and error handling.

### Out of scope

-   Implementing other AI Assistant actions.
-   Backend/LLM implementation details.
-   Persisting a course or its chapters and lessons, unless the
    generation API explicitly does so.
-   A complete course editor.

------------------------------------------------------------------------

## 2. User Flow

1.  The user opens the AI Assistant.
2.  The assistant displays the available actions for the current
    page/context.
3.  The user selects **Create Course**.
4.  The assistant displays a form with:
    -   Course name
    -   Description
    -   Difficulty
5.  The user fills in the form and submits it.
6.  The frontend validates the fields and sends a request to
    `course-structure/generate`.
7.  The UI displays a loading state while the request is in progress.
8.  On success, the assistant displays the generated result or passes it
    to the existing preview flow.
9.  On failure, the assistant shows a useful error and allows the user
    to retry.

------------------------------------------------------------------------

## 3. Form and Request Contract

### Form fields

  Field           Type       Required Purpose
  --------------- -------- ---------- --------------------------------------
  `courseName`    string          Yes Name of the course
  `description`   string          Yes Learning goals and desired structure
  `difficulty`    string          Yes Intended learner difficulty

Example input:

``` json
{
  "courseName": "Threading",
  "description": "Create a course on Java threading with 5 chapters and 2 to 3 lessons in each chapter",
  "difficulty": "intermediate"
}
```

### API integration

-   **Endpoint:** `course-structure/generate`
-   **Method:** Confirm the HTTP method and any required base path with
    the backend API contract. Use `POST` if the endpoint is defined as a
    generation request that accepts a JSON body.
-   **Content-Type:** `application/json`

Example request body:

``` json
{
  "courseName": "Threading",
  "description": "Create a course on Java threading with 5 chapters and 2 to 3 lessons in each chapter",
  "difficulty": "intermediate"
}
```

The frontend should send the values entered by the user. Do not silently
replace user input with generated values. If the backend requires
additional fields, update the shared request type and this document
together.

------------------------------------------------------------------------

## 4. Component Design

The feature fits into the existing AI Assistant component structure.

``` text
AIAssistant
├── AssistantPanel
│   ├── AssistantHeader
│   ├── MessageList
│   │   └── MessageItem
│   ├── ActionSelector
│   ├── DynamicInputForm
│   └── ChatInput
```

### Responsibilities

  -----------------------------------------------------------------------
  Component                           Responsibility
  ----------------------------------- -----------------------------------
  `AIAssistant`                       Entry point; composes the assistant
                                      experience

  `AssistantPanel`                    Panel layout and visibility

  `AssistantHeader`                   Header, title, and close controls

  `MessageList` / `MessageItem`       Displays assistant and user
                                      messages

  `ActionSelector`                    Displays actions available in the
                                      current context

  `DynamicInputForm`                  Renders the selected action's
                                      configured fields

  `ChatInput`                         Handles free-form chat input if
                                      supported by the existing
                                      experience
  -----------------------------------------------------------------------

### Create Course configuration

The `CREATE_COURSE` action should define its form metadata centrally
rather than hard-coding field rendering inside the panel.

``` ts
type Difficulty = "beginner" | "intermediate" | "advanced";

type CreateCourseFormValues = {
  courseName: string;
  description: string;
  difficulty: Difficulty;
};

type ActionFieldConfig = {
  name: keyof CreateCourseFormValues;
  label: string;
  type: "text" | "textarea" | "select";
  required: boolean;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
};

const createCourseFields: ActionFieldConfig[] = [
  {
    name: "courseName",
    label: "Course name",
    type: "text",
    required: true,
    placeholder: "e.g. Java Threading"
  },
  {
    name: "description",
    label: "Course description",
    type: "textarea",
    required: true,
    placeholder: "Describe the course and desired chapters/lessons"
  },
  {
    name: "difficulty",
    label: "Difficulty",
    type: "select",
    required: true,
    options: [
      { label: "Beginner", value: "beginner" },
      { label: "Intermediate", value: "intermediate" },
      { label: "Advanced", value: "advanced" }
    ]
  }
];
```

Adapt the types to the project's existing action configuration
conventions. The configuration above is illustrative and should be
integrated with the existing `ActionSelector` and `DynamicInputForm`.

------------------------------------------------------------------------

## 5. State Management

The assistant already tracks messages, selected action, form progress,
and page context through `aicontext.slice.ts`. Reuse the existing state
management pattern rather than creating a second, disconnected state
store.

### State needed for this flow

``` ts
type CreateCourseStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error";

type CreateCourseState = {
  values: CreateCourseFormValues;
  status: CreateCourseStatus;
  errorMessage?: string;
};
```

Recommended state responsibilities:

-   **Selected action:** `CREATE_COURSE`
-   **Form values:** current `courseName`, `description`, and
    `difficulty`
-   **Submission status:** idle, submitting, success, or error
-   **Error message:** safe, user-readable feedback
-   **Messages:** assistant prompts, user activity, and result/error
    feedback

Keep form state local to the form component if it is only needed there.
Put it in the existing Redux slice only if the assistant workflow needs
the values to survive component changes, be shared across components, or
be restored later. Avoid duplicating the same state in both places.

------------------------------------------------------------------------

## 6. API Service Layer

Keep HTTP logic outside UI components.

``` ts
export type Difficulty =
  | "beginner"
  | "intermediate"
  | "advanced";

export interface CreateCourseRequest {
  courseName: string;
  description: string;
  difficulty: Difficulty;
}

// Replace `unknown` with the backend's documented response type
// once that response contract is confirmed.
export async function generateCourseStructure(
  payload: CreateCourseRequest
): Promise<unknown> {
  const response = await fetch("/course-structure/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Unable to generate the course structure.");
  }

  return response.json();
}
```

Implementation notes: - Use the project's existing HTTP client and base
URL configuration if one exists; do not introduce a second HTTP client
solely for this feature. - Confirm whether the backend route needs a
prefix such as `/api/` before implementation. - If the application uses
authentication or shared interceptors, let the existing client handle
them. - Replace `unknown` with a typed response after confirming the
backend response schema. - Avoid exposing raw server errors or internal
stack traces to the user.

------------------------------------------------------------------------

## 7. Form Validation

Perform lightweight validation before calling the API.

-   `courseName` must not be empty after trimming whitespace.
-   `description` must not be empty after trimming whitespace.
-   `difficulty` must be one of the supported values.
-   Disable submission while a request is in progress.
-   Show field-level validation messages near the relevant inputs.
-   Preserve valid input after an API error so the user can correct or
    retry without starting over.

The frontend validation improves usability but does not replace backend
validation.

------------------------------------------------------------------------

## 8. Submission Sequence

``` text
User selects Create Course
          |
          v
Render DynamicInputForm
          |
          v
User enters course details
          |
          v
Validate form values
     |            |
 invalid         valid
     |            |
Show errors       v
             Set status = submitting
                   |
                   v
       Call generateCourseStructure()
                   |
            +------+------+
            |             |
          Success        Error
            |             |
            v             v
     Store/display     Set status = error
     generated result  Show retry message
            |
            v
     Continue to result
     or preview flow
```

### Submit handler responsibilities

1.  Prevent duplicate submission.
2.  Trim string values where appropriate.
3.  Validate the payload.
4.  Set the status to `submitting`.
5.  Call the API service.
6.  On success, store or display the response using the established
    assistant message/result flow.
7.  On failure, show a recoverable error.
8.  Restore the submit control when the request completes.

------------------------------------------------------------------------

## 9. UI States

  -----------------------------------------------------------------------
  State                               Expected UI
  ----------------------------------- -----------------------------------
  Initial                             Form is visible and editable

  Validation error                    Invalid fields show helpful
                                      messages

  Submitting                          Submit button is disabled and a
                                      loading indicator is shown

  Success                             Generated structure or next-step
                                      preview is displayed

  API error                           User-readable error and retry
                                      option are shown
  -----------------------------------------------------------------------

Avoid clearing the form before the request succeeds. If the response is
a generated blueprint, clearly distinguish a generated preview from a
course that has been permanently saved.

------------------------------------------------------------------------

## 10. Error Handling

Handle at least these cases:

-   Missing or invalid form values.
-   Network failure or timeout.
-   Non-success HTTP response.
-   Malformed or unexpected response data.
-   User attempting to submit more than once.

Use the project's existing notification/message conventions. A generic
message such as *"We couldn't generate the course structure. Please try
again."* is preferable to showing internal exception details. Log
diagnostic details through the project's approved logging mechanism
where available.

------------------------------------------------------------------------

## 11. Accessibility and UX

-   Associate every form label with its input.
-   Make required fields clear.
-   Ensure errors are understandable and programmatically associated
    with the relevant fields.
-   Keep keyboard navigation and focus order logical.
-   Use a visible loading state and prevent repeated submissions.
-   Ensure the form is usable on smaller screens.
-   Do not erase the user's input after recoverable failures.

------------------------------------------------------------------------

## 12. Testing Strategy

### Unit tests

-   Required-field validation.
-   Difficulty value validation.
-   Payload construction.
-   API service success and failure behavior.

### Component tests

-   Selecting `CREATE_COURSE` displays the three fields.
-   The form submits the expected payload.
-   Invalid values prevent the API call.
-   Loading state disables duplicate submission.
-   Success response is displayed or dispatched to the result flow.
-   API errors are shown and entered values remain available.

### Integration tests

-   Complete Create Course action from action selection through API
    response.
-   Verify the correct endpoint, method, headers, and JSON body.
-   Verify behavior for network failures and non-2xx responses.

Mock the API in frontend tests; do not call a live generation endpoint
from automated unit tests.

------------------------------------------------------------------------

## 13. Suggested File Organization

Adapt these paths to the repository's existing conventions.

``` text
src/
├── features/
│   └── ai-assistant/
│       ├── components/
│       │   ├── AssistantPanel.tsx
│       │   ├── ActionSelector.tsx
│       │   └── DynamicInputForm.tsx
│       ├── config/
│       │   └── actions.ts
│       ├── services/
│       │   └── courseStructure.service.ts
│       ├── types/
│       │   └── course.types.ts
│       └── state/
│           └── aicontext.slice.ts
```

Do not move existing files merely to match this example. Follow the
repository's established structure.

------------------------------------------------------------------------

## 14. Implementation Checklist

-   [ ] Register or confirm the `CREATE_COURSE` action in the existing
    action configuration.
-   [ ] Configure `courseName`, `description`, and `difficulty` fields.
-   [ ] Render the form when Create Course is selected.
-   [ ] Add or reuse typed request definitions.
-   [ ] Integrate the API through the existing HTTP service.
-   [ ] Confirm the exact endpoint base path and HTTP method with the
    backend contract.
-   [ ] Add client-side validation.
-   [ ] Implement loading, success, and error states.
-   [ ] Connect the generated response to the existing assistant
    result/preview flow.
-   [ ] Add unit, component, and integration tests.
-   [ ] Verify keyboard accessibility and responsive layout.

------------------------------------------------------------------------

## 15. Assumptions and Open Questions

1.  The endpoint provided for this flow is `course-structure/generate`;
    the application base URL or `/api/` prefix must be confirmed.
2.  `POST` is assumed for a JSON generation request, but the backend
    contract is authoritative.
3.  The allowed difficulty values are assumed to be `beginner`,
    `intermediate`, and `advanced`; confirm the exact enum with the
    backend.
4.  The response schema is not specified here, so the service uses
    `unknown` until the API contract is available.
5.  This frontend scope submits course details and displays/forwards the
    generated result. Whether generation also persists data must be
    confirmed with the backend.
6.  The description can include structural constraints, for example "5
    chapters and 2 to 3 lessons in each chapter." The frontend sends
    this description as entered; interpreting those instructions belongs
    to the backend generation workflow.

------------------------------------------------------------------------

## 16. Completion Criteria

The feature is ready when a user can select **Create Course**, enter all
three fields, submit a valid request to the agreed endpoint, see a
loading state, and receive either a generated result or a clear
recoverable error without losing their input.
