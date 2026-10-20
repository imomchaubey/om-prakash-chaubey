const TODO_PREFIX = "TODO(";

/**
 * Returns true if the given string is a TODO placeholder (e.g. `TODO(about bio...)`).
 */
export function isTodo(value: string | null | undefined): boolean {
  if (!value) {
    return false;
  }
  return value.trim().startsWith(TODO_PREFIX);
}

/**
 * Returns true when running in development mode so TODO markers can be rendered
 * visibly during local development while staying completely hidden in production builds.
 */
export function shouldRenderTodoInUi(): boolean {
  return process.env.NODE_ENV !== "production";
}
