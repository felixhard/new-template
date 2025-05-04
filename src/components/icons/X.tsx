import { IconProps } from "./types/IconTypes";

export function X({ fill }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M18.205 2.25195H21.513L14.2861 10.5118L22.7879 21.7516H16.1301L10.9162 14.9347L4.95026 21.7516H1.64032L9.37018 12.9168L1.21533 2.25195H8.0402L12.7531 8.48284L18.203 2.25195H18.205ZM17.044 19.7716H18.877L7.04522 4.12792H5.07826L17.044 19.7716Z"
        fill={fill}
      />
    </svg>
  );
}
