type SendSvgProps = {
  className: string;
};
const SendSvg: React.FC<SendSvgProps> = (props) => (
  <svg height={24} width={24} xmlSpace="preserve" {...props}>
    <path
      fill="currentColor"
      d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
    />
  </svg>
);

export default SendSvg;
