declare module '*.glsl' {
  const content: string;
  export default content;
}

declare module '*.frag' {
  // rome-ignore lint/suspicious/noRedeclare: <explanation>
  const content: string;
  export default content;
}

declare module '*.vert' {
  // rome-ignore lint/suspicious/noRedeclare: <explanation>
  const content: string;
  export default content;
}
