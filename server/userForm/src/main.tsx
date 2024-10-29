import { createRoot } from "react-dom/client";
import React from "react";
import { UserForm } from "./UserForm";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(<UserForm />);
