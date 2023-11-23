export default function TokenInput({
  title,
  token,
}: {
  title: string;
  token?: string;
}) {
  const svgStyle = {
    enableBackground: "new 0 0 38.4 33.5",
  } as React.CSSProperties;
  return (
    <fieldset className="w-full h-1/2 flex items-center text-zinc-200 border-dashed border-t border-gray-600">
      <legend className="ml-auto mr-auto px-2 text-md">{title}</legend>
      <span className="w-full h-full flex flex-row items-center justify-center gap-4 text-3xl">
        {token}
        {token === "Matic" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.4em"
            height="1.4em"
            viewBox="0 0 38.4 33.5"
            style={svgStyle}
            xmlSpace="preserve"
          >
            <path
              d="M29 10.2c-.7-.4-1.6-.4-2.4 0L21 13.5l-3.8 2.1-5.5 3.3c-.7.4-1.6.4-2.4 0L5 16.3c-.7-.4-1.2-1.2-1.2-2.1v-5c0-.8.4-1.6 1.2-2.1l4.3-2.5c.7-.4 1.6-.4 2.4 0L16 7.2c.7.4 1.2 1.2 1.2 2.1v3.3l3.8-2.2V7c0-.8-.4-1.6-1.2-2.1l-8-4.7c-.7-.4-1.6-.4-2.4 0L1.2 5C.4 5.4 0 6.2 0 7v9.4c0 .8.4 1.6 1.2 2.1l8.1 4.7c.7.4 1.6.4 2.4 0l5.5-3.2 3.8-2.2 5.5-3.2c.7-.4 1.6-.4 2.4 0l4.3 2.5c.7.4 1.2 1.2 1.2 2.1v5c0 .8-.4 1.6-1.2 2.1L29 28.8c-.7.4-1.6.4-2.4 0l-4.3-2.5c-.7-.4-1.2-1.2-1.2-2.1V21l-3.8 2.2v3.3c0 .8.4 1.6 1.2 2.1l8.1 4.7c.7.4 1.6.4 2.4 0l8.1-4.7c.7-.4 1.2-1.2 1.2-2.1V17c0-.8-.4-1.6-1.2-2.1L29 10.2z"
              style={{ fill: "#8247e5" }}
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.4em"
            height="1.4em"
            shape-rendering="geometricPrecision"
            text-rendering="geometricPrecision"
            image-rendering="optimizeQuality"
            fill-rule="evenodd"
            clip-rule="evenodd"
            viewBox="0 0 784.37 1277.39"
          >
            <g fill-rule="nonzero">
              <path
                fill="#343434"
                d="m392.07 0-8.57 29.11v844.63l8.57 8.55 392.06-231.75z"
              />
              <path
                fill="#8C8C8C"
                d="M392.07 0 0 650.54l392.07 231.75V472.33z"
              />
              <path
                fill="#3C3C3B"
                d="m392.07 956.52-4.83 5.89v300.87l4.83 14.1 392.3-552.49z"
              />
              <path fill="#8C8C8C" d="M392.07 1277.38V956.52L0 724.89z" />
              <path
                fill="#141414"
                d="m392.07 882.29 392.06-231.75-392.06-178.21z"
              />
              <path fill="#393939" d="m0 650.54 392.07 231.75V472.33z" />
            </g>
          </svg>
        )}
      </span>
    </fieldset>
  );
}
